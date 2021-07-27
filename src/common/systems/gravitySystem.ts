import {System, Entities} from "../../ecs.js"
import Vector3 from "../../math/vec3.js"
import Motion from "../components/motion.js"
import World, {Simulator} from "../world.js"
import MotionSystem from "./motionSystem.js"

/** Simulates 2d gravity for entities with a motion component */
@World.register.system<typeof GravitySystem>(Simulator.phase(Simulator.Category.Physics, {before: [MotionSystem]}), 9.81)
export default class GravitySystem extends System {
	public acceleration: number

	public constructor(acceleration: number) {
		super()
		this.acceleration = acceleration
	}

	public update(entities: Entities): void {
		entities.forEach(motion => {
			//Vector3.down * this.acceleration + motion.acceleration
			motion.acceleration = Vector3.down.mul(this.acceleration).add(motion.acceleration)
		}, Motion)
	}
}