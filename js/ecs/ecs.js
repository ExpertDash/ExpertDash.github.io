import System, {Category, CategoryOrder} from "./system.js"
import Component from "./component.js"
import TimeSystem from "./systems/time-system.js"

/**
 * Entity-Component System manager
 * 
 * Used to enable/disable systems, register components for use with entities, bind components to entities, and keep track of time deltas
 */
export default class ECS {
	/** @type {boolean} */
	static #active = false

	/** @type {number} */
	static #fixedDeltaTime = 0.02

	/** @type {number} */
	static #deltaTime = 0

	/** @type {number} */
	static #lastTime = 0

	/** @type {number} */
	static #logicInterval

	/** @type {number} */
	static #renderFrame

	/** @type {System[]} */
	static #systems = []

	/** @type {number} */
	static #renderIndex = 0

	/** @type {Map.<Function, Map.<number, Component>>} */
	static #registry = new Map()

	/** Starts ECS systems */
	static start() {
		ECS.#active = true
		ECS.#logicInterval = setInterval(ECS.#logicUpdate, 1000 * ECS.#fixedDeltaTime)
		ECS.#renderFrame = requestAnimationFrame(ECS.#renderUpdate)
	}

	/** Stops ECS systems */
	static stop() {
		ECS.#active = false
		window.clearInterval(ECS.#logicInterval)
		window.cancelAnimationFrame(ECS.#renderFrame)
	}

	/**
	 * Adds system to their respective update loops
	 * @param {...function(new: System)|System} systems Systems to be updated
	 */
	static enableSystem(...systems) {
		for(let system of systems) {
			switch(typeof system) {
				case "function":
					system = new system()
					break
			}

			if(!(system instanceof System)) {
				console.error(`'${system}' is not a system`)
				continue
			}

			ECS.#systems.push(system)
		}

		ECS.#systems.sort((a, b) => {
			let ao = CategoryOrder.get(a.category)
			let bo = CategoryOrder.get(b.category)

			if(ao != bo)
				return ao - bo

			if(a.predecessors.includes(b.constructor))
				return 1

			if(b.predecessors.includes(a.constructor))
				return -1

			return 0
		})

		ECS.#renderIndex = ECS.#systems.findIndex(s => s.category == Category.Graphics)
	}

	/**
	 * Removes systems from their update loops
	 * @param  {...function(new: System)} systems 
	 */
	static disableSystem(...systems) {
		for(let system of systems)
			ECS.#systems = systems.filter(s => s.constructor != system)
	}

	/**
	 * Register component classes
	 * @param {...function(new: Component)} types Component classes
	 */
	static registerComponent(...types) {
		for(let componentClass of types)
			ECS.#registry.set(componentClass, new Map())
	}

	/** Entity registry */
	static get entities() {
		return ECS.#registry
	}

	/** All active systems */
	static get systems() {
		return ECS.#systems
	}

	/** Time between physics iterations */
	static get fixedDeltaTime() {
		return ECS.#fixedDeltaTime
	}

	/**
	 * @param {number} value New fixed delta time
	 */
	static set fixedDeltaTime(value) {
		if(ECS.#active)
			clearInterval(ECS.#logicInterval)

		ECS.#fixedDeltaTime = value
		ECS.#logicInterval = setInterval(ECS.#logicUpdate, 1000 * value)
	}

	/** Time between frames */
	static get deltaTime() {
		return ECS.#deltaTime
	}

	/** Whether systems are being updated */
	static get active() {
		return ECS.#active
	}

	static #logicUpdate = () => {
		for(let i = 0; i < ECS.#renderIndex; i++)
			ECS.#systems[i].update()
	}

	/** @param {number} time */
	static #renderUpdate = time => {
		ECS.#deltaTime = (time - ECS.#lastTime) / 1000
		ECS.#lastTime = time

		for(let i = ECS.#renderIndex; i < ECS.#systems.length; i++)
			ECS.#systems[i].update()

		ECS.#renderFrame = requestAnimationFrame(ECS.#renderUpdate)
	}
}