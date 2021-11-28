import * as cobrasu from "/lib/cobrasu/core.js"
import DamageCalculator from "../core/damageCalculator.js"
import Gun from "../core/gun.js"
import Simulation from "../core/simulation.js"
import Chart from "../utils/chart.js"
import TTKGraph from "./ttkGraph.js"

const {Colorizer} = cobrasu
const {Cookies} = cobrasu.DOM

export class CardList {
	public readonly element: HTMLElement
	private graph: TTKGraph
	private scenario: Simulation.Scenario
	private items: Map<string, CardList.Item>

	public constructor(element: HTMLElement, {graph}: {graph: TTKGraph}) {
		this.element = element
		this.graph = graph
		this.items = new Map()

		this.element.addEventListener("wheel", this.#onScroll)
	}

	public add(gun: Gun): void {
		if(this.items.has(gun.name))
			throw new Error(`Attempted to display another card of '${gun.name}'`)

		let item = new CardList.Item(this, gun)
		this.element.append(item.element)

		this.items.set(gun.name, item)

		this.visualizeOnGraph()
	}

	public remove(name: string): void {
		if(!this.items.delete(name))
			throw new Error(`Attempted to stop displaying a non-extant card '${name}'`)

		this.element.querySelector(`[id='${name}']`).remove()

		this.visualizeOnGraph()
	}

	public update(scenario: Simulation.Scenario): void {
		this.scenario = scenario

		for(let item of this.items.values())
			item.profileIndex = item.profileIndex

		this.visualizeOnGraph()
	}

	private visualizeOnGraph(): void {
		this.graph.visualize([...this.items.values()].map(item => item.gun))
	}

	#onScroll = (event: WheelEvent) => {
		event.preventDefault()
		this.element.scrollLeft += event.deltaY
	}
}

export namespace CardList {
	export class Item {
		public readonly gun: Gun
		public readonly element: HTMLElement
		private list: CardList
		private damageDistributionChart: Chart
		#profileIndex: number

		public constructor(list: CardList, gun: Gun) {
			this.list = list
			this.gun = gun

			this.element = document.createElement("div")
			this.element.id = gun.name
			this.element.classList.add("card")

			let name = document.createElement("div")
			name.id = "name"
			name.textContent = gun.name
			this.element.append(name)

			this.element.append(document.createElement("hr"))

			if(gun.category) {
				let category = document.createElement("div")
				category.id = "category"
				category.classList.add("pair")
				this.element.append(category)

				let key = document.createElement("div")
				key.textContent = "Category"
				category.append(key)

				let value = document.createElement("div")
				value.textContent = gun.category
				category.append(value)
			}

			if(gun.fireRate) {
				let rof = document.createElement("div")
				rof.id = "rof"
				rof.classList.add("pair")
				this.element.append(rof)

				let key = document.createElement("div")
				key.textContent = "RoF"
				rof.append(key)

				let value = document.createElement("div")
				value.textContent = `${gun.fireRate} RPM`
				rof.append(value)
			}

			if(gun.boltDelay) {
				let obd = document.createElement("div")
				obd.id = "obd"
				obd.classList.add("pair")
				this.element.append(obd)

				let key = document.createElement("div")
				key.textContent = "OBD"
				obd.append(key)

				let value = document.createElement("div")
				value.textContent = `${gun.boltDelay}s`
				obd.append(value)
			}

			if(gun.profile.length > 0) {
				let range = document.createElement("div")
				range.id = "range"
				range.classList.add("pair")
				this.element.append(range)

				let key = document.createElement("div")
				key.textContent = "Damage Range"
				range.append(key)

				let value = document.createElement("div")
				value.classList.add("radioBubbles")
				range.append(value)

				gun.profile.forEach((_, i) => {
					let range = document.createElement("button")
					range.id = i.toString()
					range.textContent = (1 + i).toString()
					range.onclick = () => this.profileIndex = i
					value.append(range)
				})
			}

			let profile = document.createElement("div")
			profile.id = "profile"
			this.element.append(profile)

			let profileLabel = document.createElement("div")
			profileLabel.textContent = "Damage Profile"
			profile.append(profileLabel)

			let regions = document.createElement("ul")
			profile.append(regions)

			{
				let distribution = document.createElement("div")
				distribution.id = "distribution"
				this.element.append(distribution)

				let canvas = document.createElement("canvas")
				distribution.append(canvas)

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
				})
			}

			if(gun.profile.length == 0)
				return

			this.profileIndex = Cookies.get("selection", Object)?.[this.gun.name]?.profileIndex ?? 0
		}

		public get profileIndex(): number {
			return this.#profileIndex
		}

		public set profileIndex(index: number) {
			this.#profileIndex = index

			let selection = Cookies.get("selection", Object)
			selection ??= {}
			selection[this.gun.name] ??= {}
			selection[this.gun.name].profileIndex = index
			Cookies.set("selection", selection)

			let scenario = this.list["scenario"]

			//Damage range selection
			let radioBubbles = this.element.querySelector("#range > div:nth-child(2)")
			radioBubbles.querySelectorAll("button").forEach(e => e.classList.remove("selected"))
			radioBubbles.querySelector(`button:nth-child(${1 + index})`).classList.add("selected")

			//Damage profile display
			let regions = this.element.querySelector("#profile > ul")

			while(regions.firstElementChild)
				regions.firstElementChild.remove()

			let result = DamageCalculator.simulate({profile: this.gun.profile[index], scenario: scenario})
			let damageRegions = Object.keys(this.gun.profile[index].damage)
			let wheel = Colorizer.wheel(damageRegions.length)

			for(let regionName of damageRegions) {
				let region = document.createElement("li")
				regions.append(region)

				let bullets = document.createElement("div")
				bullets.textContent = `${result.regions[regionName].bullets}`
				region.append(bullets)

				let label = document.createElement("div")
				label.textContent = `${regionName[0].toUpperCase()}${regionName.slice(1)}`
				label.style.color = wheel.next().value
				region.append(label)

				let damage = document.createElement("div")
				damage.textContent = `${-result.regions[regionName].bullets * this.gun.profile[index].damage[regionName]}`
				region.append(damage)
			}

			let totalDamage = scenario
				.regions
				.map(region => result.regions[region].bullets * this.gun.profile[index].damage[region])
				.reduce((a, b) => a + b, 0)

			let profileLabel = this.element.querySelector("#profile > div")
			profileLabel.textContent = `Damage Profile (${totalDamage})`

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
			}

			this.damageDistributionChart.update()
		}
	}
}

export default CardList