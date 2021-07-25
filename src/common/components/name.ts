import World from "../world.js"
import {Component} from "../../ecs.js"

/**
 * Allows association by name
 */
@World.register.component()
export default class Name extends Component {
	public value: string

	public constructor(value: string) {
		super()
		this.value = value
	}

	public override valueOf() {
		return this.value
	}

	public override toString() {
		return this.value
	}
}