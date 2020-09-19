import ECS from "../../../../js/ecs/ecs.js"
import System from "../../../../js/ecs/system.js"
import Entity from "../../../../js/ecs/entity.js"
import Transform from "../../../../js/ecs/components/transform.js"
import Controllable from "../components/controllable.js"
import {vec3} from "../../../../js/math/vec3.js"
import Input from "../../../../js/utils/input.js"
import Pong from "../pong.js"
import Collider from "../../../../js/ecs/components/collider.js"

export default class ControlSystem extends System {
	update() {
		for(let entity of Entity.find(Transform, Collider, Controllable)) {
			let t = entity.get(Transform)
			let c = entity.get(Collider)

			let direction = (Input.held("w") ? 1 : 0) + (Input.held("s") ? -1 : 0)
			let speed = 12.5 * ECS.deltaTime

			let maxHeight = Pong.height / 2 - (c.boundingBox.max.y - c.boundingBox.min.y) / 2

			t.position = vec3(t.position.x, Math.max(-maxHeight, Math.min(t.position.y + direction * speed, maxHeight)))
		}
	}
}