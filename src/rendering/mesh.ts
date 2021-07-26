import {RenderSystem} from "../common/lib.js"
import World from "../common/world.js"
import Vector3, {vec3} from "../math/vec3.js"
import BoundingBox from "../physics/boundingBox.js"

const GL = WebGLRenderingContext

export class Mesh {
	public readonly vertices: Vector3[]
	public readonly triangles: number[]
	public readonly uvs: number[]

	/** Local bounding box */
	public readonly boundingBox: BoundingBox

	/** Local convex hull containing points in a counter-clockwise fashion around the mesh */
	public readonly hull: Vector3[]

	public constructor(vertices: Vector3[], triangles?: number[], uvs?: number[]) {
		this.vertices = vertices
		this.triangles = triangles
		this.uvs = uvs
		this.boundingBox = new BoundingBox(vertices)

		// let hull = []

		// for(let v of vertices) {
			
		// }
	}

	public createVertexBuffer(): WebGLBuffer {
		let gl = World.systems.get(RenderSystem).context

		let vertexBuffer = gl.createBuffer()
		gl.bindBuffer(GL.ARRAY_BUFFER, vertexBuffer)
		gl.bufferData(
			GL.ARRAY_BUFFER,
			new Float32Array(this.vertices.map(v => [v.x, v.y]).flat()),
			GL.STATIC_DRAW
		)

		return vertexBuffer
	}
}

export namespace Mesh {
	export class Primitives {
		public static quad: Readonly<Mesh> = Object.freeze(new Mesh([
			vec3(-1, 1),
			vec3(1, 1),
			vec3(-1, -1),
			vec3(1, -1)
		]))
	}
}

export default Mesh