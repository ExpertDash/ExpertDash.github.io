import {System} from "../../ecs.js"
import Vector3 from "../../math/vec3.js"
import World, {Simulator} from "../world.js"

/** Keeps track of and allows per frame access to the mouse's position and button states */
@World.register.system<typeof MouseSystem>({after: [Simulator.Category.Input]}, document.querySelector("body"))
export default class MouseSystem extends System {
	private downButtons: Set<string>
	private heldButtons: Set<string>
	private upButtons: Set<string>
	private frameDownButtons: Set<string>
	private frameHeldButtons: Set<string>
	private frameUpButtons: Set<string>
	#position: Vector3 = Vector3.zero

	public constructor(target: HTMLElement) {
		super()

		//Mouse button states for next frame
		this.downButtons = new Set()
		this.heldButtons = new Set()
		this.upButtons = new Set()

		//Mouse button states for current frame
		this.frameDownButtons = new Set()
		this.frameHeldButtons = new Set()
		this.frameUpButtons = new Set()

		//Remove previous mouse listeners
		target.removeEventListener("mousemove", this.mouseMoveListener)
		target.removeEventListener("mousedown", this.mouseDownListener)
		target.removeEventListener("mouseup", this.mouseUpListener)
		target.removeEventListener("contextmenu", this.contextMenuListener)

		//Add mouse listeners
		target.addEventListener("mousemove", this.mouseMoveListener)
		target.addEventListener("mousedown", this.mouseDownListener)
		target.addEventListener("mouseup", this.mouseUpListener)
		target.addEventListener("contextmenu", this.contextMenuListener)
	}

	public update(): void {
		//Copy current frame mouse button states
		this.frameDownButtons = new Set(this.downButtons)
		this.frameHeldButtons = new Set(this.heldButtons)
		this.frameUpButtons = new Set(this.upButtons)

		//Clear mouse button states for next frame
		this.downButtons.clear()
		this.upButtons.clear()
	}

	/** Position of the mouse in the window */
	public get position(): Vector3 {
		return this.#position
	}

	/**
	 * @param button Mouse button to detect state of
	 * @returns Whether the mouse button is being pressed
	 */
	public held(button: string): boolean {
		return this.frameHeldButtons.has(button)
	}

	/**
	 * @param button Mouse button to detect state of
	 * @returns Whether the mouse button was pressed on the current frame
	 */
	public down(button: string): boolean {
		return this.frameDownButtons.has(button)
	}

	/**
	 * @param button Mouse button to detect state of
	 * @returns Whether the mouse button was released on the current frame
	 */
	public up(button: string): boolean {
		return this.frameUpButtons.has(button)
	}

	private mouseMoveListener = (e: MouseEvent) => this.#position = new Vector3(e.clientX, e.clientY)

	private mouseDownListener = (e: MouseEvent) => {
		let button = `Mouse${e.button}`

		if(this.heldButtons.has(button))
			return

		this.downButtons.add(button)
		this.heldButtons.add(button)
	}

	private mouseUpListener = (e: MouseEvent) => {
		let button = `Mouse${e.button}`

		this.upButtons.add(button)
		this.heldButtons.delete(button)
	}

	private contextMenuListener = (e: MouseEvent) => e.preventDefault()
}