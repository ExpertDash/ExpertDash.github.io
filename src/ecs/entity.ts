import Component from "./component.js"
import Entities from "./entities.js"

type Constructor<T> = new(...args: any[]) => T
type DefaultConstructor<T> = new() => T
type MapToConstructor<Ts> = {readonly [K in keyof Ts]: Constructor<Ts[K]>}

/**
 * A unique object with components bound to it
 */
export default class Entity {
	/** Unique identifier of this entity */
	public readonly id: number
	private readonly entities: Entities

	public constructor(entities: Entities, id: number) {
		this.entities = entities
		this.id = id
	}

	/**
	 * Destroys this entity along with its components
	 */
	public destroy(): void {
		let componentRegistry = this.entities["registry"]
		let entityRegistries = [...componentRegistry.values()]

		for(let entityRegistry of entityRegistries) {
			entityRegistry.get(this.id)["removed"](this)
			entityRegistry.delete(this.id)
		}
	}

	/**
	 * Add a component
	 * @param components Components to add
	 */
	public add(...components: (Component | DefaultConstructor<Component>)[]): void {
		let componentRegistry = this.entities["registry"]

		for(let par1 of components) {
			let ctor: Constructor<Component>
			let component: Component

			switch(typeof par1) {
				case "function":
					ctor = par1 as DefaultConstructor<Component>
					component = new ctor()
					break
				case "object":
					component = par1 as Component
					ctor = component.constructor as Constructor<Component>
					break
			}

			let entityRegistry = componentRegistry.get(ctor)

			if(entityRegistry.has(this.id))
				throw new Error(`'${ctor.name}' already present on entity ${this.id}`)

			entityRegistry.set(this.id, component)
			component["removed"](this)
		}
	}

	/**
	 * @param ctor Component class
	 * @returns Component instance bound to this entity
	 */
	public get<T extends Component>(ctor: Constructor<T>): T {
		return this.entities["registry"].get(ctor).get(this.id) as T
	}

	/**
	 * Remove the component
	 * @param ctors Component classes
	 */
	public remove(...ctors: Constructor<Component>[]): void {
		for(let ctor of ctors) {
			let componentRegistry = this.entities["registry"]
			let entityRegistry = componentRegistry.get(ctor)
			let component = entityRegistry.get(this.id)
			component["removed"](this)
		}
	}

	/**
	 * Check whether this entity has a component of identical type
	 * @param ctor Component class
	 */
	public has(ctor: Constructor<Component>): boolean {
		return this.entities["registry"].get(ctor).has(this.id)
	}

	/**
	 * Executes the function if the entity has the specified components
	 * @param executor Function to execute
	 * @param ctors Components the entity must have
	 */
	public run<Ts extends readonly Component[]>(executor: (...args: Ts) => void, ...ctors: MapToConstructor<Ts>): void {
		let components: Component[] = []

		for(let i = 0; i < ctors.length; i++) {
			let componentType = ctors[i]

			if(!this.has(componentType))
				return

			components.push(this.get(componentType))
		}

		executor(...(components as any as Ts))
	}

	public *[Symbol.iterator](): IterableIterator<Component> {
		for(let entityRegistry of this.entities["registry"].values())
			if(entityRegistry.has(this.id))
				yield entityRegistry.get(this.id)
	}

	public toString(): string {
		let s = `Entity[${this.id}]`

		// for(let entityRegistry of this.entities["registry"].values())
		// 	if(entityRegistry.has(this.id))
		// 		s += `${entityRegistry.get(this.id).constructor.name}`.split(/(\n|\n\r|\r\n|\r)/g).map(s => `\n\t${s}`)

		return s
	}
}