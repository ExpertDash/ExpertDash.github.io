import * as cobrasu from "/lib/cobrasu/core.js"
import DamageCalculator from "./core/damageCalculator.js"
import Gun from "./core/gun.js"
import Simulation from "./core/simulation.js"
import CardList from "./ui/cardList.js"
import GunList from "./ui/gunList.js"
import ScenarioElement from "./ui/scenarioElement.js"
import TTKGraph from "./ui/ttkGraph.js"

const {Cookies, Content} = cobrasu.DOM

let mainArgEntries = location
	.search
	.substring(1)
	.split("&")
	.map(pair => {
		let [key, value] = pair.split("=")
		key ??= null
		value ??= null

		return [key, value]
	})

let mainArgs: {[key: string]: string} = Object.fromEntries(mainArgEntries)

window.onload = async () => {
	//Bind elements
	let scenario = new ScenarioElement(document.querySelector("#scenario"), {
		defaultScenario: {
			health: 250,
			distance: 100,
			regions: ["head", "neck", "chest", "stomach", "limbs"],
			distribution: {
				head: 0.1,
				neck: 0.1,
				chest: 0.3,
				stomach: 0.13,
				limbs: 0.37
			}
		}
	})

	scenario.element.querySelector<HTMLButtonElement>("#import").onclick = () => {
		let url = prompt("Google Sheets Url")

		if(!url)
			return

		let [id] = url
			.match(/docs\.google\.com\/spreadsheets\/d\/([0-9a-zA-Z]+)\//)
			.slice(1)

		if(!id)
			return

		location.search = `id=${id}`
	}

	scenario.element.querySelector<HTMLButtonElement>("#refresh").onclick = () => location.reload()
	scenario.element.querySelector<HTMLButtonElement>("#view").onclick = () => {
		if(!("id" in mainArgs))
			return

		open(`https://docs.google.com/spreadsheets/d/${mainArgs.id}`, "_blank").focus()
	}

	let graph = new TTKGraph(document.querySelector("#ttkd > canvas"))
	
	let cards = new CardList(document.querySelector("#cards"), {
		graph: graph
	})
	
	//Acquire gun data from spreadsheet based on page id
	let discoveredGuns: Gun[] = []

	try {
		if("id" in mainArgs)
			discoveredGuns = Gun.parseCSV(await Content.fetch(`https://docs.google.com/spreadsheets/d/${mainArgs.id}/export?format=csv`))
	} catch(e) {
		console.error(e)
	}

	let guns = new GunList(document.querySelector("#glist"), {
		cards: cards,
		guns: discoveredGuns
	})

	console.log(`Loaded ${[...guns].length} guns`)

	//Display scenario
	function update(scenario: Simulation.Scenario): void {
		graph.scenario = scenario
		cards.update(scenario)
	}

	update(scenario.value)

	scenario.element.addEventListener("scenarioChange", (e: CustomEvent) => {
		let scenario = e.detail as Simulation.Scenario
		update(scenario)
	})

	//Show selection
	for(let gunName of Object.keys(Cookies.get<{[key: string]: object}>("selection", Object, {}))) {
		if(!guns.registry.has(gunName))
			continue

		let item = guns.registry.get(gunName)

		item.visibility.checked = true
		cards.add(item.gun)
	}
}