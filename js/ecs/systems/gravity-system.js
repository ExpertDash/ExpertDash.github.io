import System, {Category} from "../system.js"
import Entity from "../entity.js"
import MotionSystem from "./motion-system.js"
import Motion from "../components/motion.js"
import Vector2 from "../../math/vec2.js"
import seq from "../../math/seq.js"

/** Simulates 2d gravity for entities with a motion component */
export default class GravitySystem extends System {
	update() {
		for(let entity of Entity.find(Motion)) {
			let motion = entity.get(Motion)
			motion.acceleration = seq`${Vector2.down} * ${9.81} + ${motion.acceleration}`
		}
	}

	get category() {
		return Category.Physics
	}

	get predecessors() {
		return [MotionSystem]
	}
}