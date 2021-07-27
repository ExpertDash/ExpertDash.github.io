import {Collider, Model, Motion, Transform} from "../../../common/lib.js"
import World, {Simulator} from "../../../common/world.js"
import {Entities} from "../../../ecs.js"
import Vector3, {vec3} from "../../../math/vec3.js"
import {Ball, Wall} from "../components/lib.js"
import Pong from "../main.js"

@World.register.system(Simulator.phase(Simulator.Category.Physics))
export default class BallSystem {
	public update(entities: Entities): void {
		let walls = [...entities.with(Wall, Model)]

		if(walls.length == 0)
			return

		let [wall] = walls

		entities.forEach((ball, transform, motion, collider) => {
			let speed = motion.velocity.magnitude
			let bb = collider.boundingBox
			let maxWidth = Pong.width / 2 - (bb.max.x - bb.min.x) / 2
			let maxHeight = Pong.height / 2 - (bb.max.y - bb.min.y) / 2

			if(collider.collided) {
				let [collision] = collider.collisions

				entities.from(collision.entityId).run(t => {
					let r = Vector3.angle(t.position, transform.position) * Math.PI / 180
					// console.log(r * 180 / Math.PI)
					motion.velocity = vec3(Math.cos(r), Math.sin(r)).mul(speed)
				}, Transform)
			}
			
			if(Math.abs(transform.position.y) > maxHeight) {
				motion.velocity = vec3(
					motion.velocity.x,
					(transform.position.y < 0 ? 1 : -1) * speed
				)

				if(wall) {
					let model = wall.get(Model)
					let [,, b] = model.material.getValue<[number, number, number]>("color")
					model.material.setValue("color", [0.5, 0.5, b])
				}
			} else {
				if(wall) {
					let model = wall.get(Model)
					let [r, g, b] = model.material.getValue("color")

					let incr = 3 * Simulator.deltaTime

					model.material.setValue("color", [
						Math.min(1, r + incr),
						Math.min(1, g + incr),
						b
					])
				}
			}

			if(Math.abs(transform.position.x) > maxWidth)
				Pong.resetRound()
		}, Ball, Transform, Motion, Collider)
	}
}