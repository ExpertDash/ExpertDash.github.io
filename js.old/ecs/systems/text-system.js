import System, {Category} from "../../../js/ecs/system.js"
import RenderSystem from "./render-system.js"

export default class TextSystem extends System {
	/** @type {[Vector2, string, TextOptions][]} */
	static #requested = []

	/** @type {HTMLDivElement[]} */
	static #created = []

	update() {
		while(TextSystem.#created.length > 0)
			TextSystem.#created.pop().remove()

		while(TextSystem.#requested.length > 0) {
			let [p, s, options] = TextSystem.#requested.pop()
			let text = document.createElement("div")
			text.textContent = s
			text.style.color = options.color
			text.style.position = "absolute"
			text.style.userSelect = "none"

			let r = RenderSystem.instance.ortho ? RenderSystem.instance.size : NaN
			text.style.left = Math.round(RenderSystem.width / 2 + p.x / r)
			text.style.bottom = Math.round(RenderSystem.height / 2 + p.y / r)

			document.querySelector("body").appendChild(text)
			TextSystem.#created.push(text)
		}
	}

	get category() {
		return Category.UI
	}

	/**
	 * @param {Vector2} position 
	 * @param {string} value 
	 * @param {TextOptions} options
	 */
	static text(position, value, options = {color: "white"}) {
		this.#requested.push([position, value, options])
	}
}

/**
 * @typedef {{color: string}} TextOptions
 */