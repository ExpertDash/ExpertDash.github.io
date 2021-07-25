import {Component} from "../../ecs.js"
import Vector3 from "../../math/vec3.js"
import BoundingBox from "../../physics/boundingBox.js"
import Collision from "../../physics/collision.js"
import World from "../world.js"
import Transform from "./transform.js"
import Mesh from "./mesh.js"

@World.register.component()
export default class Collider extends Component {
	#collisions: Collision[]
	#boundingBox: BoundingBox
	#hull: Vector3[]

	constructor() {
		super()
		this.#collisions = []
		this.#boundingBox = null
	}

	/** Whether the entity is collided with anything */
	public get collided(): boolean {
		return this.#collisions.length > 0
	}

	/** Ongoing collisions on the entity */
	public get collisions() {
		return this.#collisions
	}

	/** Global bounding box */
	public get boundingBox() {
		return this.#boundingBox
	}

	/** Global convex hull */
	public get hull(): Vector3[] {
		return this.#hull
	}

	/**
	 * Add a new collision
	 */
	public addCollision(collision: Collision): void {
		this.#collisions.push(collision)
	}

	/**
	 * Removes all collisions on the entity
	 */
	public clearCollisions() {
		this.#collisions = []
	}

	/**
	 * Calculates the bounding box based on the entity's mesh and transform
	 */
	public calculateBoundingBox(mesh: Mesh, transform: Transform) {
		this.#boundingBox = new BoundingBox([mesh.boundingBox.min, mesh.boundingBox.max], transform)
	}

	/**
	 * Calculates the convex hull based on the entity's mesh and transform
	 */
	public calculateConvexHull(mesh: Mesh, transform: Transform) {
		this.#hull = mesh.hull
	}
}