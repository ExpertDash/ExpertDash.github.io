import Pong from "../pong.js"
import System from "../../../../js/ecs/system.js"
import Entity, {entity} from "../../../../js/ecs/entity.js"
import Transform from "../../../../js/ecs/components/transform.js"
import Collider from "../../../../js/ecs/components/collider.js"
import Motion from "../../../../js/ecs/components/motion.js"
import Ball from "../components/ball.js"
import Vector3, {vec3} from "../../../../js/math/vec3.js"
import Wall from "../components/wall.js"
import Material from "../../../../js/ecs/components/material.js"
import ECS from "../../../../js/ecs/ecs.js"

export default class BallSystem extends System {
	update() {
		let [wall] = Entity.find(Wall, Material)

		for(let e of Entity.find(Transform, Collider, Ball, Motion)) {
			let transform = e.get(Transform)
			let collider = e.get(Collider)
			let motion = e.get(Motion)

			let speed = motion.velocity.magnitude
			let bb = collider.boundingBox
			let maxWidth = Pong.width / 2 - (bb.max.x - bb.min.x) / 2
			let maxHeight = Pong.height / 2 - (bb.max.y - bb.min.y) / 2

			if(collider.collided) {
				let [collision] = collider.collisions

				entity(collision.entityId).try(Transform, t => {
					let r = Vector3.angle(t.position, transform.position) * Math.PI / 180
					console.log(r * 180 / Math.PI)
					motion.velocity = vec3(Math.cos(r), Math.sin(r)).mul(speed)
				})
			}
			
			if(Math.abs(transform.position.y) > maxHeight) {
				motion.velocity = new Vector3(
					motion.velocity.x,
					(transform.position.y < 0 ? 1 : -1) * speed
				)

				if(wall) {
					let mat = wall.get(Material)
					let [,, b] = mat.getValue("color")
					mat.setValue("color", [0.5, 0.5, b])
				}
			} else {
				if(wall) {
					let mat = wall.get(Material)
					let [r, g, b] = mat.getValue("color")

					let incr = 3 * ECS.deltaTime
					mat.setValue("color", [
						Math.min(1, r + incr),
						Math.min(1, g + incr),
						b
					])
				}
			}

			if(Math.abs(transform.position.x) > maxWidth)
				Pong.resetRound()
		}
	}
}