import {Component} from "../../ecs.js"
import Material from "../../rendering/material.js"
import Mesh from "../../rendering/mesh.js"
import World from "../world.js"

@World.register.component()
export default class Model extends Component {
	#mesh: Mesh
	#material: Material

	public constructor(mesh: Mesh, material?: Material) {
		super()
		this.mesh = mesh
		this.material = material
	}

	public get mesh(): Mesh {
		return this.#mesh
	}

	public set mesh(value: Mesh) {
		this.#mesh = value
	}

	public get material(): Material {
		return this.#material
	}

	public set material(value: Material) {
		this.#material = value
	}
}