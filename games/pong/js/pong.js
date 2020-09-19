import Entity from "../../../js/ecs/entity.js"
import System from "../../../js/ecs/system.js"
import ECS from "../../../js/ecs/ecs.js"

import CollisionSystem from "../../../js/ecs/systems/collision-system.js"
import RenderSystem from "../../../js/ecs/systems/render-system.js"
import MotionSystem from "../../../js/ecs/systems/motion-system.js"
import MouseSystem from "../../../js/ecs/systems/mouse-system.js"
import TimeSystem from "../../../js/ecs/systems/time-system.js"
import TextSystem from "../../../js/ecs/systems/text-system.js"
import KeySystem from "../../../js/ecs/systems/key-system.js"

import Transform from "../../../js/ecs/components/transform.js"
import Material from "../../../js/ecs/components/material.js"
import Collider from "../../../js/ecs/components/collider.js"
import Motion from "../../../js/ecs/components/motion.js"
import Name from "../../../js/ecs/components/name.js"
import Mesh from "../../../js/ecs/components/mesh.js"

import Shader from "../../../js/rendering/shader.js"
import Vector3 from "../../../js/math/vec3.js"
import Lobby from "../../../js/utils/lobby.js"

import {ClientSystem, ServerSystem} from "./systems/network-system.js"
import ControlSystem from "./systems/control-system.js"
import BallSystem from "./systems/ball-system.js"
import AISystem from "./systems/ai-system.js"

import AIController from "./components/ai-controller.js"
import Controllable from "./components/controllable.js"
import Ownership from "./components/ownership.js"
import Ball from "./components/ball.js"
import Wall from "./components/wall.js"

ECS.start()

/**
 * @param {string} mode 
 */
async function play(mode) {
	document.querySelector("#menu").style.display = "none"
	document.querySelector("canvas").style.display = "block"

	let renderSystem = new RenderSystem(document.querySelector("canvas"))
	renderSystem.size = 0.015

	ECS.enableSystem(
		renderSystem,
		new KeySystem(document.querySelector("body")),
		new MouseSystem(document.querySelector("body")),
		TimeSystem,
		ControlSystem
	)

	let shader = await new Shader("./shaders/flat.glsl")
	let mat = new Material(shader).setValue("color", [1, 1, 1])

	let ball = Entity.spawn(
		new Name("Ball"),
		new Transform(null, 0, new Vector3(0.2, 0.2, 1)),
		new Collider(),
		new Motion(),
		new Ball(),
		Mesh.quad,
		mat
	)

	let leftBoard = Entity.spawn(
		new Name("Left Board"),
		new Transform(new Vector3(-Pong.width * 0.425, 0.5), 0, new Vector3(0.2, 1, 1)),
		new Collider(),
		Mesh.quad,
		mat
	)

	let rightBoard = Entity.spawn(
		new Name("Right Board"),
		new Transform(new Vector3(Pong.width * 0.425, 0), 0, new Vector3(0.2, 1, 1)),
		new Collider(),
		Mesh.quad,
		mat
	)

	Entity.spawn(
		new Transform(Vector3.back, 0, new Vector3(Pong.width * 0.525, Pong.height * 0.54, 1)),
		Mesh.quad,
		new Material(shader).setValue("color", [1, 1, 1]),
		new Wall()
	)

	Entity.spawn(
		new Transform(Vector3.back, 0, new Vector3(Pong.width * 0.5, Pong.height * 0.5, 1)),
		Mesh.quad,
		new Material(shader).setValue("color", [0, 0, 0])
	)

	let lobbyAddress = document.querySelector("#address > input").value
	let lobbyCode = parseInt(document.querySelector("#code > input").value)

	switch(mode) {
		case "sp":
			ECS.enableSystem(
				MotionSystem,
				CollisionSystem,
				BallSystem,
				AISystem
			)

			leftBoard.introduce(new Controllable())
			rightBoard.introduce(new AIController(0.1))
			break
		case "host": {
			ECS.enableSystem(
				ServerSystem,
				MotionSystem,
				CollisionSystem,
				BallSystem
			)

			leftBoard.introduce(new Ownership(), new Controllable())
			ball.introduce(new Ownership())

			ServerSystem.host.onConnect = () => console.log("Connected to client")
			let {code} = await new Lobby(lobbyAddress, ServerSystem.host)
			prompt("Lobby Code", code.toString())
			break
		}
		case "guest": {
			ECS.enableSystem(ClientSystem)
			rightBoard.introduce(new Ownership(), new Controllable())

			ClientSystem.guest.onConnect = () => console.log("Connected to server")
			await Lobby.join(lobbyAddress, lobbyCode, ClientSystem.guest)
			break
		}
	}

	Pong.resetRound()
}

document.querySelector("#sp").addEventListener("click", () => play("sp"))
document.querySelector("#host").addEventListener("click", () => play("host"))
document.querySelector("#join").addEventListener("click", () => play("guest"))
document.querySelector("#code > input").addEventListener("keydown", e => {
	switch(e.keyCode) {
		case 13:
			play("guest")
			break
	}
})

/**
 * @param {number} name 
 */
function hasParameter(name) {
	return location.hash.slice(1).split(',').indexOf(name) != -1
}

if(hasParameter("singleplayer"))
	play("sp")

export default class Pong {
	static resetRound() {
		for(let ball of Entity.find(Ball)) {
			let speed = 0.2
			let angle = Math.round(Math.random() * 15) * Math.PI / 7
			ball.get(Motion).velocity = new Vector3(Math.cos(angle), Math.sin(angle)).mul(0.2)
			ball.get(Transform).position = new Vector3(0, (Math.random() - 0.5) * Pong.height)

			if(hasParameter("deterministic")) {
				ball.get(Motion).velocity = new Vector3(-speed)
				ball.get(Transform).position = Vector3.zero
			}
		}
	}

	static get width() {
		return 12
	}

	static get height() {
		return 8
	}
}

import {Category} from "../../../js/ecs/system.js"

class DebugSystem extends System {
	update() {
		for(let entity of Entity.find(Transform, Name)) {
			let transform = entity.get(Transform)
			let name = entity.get(Name)

			TextSystem.text(transform.position, `${name}`, {color: "dimgray"})
		}
	}

	get category() { return Category.UI }
	get predecessors() { return [TextSystem] }
}

ECS.enableSystem(TextSystem, DebugSystem)