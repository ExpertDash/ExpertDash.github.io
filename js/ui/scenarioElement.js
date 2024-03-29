import * as cobrasu from "/lib/cobrasu/core.js";
import "../core/simulation.js";
import SlideableNumericText from "../utils/slideableNumericText.js";
const { Cookies } = cobrasu.DOM;
export default class ScenarioElement {
    element;
    value;
    health;
    distance;
    constructor(element, { defaultScenario }) {
        let scenario = Cookies.get("scenario", Object, defaultScenario);
        this.element = element;
        this.value = scenario;
        this.health = element.querySelector("#health > input");
        this.health.valueAsNumber = scenario.health;
        this.health.oninput = () => {
            scenario.health = this.health.valueAsNumber;
            Cookies.set("scenario", scenario);
            element.dispatchEvent(new CustomEvent("scenarioChange", {
                bubbles: true,
                detail: scenario
            }));
        };
        this.distance = element.querySelector("#distance > input");
        this.distance.valueAsNumber = scenario.distance;
        this.distance.oninput = () => {
            scenario.distance = this.distance.valueAsNumber;
            Cookies.set("scenario", scenario);
            element.dispatchEvent(new CustomEvent("scenarioChange", {
                bubbles: true,
                detail: scenario
            }));
        };
        this.updateDistributionLabel();
        [...element.querySelectorAll("#distribution > div")].forEach(e => {
            let indicator;
            indicator = new SlideableNumericText({
                text: e.querySelector("#text"),
                slider: e.querySelector("#slider")
            }, (oldValue, newValue) => {
                let remaining = 1 - Object.values(scenario.distribution)
                    .reduce((a, b) => a + b, 0);
                remaining = Math.max(0, remaining);
                let delta = Math.min(newValue - oldValue, remaining);
                let value = oldValue + delta;
                scenario.distribution[e.id] = value;
                Cookies.set("scenario", scenario);
                this.updateDistributionLabel();
                element.dispatchEvent(new CustomEvent("scenarioChange", {
                    bubbles: true,
                    detail: scenario
                }));
                return value;
            });
            indicator.value = scenario.distribution[e.id];
        });
    }
    updateDistributionLabel() {
        let remaining = 1 - Object.values(this.value.distribution).reduce((a, b) => a + b, 0);
        this.element.querySelector("#distributionLabel").style.color = remaining > 0 ? "red" : null;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NlbmFyaW9FbGVtZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3VpL3NjZW5hcmlvRWxlbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssT0FBTyxNQUFNLHNCQUFzQixDQUFBO0FBQy9DLE9BQXVCLHVCQUF1QixDQUFBO0FBQzlDLE9BQU8sb0JBQW9CLE1BQU0sa0NBQWtDLENBQUE7QUFFbkUsTUFBTSxFQUFDLE9BQU8sRUFBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUE7QUFFN0IsTUFBTSxDQUFDLE9BQU8sT0FBTyxlQUFlO0lBQ25CLE9BQU8sQ0FBYTtJQUM3QixLQUFLLENBQXFCO0lBQ3pCLE1BQU0sQ0FBa0I7SUFDeEIsUUFBUSxDQUFrQjtJQUVsQyxZQUFtQixPQUFvQixFQUFFLEVBQUMsZUFBZSxFQUF5QztRQUNqRyxJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFzQixVQUFVLEVBQUUsTUFBTSxFQUFFLGVBQWUsQ0FBQyxDQUFBO1FBRXBGLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFBO1FBQ3RCLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFBO1FBRXJCLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO1FBQ3RELElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUE7UUFDM0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsR0FBRyxFQUFFO1lBQzFCLFFBQVEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUE7WUFDM0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUE7WUFFakMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxnQkFBZ0IsRUFBRTtnQkFDdkQsT0FBTyxFQUFF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QUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFBO0lBQzVHLENBQUM7Q0FDRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNvYnJhc3UgZnJvbSBcIi9saWIvY29icmFzdS9jb3JlLmpzXCJcbmltcG9ydCBTaW11bGF0aW9uIGZyb20gXCIuLi9jb3JlL3NpbXVsYXRpb24uanNcIlxuaW1wb3J0IFNsaWRlYWJsZU51bWVyaWNUZXh0IGZyb20gXCIuLi91dGlscy9zbGlkZWFibGVOdW1lcmljVGV4dC5qc1wiXG5cbmNvbnN0IHtDb29raWVzfSA9IGNvYnJhc3UuRE9NXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjZW5hcmlvRWxlbWVudCB7XG5cdHB1YmxpYyByZWFkb25seSBlbGVtZW50OiBIVE1MRWxlbWVudFxuXHRwdWJsaWMgdmFsdWU6IFNpbXVsYXRpb24uU2NlbmFyaW9cblx0cHJpdmF0ZSBoZWFsdGg6IEhUTUxJbnB1dEVsZW1lbnRcblx0cHJpdmF0ZSBkaXN0YW5jZTogSFRNTElucHV0RWxlbWVudFxuXG5cdHB1YmxpYyBjb25zdHJ1Y3RvcihlbGVtZW50OiBIVE1MRWxlbWVudCwge2RlZmF1bHRTY2VuYXJpb306IHtkZWZhdWx0U2NlbmFyaW86IFNpbXVsYXRpb24uU2NlbmFyaW99KSB7XG5cdFx0bGV0IHNjZW5hcmlvID0gQ29va2llcy5nZXQ8U2ltdWxhdGlvbi5TY2VuYXJpbz4oXCJzY2VuYXJpb1wiLCBPYmplY3QsIGRlZmF1bHRTY2VuYXJpbylcblxuXHRcdHRoaXMuZWxlbWVudCA9IGVsZW1lbnRcblx0XHR0aGlzLnZhbHVlID0gc2NlbmFyaW9cblxuXHRcdHRoaXMuaGVhbHRoID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiI2hlYWx0aCA+IGlucHV0XCIpXG5cdFx0dGhpcy5oZWFsdGgudmFsdWVBc051bWJlciA9IHNjZW5hcmlvLmhlYWx0aFxuXHRcdHRoaXMuaGVhbHRoLm9uaW5wdXQgPSAoKSA9PiB7XG5cdFx0XHRzY2VuYXJpby5oZWFsdGggPSB0aGlzLmhlYWx0aC52YWx1ZUFzTnVtYmVyXG5cdFx0XHRDb29raWVzLnNldChcInNjZW5hcmlvXCIsIHNjZW5hcmlvKVxuXG5cdFx0XHRlbGVtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KFwic2NlbmFyaW9DaGFuZ2VcIiwge1xuXHRcdFx0XHRidWJibGVzOiB0cnVlLFxuXHRcdFx0XHRkZXRhaWw6IHNjZW5hcmlvXG5cdFx0XHR9KSlcblx0XHR9XG5cblx0XHR0aGlzLmRpc3RhbmNlID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiI2Rpc3RhbmNlID4gaW5wdXRcIilcblx0XHR0aGlzLmRpc3RhbmNlLnZhbHVlQXNOdW1iZXIgPSBzY2VuYXJpby5kaXN0YW5jZVxuXHRcdHRoaXMuZGlzdGFuY2Uub25pbnB1dCA9ICgpID0+IHtcblx0XHRcdHNjZW5hcmlvLmRpc3RhbmNlID0gdGhpcy5kaXN0YW5jZS52YWx1ZUFzTnVtYmVyXG5cdFx0XHRDb29raWVzLnNldChcInNjZW5hcmlvXCIsIHNjZW5hcmlvKVxuXG5cdFx0XHRlbGVtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KFwic2NlbmFyaW9DaGFuZ2VcIiwge1xuXHRcdFx0XHRidWJibGVzOiB0cnVlLFxuXHRcdFx0XHRkZXRhaWw6IHNjZW5hcmlvXG5cdFx0XHR9KSlcblx0XHR9XG5cblx0XHR0aGlzLnVwZGF0ZURpc3RyaWJ1dGlvbkxhYmVsKClcblx0XHQ7Wy4uLmVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChcIiNkaXN0cmlidXRpb24gPiBkaXZcIildLmZvckVhY2goZSA9PiB7XG5cdFx0XHRsZXQgaW5kaWNhdG9yOiBTbGlkZWFibGVOdW1lcmljVGV4dFxuXG5cdFx0XHRpbmRpY2F0b3IgPSBuZXcgU2xpZGVhYmxlTnVtZXJpY1RleHQoXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0ZXh0OiBlLnF1ZXJ5U2VsZWN0b3IoXCIjdGV4dFwiKSxcblx0XHRcdFx0XHRzbGlkZXI6IGUucXVlcnlTZWxlY3RvcihcIiNzbGlkZXJcIilcblx0XHRcdFx0fSxcblx0XHRcdFx0KG9sZFZhbHVlLCBuZXdWYWx1ZSkgPT4ge1xuXHRcdFx0XHRcdGxldCByZW1haW5pbmcgPSAxIC0gT2JqZWN0LnZhbHVlcyhzY2VuYXJpby5kaXN0cmlidXRpb24pXG5cdFx0XHRcdFx0XHQucmVkdWNlKChhLCBiKSA9PiBhICsgYiwgMClcblxuXHRcdFx0XHRcdHJlbWFpbmluZyA9IE1hdGgubWF4KDAsIHJlbWFpbmluZylcblxuXHRcdFx0XHRcdGxldCBkZWx0YSA9IE1hdGgubWluKG5ld1ZhbHVlIC0gb2xkVmFsdWUsIHJlbWFpbmluZylcblx0XHRcdFx0XHRsZXQgdmFsdWUgPSBvbGRWYWx1ZSArIGRlbHRhXG5cblx0XHRcdFx0XHRzY2VuYXJpby5kaXN0cmlidXRpb25bZS5pZF0gPSB2YWx1ZVxuXHRcdFx0XHRcdENvb2tpZXMuc2V0KFwic2NlbmFyaW9cIiwgc2NlbmFyaW8pXG5cblx0XHRcdFx0XHR0aGlzLnVwZGF0ZURpc3RyaWJ1dGlvbkxhYmVsKClcblxuXHRcdFx0XHRcdGVsZW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoXCJzY2VuYXJpb0NoYW5nZVwiLCB7XG5cdFx0XHRcdFx0XHRidWJibGVzOiB0cnVlLFxuXHRcdFx0XHRcdFx0ZGV0YWlsOiBzY2VuYXJpb1xuXHRcdFx0XHRcdH0pKVxuXG5cdFx0XHRcdFx0cmV0dXJuIHZhbHVlXG5cdFx0XHRcdH1cblx0XHRcdClcblxuXHRcdFx0aW5kaWNhdG9yLnZhbHVlID0gc2NlbmFyaW8uZGlzdHJpYnV0aW9uW2UuaWRdXG5cdFx0fSlcblx0fVxuXHRcblx0cHJpdmF0ZSB1cGRhdGVEaXN0cmlidXRpb25MYWJlbCgpOiB2b2lkIHtcblx0XHRsZXQgcmVtYWluaW5nID0gMSAtIE9iamVjdC52YWx1ZXModGhpcy52YWx1ZS5kaXN0cmlidXRpb24pLnJlZHVjZSgoYSwgYikgPT4gYSArIGIsIDApXG5cdFx0dGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTERpdkVsZW1lbnQ+KFwiI2Rpc3RyaWJ1dGlvbkxhYmVsXCIpLnN0eWxlLmNvbG9yID0gcmVtYWluaW5nID4gMCA/IFwicmVkXCIgOiBudWxsXG5cdH1cbn0iXX0=