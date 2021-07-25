import Entity from "./entity.js"

/**
 * Describes an aspect of an entity
 */
export default abstract class Component {
	/**
	 * Called just after this component has been added to an entity
	 * @param Entity this component was added to
	 */
	protected added(entity: Entity): void {}

	/**
	 * Called just before this component has been removed from an entity
	 * @param entity Entity this component was removed from
	 */
	protected removed(entity: Entity): void {}
}