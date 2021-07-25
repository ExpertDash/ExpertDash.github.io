import Shader from "./shader.js"

export default class Material {
	public readonly shader: Shader
	#values: Map<string, any>

	public constructor(shader: Shader) {
		this.shader = shader
		this.#values = new Map()
	}

	public getValue<T>(name: string): T {
		return this.#values.get(name) as T
	}

	public setValue<T>(name: string, value: T): Material {
		this.#values.set(name, value)
		return this
	}

	/**
	 * Applies the material to the render flow
	 */
	public apply(context: WebGLRenderingContext) {
		for(let name of this.shader.attributes) {
			let attribute = this.shader.getAttribute(name)

			if(!this.#values.has(name))
				continue

			let value = this.#values.get(name)

			switch(attribute.type) {
				case "bool":
				case "int":
				case "uint":
				case "float":
				case "double":
					context.vertexAttrib1f(attribute.location, value)
					break
				case "vec2":
					context.vertexAttrib2fv(attribute.location, value)
					break
				case "vec3":
					context.vertexAttrib3fv(attribute.location, value)
					break
				case "vec4":
					context.vertexAttrib4fv(attribute.location, value)
					break
				default:
					console.error(`Unsupported shader attribute ${name}`)
					break
			}
		}

		for(let name of this.shader.uniforms) {
			let uniform = this.shader.getUniform(name)

			if(!this.#values.has(name))
				continue

			let value = this.#values.get(name)

			switch(uniform.type) {
				case "bool":
				case "int":
				case "uint":
					context.uniform1i(uniform.location, value)
					break
				case "float":
				case "double":
					context.uniform1f(uniform.location, value)
					break
				case "vec2":
					context.uniform2fv(uniform.location, value)
					break
				case "vec3":
					context.uniform3fv(uniform.location, value)
					break
				case "vec4":
					context.uniform4fv(uniform.location, value)
					break
				case "mat2":
					context.uniformMatrix2fv(uniform.location, false, value)
					break
				case "mat3":
					context.uniformMatrix3fv(uniform.location, false, value)
					break
				case "mat4":
					context.uniformMatrix4fv(uniform.location, false, value)
					break
				default:
					console.error(`Unsupported shader uniform ${name}`)
					break
			}
		}
	}
}