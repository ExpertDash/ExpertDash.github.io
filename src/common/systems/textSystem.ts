import {System} from "../../ecs.js"
import Entities from "../../ecs/entities.js"
import Vector3 from "../../math/vec3.js"
import World, {Simulator} from "../world.js"
import RenderSystem from "./renderSystem.js"

type TextOptions = {color: string}

@World.register.system<typeof TextSystem>({after: [Simulator.Category.UI]})
export default class TextSystem extends System {
	private requested: [Vector3, string, TextOptions][] = []
	private created: HTMLDivElement[] = []

	public update(_: Entities) {
		const renderSystem = World.systems.get(RenderSystem)

		while(this.created.length > 0)
			this.created.pop().remove()

		while(this.requested.length > 0) {
			let [p, s, options] = this.requested.pop()
			let text = document.createElement("div")
			text.textContent = s
			text.style.color = options.color
			text.style.position = "absolute"
			text.style.userSelect = "none"

			let r = renderSystem.ortho ? renderSystem.size : NaN
			text.style.left = Math.round(renderSystem.width / 2 + p.x / r).toString()
			text.style.bottom = Math.round(renderSystem.height / 2 + p.y / r).toString()

			document.querySelector("body").appendChild(text)
			this.created.push(text)
		}
	}

	public text(position: Vector3, value: string, options: TextOptions = {color: "white"}): void {
		this.requested.push([position, value, options])
	}
}