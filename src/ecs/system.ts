import Entities from "./entities.js"

type Constructor<T> = new(...args: any[]) => T

/**
 * Simulates behaviour for objects matching a criterion
 */
export abstract class System {
	/**
	 * Update matching entities
	 */
	public abstract update(entities: Entities): void
}

export namespace System {
	export interface Order {
		/** Systems which this system must be updated before */
		before?: Constructor<System>[]
	
		/** Systems which this system must be updated after */
		after?: Constructor<System>[]
	}
}

export default System