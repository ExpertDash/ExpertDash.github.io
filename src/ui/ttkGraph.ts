import {Colorizer} from "/lib/cobrasu/core.js"
import DamageCalculator from "../core/damageCalculator.js"
import Gun from "../core/gun.js"
import Simulation from "../core/simulation.js"
import Chart from "../utils/chart.js"

export default class TTKGraph {
	public readonly element: HTMLCanvasElement
	#chart: Chart
	#scenario: Simulation.Scenario

	public constructor(element: HTMLCanvasElement) {
		this.element = element
	}

	public get scenario(): Simulation.Scenario {
		return this.#scenario
	}

	public set scenario(value: Simulation.Scenario) {
		this.#scenario = value

		this.#chart?.destroy()

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
		})
	}

	public visualize(guns: Gun[]): void {
		if(!this.#scenario)
			return

		let wheel = Colorizer.wheel(guns.length)

		let maxDistance = Math.max(
			this.#scenario.distance,
			...guns
				.flatMap(g => g.profile.map(p => p.distance))
				.filter(d => !isNaN(d) && isFinite(d))
		)

		this.#chart.data.datasets = guns.map(gun => {
			let color = wheel.next().value

			let distances = gun
				.profile
				.map(p => p.distance)

			return {
				label: `${gun.name}`,
				data: gun
					.profile
					.filter(profile => isFinite(profile.distance))
					.flatMap(profile => {
						let result = DamageCalculator.simulate({
							profile: profile,
							scenario: this.#scenario
						})

						let bullets = Object.values(result.regions)
							.map(region => region.bullets)
							.reduce((a, b) => a + b, 0)

						let ttk = bullets / (gun.fireRate / 60)

						let index = distances.indexOf(profile.distance)
						let rangeStart = profile.distance
						let rangeEnd = distances?.[index + 1] ?? maxDistance

						if(!isFinite(rangeEnd))
							rangeEnd = maxDistance

						return [
							{
								x: rangeStart,
								y: ttk
							},
							{
								x: rangeEnd,
								y: ttk
							}
						]
					}),
				backgroundColor: Array<string>(this.#scenario.regions.length).fill(`${color}33`),
				borderColor: Array<string>(this.#scenario.regions.length).fill(`${color}ff`),
				borderWidth: 1
			}
		})

		this.#chart.update()
	}
}