import Entity from "../entity.js"
import System, {Category} from "../system.js"
import Transform from "../components/transform.js"
import Collider from "../components/collider.js"
import Mesh from "../components/mesh.js"
import Collision from "../../physics/collision.js"

/** Provides collision detection */
export default class CollisionSystem extends System {
	update() {
		let entities = Entity.find(Transform, Mesh, Collider)

		//Calculate global bounding boxes
		for(let entity of entities) {
			let [transform, mesh, collider] = [entity.get(Transform), entity.get(Mesh), entity.get(Collider)]
			collider.calculateBoundingBox(mesh, transform)
			collider.clearCollisions()
		}

		//Check collisions
		while(entities.length > 0) {
			let entity = entities.pop()
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

	get category() {
		return Category.Physics
	}
}