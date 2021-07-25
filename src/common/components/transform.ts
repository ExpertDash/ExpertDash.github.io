import Matrix4x4 from "../../math/mat4.js"
import Vector3 from "../../math/vec3.js"
import {Component} from "../../ecs.js"
import World from "../world.js"

@World.register.component()
export default class Transform extends Component {
	public position: Vector3
	public rotation: number
	public scale: Vector3

	constructor({position, rotation, scale}: Parameters = {}) {
		super()
		this.position = position ?? Vector3.zero
		this.rotation = rotation ?? 0
		this.scale = scale ?? Vector3.one
	}

	/** Global transformation matrix */
	public get matrix(): Matrix4x4 {
		return Matrix4x4.trs(
			this.position,
			this.rotation * Math.PI / 180,
			this.scale
		)
	}
}

interface Parameters {
	position?: Vector3
	rotation?: number
	scale?: Vector3
}