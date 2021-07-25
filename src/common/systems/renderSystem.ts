import {System} from "../../ecs.js"
import Entities from "../../ecs/entities.js"
import Matrix4x4 from "../../math/mat4.js"
import Mesh from "../components/mesh.js"
import Transform from "../components/transform.js"
import World, {Simulator} from "../world.js"

const GL = WebGLRenderingContext

/** Renders entities onto a target display */
@World.register.system<typeof RenderSystem>({after: [Simulator.Category.Graphics]}, document.querySelector("canvas"))
export default class RenderSystem extends System {
	public readonly context: WebGLRenderingContext
	private nearClip: number = 0.1
	private farClip: number = 1000
	private viewMatrix: Matrix4x4
	private projectionMatrix: Matrix4x4
	#width: number
	#height: number
	#ortho: boolean
	#size: number = 0.03
	#fov: number = 45

	/**
	 * @param target Canvas to render to
	 */
	public constructor(target: HTMLCanvasElement) {
		super()

		this.viewMatrix = new Matrix4x4(
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, -10,
			0, 0, 0, 1
		)

		this.#ortho = true
		this.context = target.getContext("webgl")
		this.refreshSize(target)

		window.removeEventListener("resize", () => this.refreshSize(target))
		window.addEventListener("resize", () => this.refreshSize(target))
	}

	/** Display width */
	public get width(): number {
		return this.#width
	}

	/** Display height */
	public get height(): number {
		return this.#height
	}

	/** Display aspect ratio */
	public get aspectRatio(): number {
		return this.width / this.height
	}

	/** Whether to use an orthographic or perspective projection matrix */
	public get ortho(): boolean {
		return this.#ortho
	}

	/**
	 * @param value Whether to use ortho or perspective
	 */
	public set ortho(value: boolean) {
		this.#ortho = value
		this.refreshProjection()
	}

	/** Orthographic projection size */
	public get size(): number {
		return this.#size
	}

	public set size(value: number) {
		this.#size = value
		this.refreshProjection()
	}

	/** Perspective projection field of view */
	public get fov(): number {
		return this.#fov
	}

	public set fov(value: number) {
		this.#fov = value
		this.refreshProjection()
	}

	public update(entities: Entities): void {
		const gl = this.context

		gl.clearColor(0, 0, 0, 1)
		gl.clearDepth(1)
		gl.enable(GL.DEPTH_TEST)
		gl.depthFunc(GL.LEQUAL)
		gl.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT)

		entities.forEach((mesh, transform) => {
			if(!mesh.material)
				return

			let vertexPosition = mesh.material.shader.getAttribute("vertexPosition").location
			let projectionMatrix = mesh.material.shader.getUniform("projectionMatrix").location
			let modelViewMatrix = mesh.material.shader.getUniform("modelViewMatrix").location

			gl.useProgram(mesh.material.shader.program)
			gl.bindBuffer(GL.ARRAY_BUFFER, mesh.vertexBuffer)
			gl.vertexAttribPointer(vertexPosition, 2, GL.FLOAT, false, 0, 0)
			gl.enableVertexAttribArray(vertexPosition)
			mesh.material.apply(gl)
			gl.uniformMatrix4fv(projectionMatrix, false, this.projectionMatrix)
			gl.uniformMatrix4fv(modelViewMatrix, false, transform.matrix.mul(this.viewMatrix).transpose())
			gl.drawArrays(GL.TRIANGLE_STRIP, 0, 4)
		}, Mesh, Transform)
	}

	private refreshSize = (target: HTMLCanvasElement) => {
		target.width = screen.width
		target.height = screen.height
		this.#width = target.clientWidth
		this.#height = target.clientHeight
		this.context.viewport(0, 0, target.width, target.height)
		this.refreshProjection()
	}

	/** Refresh the projection matrix based on the specified parameters */
	private refreshProjection = () => {
		if(this.#ortho)
			this.projectionMatrix = Matrix4x4.createOrtho(
				this.#width * this.#size,
				this.#height * this.#size,
				this.nearClip, this.farClip
			)
		else
			this.projectionMatrix = Matrix4x4.createPerspective(
				this.#fov * Math.PI / 180,
				this.#width / this.#height,
				this.nearClip, this.farClip
			)

		this.projectionMatrix = this.projectionMatrix.transpose()
	}
}