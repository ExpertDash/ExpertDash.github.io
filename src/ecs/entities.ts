import Component from "./component.js"
import Entity from "./entity.js"

type Constructor<T> = new(...args: any[]) => T
type DefaultConstructor<T> = new() => T
type MapToConstructor<Ts> = {readonly [K in keyof Ts]: Constructor<Ts[K]>}

/**
 * Containins all entities and systems
 */
export default class Entities {
	private readonly registry: Map<Constructor<Component>, Map<number, Component>> = new Map()
	private ids: Set<number> = new Set()
	private unusedIds: Set<number> = new Set()
	private nextId: number = 0

	/**
	 * The amount of entities present
	 */
	public get count(): number {
		return this.ids.size
	}

	/**
	 * @returns The entity associated with the given id
	 */
	public from(entityId: number): Entity {
		return new Entity(this, entityId)
	}

	/**
	 * @param components Components which the component will start with
	 * @returns A new, unique entity with the specified components
	 */
	public create(...components: (Component | DefaultConstructor<Component>)[]): Entity {
		let id: number

		if(this.unusedIds.size == 0) {
			id = this.nextId
			++this.nextId
		} else {
			let it = this.unusedIds[Symbol.iterator]()
			let result = it.next()
			id = result.value

			this.unusedIds.delete(id)
		}

		this.ids.add(id)

		let entity = new Entity(this, id)
		entity.add(...components)

		return entity
	}

	/**
	 * @param executor Function to run on all components of matching entities
	 * @param ctors Components which an entity must have
	 */
	public forEach<Ts extends readonly Component[]>(executor: (...args: Ts) => void, ...ctors: MapToConstructor<Ts>): void {
		if(ctors.length == 0)
			return

		outer:for(let id of this.registry.get(ctors[0]).keys()) {
			let components: Component[] = []

			for(let i = 0; i < ctors.length; i++) {
				let componentRegistry = this.registry.get(ctors[i])

				if(!componentRegistry.has(id))
					continue outer

				components.push(componentRegistry.get(id))
			}

			executor(...(components as any as Ts))
		}
	}

	/**
	 * @param ctors Components which an entity must have
	 * @returns An iterator for each entity with the specified components
	 */
	public *with(...ctors: Constructor<Component>[]): IterableIterator<Entity> {
		if(ctors.length == 0)
			return

		outer:for(let id of this.registry.get(ctors[0]).keys()) {
			for(let i = 1; i < ctors.length; i++)
				if(!this.registry.get(ctors[i]).has(id))
					continue outer

			yield new Entity(this, id)
		}
	}

	public *[Symbol.iterator](): IterableIterator<Entity> {
		for(let id of this.ids)
			yield new Entity(this, id)
	}
}