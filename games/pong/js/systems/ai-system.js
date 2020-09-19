import Pong from "../pong.js"
import System from "../../../../js/ecs/system.js"
import Entity from "../../../../js/ecs/entity.js"
import Transform from "../../../../js/ecs/components/transform.js"
import AIController from "../components/ai-controller.js"
import Vector3 from "../../../../js/math/vec3.js"
import Ball from "../components/ball.js"

export default class AISystem extends System {
	update() {
		for(let entity of Entity.find(Transform, AIController)) {
			let transform = entity.get(Transform)
			let ai = entity.get(AIController)

			let [ball] = Entity.find(Transform, Ball).sort((a, b) => transform.position.sub(b.get(Transform).position) - transform.position.sub(a.get(Transform).position))

			if(!ball)
				continue

			let t = ball.get(Transform)
			let delta = t.position.y - transform.position.y

			if(Math.abs(delta) < transform.scale.y * 0.8)
				return

			transform.position = new Vector3(
				transform.position.x,
				Math.max(-Pong.height / 2, Math.min(transform.position.y + Math.sign(delta) * Math.min(ai.speed, Math.abs(delta)), Pong.height / 2))
			)
		}
	}
}