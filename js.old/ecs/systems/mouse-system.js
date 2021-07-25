import System, {Category} from "../system.js"
import Vector3 from "../../math/vec3.js"

/** Keeps track of and allows per frame access to the mouse's position and button states */
export default class MouseSystem extends System {
	/** @type {Vector3} */
	static #position = Vector3.zero
	/** @type {Set.<number>} */
	static #downButtons
	/** @type {Set.<number>} */
	static #heldButtons
	/** @type {Set.<number>} */
	static #upButtons
	/** @type {Set.<number>} */
	static #frameDownButtons
	/** @type {Set.<number>} */
	static #frameHeldButtons
	/** @type {Set.<number>} */
	static #frameUpButtons

	/**
	 * @param {HTMLElement} value
	 */
	constructor(target) {
		super()

		//Mouse button states for next frame
		MouseSystem.#downButtons = new Set()
		MouseSystem.#heldButtons = new Set()
		MouseSystem.#upButtons = new Set()

		//Mouse button states for current frame
		MouseSystem.#frameDownButtons = new Set()
		MouseSystem.#frameHeldButtons = new Set()
		MouseSystem.#frameUpButtons = new Set()

		//Remove previous mouse listeners
		target.removeEventListener("mousemove", MouseSystem.#mouseMoveListener)
		target.removeEventListener("mousedown", MouseSystem.#mouseDownListener)
		target.removeEventListener("mouseup", MouseSystem.#mouseUpListener)
		target.removeEventListener("contextmenu", MouseSystem.#contextMenuListener)

		//Add mouse listeners
		target.addEventListener("mousemove", MouseSystem.#mouseMoveListener)
		target.addEventListener("mousedown", MouseSystem.#mouseDownListener)
		target.addEventListener("mouseup", MouseSystem.#mouseUpListener)
		target.addEventListener("contextmenu", MouseSystem.#contextMenuListener)
	}

	update() {
		//Copy current frame mouse button states
		MouseSystem.#frameDownButtons = new Set(MouseSystem.#downButtons)
		MouseSystem.#frameHeldButtons = new Set(MouseSystem.#heldButtons)
		MouseSystem.#frameUpButtons = new Set(MouseSystem.#upButtons)

		//Clear mouse button states for next frame
		MouseSystem.#downButtons.clear()
		MouseSystem.#upButtons.clear()
	}

	get category() {
		return Category.Input
	}

	/** Position of the mouse in the window */
	static get position() {
		return position
	}

	/**
	 * @param {number} button Mouse button to detect state of
	 * @returns {boolean} Whether the mouse button is being pressed
	 */
	static held(button) {
		return frameHeldButtons.has(button)
	}

	/**
	 * @param {number} button Mouse button to detect state of
	 * @returns {boolean} Whether the mouse button was pressed on the current frame
	 */
	static down(button) {
		return frameDownButtons.has(button)
	}

	/**
	 * @param {number} button Mouse button to detect state of
	 * @returns {boolean} Whether the mouse button was released on the current frame
	 */
	static up(button) {
		return frameUpButtons.has(button)
	}

	/** @param {MouseEvent} e */
	static #mouseMoveListener = e => MouseSystem.#position = new Vector3(e.clientX, e.clientY)

	/** @param {MouseEvent} e */
	static #mouseDownListener = e => {
		let button = `Mouse${e.button}`

		if(MouseSystem.#heldButtons.has(button))
			return

		MouseSystem.#downButtons.add(button)
		MouseSystem.#heldButtons.add(button)
	}

	/** @param {MouseEvent} e */
	static #mouseUpListener = e => {
		let button = `Mouse${e.button}`

		MouseSystem.#upButtons.add(button)
		MouseSystem.#heldButtons.delete(button)
	}

	/** @param {MouseEvent} e */
	static #contextMenuListener = e => e.preventDefault()
}