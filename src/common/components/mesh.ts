import {Component} from "../../ecs.js"
import Entity from "../../ecs/entity.js"
import Vector3 from "../../math/vec3.js"
import BoundingBox from "../../physics/boundingBox.js"
import Material from "../../rendering/material.js"
import RenderSystem from "../systems/renderSystem.js"
import World from "../world.js"

const GL = WebGLRenderingContext

@World.register.component()
export class Mesh extends Component {
	public readonly vertices: Vector3[]
	public readonly triangles: number[]
	public readonly uvs: number[]

	public material: Material

	/** Local bounding box */
	public readonly boundingBox: BoundingBox

	/** Local convex hull containing points in a counter-clockwise fashion around the mesh */
	public readonly hull: Vector3[]

	#vertexBuffer: WebGLBuffer

	public constructor(vertices: Vector3[], triangles?: number[], uvs?: number[]) {
		super()
		this.vertices = vertices
		this.triangles = triangles
		this.uvs = uvs
		this.boundingBox = new BoundingBox(vertices)
		this.#vertexBuffer = null

		// let hull = []

		// for(let v of vertices) {
			
		// }
	}

	public get vertexBuffer(): WebGLBuffer {
		return this.#vertexBuffer
	}

	public override added(entity: Entity): void {
		let gl = World.systems.get(RenderSystem).context

		if(!gl || this.#vertexBuffer != null)
			return

		let buffer = gl.createBuffer()
		gl.bindBuffer(GL.ARRAY_BUFFER, buffer)
		gl.bufferData(
			GL.ARRAY_BUFFER,
			new Float32Array(this.vertices.map(v => [v.x, v.y]).flat()),
			GL.STATIC_DRAW
		)

		this.#vertexBuffer = buffer
	}
}

export namespace Mesh {
	export class Primitives {
		public static quad: Readonly<Mesh> = Object.freeze(new Mesh([
			new Vector3(-1, 1),
			new Vector3(1, 1),
			new Vector3(-1, -1),
			new Vector3(1, -1)
		]))
	}
}

export default Mesh