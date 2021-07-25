import Vector3 from "../math/vec3.js"
import Entity from "../ecs/entity.js"

export default class Collision {
	/** Id of entity collided with */
	public readonly entityId: number

	/** Collision points */
	public readonly points: ReadonlyArray<Vector3>

	public constructor(entity: Entity, points: Vector3[] | readonly Vector3[]) {
		this.entityId = entity.id
		this.points = points
	}
}