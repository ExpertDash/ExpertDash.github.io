import System, {Category} from "../system.js"

/** Keeps track of and allows per frame access to key states */
export default class KeySystem extends System {
	/** @type {Set.<string>} */
	static #downKeys
	/** @type {Set.<string>} */
	static #heldKeys
	/** @type {Set.<string>} */
	static #upKeys
	/** @type {Set.<string>} */
	static #frameDownKeys
	/** @type {Set.<string>} */
	static #frameHeldKeys
	/** @type {Set.<string>} */
	static #frameUpKeys
	
	/**
	 * @param {HTMLElement} target Element to detect key presses from
	 */
	constructor(target) {
		super()

		//Key states for next frame
		KeySystem.#downKeys = new Set()
		KeySystem.#heldKeys = new Set()
		KeySystem.#upKeys = new Set()

		//Key states for current frame
		KeySystem.#frameDownKeys = new Set()
		KeySystem.#frameHeldKeys = new Set()
		KeySystem.#frameUpKeys = new Set()

		//Remove previous key listeners
		target.removeEventListener("keydown", KeySystem.#keyDownListener)
		target.removeEventListener("keyup", KeySystem.#keyUpListener)

		//Add key listeners
		target.addEventListener("keydown", KeySystem.#keyDownListener)
		target.addEventListener("keyup", KeySystem.#keyUpListener)
	}

	update() {
		//Copy current frame key states
		KeySystem.#frameDownKeys = new Set(KeySystem.#downKeys)
		KeySystem.#frameHeldKeys = new Set(KeySystem.#heldKeys)
		KeySystem.#frameUpKeys = new Set(KeySystem.#upKeys)

		//Clear key states for next frame
		KeySystem.#downKeys.clear()
		KeySystem.#upKeys.clear()
	}

	get category() {
		return Category.Input
	}

	/**
	 * @param {string} key Key to detect state of
	 * @returns {boolean} Whether the key is being pressed
	 */
	static held(key) {
		return KeySystem.#frameHeldKeys.has(key)
	}

	/**
	 * @param {string} key Key to detect state of
	 * @returns {boolean} Whether the key was pressed on the current frame
	 */
	static down(key) {
		return KeySystem.#frameDownKeys.has(key)
	}

	/**
	 * @param {string} key Key to detect state of
	 * @returns {boolean} Whether the key was released on the current frame
	 */
	static up(key) {
		return KeySystem.#frameUpKeys.has(key)
	}

	/** @param {KeyboardEvent} e */
	static #keyDownListener = e => {
		if(KeySystem.#heldKeys.has(e.key))
			return

		KeySystem.#downKeys.add(e.key)
		KeySystem.#heldKeys.add(e.key)
	}

	/** @param {KeyboardEvent} e  */
	static #keyUpListener = e => {
		KeySystem.#upKeys.add(e.key)
		KeySystem.#heldKeys.delete(e.key)
	}
}