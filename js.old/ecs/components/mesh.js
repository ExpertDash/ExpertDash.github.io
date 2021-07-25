import Component from "../component.js"
import RenderSystem from "../systems/render-system.js"
import Vector3 from "../../math/vec3.js"
import BoundingBox from "../../physics/bounding-box.js"
import ECS from "../ecs.js"

const GL = WebGLRenderingContext

export default class Mesh extends Component {
	/** @type {Vector3[]} */
	#vertices

	/** @type {number[]} */
	#triangles

	/** @type {number[]} */
	#uvs

	/** @type {WebGLBuffer} */
	#vertexBuffer

	/** @type {BoundingBox} */
	#boundingBox

	/** @type {Vector3[]} */
	#hull

	/**
	 * @param {Vector3[]} vertices 
	 * @param {number[]} triangles 
	 * @param {number[]} uvs
	 */
	constructor(vertices, triangles, uvs) {
		super()
		this.#vertices = vertices
		this.#triangles = triangles
		this.#uvs = uvs
		this.#boundingBox = new BoundingBox(vertices)
		this.#vertexBuffer = null

		// let hull = []

		// for(let v of vertices) {
			
		// }
	}

	get vertices() {
		return this.#vertices
	}

	get triangles() {
		return this.#triangles
	}

	get uvs() {
		return this.#uvs
	}

	get vertexBuffer() {
		return this.#vertexBuffer
	}

	/** Local bounding box */
	get boundingBox() {
		return this.#boundingBox
	}

	/** Local convex hull containing points in a counter-clockwise fashion around the mesh */
	get hull() {
		return this.#hull
	}

	static get quad() {
		return quad
	}

	introduced() {
		let gl = RenderSystem.context

		if(!gl || this.#vertexBuffer != null)
			return

		let buffer = gl.createBuffer()
		gl.bindBuffer(GL.ARRAY_BUFFER, buffer)
		gl.bufferData(
			GL.ARRAY_BUFFER,
			new Float32Array(this.#vertices.map(v => [v.x, v.y]).flat()),
			GL.STATIC_DRAW
		)

		this.#vertexBuffer = buffer
	}
}

const quad = Object.freeze(new Mesh([
	new Vector3(-1, 1),
	new Vector3(1, 1),
	new Vector3(-1, -1),
	new Vector3(1, -1)
]))

ECS.registerComponent(Mesh)