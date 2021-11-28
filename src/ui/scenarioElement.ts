import * as cobrasu from "/lib/cobrasu/core.js"
import Simulation from "../core/simulation.js"
import SlideableNumericText from "../utils/slideableNumericText.js"

const {Cookies} = cobrasu.DOM

export default class ScenarioElement {
	public readonly element: HTMLElement
	public value: Simulation.Scenario
	private health: HTMLInputElement
	private distance: HTMLInputElement

	public constructor(element: HTMLElement, {defaultScenario}: {defaultScenario: Simulation.Scenario}) {
		let scenario = Cookies.get<Simulation.Scenario>("scenario", Object, defaultScenario)

		this.element = element
		this.value = scenario

		this.health = element.querySelector("#health > input")
		this.health.valueAsNumber = scenario.health
		this.health.oninput = () => {
			scenario.health = this.health.valueAsNumber
			Cookies.set("scenario", scenario)

			element.dispatchEvent(new CustomEvent("scenarioChange", {
				bubbles: true,
				detail: scenario
			}))
		}

		this.distance = element.querySelector("#distance > input")
		this.distance.valueAsNumber = scenario.distance
		this.distance.oninput = () => {
			scenario.distance = this.distance.valueAsNumber
			Cookies.set("scenario", scenario)

			element.dispatchEvent(new CustomEvent("scenarioChange", {
				bubbles: true,
				detail: scenario
			}))
		}

		this.updateDistributionLabel()
		;[...element.querySelectorAll("#distribution > div")].forEach(e => {
			let indicator: SlideableNumericText

			indicator = new SlideableNumericText(
				{
					text: e.querySelector("#text"),
					slider: e.querySelector("#slider")
				},
				(oldValue, newValue) => {
					let remaining = 1 - Object.values(scenario.distribution)
						.reduce((a, b) => a + b, 0)

					remaining = Math.max(0, remaining)

					let delta = Math.min(newValue - oldValue, remaining)
					let value = oldValue + delta

					scenario.distribution[e.id] = value
					Cookies.set("scenario", scenario)

					this.updateDistributionLabel()

					element.dispatchEvent(new CustomEvent("scenarioChange", {
						bubbles: true,
						detail: scenario
					}))

					return value
				}
			)

			indicator.value = scenario.distribution[e.id]
		})
	}
	
	private updateDistributionLabel(): void {
		let remaining = 1 - Object.values(this.value.distribution).reduce((a, b) => a + b, 0)
		this.element.querySelector<HTMLDivElement>("#distributionLabel").style.color = remaining > 0 ? "red" : null
	}
}