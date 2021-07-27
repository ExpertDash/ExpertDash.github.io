import {System} from "../../ecs.js"
import Entities from "../../ecs/entities.js"
import World, {Simulator} from "../world.js"

/** Keeps track of and allows per frame access to key states */
@World.register.system<typeof KeySystem>(Simulator.phase(Simulator.Category.Input), document.querySelector("body"))
export default class KeySystem extends System {
	private downKeys: Set<string>
	private heldKeys: Set<string>
	private upKeys: Set<string>
	private frameDownKeys: Set<string>
	private frameHeldKeys: Set<string>
	private frameUpKeys: Set<string>
	
	/**
	 * @param target Element to detect key presses from
	 */
	public constructor(target: HTMLElement) {
		super()

		//Key states for next frame
		this.downKeys = new Set()
		this.heldKeys = new Set()
		this.upKeys = new Set()

		//Key states for current frame
		this.frameDownKeys = new Set()
		this.frameHeldKeys = new Set()
		this.frameUpKeys = new Set()

		//Remove previous key listeners
		target.removeEventListener("keydown", this.keyDownListener)
		target.removeEventListener("keyup", this.keyUpListener)

		//Add key listeners
		target.addEventListener("keydown", this.keyDownListener)
		target.addEventListener("keyup", this.keyUpListener)
	}

	public update(_: Entities): void {
		//Copy current frame key states
		this.frameDownKeys = new Set(this.downKeys)
		this.frameHeldKeys = new Set(this.heldKeys)
		this.frameUpKeys = new Set(this.upKeys)

		//Clear key states for next frame
		this.downKeys.clear()
		this.upKeys.clear()
	}

	/**
	 * @param key Key to detect state of
	 * @returns Whether the key is being pressed
	 */
	public held(key: string): boolean {
		return this.frameHeldKeys.has(key)
	}

	/**
	 * @param key Key to detect state of
	 * @returns Whether the key was pressed on the current frame
	 */
	public down(key: string): boolean {
		return this.frameDownKeys.has(key)
	}

	/**
	 * @param key Key to detect state of
	 * @returns Whether the key was released on the current frame
	 */
	public up(key: string): boolean {
		return this.frameUpKeys.has(key)
	}

	private keyDownListener = (e: KeyboardEvent) => {
		if(this.heldKeys.has(e.key))
			return

		this.downKeys.add(e.key)
		this.heldKeys.add(e.key)
	}

	private keyUpListener = (e: KeyboardEvent) => {
		this.upKeys.add(e.key)
		this.heldKeys.delete(e.key)
	}
}