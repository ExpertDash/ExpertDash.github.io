import KeySystem from "../ecs/systems/key-system.js"
import MouseSystem from "../ecs/systems/mouse-system.js"

/** Unifies mouse button and key state acquisition methods */
export default class Input {
	/** Position of the mouse on the display */
	static get mousePosition() {
		return MouseSystem.position
	}

	/**
	 * @param {string|number} button 
	 * @returns {boolean}
	 */
	static held(button) {
		return button.startsWith("Mouse") ? MouseSystem.held(button) : KeySystem.held(button)
	}

	/**
	 * @param {string|number} button 
	 * @returns {boolean}
	 */
	static down(button) {
		return button.startsWith("Mouse") ? MouseSystem.down(button) : KeySystem.down(button)
	}

	/**
	 * @param {string|number} button 
	 * @returns {boolean}
	 */
	static up(button) {
		return button.startsWith("Mouse") ? MouseSystem.up(button) : KeySystem.up(button)
	}
}