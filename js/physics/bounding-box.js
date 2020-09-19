import Transform from "../ecs/components/transform.js"
import Geometry from "../math/geometry.js"
import Vector3 from "../math/vec3.js"

export default class BoundingBox {
	/** @type {Vector3} */
	#min

	/** @type {Vector3} */
	#max

	/** @type {Vector3} */
	#topLeft

	/** @type {Vector3} */
	#topRight

	/** @type {Vector3} */
	#bottomLeft

	/** @type {Vector3} */
	#bottomRight


	/**
	 * @param {Vector3[]} vertices Vertices composing the mesh
	 * @param {Transform} transform Transformation to apply to the bounding box
	 */
	constructor(vertices, transform = null) {
		let [xs, ys] = [vertices.map(v => v.x), vertices.map(v => v.y)]
		this.#min = new Vector3(Math.min(...xs), Math.min(...ys))
		this.#max = new Vector3(Math.max(...xs), Math.max(...ys))
		this.#topLeft = new Vector3(this.#min.x, this.#max.y)
		this.#topRight = new Vector3(this.#max.x, this.#max.y)
		this.#bottomLeft = new Vector3(this.#min.x, this.#min.y)
		this.#bottomRight = new Vector3(this.#max.x, this.#min.y)

		if(transform) {
			let matrix = transform.matrix
			this.#min = new Vector3(...matrix.mulVec(this.#min.xyzw))
			this.#max = new Vector3(...matrix.mulVec(this.#max.xyzw))
			this.#topLeft = new Vector3(...matrix.mulVec(this.#topLeft.xyzw))
			this.#topRight = new Vector3(...matrix.mulVec(this.#topRight.xyzw))
			this.#bottomLeft = new Vector3(...matrix.mulVec(this.#bottomLeft.xyzw))
			this.#bottomRight = new Vector3(...matrix.mulVec(this.#bottomRight.xyzw))
		}
	}

	/** Local minimum corner */
	get min() {
		return this.#min
	}

	/** Local maximum corner */
	get max() {
		return this.#max
	}

	/** Local top left corner */
	get topLeft() {
		return this.#topLeft
	}

	/** Local top right corner */
	get topRight() {
		return this.#topRight
	}

	/** Local bottom left corner */
	get bottomLeft() {
		return this.#bottomLeft
	}

	/** Local bottom right corner */
	get bottomRight() {
		return this.#bottomRight
	}

	/**
	 * Line segments composing the edges of the box
	 * @type {[Vector3, Vector3][]}
	 */
	get edges() {
		return [
			[this.#topLeft, this.#topRight],
			[this.#topRight, this.#bottomRight],
			[this.#bottomRight, this.#bottomLeft],
			[this.#bottomLeft, this.#topLeft]
		]
	}

	/**
	 * @param {Vector3} point 
	 * @returns {boolean} Whether the point is contained
	 */
	inside(point) {
		return this.#min.x <= point.x && point.x <= this.#max.x &&
			this.#min.y <= point.y && point.y <= this.#max.y
	}

	/**
	 * @param {BoundingBox} other 
	 * @returns {boolean} Whether the boxes collide
	 */
	collides(other) {
		for(let edge of this.edges)
			for(let otherEdge of other.edges)
				if(Geometry.intersects(edge, otherEdge))
					return true

		return false
	}

	toString() {
		return `{${this.#topLeft}, ${this.#topRight}, ${this.#bottomLeft}, ${this.#bottomRight}}`
	}
}