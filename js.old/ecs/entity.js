import ECS from "./ecs.js"
import Component from "./component.js"
import Name from "./components/name.js"

/**
 * Provides easy access to an entities components through the ECS entity registry
 */
export default class Entity {
	/** @type {number[]} */
	static #recyle = []

	/** @type {number} */
	static #nextId = 0

	/** @type {number} */
	#id

	/**
	 * @param {number} id
	 */
	constructor(id = 0) {
		this.#id = id
	}

	/**
	 * @returns {number}
	 */
	get id() {
		return this.#id
	}

	/**
	 * @param {...Component} components 
	 */
	introduce(...components) {
		for(let component of components) {
			let category = ECS.entities.get(component.constructor)

			let lastComponent = category.get(this.id)
			if(lastComponent)
				lastComponent.dismissed(this)

			category.set(this.id, component)

			component.introduced(this)
		}
	}

	/**
	 * @param  {...Function} types 
	 */
	dismiss(...types) {
		for(let type of types) {
			let category = ECS.entities.get(type)
			let component = category.get(this.id)

			if(component) {
				component.dismissed(this)
				category.delete(this.id)
			}
		}
	}

	/**
	 * @template T
	 * @param {function(new: T)} type 
	 * @returns {T}
	 */
	get(type) {
		return ECS.entities.get(type).get(this.id)
	}

	/**
	 * @param {Function} type 
	 * @returns {boolean}
	 */
	has(type) {
		return ECS.entities.get(type).has(this.id)
	}

	/**
	 * @template T
	 * @param {function(new: T)} type 
	 * @param {function(T)} callback 
	 */
	try(type, callback) {
		let component = ECS.entities.get(type).get(this.id)
		if(component)
			callback(component)
	}

	destroy() {
		if(this.id < 0)
			return

		for(let category in ECS.entities.values()) {
			let component = category.get(this.id)
			if(component) {
				component.dismissed(this)
				category.delete(this.id)
			}
		}

		Entity.#recyle.push(this.id)
	}

	/**
	 * @param {Entity} other 
	 * @returns {boolean}
	 */
	equals(other) {
		return this.id == other.id
	}

	valueOf() {
		return this.id
	}

	toString() {
		return this.has(Name) ? `${this.get(Name)} \`${this.id}` : `\`${this.id}`
	}

	/**
	 * @param  {...Component} components 
	 * @returns {Entity}
	 */
	static spawn(...components) {
		let entity = new Entity(Entity.#recyle.length == 0 ? ++Entity.#nextId : Entity.#recyle.shift())
		entity.introduce(...components)

		return entity
	}

	/**
	 * @template T
	 * @param {function(new: T)} type 
	 * @param  {...function(new: T)} otherTypes 
	 * @returns {Entity[]}
	 */
	static find(type, ...otherTypes) {
		let entities = []

		findKeys:for(let [key] of ECS.entities.get(type)) {
			for(let otherType of otherTypes)
				if(!ECS.entities.get(otherType).has(key))
					continue findKeys

			entities.push(new Entity(key))
		}

		return entities
	}
}

/**
 * @param {number} id Entity id
 * @returns {Entity} Entity with the given id
 */
export function entity(id) {
	return new Entity(id)
}