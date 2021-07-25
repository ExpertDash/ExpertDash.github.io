import Collision from "../../physics/collision.js"
import {System} from "../../ecs.js"
import Entities from "../../ecs/entities.js"
import World, {Simulator} from "../world.js"
import {Collider, Model, MotionSystem, Transform} from "../lib.js"

/** Provides collision detection */
@World.register.system({after: [Simulator.Category.Physics, MotionSystem]})
export default class CollisionSystem extends System {
	public override update(entities: Entities): void {
		let matching = [...entities.with(Transform, Model, Collider)]

		//Calculate global bounding boxes
		for(let entity of matching) {
			let [transform, model, collider] = [entity.get(Transform), entity.get(Model), entity.get(Collider)]
			collider.calculateBoundingBox(model.mesh, transform)
			collider.clearCollisions()
		}

		//Check collisions
		while(matching.length > 0) {
			let entity = matching.pop()
			let collider = entity.get(Collider)

			for(let otherEntity of entities) {
				let otherCollider = otherEntity.get(Collider)

				if(collider.boundingBox.collides(otherCollider.boundingBox)) {
					collider.addCollision(new Collision(otherEntity, []))
					otherCollider.addCollision(new Collision(entity, []))
				}
			}
		}
	}
}