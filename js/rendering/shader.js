import RenderSystem from "../ecs/systems/render-system.js"
import Retriever from "../utils/retriever.js"

export default class Shader {
	/** @type {WebGLProgram} Shader program */
	program

	/** @type {Map.<string, AttributeInfo>} */
	#attributes

	/** @type {Map.<string, UniformInfo>} */
	#uniforms

	/**
	 * @param {string} path Path to glsl shader
	 */
	constructor(path) {
		return new Promise(async resolve => {
			const context = RenderSystem.context
			const program = context.createProgram()

			let source = await Retriever.fetch(path)
	
			let {shader: vert, qualified: vQualified} = Shader.#load(context, "vert", source)
			let {shader: frag, qualified: fQualified} = Shader.#load(context, "frag", source)

			/** @type {Qualified[]} */
			let qualified = [].concat(vQualified, fQualified)

			if(!vert || !frag) {
				resolve(this)

				return
			}

			context.attachShader(program, vert)
			context.attachShader(program, frag)
			context.linkProgram(program)

			if(!context.getProgramParameter(program, WebGLRenderingContext.LINK_STATUS)) {
				console.error(context.getProgramInfoLog(program))
				resolve(this)

				return
			}

			this.program = program
			this.#attributes = new Map(qualified
				.filter(q => q.qualifier == "attribute")
				.map(q => [q.name, {
					type: q.type,
					value: null,
					location: context.getAttribLocation(program, q.name)
				}])
			)
			this.#uniforms = new Map(qualified
				.filter(q => q.qualifier == "uniform")
				.map(q => [q.name, {
					type: q.type,
					value: null,
					location: context.getUniformLocation(program, q.name)
				}])
			)

			resolve(this)
		})
	}

	get attributes() {
		return [...this.#attributes]
	}

	get uniforms() {
		return [...this.#uniforms]
	}

	/**
	 * @param {string} name Attribute name
	 * @return {AttributeInfo}
	 */
	getAttribute(name) {
		return this.#attributes.get(name)
	}

	/**
	 * @param {string} name Uniform name
	 * @return {UniformInfo}
	 */
	getUniform(name) {
		return this.#uniforms.get(name)
	}

	/**
	 * @param {WebGLRenderingContext} context
	 * @param {"frag"|"vert"} target 
	 * @param {string} source 
	 * @return {{shader: WebGLShader, qualified: Qualified[]}}
	 */
	static #load = (context, target, source) => {
		/** @type {GLenum} */
		let type = null

		switch(target) {
			case "vert":
				type = WebGLRenderingContext.VERTEX_SHADER
				source = `#define VERT\n${source}`
				break
			case "frag":
				type = WebGLRenderingContext.FRAGMENT_SHADER
				source = `#define FRAG\n${source}`
				break
		}

		return {
			shader: Shader.#loadType(context, type, source),
			qualified: Shader.#extractQualifiers(source)
		}
	}

	/**
	 * @param {WebGLRenderingContext} context
	 * @param {"frag"|"vert"} target 
	 * @param {string} source 
	 * @return {{shader: WebGLShader, qualified: Qualified[]}}
	 */
	static #loadType = (context, type, source) => {
		const shader = context.createShader(type)
		context.shaderSource(shader, source)
		context.compileShader(shader)
		
		if(!context.getShaderParameter(shader, WebGLRenderingContext.COMPILE_STATUS)) {
			console.error(context.getShaderInfoLog(shader))
			context.deleteShader(shader)

			return null
		}

		return shader
	}

	/**
	 * @param {string} source 
	 * @return {Qualified[]}
	 */
	static #extractQualifiers = source => source
		?.match(/(attribute|uniform)\s+[a-zA-Z0-9]+\s+[a-zA-Z0-9\[\]]+\s*;/g)
		?.map(a => {
			let [qualifier, type, name] = a.replace(/;/g, "").trim().split(/\s+/g)

			return {
				qualifier: qualifier,
				type: type,
				name: name
			}
		}) ?? []
}

/**
 * @typedef {{type: string, location: number}} AttributeInfo
 * @typedef {{type: string, location: WebGLUniformLocation}} UniformInfo
 * @typedef {{qualifier: "uniform|attribute", type: string, name: string}} Qualified
 */