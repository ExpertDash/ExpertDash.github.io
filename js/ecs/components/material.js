import Component from "../component.js"
import Shader from "../../rendering/shader.js"
import ECS from "../ecs.js"

export default class Material extends Component {
	/** @type {Shader} */
	shader

	/** @type {Map.<string, any>} */
	#values

	/**
	 * @param {Shader} shader 
	 */
	constructor(shader) {
		super()
		this.shader = shader
		this.#values = new Map()
	}

	/**
	 * @param {string} name 
	 */
	getValue(name) {
		return this.#values.get(name)
	}

	/**
	 * @param {string} name 
	 * @param {any} value 
	 * @return {Material}
	 */
	setValue(name, value) {
		this.#values.set(name, value)

		return this
	}

	/**
	 * Applies the material to the render flow
	 * @param {WebGLRenderingContext} context 
	 */
	apply(context) {
		for(let attribute of this.shader.attributes) {
			let [name, info] = attribute

			if(!this.#values.has(name))
				continue

			let value = this.#values.get(name)

			switch(info.type) {
				case "bool":
				case "int":
				case "uint":
				case "float":
				case "double":
					context.vertexAttrib1f(info.location, value)
					break
				case "vec2":
					context.vertexAttrib2fv(info.location, value)
					break
				case "vec3":
					context.vertexAttrib3fv(info.location, value)
					break
				case "vec4":
					context.vertexAttrib4fv(info.location, value)
					break
				default:
					console.error(`Unsupported shader attribute ${name}`)
					break
			}
		}

		for(let uniform of this.shader.uniforms) {
			let [name, info] = uniform

			if(!this.#values.has(name))
				continue

			let value = this.#values.get(name)

			switch(info.type) {
				case "bool":
				case "int":
				case "uint":
					context.uniform1i(info.location, value)
					break
				case "float":
				case "double":
					context.uniform1f(info.location, value)
					break
				case "vec2":
					context.uniform2fv(info.location, value)
					break
				case "vec3":
					context.uniform3fv(info.location, value)
					break
				case "vec4":
					context.uniform4fv(info.location, value)
					break
				case "mat2":
					context.uniformMatrix2fv(info.location, false, value)
					break
				case "mat3":
					context.uniformMatrix3fv(info.location, false, value)
					break
				case "mat4":
					context.uniformMatrix4fv(info.location, false, value)
					break
				default:
					console.error(`Unsupported shader uniform ${name}`)
					break
			}
		}
	}
}

ECS.registerComponent(Material)