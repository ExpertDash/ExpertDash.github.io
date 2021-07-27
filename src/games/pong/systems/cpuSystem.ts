import {Transform} from "../../../common/lib.js"
import World, {Simulator} from "../../../common/world.js"
import {Entities, System} from "../../../ecs.js"
import {vec3} from "../../../math/vec3.js"
import Ball from "../components/ball.js"
import CpuController from "../components/cpuController.js"
import Pong from "../main.js"

@World.register.system(Simulator.phase(Simulator.Category.Input))
export default class CpuSystem extends System {
	public update(entities: Entities): void {
		entities.forEach((cpu, transform) => {
			let balls = [...entities.with(Ball)]

			balls.sort((a, b) => {
				let sqrDistA = transform.position.sub(a.get(Transform).position).sqrMagnitude
				let sqrDistB = transform.position.sub(b.get(Transform).position).sqrMagnitude

				return sqrDistB - sqrDistA
			})

			if(balls.length == 0)
				return

			let [ball] = balls

			let ballTransform = ball.get(Transform)
			let delta = ballTransform.position.y - transform.position.y

			if(Math.abs(delta) < transform.scale.y * 0.8)
				return

			transform.position = vec3(
				transform.position.x,
				Math.max(-Pong.height / 2, Math.min(transform.position.y + Math.sign(delta) * Math.min(cpu.speed, Math.abs(delta)), Pong.height / 2))
			)
		}, CpuController, Transform)
	}
}