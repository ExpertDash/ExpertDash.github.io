import World, {Simulator} from "../world.js"
import {Entities, System} from "../../ecs.js"

/** Keeps track of simulated and real time while allowing adjustment of simulated time speed */
@World.register.system<typeof TimeSystem>({before: [Simulator.Category.Physics]})
export default class TimeSystem extends System {
	#timescale: number = 1
	#time: number = 0
	#realtime: number = 0

	#epoch: number
	#lastRealtime: number

	public constructor() {
		super()
		this.#epoch = performance.now() / 1000
		this.#lastRealtime = 0
	}

	/** Current time in seconds */
	public get time(): number {
		return this.#time
	}

	/** Current time in seconds disregarding timescale */
	public get realtime(): number {
		return this.#realtime
	}

	/** Rate at which simulated time progresses where 1 is normal speed and 0 is completely stopped */
	public get timescale(): number {
		return this.#timescale
	}

	public set timescale(value: number) {
		let newValue = Math.max(0, Math.min(value, 1))

		Simulator.fixedDeltaTime = Simulator.fixedDeltaTime * this.#timescale / newValue
		this.#timescale = newValue
	}

	public update(_: Entities): void {
		this.#realtime = performance.now() / 1000 - this.#epoch
		this.#time += (this.#realtime - this.#lastRealtime) * this.#timescale
		this.#lastRealtime = this.#realtime
	}
}