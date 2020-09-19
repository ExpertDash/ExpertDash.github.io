import ECS from "./ecs.js"

/**
 * Determines which group a system is updated with and what predecessors are possible
 * @enum {Symbol}
 */
export const Category = Object.freeze({
	Physics: Symbol("Physics"),
	Input: Symbol("Input"),
	Logic: Symbol("Logic"),
	Graphics: Symbol("Graphics"),
	UI: Symbol("UI")
})

/**
 * Category order
 * @type {Map.<Category, number>}
 */
export const CategoryOrder = new Map([
	Category.Physics,
	Category.Input,
	Category.Logic,
	Category.UI,
	Category.Graphics
].map((v, i) => [v, i]))

/**
 * Updates entities based on their components
 */
export default class System {
	/**
	 * @returns {function(new: System)[]} Systems in the same category to be updated prior
	 */
	get predecessors() {
		return []
	}

	/**
	 * @returns {Category} Determines which systems this is updated with
	 */
	get category() {
		return Category.Logic
	}

	/** Update this system */
	update() {
		throw new Error(`Update not implemented for ${this.constructor.name}`)
	}

	/**
	 * The phase at which this system is updated.
	 * 
	 * Evaluated based on the system's category and predecessors
	 */
	static get phase() {
		return ECS.systems.findIndex(s => s.constructor == this)
	}
}