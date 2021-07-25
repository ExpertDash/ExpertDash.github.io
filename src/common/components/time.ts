import World from "../world.js"
import {Entity, Component} from "../../ecs.js"
import TimeSystem from "../systems/timeSystem.js"

/**
 * Keeps track of self lifetime
 */
@World.register.component()
export default class Time extends Component {
	#start: number

	/** Time in seconds when added */
	public get start(): number {
		return this.#start
	}

	/** Time in seconds since introduction */
	public get duration(): number {
		return World.systems.get(TimeSystem).time - this.#start
	}

	protected override added(entity: Entity): void {
		this.#start = World.systems.get(TimeSystem).time
	}
}