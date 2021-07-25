/**
 * Enables dispatching of events in a category
 */
export default class Dispatcher {
	#callbacks

	constructor(eventsType) {
		this.#callbacks = new Map()

		if(!eventsType)
			return

		this.registerEvent(...Object.keys(eventsType))
	}

	on(event, callback) {
		this.#callbacks.get(event.toString()).add(callback)
		return callback
	}

	once(event, callback) {
		let cb = null

		cb = details => {
			callback(details)
			this.forget(event, cb)
		}

		this.#callbacks.get(event.toString()).add(cb)
		return cb
	}

	forget(event, callback) {
		this.#callbacks.get(event.toString()).delete(callback)
	}

	/**
	 * Remove all event listeners
	 */
	forgetAll() {
		for(let [, value] of this.#callbacks)
			value.clear()
	}

	/**
	 * Register a new event type
	 * @param event Event type
	 */
	registerEvent(...event) {
		for(let e of event) {
			if(this.#callbacks.has(e.toString())) {
				console.error(`Event ${e} is already registered`)
				continue
			}

			this.#callbacks.set(e.toString(), new Set())
		}
	}

	/**
	 * Register an existing event type
	 * @param event Event type
	 */
	unregisterEvent(...event) {
		for(let e of event) {
			if(!this.#callbacks.has(e.toString())) {
				console.error(`Event ${e} is not registered`)
				continue
			}

			this.#callbacks.delete(e.toString())
		}
	}

	/**
	 * Send out a new event
	 * @param event Event type
	 * @param details Event details
	 */
	async fire(event, details) {
		await Promise.all(
			[...this.#callbacks.get(event.toString())]
				.map(callback => callback(details))
		)
	}
}