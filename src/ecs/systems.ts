import System from "./system.js"

type Constructor<T> = new(...args: any[]) => T
type DefaultConstructor<T> = new() => T

/**
 * Manages all systems
 */
export default class Systems {
	private readonly registry: Map<Constructor<System>, System> = new Map()
	private readonly dependencies: Map<Constructor<System>, Set<Constructor<System>>> = new Map()

	/**
	 * Add a new system
	 * @param systems System classe or instance
	 */
	public add(system: (System | DefaultConstructor<System>), order: System.Order = {}): void {
		let ctor: Constructor<System>
		let instance: System

		switch(typeof system) {
			case "function":
				ctor = system as DefaultConstructor<System>
				instance = new ctor()
				break
			case "object":
				instance = system as System
				ctor = instance.constructor as Constructor<System>
				break
		}

		if(this.registry.has(ctor))
			throw new Error(`'${ctor.name}' already present in this set of systems`)

		this.registry.set(ctor, instance)

		let addDependencies = (sys: Constructor<System>, deps: Constructor<System>[]) => {
			let set: Set<Constructor<System>>

			if(this.dependencies.has(sys))
				set = this.dependencies.get(sys)
			else {
				set = new Set()
				this.dependencies.set(sys, set)
			}

			for(let ctor of deps)
				set.add(ctor)
		}

		addDependencies(ctor, order.after ?? [])

		if(order.before)
			for(let system of order.before)
				addDependencies(system, [ctor])
	}

	/**
	 * Gets the system instance
	 * @param ctor System class
	 */
	public get<T extends System>(ctor: Constructor<T>): T {
		return this.registry.get(ctor) as T
	}

	/**
	 * Remove existing systems
	 * @param ctors System classes
	 */
	public remove(...ctors: Constructor<System>[]): void {
		for(let ctor of ctors)
			this.registry.delete(ctor)
	}

	/**
	 * Generates an iterator for the system instances with an order considering dependencies
	 */
	public [Symbol.iterator](): IterableIterator<System> {
		let edges = new Map<Constructor<System>, Set<Constructor<System>>>(this.dependencies)
		let list: Constructor<System>[] = []
		let set: Set<Constructor<System>> = new Set(
			[...edges]
				.filter(v => v[1].size == 0)
				.map(v => v[0])
		)

		while(set.size > 0) {
			let it = set[Symbol.iterator]()

			let {value: n}: {value: Constructor<System>} = it.next()
			list.push(n)
			set.delete(n)

			for(let m of [...edges].filter(v => v[1].has(n)).map(v => v[0])) {
				let incoming = edges.get(m)
				incoming.delete(n)

				if(incoming.size == 0)
					set.add(m)
			}

			if(edges.get(n).size == 0)
				edges.delete(n)
		}

		if(edges.size > 0) {
			let s = "Circularaly dependent systems detected"
			;[...edges].forEach(v => [...v[1]].forEach(from => s += `\n\t${from.name} -> ${v[0].name}`))

			throw new Error(s)
		}

		return [...this.registry.values()].sort((a, b) => {
			let ctorA = a.constructor as Constructor<System>
			let ctorB = b.constructor as Constructor<System>

			return list.indexOf(ctorA) - list.indexOf(ctorB)
		}).values()
	}
}