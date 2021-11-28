import * as cobrasu from "/lib/cobrasu/core.js"
import Gun from "../core/gun.js"
import CardList from "./cardList.js"

const {Cookies} = cobrasu.DOM

export class GunList {
	public readonly element: HTMLElement
	public registry: Map<string, GunList.Item>
	protected cards: CardList

	public constructor(element: HTMLElement, {cards, guns}: {cards: CardList, guns: Gun[]}) {
		this.element = element
		this.registry = new Map()
		this.cards = cards

		for(let gun of guns.sort((a, b) => a.name.localeCompare(b.name))) {
			if(this.registry.has(gun.name)) {
				console.error(`Attempted to registry another gun with the name '${gun.name}'`)
				continue
			}

			let item = new GunList.Item(this, gun)
			this.element.append(item.element)

			this.registry.set(gun.name, item)
		}
	}

	public *[Symbol.iterator](): IterableIterator<Gun> {
		for(let item of this.registry.values())
			yield item.gun
	}
}

export namespace GunList {
	export class Item {
		public readonly gun: Gun
		public readonly element: HTMLElement

		public readonly name: HTMLDivElement
		public readonly visibility: HTMLInputElement

		private readonly list: GunList

		public constructor(list: GunList, gun: Gun) {
			this.list = list
			this.gun = gun

			this.element = document.createElement("div")
			this.element.id = gun.name

			this.name = document.createElement("div")
			this.name.textContent = gun.name
			this.element.append(this.name)

			this.visibility = document.createElement("input")
			this.visibility.type = "checkbox"
			this.visibility.addEventListener("change", this.#onCheck)
			this.element.append(this.visibility)
		}

		#onCheck = (_: Event) => {
			let selection = Cookies.get<{[key: string]: object}>("selection", Object, {})

			if(this.visibility.checked) {
				selection[this.gun.name] = {}
				Cookies.set("selection", selection)

				this.list["cards"].add(this.gun)
			} else {
				delete selection[this.gun.name]
				Cookies.set("selection", selection)

				this.list["cards"].remove(this.gun.name)
			}
		}
	}
}

export default GunList