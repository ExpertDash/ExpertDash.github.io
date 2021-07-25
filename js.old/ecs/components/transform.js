import Component from "../component.js"
import Matrix4x4 from "../../math/mat4.js"
import Vector3 from "../../math/vec3.js"
import ECS from "../ecs.js"

export default class Transform extends Component {
	/** @type {Vector3} */
	position

	/** @type {number} */
	rotation

	/** @type {Vector3} */
	scale

	/**
	 * 
	 * @param {Vector3} position 
	 * @param {number} rotation 
	 * @param {Vector3} scale 
	 */
	constructor(position = null, rotation = 0, scale = null) {
		super()
		this.position = position ?? new Vector3(0, 0)
		this.rotation = rotation
		this.scale = scale ?? new Vector3(1, 1)
	}

	/**
	 * Global transformation matrix
	 * @type {Matrix4x4}
	 */
	get matrix() {
		return Matrix4x4.trs(
			this.position,
			this.rotation * Math.PI / 180,
			this.scale
		)
	}
}

ECS.registerComponent(Transform)