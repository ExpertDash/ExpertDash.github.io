import KeySystem from "../common/systems/keySystem.js"
import MouseSystem from "../common/systems/mouseSystem.js"
import World from "../common/world.js"
import Vector3 from "../math/vec3.js"

/** Unifies mouse button and key state acquisition methods */
export default class Input {
	/** Position of the mouse on the display */
	public static get mousePosition(): Vector3 {
		return World.systems.get(MouseSystem).position
	}

	public static held(button: string): boolean {
		return button.startsWith("Mouse") ? World.systems.get(MouseSystem).held(button) : World.systems.get(KeySystem).held(button)
	}

	public static down(button: string): boolean {
		return button.startsWith("Mouse") ? World.systems.get(MouseSystem).down(button) : World.systems.get(KeySystem).down(button)
	}

	public static up(button: string): boolean {
		return button.startsWith("Mouse") ? World.systems.get(MouseSystem).up(button) : World.systems.get(KeySystem).up(button)
	}
}