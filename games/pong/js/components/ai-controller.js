import Component from "../../../../js/ecs/component.js"
import Entity from "../../../../js/ecs/entity.js"
import ECS from "../../../../js/ecs/ecs.js"

export default class AIController extends Component {
	/** @type {number} */
	speed

	/**
	 * @param {Entity} target 
	 */
	constructor(speed, target) {
		super()
		this.speed = speed
	}
}

ECS.registerComponent(AIController)