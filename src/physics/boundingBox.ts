import Transform from "../common/components/transform.js"
import Geometry from "../math/geometry.js"
import Vector3 from "../math/vec3.js"

export default class BoundingBox {
	/** Local minimum corner */
	public readonly min: Vector3

	/** Local maximum corner */
	public readonly max: Vector3

	/** Local top left corner */
	public readonly topLeft: Vector3

	/** Local top right corner */
	public readonly topRight: Vector3

	/** Local bottom left corner */
	public readonly bottomLeft: Vector3

	/** Local bottom right corner */
	public readonly bottomRight: Vector3


	/**
	 * @param vertices Vertices composing the mesh
	 * @param transform Transformation to apply to the bounding box
	 */
	public constructor(vertices: Vector3[], transform?: Transform) {
		let [xs, ys] = [vertices.map(v => v.x), vertices.map(v => v.y)]
		this.min = new Vector3(Math.min(...xs), Math.min(...ys))
		this.max = new Vector3(Math.max(...xs), Math.max(...ys))
		this.topLeft = new Vector3(this.min.x, this.max.y)
		this.topRight = new Vector3(this.max.x, this.max.y)
		this.bottomLeft = new Vector3(this.min.x, this.min.y)
		this.bottomRight = new Vector3(this.max.x, this.min.y)

		if(transform) {
			let matrix = transform.matrix
			this.min = new Vector3(...matrix.mulVec(this.min.xyzw).slice(0, -1))
			this.max = new Vector3(...matrix.mulVec(this.max.xyzw).slice(0, -1))
			this.topLeft = new Vector3(...matrix.mulVec(this.topLeft.xyzw).slice(0, -1))
			this.topRight = new Vector3(...matrix.mulVec(this.topRight.xyzw).slice(0, -1))
			this.bottomLeft = new Vector3(...matrix.mulVec(this.bottomLeft.xyzw).slice(0, -1))
			this.bottomRight = new Vector3(...matrix.mulVec(this.bottomRight.xyzw).slice(0, -1))
		}
	}

	/**
	 * Line segments composing the edges of the box
	 */
	public get edges(): [Vector3, Vector3][] {
		return [
			[this.topLeft, this.topRight],
			[this.topRight, this.bottomRight],
			[this.bottomRight, this.bottomLeft],
			[this.bottomLeft, this.topLeft]
		]
	}

	/**
	 * @returns Whether the point is contained
	 */
	public inside(point: Vector3): boolean {
		return this.min.x <= point.x && point.x <= this.max.x &&
			this.min.y <= point.y && point.y <= this.max.y
	}

	/**
	 * @returns Whether the boxes collide
	 */
	public collides(other: BoundingBox): boolean {
		for(let edge of this.edges)
			for(let otherEdge of other.edges)
				if(Geometry.intersects(edge, otherEdge))
					return true

		return false
	}

	public toString(): string {
		return `{${this.topLeft}, ${this.topRight}, ${this.bottomLeft}, ${this.bottomRight}}`
	}
}