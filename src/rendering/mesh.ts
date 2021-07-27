import {RenderSystem} from "../common/lib.js"
import World from "../common/world.js"
import Geometry from "../math/geometry.js"
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
		this.hull = Mesh.createHull(vertices)
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

	/**
	 * Generates a convex hull from a set of vertices using "Jarvis March"
	 * @returns The convex hull of the specified vertices
	 */
	@restrict((vertices: Vector3[]) => vertices.length >= 3)
	public static createHull(vertices: Vector3[]): Vector3[] {
		let hull: Vector3[] = []

		if(vertices.length < 3)
			throw new Error(`Hull generation requires 3 vertices, only ${vertices.length} given`)

		let l = 0

		for(let i = 1; i < vertices.length; i++)
			if(vertices[i].x < vertices[l].x)
				l = i

		let p = l
		let q: number

		do {
			hull.push(vertices[l])

			q = (p + 1) % vertices.length

			for(let i = 0; i < vertices.length; i++)
				if(Geometry.direction(vertices[p], vertices[i], vertices[q]) < 0)
					q = i

			p = q
		} while(p != l)

		return hull
	}
}

function restrict(...parameters: ((instance: any) => boolean)[]) {
	return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
		
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