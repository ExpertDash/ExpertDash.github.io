import {Component} from "../../ecs.js"
import Vector3 from "../../math/vec3.js"
import World from "../world.js"

@World.register.component()
export default class Motion extends Component {
	mass: number
	acceleration: Vector3
	velocity: Vector3

	/**
	 * @param velocity Initial velocity
	 */
	constructor(velocity?: Vector3) {
		super()
		this.mass = 1
		this.acceleration = Vector3.zero
		this.velocity = velocity ?? Vector3.zero
	}
}