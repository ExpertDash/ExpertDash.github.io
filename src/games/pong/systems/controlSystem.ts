import Collider from "../../../common/components/collider.js"
import Transform from "../../../common/components/transform.js"
import World, {Simulator} from "../../../common/world.js"
import {Entities, System} from "../../../ecs.js"
import {vec3} from "../../../math/vec3.js"
import Input from "../../../utils/input.js"
import Controllable from "../components/controllable.js"
import Pong from "../pong.js"

@World.register.system({after: [Simulator.Category.Input]})
export default class ControlSystem extends System {
	public update(entities: Entities): void {
		entities.forEach((t, c, _) => {
			let direction = (Input.held("w") ? 1 : 0) + (Input.held("s") ? -1 : 0)
			let speed = 12.5 * Simulator.deltaTime

			let maxHeight = Pong.height / 2 - (c.boundingBox.max.y - c.boundingBox.min.y) / 2

			t.position = vec3(t.position.x, Math.max(-maxHeight, Math.min(t.position.y + direction * speed, maxHeight)))
		}, Transform, Collider, Controllable)
	}
}