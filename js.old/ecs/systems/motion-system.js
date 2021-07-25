import System, {Category} from "../system.js"
import Entity from "../entity.js"
import ECS from "../ecs.js"
import Motion from "../components/motion.js"
import Transform from "../components/transform.js"
import Vector3 from "../../math/vec3.js"
import seq from "../../math/seq.js"

/** Simulates physical motion for entities with a motion component */
export default class MotionSystem extends System {
	update() {
		for(let entity of Entity.find(Transform, Motion)) {
			let [transform, motion] = [entity.get(Transform), entity.get(Motion)]

			motion.velocity = seq`${motion.acceleration} * ${ECS.fixedDeltaTime * ECS.fixedDeltaTime} + ${motion.velocity}`
			motion.acceleration = Vector3.zero
			transform.position = seq`${transform.position} + ${motion.velocity}`
		}
	}

	get category() {
		return Category.Physics
	}
}