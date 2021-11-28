import * as cobrasu from "/lib/cobrasu/core.js";
import DamageCalculator from "../core/damageCalculator.js";
import "../core/gun.js";
import "../core/simulation.js";
import Chart from "../utils/chart.js";
import "./ttkGraph.js";
const { Colorizer } = cobrasu;
const { Cookies } = cobrasu.DOM;
export class CardList {
    element;
    graph;
    scenario;
    items;
    constructor(element, { graph }) {
        this.element = element;
        this.graph = graph;
        this.items = new Map();
        this.element.addEventListener("wheel", this.#onScroll);
    }
    add(gun) {
        if (this.items.has(gun.name))
            throw new Error(`Attempted to display another card of '${gun.name}'`);
        let item = new CardList.Item(this, gun);
        this.element.append(item.element);
        this.items.set(gun.name, item);
        this.visualizeOnGraph();
    }
    remove(name) {
        if (!this.items.delete(name))
            throw new Error(`Attempted to stop displaying a non-extant card '${name}'`);
        this.element.querySelector(`[id='${name}']`).remove();
        this.visualizeOnGraph();
    }
    update(scenario) {
        this.scenario = scenario;
        for (let item of this.items.values())
            item.profileIndex = item.profileIndex;
        this.visualizeOnGraph();
    }
    visualizeOnGraph() {
        this.graph.visualize([...this.items.values()].map(item => item.gun));
    }
    #onScroll = (event) => {
        event.preventDefault();
        this.element.scrollLeft += event.deltaY;
    };
}
(function (CardList) {
    class Item {
        gun;
        element;
        list;
        damageDistributionChart;
        #profileIndex;
        constructor(list, gun) {
            this.list = list;
            this.gun = gun;
            this.element = document.createElement("div");
            this.element.id = gun.name;
            this.element.classList.add("card");
            let name = document.createElement("div");
            name.id = "name";
            name.textContent = gun.name;
            this.element.append(name);
            this.element.append(document.createElement("hr"));
            if (gun.category) {
                let category = document.createElement("div");
                category.id = "category";
                category.classList.add("pair");
                this.element.append(category);
                let key = document.createElement("div");
                key.textContent = "Category";
                category.append(key);
                let value = document.createElement("div");
                value.textContent = gun.category;
                category.append(value);
            }
            if (gun.fireRate) {
                let rof = document.createElement("div");
                rof.id = "rof";
                rof.classList.add("pair");
                this.element.append(rof);
                let key = document.createElement("div");
                key.textContent = "RoF";
                rof.append(key);
                let value = document.createElement("div");
                value.textContent = `${gun.fireRate} RPM`;
                rof.append(value);
            }
            if (gun.boltDelay) {
                let obd = document.createElement("div");
                obd.id = "obd";
                obd.classList.add("pair");
                this.element.append(obd);
                let key = document.createElement("div");
                key.textContent = "OBD";
                obd.append(key);
                let value = document.createElement("div");
                value.textContent = `${gun.boltDelay}s`;
                obd.append(value);
            }
            if (gun.profile.length > 0) {
                let range = document.createElement("div");
                range.id = "range";
                range.classList.add("pair");
                this.element.append(range);
                let key = document.createElement("div");
                key.textContent = "Damage Range";
                range.append(key);
                let value = document.createElement("div");
                value.classList.add("radioBubbles");
                range.append(value);
                gun.profile.forEach((_, i) => {
                    let range = document.createElement("button");
                    range.id = i.toString();
                    range.textContent = (1 + i).toString();
                    range.onclick = () => this.profileIndex = i;
                    value.append(range);
                });
            }
            let profile = document.createElement("div");
            profile.id = "profile";
            this.element.append(profile);
            let profileLabel = document.createElement("div");
            profileLabel.textContent = "Damage Profile";
            profile.append(profileLabel);
            let regions = document.createElement("ul");
            profile.append(regions);
            {
                let distribution = document.createElement("div");
                distribution.id = "distribution";
                this.element.append(distribution);
                let canvas = document.createElement("canvas");
                distribution.append(canvas);
                this.damageDistributionChart = new Chart(canvas.getContext("2d"), {
                    type: "doughnut",
                    options: {
                        borderWidth: 0,
                        offset: 10,
                        animation: {
                            duration: 0
                        },
                        plugins: {
                            legend: {
                                display: false
                            }
                        }
                    }
                });
            }
            if (gun.profile.length == 0)
                return;
            this.profileIndex = Cookies.get("selection", Object)?.[this.gun.name]?.profileIndex ?? 0;
        }
        get profileIndex() {
            return this.#profileIndex;
        }
        set profileIndex(index) {
            this.#profileIndex = index;
            let selection = Cookies.get("selection", Object);
            selection ??= {};
            selection[this.gun.name] ??= {};
            selection[this.gun.name].profileIndex = index;
            Cookies.set("selection", selection);
            let scenario = this.list["scenario"];
            //Damage range selection
            let radioBubbles = this.element.querySelector("#range > div:nth-child(2)");
            radioBubbles.querySelectorAll("button").forEach(e => e.classList.remove("selected"));
            radioBubbles.querySelector(`button:nth-child(${1 + index})`).classList.add("selected");
            //Damage profile display
            let regions = this.element.querySelector("#profile > ul");
            while (regions.firstElementChild)
                regions.firstElementChild.remove();
            let result = DamageCalculator.simulate({ profile: this.gun.profile[index], scenario: scenario });
            let damageRegions = Object.keys(this.gun.profile[index].damage);
            let wheel = Colorizer.wheel(damageRegions.length);
            for (let regionName of damageRegions) {
                let region = document.createElement("li");
                regions.append(region);
                let bullets = document.createElement("div");
                bullets.textContent = `${result.regions[regionName].bullets}`;
                region.append(bullets);
                let label = document.createElement("div");
                label.textContent = `${regionName[0].toUpperCase()}${regionName.slice(1)}`;
                label.style.color = wheel.next().value;
                region.append(label);
                let damage = document.createElement("div");
                damage.textContent = `${-result.regions[regionName].bullets * this.gun.profile[index].damage[regionName]}`;
                region.append(damage);
            }
            let totalDamage = scenario
                .regions
                .map(region => result.regions[region].bullets * this.gun.profile[index].damage[region])
                .reduce((a, b) => a + b, 0);
            let profileLabel = this.element.querySelector("#profile > div");
            profileLabel.textContent = `Damage Profile (${totalDamage})`;
            //Damage distribution chart
            this.damageDistributionChart.data = {
                labels: scenario
                    .regions
                    .map(region => `${region[0].toUpperCase()}${region.slice(1)}`),
                datasets: [{
                        data: scenario
                            .regions
                            .map(region => result.regions[region].bullets * this.gun.profile[index].damage[region]),
                        backgroundColor: [...Colorizer.wheel(scenario.regions.length)]
                    }]
            };
            this.damageDistributionChart.update();
        }
    }
    CardList.Item = Item;
})(CardList || (CardList = {}));
export default CardList;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZExpc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdWkvY2FyZExpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLE9BQU8sTUFBTSxzQkFBc0IsQ0FBQTtBQUMvQyxPQUFPLGdCQUFnQixNQUFNLDZCQUE2QixDQUFBO0FBQzFELE9BQWdCLGdCQUFnQixDQUFBO0FBQ2hDLE9BQXVCLHVCQUF1QixDQUFBO0FBQzlDLE9BQU8sS0FBSyxNQUFNLG1CQUFtQixDQUFBO0FBQ3JDLE9BQXFCLGVBQWUsQ0FBQTtBQUVwQyxNQUFNLEVBQUMsU0FBUyxFQUFDLEdBQUcsT0FBTyxDQUFBO0FBQzNCLE1BQU0sRUFBQyxPQUFPLEVBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFBO0FBRTdCLE1BQU0sT0FBTyxRQUFRO0lBQ0osT0FBTyxDQUFhO0lBQzVCLEtBQUssQ0FBVTtJQUNmLFFBQVEsQ0FBcUI7SUFDN0IsS0FBSyxDQUE0QjtJQUV6QyxZQUFtQixPQUFvQixFQUFFLEVBQUMsS0FBSyxFQUFvQjtRQUNsRSxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQTtRQUN0QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQTtRQUNsQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUE7UUFFdEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBQ3ZELENBQUM7SUFFTSxHQUFHLENBQUMsR0FBUTtRQUNsQixJQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7WUFDMUIsTUFBTSxJQUFJLEtBQUssQ0FBQyx5Q0FBeUMsR0FBRyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUE7UUFFdEUsSUFBSSxJQUFJLEdBQUcsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUks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Q0FBQyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztxQkFDOUQsQ0FBQzthQUNGLENBQUE7WUFFRCxJQUFJLENBQUMsdUJBQXVCLENBQUMsTUFBTSxFQUFFLENBQUE7UUFDdEMsQ0FBQztLQUNEO0lBM01ZLGFBQUksT0EyTWhCLENBQUE7QUFDRixDQUFDLEVBN01nQixRQUFRLEtBQVIsUUFBUSxRQTZNeEI7QUFFRCxlQUFlLFFBQVEsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNvYnJhc3UgZnJvbSBcIi9saWIvY29icmFzdS9jb3JlLmpzXCJcbmltcG9ydCBEYW1hZ2VDYWxjdWxhdG9yIGZyb20gXCIuLi9jb3JlL2RhbWFnZUNhbGN1bGF0b3IuanNcIlxuaW1wb3J0IEd1biBmcm9tIFwiLi4vY29yZS9ndW4uanNcIlxuaW1wb3J0IFNpbXVsYXRpb24gZnJvbSBcIi4uL2NvcmUvc2ltdWxhdGlvbi5qc1wiXG5pbXBvcnQgQ2hhcnQgZnJvbSBcIi4uL3V0aWxzL2NoYXJ0LmpzXCJcbmltcG9ydCBUVEtHcmFwaCBmcm9tIFwiLi90dGtHcmFwaC5qc1wiXG5cbmNvbnN0IHtDb2xvcml6ZXJ9ID0gY29icmFzdVxuY29uc3Qge0Nvb2tpZXN9ID0gY29icmFzdS5ET01cblxuZXhwb3J0IGNsYXNzIENhcmRMaXN0IHtcblx0cHVibGljIHJlYWRvbmx5IGVsZW1lbnQ6IEhUTUxFbGVtZW50XG5cdHByaXZhdGUgZ3JhcGg6IFRUS0dyYXBoXG5cdHByaXZhdGUgc2NlbmFyaW86IFNpbXVsYXRpb24uU2NlbmFyaW9cblx0cHJpdmF0ZSBpdGVtczogTWFwPHN0cmluZywgQ2FyZExpc3QuSXRlbT5cblxuXHRwdWJsaWMgY29uc3RydWN0b3IoZWxlbWVudDogSFRNTEVsZW1lbnQsIHtncmFwaH06IHtncmFwaDogVFRLR3JhcGh9KSB7XG5cdFx0dGhpcy5lbGVtZW50ID0gZWxlbWVudFxuXHRcdHRoaXMuZ3JhcGggPSBncmFwaFxuXHRcdHRoaXMuaXRlbXMgPSBuZXcgTWFwKClcblxuXHRcdHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwid2hlZWxcIiwgdGhpcy4jb25TY3JvbGwpXG5cdH1cblxuXHRwdWJsaWMgYWRkKGd1bjogR3VuKTogdm9pZCB7XG5cdFx0aWYodGhpcy5pdGVtcy5oYXMoZ3VuLm5hbWUpKVxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBBdHRlbXB0ZWQgdG8gZGlzcGxheSBhbm90aGVyIGNhcmQgb2YgJyR7Z3VuLm5hbWV9J2ApXG5cblx0XHRsZXQgaXRlbSA9IG5ldyBDYXJkTGlzdC5JdGVtKHRoaXMsIGd1bilcblx0XHR0aGlzLmVsZW1lbnQuYXBwZW5kKGl0ZW0uZWxlbWVudClcblxuXHRcdHRoaXMuaXRlbXMuc2V0KGd1bi5uYW1lLCBpdGVtKVxuXG5cdFx0dGhpcy52aXN1YWxpemVPbkdyYXBoKClcblx0fVxuXG5cdHB1YmxpYyByZW1vdmUobmFtZTogc3RyaW5nKTogdm9pZCB7XG5cdFx0aWYoIXRoaXMuaXRlbXMuZGVsZXRlKG5hbWUpKVxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBBdHRlbXB0ZWQgdG8gc3RvcCBkaXNwbGF5aW5nIGEgbm9uLWV4dGFudCBjYXJkICcke25hbWV9J2ApXG5cblx0XHR0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihgW2lkPScke25hbWV9J11gKS5yZW1vdmUoKVxuXG5cdFx0dGhpcy52aXN1YWxpemVPbkdyYXBoKClcblx0fVxuXG5cdHB1YmxpYyB1cGRhdGUoc2NlbmFyaW86IFNpbXVsYXRpb24uU2NlbmFyaW8pOiB2b2lkIHtcblx0XHR0aGlzLnNjZW5hcmlvID0gc2NlbmFyaW9cblxuXHRcdGZvcihsZXQgaXRlbSBvZiB0aGlzLml0ZW1zLnZhbHVlcygpKVxuXHRcdFx0aXRlbS5wcm9maWxlSW5kZXggPSBpdGVtLnByb2ZpbGVJbmRleFxuXG5cdFx0dGhpcy52aXN1YWxpemVPbkdyYXBoKClcblx0fVxuXG5cdHByaXZhdGUgdmlzdWFsaXplT25HcmFwaCgpOiB2b2lkIHtcblx0XHR0aGlzLmdyYXBoLnZpc3VhbGl6ZShbLi4udGhpcy5pdGVtcy52YWx1ZXMoKV0ubWFwKGl0ZW0gPT4gaXRlbS5ndW4pKVxuXHR9XG5cblx0I29uU2Nyb2xsID0gKGV2ZW50OiBXaGVlbEV2ZW50KSA9PiB7XG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKVxuXHRcdHRoaXMuZWxlbWVudC5zY3JvbGxMZWZ0ICs9IGV2ZW50LmRlbHRhWVxuXHR9XG59XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ2FyZExpc3Qge1xuXHRleHBvcnQgY2xhc3MgSXRlbSB7XG5cdFx0cHVibGljIHJlYWRvbmx5IGd1bjogR3VuXG5cdFx0cHVibGljIHJlYWRvbmx5IGVsZW1lbnQ6IEhUTUxFbGVtZW50XG5cdFx0cHJpdmF0ZSBsaXN0OiBDYXJkTGlzdFxuXHRcdHByaXZhdGUgZGFtYWdlRGlzdHJpYnV0aW9uQ2hhcnQ6IENoYXJ0XG5cdFx0I3Byb2ZpbGVJbmRleDogbnVtYmVyXG5cblx0XHRwdWJsaWMgY29uc3RydWN0b3IobGlzdDogQ2FyZExpc3QsIGd1bjogR3VuKSB7XG5cdFx0XHR0aGlzLmxpc3QgPSBsaXN0XG5cdFx0XHR0aGlzLmd1biA9IGd1blxuXG5cdFx0XHR0aGlzLmVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG5cdFx0XHR0aGlzLmVsZW1lbnQuaWQgPSBndW4ubmFtZVxuXHRcdFx0dGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJjYXJkXCIpXG5cblx0XHRcdGxldCBuYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuXHRcdFx0bmFtZS5pZCA9IFwibmFtZVwiXG5cdFx0XHRuYW1lLnRleHRDb250ZW50ID0gZ3VuLm5hbWVcblx0XHRcdHRoaXMuZWxlbWVudC5hcHBlbmQobmFtZSlcblxuXHRcdFx0dGhpcy5lbGVtZW50LmFwcGVuZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaHJcIikpXG5cblx0XHRcdGlmKGd1bi5jYXRlZ29yeSkge1xuXHRcdFx0XHRsZXQgY2F0ZWdvcnkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG5cdFx0XHRcdGNhdGVnb3J5LmlkID0gXCJjYXRlZ29yeVwiXG5cdFx0XHRcdGNhdGVnb3J5LmNsYXNzTGlzdC5hZGQoXCJwYWlyXCIpXG5cdFx0XHRcdHRoaXMuZWxlbWVudC5hcHBlbmQoY2F0ZWdvcnkpXG5cblx0XHRcdFx0bGV0IGtleSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcblx0XHRcdFx0a2V5LnRleHRDb250ZW50ID0gXCJDYXRlZ29yeVwiXG5cdFx0XHRcdGNhdGVnb3J5LmFwcGVuZChrZXkpXG5cblx0XHRcdFx0bGV0IHZhbHVlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuXHRcdFx0XHR2YWx1ZS50ZXh0Q29udGVudCA9IGd1bi5jYXRlZ29yeVxuXHRcdFx0XHRjYXRlZ29yeS5hcHBlbmQodmFsdWUpXG5cdFx0XHR9XG5cblx0XHRcdGlmKGd1bi5maXJlUmF0ZSkge1xuXHRcdFx0XHRsZXQgcm9mID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuXHRcdFx0XHRyb2YuaWQgPSBcInJvZlwiXG5cdFx0XHRcdHJvZi5jbGFzc0xpc3QuYWRkKFwicGFpclwiKVxuXHRcdFx0XHR0aGlzLmVsZW1lbnQuYXBwZW5kKHJvZilcblxuXHRcdFx0XHRsZXQga2V5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuXHRcdFx0XHRrZXkudGV4dENvbnRlbnQgPSBcIlJvRlwiXG5cdFx0XHRcdHJvZi5hcHBlbmQoa2V5KVxuXG5cdFx0XHRcdGxldCB2YWx1ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcblx0XHRcdFx0dmFsdWUudGV4dENvbnRlbnQgPSBgJHtndW4uZmlyZVJhdGV9IFJQTWBcblx0XHRcdFx0cm9mLmFwcGVuZCh2YWx1ZSlcblx0XHRcdH1cblxuXHRcdFx0aWYoZ3VuLmJvbHREZWxheSkge1xuXHRcdFx0XHRsZXQgb2JkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuXHRcdFx0XHRvYmQuaWQgPSBcIm9iZFwiXG5cdFx0XHRcdG9iZC5jbGFzc0xpc3QuYWRkKFwicGFpclwiKVxuXHRcdFx0XHR0aGlzLmVsZW1lbnQuYXBwZW5kKG9iZClcblxuXHRcdFx0XHRsZXQga2V5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuXHRcdFx0XHRrZXkudGV4dENvbnRlbnQgPSBcIk9CRFwiXG5cdFx0XHRcdG9iZC5hcHBlbmQoa2V5KVxuXG5cdFx0XHRcdGxldCB2YWx1ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcblx0XHRcdFx0dmFsdWUudGV4dENvbnRlbnQgPSBgJHtndW4uYm9sdERlbGF5fXNgXG5cdFx0XHRcdG9iZC5hcHBlbmQodmFsdWUpXG5cdFx0XHR9XG5cblx0XHRcdGlmKGd1bi5wcm9maWxlLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0bGV0IHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuXHRcdFx0XHRyYW5nZS5pZCA9IFwicmFuZ2VcIlxuXHRcdFx0XHRyYW5nZS5jbGFzc0xpc3QuYWRkKFwicGFpclwiKVxuXHRcdFx0XHR0aGlzLmVsZW1lbnQuYXBwZW5kKHJhbmdlKVxuXG5cdFx0XHRcdGxldCBrZXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG5cdFx0XHRcdGtleS50ZXh0Q29udGVudCA9IFwiRGFtYWdlIFJhbmdlXCJcblx0XHRcdFx0cmFuZ2UuYXBwZW5kKGtleSlcblxuXHRcdFx0XHRsZXQgdmFsdWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG5cdFx0XHRcdHZhbHVlLmNsYXNzTGlzdC5hZGQoXCJyYWRpb0J1YmJsZXNcIilcblx0XHRcdFx0cmFuZ2UuYXBwZW5kKHZhbHVlKVxuXG5cdFx0XHRcdGd1bi5wcm9maWxlLmZvckVhY2goKF8sIGkpID0+IHtcblx0XHRcdFx0XHRsZXQgcmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpXG5cdFx0XHRcdFx0cmFuZ2UuaWQgPSBpLnRvU3RyaW5nKClcblx0XHRcdFx0XHRyYW5nZS50ZXh0Q29udGVudCA9ICgxICsgaSkudG9TdHJpbmcoKVxuXHRcdFx0XHRcdHJhbmdlLm9uY2xpY2sgPSAoKSA9PiB0aGlzLnByb2ZpbGVJbmRleCA9IGlcblx0XHRcdFx0XHR2YWx1ZS5hcHBlbmQocmFuZ2UpXG5cdFx0XHRcdH0pXG5cdFx0XHR9XG5cblx0XHRcdGxldCBwcm9maWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuXHRcdFx0cHJvZmlsZS5pZCA9IFwicHJvZmlsZVwiXG5cdFx0XHR0aGlzLmVsZW1lbnQuYXBwZW5kKHByb2ZpbGUpXG5cblx0XHRcdGxldCBwcm9maWxlTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG5cdFx0XHRwcm9maWxlTGFiZWwudGV4dENvbnRlbnQgPSBcIkRhbWFnZSBQcm9maWxlXCJcblx0XHRcdHByb2ZpbGUuYXBwZW5kKHByb2ZpbGVMYWJlbClcblxuXHRcdFx0bGV0IHJlZ2lvbnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIilcblx0XHRcdHByb2ZpbGUuYXBwZW5kKHJlZ2lvbnMpXG5cblx0XHRcdHtcblx0XHRcdFx0bGV0IGRpc3RyaWJ1dGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcblx0XHRcdFx0ZGlzdHJpYnV0aW9uLmlkID0gXCJkaXN0cmlidXRpb25cIlxuXHRcdFx0XHR0aGlzLmVsZW1lbnQuYXBwZW5kKGRpc3RyaWJ1dGlvbilcblxuXHRcdFx0XHRsZXQgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKVxuXHRcdFx0XHRkaXN0cmlidXRpb24uYXBwZW5kKGNhbnZhcylcblxuXHRcdFx0XHR0aGlzLmRhbWFnZURpc3RyaWJ1dGlvbkNoYXJ0ID0gbmV3IENoYXJ0KGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIiksIHtcblx0XHRcdFx0XHR0eXBlOiBcImRvdWdobnV0XCIsXG5cdFx0XHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRcdFx0Ym9yZGVyV2lkdGg6IDAsXG5cdFx0XHRcdFx0XHRvZmZzZXQ6IDEwLFxuXHRcdFx0XHRcdFx0YW5pbWF0aW9uOiB7XG5cdFx0XHRcdFx0XHRcdGR1cmF0aW9uOiAwXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0cGx1Z2luczoge1xuXHRcdFx0XHRcdFx0XHRsZWdlbmQ6IHtcblx0XHRcdFx0XHRcdFx0XHRkaXNwbGF5OiBmYWxzZVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KVxuXHRcdFx0fVxuXG5cdFx0XHRpZihndW4ucHJvZmlsZS5sZW5ndGggPT0gMClcblx0XHRcdFx0cmV0dXJuXG5cblx0XHRcdHRoaXMucHJvZmlsZUluZGV4ID0gQ29va2llcy5nZXQoXCJzZWxlY3Rpb25cIiwgT2JqZWN0KT8uW3RoaXMuZ3VuLm5hbWVdPy5wcm9maWxlSW5kZXggPz8gMFxuXHRcdH1cblxuXHRcdHB1YmxpYyBnZXQgcHJvZmlsZUluZGV4KCk6IG51bWJlciB7XG5cdFx0XHRyZXR1cm4gdGhpcy4jcHJvZmlsZUluZGV4XG5cdFx0fVxuXG5cdFx0cHVibGljIHNldCBwcm9maWxlSW5kZXgoaW5kZXg6IG51bWJlcikge1xuXHRcdFx0dGhpcy4jcHJvZmlsZUluZGV4ID0gaW5kZXhcblxuXHRcdFx0bGV0IHNlbGVjdGlvbiA9IENvb2tpZXMuZ2V0KFwic2VsZWN0aW9uXCIsIE9iamVjdClcblx0XHRcdHNlbGVjdGlvbiA/Pz0ge31cblx0XHRcdHNlbGVjdGlvblt0aGlzLmd1bi5uYW1lXSA/Pz0ge31cblx0XHRcdHNlbGVjdGlvblt0aGlzLmd1bi5uYW1lXS5wcm9maWxlSW5kZXggPSBpbmRleFxuXHRcdFx0Q29va2llcy5zZXQoXCJzZWxlY3Rpb25cIiwgc2VsZWN0aW9uKVxuXG5cdFx0XHRsZXQgc2NlbmFyaW8gPSB0aGlzLmxpc3RbXCJzY2VuYXJpb1wiXVxuXG5cdFx0XHQvL0RhbWFnZSByYW5nZSBzZWxlY3Rpb25cblx0XHRcdGxldCByYWRpb0J1YmJsZXMgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcIiNyYW5nZSA+IGRpdjpudGgtY2hpbGQoMilcIilcblx0XHRcdHJhZGlvQnViYmxlcy5xdWVyeVNlbGVjdG9yQWxsKFwiYnV0dG9uXCIpLmZvckVhY2goZSA9PiBlLmNsYXNzTGlzdC5yZW1vdmUoXCJzZWxlY3RlZFwiKSlcblx0XHRcdHJhZGlvQnViYmxlcy5xdWVyeVNlbGVjdG9yKGBidXR0b246bnRoLWNoaWxkKCR7MSArIGluZGV4fSlgKS5jbGFzc0xpc3QuYWRkKFwic2VsZWN0ZWRcIilcblxuXHRcdFx0Ly9EYW1hZ2UgcHJvZmlsZSBkaXNwbGF5XG5cdFx0XHRsZXQgcmVnaW9ucyA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2ZpbGUgPiB1bFwiKVxuXG5cdFx0XHR3aGlsZShyZWdpb25zLmZpcnN0RWxlbWVudENoaWxkKVxuXHRcdFx0XHRyZWdpb25zLmZpcnN0RWxlbWVudENoaWxkLnJlbW92ZSgpXG5cblx0XHRcdGxldCByZXN1bHQgPSBEYW1hZ2VDYWxjdWxhdG9yLnNpbXVsYXRlKHtwcm9maWxlOiB0aGlzLmd1bi5wcm9maWxlW2luZGV4XSwgc2NlbmFyaW86IHNjZW5hcmlvfSlcblx0XHRcdGxldCBkYW1hZ2VSZWdpb25zID0gT2JqZWN0LmtleXModGhpcy5ndW4ucHJvZmlsZVtpbmRleF0uZGFtYWdlKVxuXHRcdFx0bGV0IHdoZWVsID0gQ29sb3JpemVyLndoZWVsKGRhbWFnZVJlZ2lvbnMubGVuZ3RoKVxuXG5cdFx0XHRmb3IobGV0IHJlZ2lvbk5hbWUgb2YgZGFtYWdlUmVnaW9ucykge1xuXHRcdFx0XHRsZXQgcmVnaW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpXG5cdFx0XHRcdHJlZ2lvbnMuYXBwZW5kKHJlZ2lvbilcblxuXHRcdFx0XHRsZXQgYnVsbGV0cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcblx0XHRcdFx0YnVsbGV0cy50ZXh0Q29udGVudCA9IGAke3Jlc3VsdC5yZWdpb25zW3JlZ2lvbk5hbWVdLmJ1bGxldHN9YFxuXHRcdFx0XHRyZWdpb24uYXBwZW5kKGJ1bGxldHMpXG5cblx0XHRcdFx0bGV0IGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuXHRcdFx0XHRsYWJlbC50ZXh0Q29udGVudCA9IGAke3JlZ2lvbk5hbWVbMF0udG9VcHBlckNhc2UoKX0ke3JlZ2lvbk5hbWUuc2xpY2UoMSl9YFxuXHRcdFx0XHRsYWJlbC5zdHlsZS5jb2xvciA9IHdoZWVsLm5leHQoKS52YWx1ZVxuXHRcdFx0XHRyZWdpb24uYXBwZW5kKGxhYmVsKVxuXG5cdFx0XHRcdGxldCBkYW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG5cdFx0XHRcdGRhbWFnZS50ZXh0Q29udGVudCA9IGAkey1yZXN1bHQucmVnaW9uc1tyZWdpb25OYW1lXS5idWxsZXRzICogdGhpcy5ndW4ucHJvZmlsZVtpbmRleF0uZGFtYWdlW3JlZ2lvbk5hbWVdfWBcblx0XHRcdFx0cmVnaW9uLmFwcGVuZChkYW1hZ2UpXG5cdFx0XHR9XG5cblx0XHRcdGxldCB0b3RhbERhbWFnZSA9IHNjZW5hcmlvXG5cdFx0XHRcdC5yZWdpb25zXG5cdFx0XHRcdC5tYXAocmVnaW9uID0+IHJlc3VsdC5yZWdpb25zW3JlZ2lvbl0uYnVsbGV0cyAqIHRoaXMuZ3VuLnByb2ZpbGVbaW5kZXhdLmRhbWFnZVtyZWdpb25dKVxuXHRcdFx0XHQucmVkdWNlKChhLCBiKSA9PiBhICsgYiwgMClcblxuXHRcdFx0bGV0IHByb2ZpbGVMYWJlbCA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2ZpbGUgPiBkaXZcIilcblx0XHRcdHByb2ZpbGVMYWJlbC50ZXh0Q29udGVudCA9IGBEYW1hZ2UgUHJvZmlsZSAoJHt0b3RhbERhbWFnZX0pYFxuXG5cdFx0XHQvL0RhbWFnZSBkaXN0cmlidXRpb24gY2hhcnRcblx0XHRcdHRoaXMuZGFtYWdlRGlzdHJpYnV0aW9uQ2hhcnQuZGF0YSA9IHtcblx0XHRcdFx0bGFiZWxzOiBzY2VuYXJpb1xuXHRcdFx0XHRcdC5yZWdpb25zXG5cdFx0XHRcdFx0Lm1hcChyZWdpb24gPT4gYCR7cmVnaW9uWzBdLnRvVXBwZXJDYXNlKCl9JHtyZWdpb24uc2xpY2UoMSl9YCksXG5cdFx0XHRcdGRhdGFzZXRzOiBbe1xuXHRcdFx0XHRcdGRhdGE6IHNjZW5hcmlvXG5cdFx0XHRcdFx0XHQucmVnaW9uc1xuXHRcdFx0XHRcdFx0Lm1hcChyZWdpb24gPT4gcmVzdWx0LnJlZ2lvbnNbcmVnaW9uXS5idWxsZXRzICogdGhpcy5ndW4ucHJvZmlsZVtpbmRleF0uZGFtYWdlW3JlZ2lvbl0pLFxuXHRcdFx0XHRcdGJhY2tncm91bmRDb2xvcjogWy4uLkNvbG9yaXplci53aGVlbChzY2VuYXJpby5yZWdpb25zLmxlbmd0aCldXG5cdFx0XHRcdH1dXG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuZGFtYWdlRGlzdHJpYnV0aW9uQ2hhcnQudXBkYXRlKClcblx0XHR9XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2FyZExpc3QiXX0=