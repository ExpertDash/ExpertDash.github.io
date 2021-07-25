import Component from "./ecs/component.js"
import Entities from "./ecs/entities.js"
import Entity from "./ecs/entity.js"
import System from "./ecs/system.js"
import Systems from "./ecs/systems.js"

type Constructor<T> = new(...args: any[]) => T
type ConstructorInstance<T extends Constructor<any>> = new(...args: ConstructorParameters<T>) => InstanceType<T>

/**
 * Defines a world containing a set of entities operating under a set of systems
 */
export class ECS {
	/** Collection of objects with bound components  */
	public readonly entities: Entities = new Entities()

	/** Collection of systems governing entity behavior */
	public readonly systems: Systems = new Systems()

	/** Enables components and systems to be registered under this world instance */
	public readonly register: ECS.Register = new ECS.Register(this)

	/**
	 * Perform one iteration of updates on all systems in the appropriate order
	 */
	public step(): void {
		for(let system of this.systems)
			system.update(this.entities)
	}
}

export namespace ECS {
	export class Register {
		private readonly ecs: ECS

		public constructor(ecs: ECS) {
			this.ecs = ecs
		}

		/**
		 * Registers a component type that may be associated with entities
		 * @template T Component type
		 */
		public component<T extends Component>() {
			return <U extends Constructor<T>>(ctor: U) => {
				this.ecs.entities["registry"].set(ctor, new Map())	
				return ctor
			}
		}

		/**
		 * 
		 * @param param0 Defines order of the system relative to others
		 * @param args Parameters to construct the system instance with
		 */
		public system<T extends Constructor<System>>({before, after}: System.Order, ...args: ConstructorParameters<T>): (ctor: ConstructorInstance<T>) => T

		/**
		 * @param args Parameters to construct the system instance with
		 */
		public system<T extends Constructor<System>>(...args: ConstructorParameters<T>): (ctor: ConstructorInstance<T>) => T

		public system<T extends Constructor<System>>(...par1: [System.Order, ...ConstructorParameters<T>] | ConstructorParameters<T>) {
			return (ctor: ConstructorInstance<T>) => {
				let order: System.Order
				let args: ConstructorParameters<T>
	
				if(par1.length == 0)
					args = [] as any
				else {
					let first = par1[0]
	
					if(first.constructor == Object) {
						order = first as System.Order
						args = par1.slice(1) as ConstructorParameters<T>
					} else
						args = par1 as ConstructorParameters<T>
				}
	
				this.ecs.systems.add(new ctor(...args), order)
	
				return ctor
			}
		}
	}
}

export default ECS
export {Entities, Entity, Component, Systems, System}