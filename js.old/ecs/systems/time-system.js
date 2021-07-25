import System from "../system.js"
import ECS from "../ecs.js"

/** Keeps track of simulated and real time while allowing adjustment of simulated time speed */
export default class TimeSystem extends System {
	/** @type {number} */
	static #timescale = 1
	/** @type {number} */
	static #time = 0
	/** @type {number} */
	static #realtime = 0

	/** @type {number} */
	#epoch
	/** @type {number} */
	#lastRealtime

	constructor() {
		super()
		this.#epoch = performance.now() / 1000
		this.#lastRealtime = 0
	}

	update() {
		TimeSystem.#realtime = performance.now() / 1000 - this.#epoch
		TimeSystem.#time += (TimeSystem.#realtime - this.#lastRealtime) * TimeSystem.#timescale
		this.#lastRealtime = TimeSystem.#realtime
	}

	/**
	 * Current time in seconds
	 */
	static get time() {
		return TimeSystem.#time
	}

	/**
	 * Rate at which simulated time progresses where 1 is normal speed and 0 is completely stopped
	 */
	static get timescale() {
		return TimeSystem.#timescale
	}

	/**
	 * @param {number} value New time scale
	 */
	static set timescale(value) {
		ECS.fixedDeltaTime = ECS.fixedDeltaTime * TimeSystem.#timescale / value
		TimeSystem.#timescale = Math.max(0, Math.min(value, 1))
	}

	/**
	 * Current time in seconds disregarding timescale
	 */
	static get realtime() {
		return TimeSystem.#realtime
	}
}