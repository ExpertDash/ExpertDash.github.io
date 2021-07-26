import {Collider, Model, Motion, MotionSystem, Name, RenderSystem, TextSystem, Transform} from "../../common/lib.js"
import {Ball, Controllable, CpuController, Ownership, Wall} from "./components/lib.js"
import {BallSystem, CpuSystem} from "./systems/lib.js"
import World, {Simulator} from "../../common/world.js"
import {Entities, System} from "../../ecs.js"
import Vector3, {vec3} from "../../math/vec3.js"
import Material from "../../rendering/material.js"
import Mesh from "../../rendering/mesh.js"
import Shader from "../../rendering/shader.js"

type Mode = "sp" | "host" | "guest"

async function play(mode: Mode): Promise<void> {
	document.querySelector<HTMLElement>("#menu").style.display = "none"
	document.querySelector("canvas").style.display = "block"

	let renderSystem = World.systems.get(RenderSystem)
	renderSystem.size = 0.015

	let shader = await Shader.load("./resources/shaders/flat.glsl")
	let mat = new Material(shader).setValue("color", [1, 1, 1])

	let ball = World.entities.create(
		new Name("Ball"),
		new Transform({scale: vec3(0.2, 0.2, 1)}),
		new Model(Mesh.Primitives.quad, mat),
		Collider,
		Ball
	)

	let leftBoard = World.entities.create(
		new Name("Right Board"),
		new Transform({position: vec3(-Pong.width * 0.425, 0), scale: vec3(0.2, 1, 1)}),
		new Model(Mesh.Primitives.quad, mat),
		Collider
	)

	let rightBoard = World.entities.create(
		new Name("Right Board"),
		new Transform({position: vec3(Pong.width * 0.425, 0), scale: vec3(0.2, 1, 1)}),
		new Model(Mesh.Primitives.quad, mat),
		Collider
	)

	World.entities.create(
		new Transform({position: Vector3.back, scale: vec3(Pong.width * 0.525, Pong.height * 0.54, 1)}),
		new Model(Mesh.Primitives.quad, new Material(shader).setValue("color", [1, 1, 1])),
		Wall
	)

	World.entities.create(
		new Transform({position: Vector3.back, scale: vec3(Pong.width * 0.5, Pong.height * 0.5, 1)}),
		new Model(Mesh.Primitives.quad, new Material(shader).setValue("color", [0, 0, 0]))
	)

	switch(mode) {
		case "sp":
			leftBoard.add(Controllable)
			rightBoard.add(new CpuController(0.1))
			break
		case "host":
			World.systems.remove(CpuSystem)

			leftBoard.add(Ownership, Controllable)
			ball.add(Ownership)
			break
		default:
			World.systems.remove(
				MotionSystem,
				BallSystem,
				CpuSystem
			)

			rightBoard.add(Ownership, Controllable)
			break
	}

	console.log([...World.systems])

	Pong.resetRound()
}

document.querySelector("#sp").addEventListener("click", () => play("sp"))
document.querySelector("#host").addEventListener("click", () => play("host"))
document.querySelector("#join").addEventListener("click", () => play("guest"))
document.querySelector<HTMLInputElement>("#code > input").addEventListener("keydown", e => {
	switch(e.keyCode) {
		case 13:
			play("guest")
			break
	}
})

function hasParameter(name: string) {
	return location.hash.slice(1).split(',').indexOf(name) != -1
}

if(hasParameter("singleplayer"))
	play("sp")

export default class Pong {
	public static resetRound(): void {
		World.entities.forEach((ball, motion, transform) => {
			let speed = 0.2
			let angle = Math.round(Math.random() * 15) * Math.PI / 7
			motion.velocity = new Vector3(Math.cos(angle), Math.sin(angle)).mul(0.2)
			transform.position = new Vector3(0, (Math.random() - 0.5) * Pong.height)

			if(hasParameter("deterministic")) {
				motion.velocity = new Vector3(-speed)
				transform.position = Vector3.zero
			}
		}, Ball, Motion, Transform)

		Simulator.suspend()
		Simulator.resume()
	}

	public static get width() {
		return 12
	}

	public static get height() {
		return 8
	}
}

@World.register.system({after: [Simulator.Category.UI, TextSystem]})
class DebugSystem extends System {
	public update(entities: Entities): void {
		let textSystem = World.systems.get(TextSystem)

		entities.forEach((transform, name) => {
			textSystem.text(transform.position, `${name}`, {color: "dimgray"})
		}, Transform, Name)
	}
}