import ECS from "../ecs.js"
import Component from "../component.js"

export default class Name extends Component {
	#name

	/**
	 * @param {string} value 
	 */
	constructor(value) {
		super()
		this.#name = value
	}

	get value() {
		return this.#name
	}

	valueOf() {
		return this.value
	}

	toString() {
		return this.value
	}
}

ECS.registerComponent(Name)