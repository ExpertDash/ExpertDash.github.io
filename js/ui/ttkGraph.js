import { Colorizer } from "/lib/cobrasu/core.js";
import DamageCalculator from "../core/damageCalculator.js";
import "../core/gun.js";
import "../core/simulation.js";
import Chart from "../utils/chart.js";
export default class TTKGraph {
    element;
    #chart;
    #scenario;
    constructor(element) {
        this.element = element;
    }
    get scenario() {
        return this.#scenario;
    }
    set scenario(value) {
        this.#scenario = value;
        this.#chart?.destroy();
        this.#chart = new Chart(this.element.getContext("2d"), {
            type: "line",
            data: {},
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        title: {
                            text: "Distance (m)",
                            display: true,
                        },
                        type: "linear",
                        min: 0,
                        max: this.#scenario.distance
                    },
                    y: {
                        title: {
                            text: "TTK (s)",
                            display: true,
                        },
                        type: "linear",
                        // min: 0,
                        suggestedMax: 1
                    }
                },
                animation: {
                    duration: 0
                }
            }
        });
    }
    visualize(guns) {
        if (!this.#scenario)
            return;
        let wheel = Colorizer.wheel(guns.length);
        let maxDistance = Math.max(this.#scenario.distance, ...guns
            .flatMap(g => g.profile.map(p => p.distance))
            .filter(d => !isNaN(d) && isFinite(d)));
        this.#chart.data.datasets = guns.map(gun => {
            let color = wheel.next().value;
            let distances = gun
                .profile
                .map(p => p.distance);
            return {
                label: `${gun.name}`,
                data: gun
                    .profile
                    .filter(profile => isFinite(profile.distance))
                    .flatMap(profile => {
                    let result = DamageCalculator.simulate({
                        profile: profile,
                        scenario: this.#scenario
                    });
                    let bullets = Object.values(result.regions)
                        .map(region => region.bullets)
                        .reduce((a, b) => a + b, 0);
                    let ttk = bullets / (gun.fireRate / 60);
                    let index = distances.indexOf(profile.distance);
                    let rangeStart = profile.distance;
                    let rangeEnd = distances?.[index + 1] ?? maxDistance;
                    if (!isFinite(rangeEnd))
                        rangeEnd = maxDistance;
                    return [
                        {
                            x: rangeStart,
                            y: ttk
                        },
                        {
                            x: rangeEnd,
                            y: ttk
                        }
                    ];
                }),
                backgroundColor: Array(this.#scenario.regions.length).fill(`${color}33`),
                borderColor: Array(this.#scenario.regions.length).fill(`${color}ff`),
                borderWidth: 1
            };
        });
        this.#chart.update();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHRrR3JhcGguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdWkvdHRrR3JhcGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLHNCQUFzQixDQUFBO0FBQzlDLE9BQU8sZ0JBQWdCLE1BQU0sNkJBQTZCLENBQUE7QUFDMUQsT0FBZ0IsZ0JBQWdCLENBQUE7QUFDaEMsT0FBdUIsdUJBQXVCLENBQUE7QUFDOUMsT0FBTyxLQUFLLE1BQU0sbUJBQW1CLENBQUE7QUFFckMsTUFBTSxDQUFDLE9BQU8sT0FBTyxRQUFRO0lBQ1osT0FBTyxDQUFtQjtJQUMxQyxNQUFNLENBQU87SUFDYixTQUFTLENBQXFCO0lBRTlCLFlBQW1CLE9BQTBCO1FBQzVDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFBO0lBQ3ZCLENBQUM7SUFFRCxJQUFXLFFBQVE7UUFDbEIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFBO0lBQ3RCLENBQUM7SUFFRCxJQUFXLFFBQVEsQ0FBQyxLQUEwQjtRQUM3QyxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQTtRQUV0QixJQUFJLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxDQUFBO1FBRXRCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDdEQsSUFBSSxFQUFFLE1BQU07WUFDWixJQUFJLEVBQUUsRUFBRTtZQUNSLE9BQU8sRUFBRTtnQkFDUixVQUFVLEVBQUUsSUFBSTtnQkFDaEIsbUJBQW1CLEVBQUUsS0FBSztnQkFDMUIsTUFBTSxFQUFFO29CQUNQLENBQUMsRUFBRTt3QkFDRixLQUFLLEVBQUU7NEJBQ04sSUFBSSxFQUFFLGNBQWM7NEJBQ3BCLE9BQU8sRUFBRSxJQUFJO3lCQUNiO3dCQUNELElBQUksRUFBRSxRQUFRO3dCQUNkLEdBQUcsRUFBRSxDQUFD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QUFFLEdBQUc7eUJBQ047d0JBQ0Q7NEJBQ0MsQ0FBQyxFQUFFLFFBQVE7NEJBQ1gsQ0FBQyxFQUFFLEdBQUc7eUJBQ047cUJBQ0QsQ0FBQTtnQkFDRixDQUFDLENBQUM7Z0JBQ0gsZUFBZSxFQUFFLEtBQUssQ0FBUyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLElBQUksQ0FBQztnQkFDaEYsV0FBVyxFQUFFLEtBQUssQ0FBUyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLElBQUksQ0FBQztnQkFDNUUsV0FBVyxFQUFFLENBQUM7YUFDZCxDQUFBO1FBQ0YsQ0FBQyxDQUFDLENBQUE7UUFFRixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFBO0lBQ3JCLENBQUM7Q0FDRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29sb3JpemVyfSBmcm9tIFwiL2xpYi9jb2JyYXN1L2NvcmUuanNcIlxuaW1wb3J0IERhbWFnZUNhbGN1bGF0b3IgZnJvbSBcIi4uL2NvcmUvZGFtYWdlQ2FsY3VsYXRvci5qc1wiXG5pbXBvcnQgR3VuIGZyb20gXCIuLi9jb3JlL2d1bi5qc1wiXG5pbXBvcnQgU2ltdWxhdGlvbiBmcm9tIFwiLi4vY29yZS9zaW11bGF0aW9uLmpzXCJcbmltcG9ydCBDaGFydCBmcm9tIFwiLi4vdXRpbHMvY2hhcnQuanNcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUVEtHcmFwaCB7XG5cdHB1YmxpYyByZWFkb25seSBlbGVtZW50OiBIVE1MQ2FudmFzRWxlbWVudFxuXHQjY2hhcnQ6IENoYXJ0XG5cdCNzY2VuYXJpbzogU2ltdWxhdGlvbi5TY2VuYXJpb1xuXG5cdHB1YmxpYyBjb25zdHJ1Y3RvcihlbGVtZW50OiBIVE1MQ2FudmFzRWxlbWVudCkge1xuXHRcdHRoaXMuZWxlbWVudCA9IGVsZW1lbnRcblx0fVxuXG5cdHB1YmxpYyBnZXQgc2NlbmFyaW8oKTogU2ltdWxhdGlvbi5TY2VuYXJpbyB7XG5cdFx0cmV0dXJuIHRoaXMuI3NjZW5hcmlvXG5cdH1cblxuXHRwdWJsaWMgc2V0IHNjZW5hcmlvKHZhbHVlOiBTaW11bGF0aW9uLlNjZW5hcmlvKSB7XG5cdFx0dGhpcy4jc2NlbmFyaW8gPSB2YWx1ZVxuXG5cdFx0dGhpcy4jY2hhcnQ/LmRlc3Ryb3koKVxuXG5cdFx0dGhpcy4jY2hhcnQgPSBuZXcgQ2hhcnQodGhpcy5lbGVtZW50LmdldENvbnRleHQoXCIyZFwiKSwge1xuXHRcdFx0dHlwZTogXCJsaW5lXCIsXG5cdFx0XHRkYXRhOiB7fSxcblx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0cmVzcG9uc2l2ZTogdHJ1ZSxcblx0XHRcdFx0bWFpbnRhaW5Bc3BlY3RSYXRpbzogZmFsc2UsXG5cdFx0XHRcdHNjYWxlczoge1xuXHRcdFx0XHRcdHg6IHtcblx0XHRcdFx0XHRcdHRpdGxlOiB7XG5cdFx0XHRcdFx0XHRcdHRleHQ6IFwiRGlzdGFuY2UgKG0pXCIsXG5cdFx0XHRcdFx0XHRcdGRpc3BsYXk6IHRydWUsXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0dHlwZTogXCJsaW5lYXJcIixcblx0XHRcdFx0XHRcdG1pbjogMCxcblx0XHRcdFx0XHRcdG1heDogdGhpcy4jc2NlbmFyaW8uZGlzdGFuY2Vcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHk6IHtcblx0XHRcdFx0XHRcdHRpdGxlOiB7XG5cdFx0XHRcdFx0XHRcdHRleHQ6IFwiVFRLIChzKVwiLFxuXHRcdFx0XHRcdFx0XHRkaXNwbGF5OiB0cnVlLFxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdHR5cGU6IFwibGluZWFyXCIsXG5cdFx0XHRcdFx0XHQvLyBtaW46IDAsXG5cdFx0XHRcdFx0XHRzdWdnZXN0ZWRNYXg6IDFcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGFuaW1hdGlvbjoge1xuXHRcdFx0XHRcdGR1cmF0aW9uOiAwXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KVxuXHR9XG5cblx0cHVibGljIHZpc3VhbGl6ZShndW5zOiBHdW5bXSk6IHZvaWQge1xuXHRcdGlmKCF0aGlzLiNzY2VuYXJpbylcblx0XHRcdHJldHVyblxuXG5cdFx0bGV0IHdoZWVsID0gQ29sb3JpemVyLndoZWVsKGd1bnMubGVuZ3RoKVxuXG5cdFx0bGV0IG1heERpc3RhbmNlID0gTWF0aC5tYXgoXG5cdFx0XHR0aGlzLiNzY2VuYXJpby5kaXN0YW5jZSxcblx0XHRcdC4uLmd1bnNcblx0XHRcdFx0LmZsYXRNYXAoZyA9PiBnLnByb2ZpbGUubWFwKHAgPT4gcC5kaXN0YW5jZSkpXG5cdFx0XHRcdC5maWx0ZXIoZCA9PiAhaXNOYU4oZCkgJiYgaXNGaW5pdGUoZCkpXG5cdFx0KVxuXG5cdFx0dGhpcy4jY2hhcnQuZGF0YS5kYXRhc2V0cyA9IGd1bnMubWFwKGd1biA9PiB7XG5cdFx0XHRsZXQgY29sb3IgPSB3aGVlbC5uZXh0KCkudmFsdWVcblxuXHRcdFx0bGV0IGRpc3RhbmNlcyA9IGd1blxuXHRcdFx0XHQucHJvZmlsZVxuXHRcdFx0XHQubWFwKHAgPT4gcC5kaXN0YW5jZSlcblxuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0bGFiZWw6IGAke2d1bi5uYW1lfWAsXG5cdFx0XHRcdGRhdGE6IGd1blxuXHRcdFx0XHRcdC5wcm9maWxlXG5cdFx0XHRcdFx0LmZpbHRlcihwcm9maWxlID0+IGlzRmluaXRlKHByb2ZpbGUuZGlzdGFuY2UpKVxuXHRcdFx0XHRcdC5mbGF0TWFwKHByb2ZpbGUgPT4ge1xuXHRcdFx0XHRcdFx0bGV0IHJlc3VsdCA9IERhbWFnZUNhbGN1bGF0b3Iuc2ltdWxhdGUoe1xuXHRcdFx0XHRcdFx0XHRwcm9maWxlOiBwcm9maWxlLFxuXHRcdFx0XHRcdFx0XHRzY2VuYXJpbzogdGhpcy4jc2NlbmFyaW9cblx0XHRcdFx0XHRcdH0pXG5cblx0XHRcdFx0XHRcdGxldCBidWxsZXRzID0gT2JqZWN0LnZhbHVlcyhyZXN1bHQucmVnaW9ucylcblx0XHRcdFx0XHRcdFx0Lm1hcChyZWdpb24gPT4gcmVnaW9uLmJ1bGxldHMpXG5cdFx0XHRcdFx0XHRcdC5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiLCAwKVxuXG5cdFx0XHRcdFx0XHRsZXQgdHRrID0gYnVsbGV0cyAvIChndW4uZmlyZVJhdGUgLyA2MClcblxuXHRcdFx0XHRcdFx0bGV0IGluZGV4ID0gZGlzdGFuY2VzLmluZGV4T2YocHJvZmlsZS5kaXN0YW5jZSlcblx0XHRcdFx0XHRcdGxldCByYW5nZVN0YXJ0ID0gcHJvZmlsZS5kaXN0YW5jZVxuXHRcdFx0XHRcdFx0bGV0IHJhbmdlRW5kID0gZGlzdGFuY2VzPy5baW5kZXggKyAxXSA/PyBtYXhEaXN0YW5jZVxuXG5cdFx0XHRcdFx0XHRpZighaXNGaW5pdGUocmFuZ2VFbmQpKVxuXHRcdFx0XHRcdFx0XHRyYW5nZUVuZCA9IG1heERpc3RhbmNlXG5cblx0XHRcdFx0XHRcdHJldHVybiBbXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHR4OiByYW5nZVN0YXJ0LFxuXHRcdFx0XHRcdFx0XHRcdHk6IHR0a1xuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0eDogcmFuZ2VFbmQsXG5cdFx0XHRcdFx0XHRcdFx0eTogdHRrXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdF1cblx0XHRcdFx0XHR9KSxcblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBBcnJheTxzdHJpbmc+KHRoaXMuI3NjZW5hcmlvLnJlZ2lvbnMubGVuZ3RoKS5maWxsKGAke2NvbG9yfTMzYCksXG5cdFx0XHRcdGJvcmRlckNvbG9yOiBBcnJheTxzdHJpbmc+KHRoaXMuI3NjZW5hcmlvLnJlZ2lvbnMubGVuZ3RoKS5maWxsKGAke2NvbG9yfWZmYCksXG5cdFx0XHRcdGJvcmRlcldpZHRoOiAxXG5cdFx0XHR9XG5cdFx0fSlcblxuXHRcdHRoaXMuI2NoYXJ0LnVwZGF0ZSgpXG5cdH1cbn0iXX0=