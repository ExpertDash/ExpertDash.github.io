import Component from "../component.js"
import Collision from "../../physics/collision.js"
import BoundingBox from "../../physics/bounding-box.js"
import Transform from "./transform.js"
import Mesh from "./mesh.js"
import Vector3 from "../../math/vec3.js"
import ECS from "../ecs.js"

export default class Collider extends Component {
	/** @type {Collision[]} */
	#collisions

	/** @type {BoundingBox} */
	#boundingBox

	/** @type {Vector3[]} */
	#hull

	constructor() {
		super()
		this.#collisions = []
		this.#boundingBox = null
	}

	/**
	 * Whether the entity is collided with anything
	 * @type {boolean}
	 */
	get collided() {
		return this.#collisions.length > 0
	}

	/** Ongoing collisions on the entity */
	get collisions() {
		return this.#collisions
	}

	/** Global bounding box */
	get boundingBox() {
		return this.#boundingBox
	}

	/** Global convex hull */
	get hull() {
		return this.#hull
	}

	/**
	 * Add a new collision
	 * @param {Collision} collision 
	 */
	addCollision(collision) {
		this.#collisions.push(collision)
	}

	/**
	 * Removes all collisions on the entity
	 */
	clearCollisions() {
		this.#collisions = []
	}

	/**
	 * Calculates the bounding box based on the entity's mesh and transform
	 * @param {Mesh} mesh 
	 * @param {Transform} transform 
	 */
	calculateBoundingBox(mesh, transform) {
		this.#boundingBox = new BoundingBox([mesh.boundingBox.min, mesh.boundingBox.max], transform)
	}

	/**
	 * Calculates the convex hull based on the entity's mesh and transform
	 * @param {Mesh} mesh 
	 * @param {Transform} transform 
	 */
	calculateConvexHull(mesh, transform) {
		this.#hull = mesh.hull
	}
}

ECS.registerComponent(Collider)