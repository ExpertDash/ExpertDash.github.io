import Component from "../component.js"
import Entity from "../entity.js"
import TimeSystem from "../systems/time-system.js"

export default class Time extends Component {
	#start

	constructor() {
		super()
		this.#start = TimeSystem.time
	}

	/** Time in seconds since introduction */
	get duration() {
		return TimeSystem.time - this.#start
	}

	/** Time in seconds when introduced */
	get start() {
		return this.#start
	}
}

Entity.registerComponent(Time)