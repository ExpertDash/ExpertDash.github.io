import RenderSystem from "../common/systems/renderSystem.js"
import World from "../common/world.js"
import Retriever from "../utils/retriever.js"

type ShaderArchetype = "vert" | "frag"
type Qualifier = "uniform" | "attribute"

type AttributeInfo = {type: string, location: number}
type UniformInfo = {type: string, location: WebGLUniformLocation}
type Qualified = {qualifier: Qualifier, type: string, name: string}

export default class Shader {
	public readonly program: WebGLProgram
	#attributes: Map<string, AttributeInfo>
	#uniforms: Map<string, UniformInfo>

	private constructor(program: WebGLProgram) {
		this.program = program
	}

	public get attributes(): IterableIterator<string> {
		return this.#attributes.keys()
	}

	public get uniforms(): IterableIterator<string> {
		return this.#uniforms.keys()
	}

	public getAttribute(name: string): AttributeInfo {
		return this.#attributes.get(name)
	}

	public getUniform(name: string): UniformInfo {
		return this.#uniforms.get(name)
	}

	/**
	 * 
	 * @param path Path to GLSL shader
	 */
	public static async create(path: string): Promise<Shader> {
		const context = World.systems.get(RenderSystem).context
		const program = context.createProgram()

		let source = await Retriever.fetch(path)

		let {shader: vert, qualified: vQualified} = Shader.load(context, "vert", source)
		let {shader: frag, qualified: fQualified} = Shader.load(context, "frag", source)

		/** @type {Qualified[]} */
		let qualified = [].concat(vQualified, fQualified)

		if(!vert)
			throw new Error(`Missing vertex shader at: '${path}'`)

		if(!frag)
			throw new Error(`Missing fragment shader at: '${path}'`)

		context.attachShader(program, vert)
		context.attachShader(program, frag)
		context.linkProgram(program)

		if(!context.getProgramParameter(program, WebGLRenderingContext.LINK_STATUS))
			throw context.getProgramInfoLog(program)

		let shader = new Shader(program)

		shader.#attributes = new Map(qualified
			.filter(q => q.qualifier == "attribute")
			.map(q => [q.name, {
				type: q.type,
				value: null,
				location: context.getAttribLocation(program, q.name)
			}])
		)

		shader.#uniforms = new Map(qualified
			.filter(q => q.qualifier == "uniform")
			.map(q => [q.name, {
				type: q.type,
				value: null,
				location: context.getUniformLocation(program, q.name)
			}])
		)

		return shader
	}

	private static load = (context: WebGLRenderingContext, target: ShaderArchetype, source: string): {shader: WebGLShader, qualified: Qualified[]} => {
		let type: GLenum

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
			shader: Shader.loadType(context, type, source),
			qualified: Shader.extractQualifiers(source)
		}
	}

	private static loadType = (context: WebGLRenderingContext, type: GLenum, source: string): WebGLShader => {
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

	private static extractQualifiers = (source: string): Qualified[] => source
		?.match(/(attribute|uniform)\s+[a-zA-Z0-9]+\s+[a-zA-Z0-9\[\]]+\s*;/g)
		?.map(a => {
			let [qualifier, type, name] = a.replace(/;/g, "").trim().split(/\s+/g)

			return {
				qualifier: qualifier as Qualifier,
				type: type,
				name: name
			}
		}) ?? []
}