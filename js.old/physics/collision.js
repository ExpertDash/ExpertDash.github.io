import Vector3 from "../math/vec3.js"
import Entity from "../ecs/entity.js"

export default class Collision {
	/**
	 * Id of entity collided with
	 * @type {number}
	 */
	entityId

	/**
	 * Collision points
	 * @type {Vector3[]}
	 */
	points

	/**
	 * @param {Entity} entity 
	 * @param {Vector3[]} points 
	 */
	constructor(entity, points) {
		this.entityId = entity.id
		this.points = points
	}
}