import {System} from "../../ecs.js"
import Entities from "../../ecs/entities.js"
import Vector3 from "../../math/vec3.js"
import Motion from "../components/motion.js"
import Transform from "../components/transform.js"
import World, {Simulator} from "../world.js"

/** Simulates physical motion for entities with a motion component */
@World.register.system<typeof MotionSystem>(Simulator.phase(Simulator.Category.Physics))
export default class MotionSystem extends System {
	public update(entities: Entities): void {
		entities.forEach((transform, motion) => {
			//motion.acceleration * Simulator.fixedDeltaTime * Simulator.fixedDeltaTime + motion.velocity
			motion.velocity = motion.acceleration.mul(Simulator.fixedDeltaTime * Simulator.fixedDeltaTime).add(motion.velocity)

			motion.acceleration = Vector3.zero

			//transform.position + motion.velocity
			transform.position = transform.position.add(motion.velocity)
		}, Transform, Motion)
	}
}