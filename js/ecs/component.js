import Entity from "./entity.js"

/**
 * A particular aspect possessed by an an Entity.
 * 
 * An Entity can only have one instance of a component.
 */
export default class Component {
	/**
	 * Called when added/re-added to an Entity
	 * @param {Entity} entity Entity which the component was introduced to
	 */
	introduced(entity) {}

	/**
	 * Called when removed from an Entity
	 * @param {Entity} entity Entity which the component was dismissed from
	 */
	dismissed(entity) {}
}