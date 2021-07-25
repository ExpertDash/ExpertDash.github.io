import Component from "../component.js"
import Vector3 from "../../math/vec3.js"
import ECS from "../ecs.js"

export default class Motion extends Component {
	/**
	 * @type {number}
	 */
	mass

	/**
	 * @type {Vector3}
	 */
	acceleration

	/**
	 * @type {Vector3}
	 */
	velocity

	/**
	 * @param {Vector3} velocity Initial velocity
	 */
	constructor(velocity = null) {
		super()
		this.mass = 1
		this.acceleration = Vector3.zero
		this.velocity = velocity ?? Vector3.zero
	}
}

ECS.registerComponent(Motion)