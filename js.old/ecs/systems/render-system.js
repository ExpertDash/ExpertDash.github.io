import Entity from "../entity.js"
import System, {Category} from "../system.js"
import Transform from "../components/transform.js"
import Material from "../components/material.js"
import Mesh from "../components/mesh.js"
import Matrix4x4 from "../../math/mat4.js"

const GL = WebGLRenderingContext

/** Renders entities onto a target display */
export default class RenderSystem extends System {
	/** @type {RenderSystem} */
	static #instance = null

	/** @type {WebGLRenderingContext} */
	#context

	/** @type {number} */
	#width

	/** @type {number} */
	#height

	/** @type {boolean} */
	#ortho

	/** @type {number} */
	#size = 0.03

	/** @type {number} */
	#fov = 45

	/** @type {number} */
	#nearClip = 0.1

	/** @type {number} */
	#farClip = 1000

	/** @type {Matrix4x4} */
	#viewMatrix

	/** @type {Matrix4x4} */
	#projectionMatrix

	/**
	 * @param {HTMLCanvasElement} target Canvas to render to
	 */
	constructor(target) {
		super()

		RenderSystem.#instance = this

		this.#viewMatrix = new Matrix4x4(
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, -10,
			0, 0, 0, 1
		)

		this.#ortho = true
		this.#context = target.getContext("webgl")
		this.#refreshSize(target)

		window.removeEventListener("resize", () => this.#refreshSize(target))
		window.addEventListener("resize", () => this.#refreshSize(target))
	}

	get category() {
		return Category.Graphics
	}

	/** Whether to use an orthographic or perspective projection matrix */
	get ortho() {
		return this.#ortho
	}

	/**
	 * @param value Whether to use ortho or perspective
	 */
	set ortho(value) {
		this.#ortho = value
		this.#refreshProjection()
	}

	/** Orthographic projection size */
	get size() {
		return this.#size
	}

	set size(value) {
		this.#size = value
		this.#refreshProjection()
	}

	/** Perspective projection field of view */
	get fov() {
		return this.#fov
	}

	set fov(value) {
		this.#fov = value
		this.#refreshProjection()
	}

	update() {
		const gl = this.#context

		gl.clearColor(0, 0, 0, 1)
		gl.clearDepth(1)
		gl.enable(GL.DEPTH_TEST)
		gl.depthFunc(GL.LEQUAL)
		gl.clear(GL.COLOR_BUFFER_BIT, GL.DEPTH_BUFFER_BIT)

		for(let entity of Entity.find(Mesh, Material, Transform)) {
			let mesh = entity.get(Mesh)
			let material = entity.get(Material)
			let transform = entity.get(Transform)

			let shader = material.shader
			let vertexPosition = shader.getAttribute("vertexPosition").location
			let projectionMatrix = shader.getUniform("projectionMatrix").location
			let modelViewMatrix = shader.getUniform("modelViewMatrix").location

			gl.useProgram(shader.program)
			gl.bindBuffer(GL.ARRAY_BUFFER, mesh.vertexBuffer)
			gl.vertexAttribPointer(vertexPosition, 2, GL.FLOAT, false, 0, 0)
			gl.enableVertexAttribArray(vertexPosition)
			material.apply(gl)
			gl.uniformMatrix4fv(projectionMatrix, false, this.#projectionMatrix)
			gl.uniformMatrix4fv(modelViewMatrix, false, transform.matrix.mul(this.#viewMatrix).transpose())
			gl.drawArrays(GL.TRIANGLE_STRIP, 0, 4)
		}
	}

	/** @param {HTMLCanvasElement} target */
	#refreshSize = target => {
		target.width = screen.width
		target.height = screen.height
		this.#width = target.clientWidth
		this.#height = target.clientHeight
		this.#context.viewport(0, 0, target.width, target.height)
		this.#refreshProjection()
	}

	/** Refresh the projection matrix based on the specified parameters */
	#refreshProjection = () => {
		if(this.#ortho)
			this.#projectionMatrix = Matrix4x4.createOrtho(
				this.#width * this.#size,
				this.#height * this.#size,
				this.#nearClip, this.#farClip
			)
		else
			this.#projectionMatrix = Matrix4x4.createPerspective(
				this.#fov * Math.PI / 180,
				this.#width / this.#height,
				this.#nearClip, this.#farClip
			)

		this.#projectionMatrix = this.#projectionMatrix.transpose()
	}


	/**
	 * Primary system instance
	 * @type {RenderSystem}
	 */
	static get instance() {
		return RenderSystem.#instance
	}

	/**
	 * Rendering context
	 * @type {WebGLRenderingContext}
	 */
	static get context() {
		return RenderSystem.#instance.#context
	}

	/**
	 * Display width
	 * @type {number}
	 */
	static get width() {
		return RenderSystem.#instance.#width
	}

	/**
	 * Display height
	 * @type {number}
	 */
	static get height() {
		return RenderSystem.#instance.#height
	}

	/**
	 * Display aspect ratio
	 * @type {number}
	 */
	static get aspectRatio() {
		return RenderSystem.width / RenderSystem.height
	}
}