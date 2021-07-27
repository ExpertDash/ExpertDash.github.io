import ECS, {Entities, System} from "../ecs.js"
import "./lib.js"
type Constructor<T> = new(...args: any[]) => T

const World = new ECS()

export class Simulator {
	private static logicHandle: number = NaN
	private static renderHandle: number = NaN

	static #deltaTime: number = 0
	static #fixedDeltaTime: number = 0.02

	/** Whether the simulation is actively being updated */
	public static get active(): boolean {
		return !isNaN(this.logicHandle) || !isNaN(this.renderHandle)
	}

	/** Time between frames */
	public static get deltaTime(): number {
		return this.#deltaTime
	}

	/** Time between physics iterations */
	public static get fixedDeltaTime(): number {
		return this.#fixedDeltaTime
	}

	public static set fixedDeltaTime(value: number) {
		this.fixedDeltaTime = value

		if(!isNaN(this.logicHandle)) {
			this.suspend()
			this.resume()
		}
	}

	/**
	 * Resumes world simulation
	 */
	public static resume(): void {
		if(this.active)
			return

		let lastTime = 0
		let systems = [...World.systems]
		let divider = systems.findIndex(v => v.constructor = Simulator.Category.UI)
		let logicSystems = systems.slice(0, divider).filter(s => !(s instanceof CategorySystem))
		let graphicsSystems = systems.slice(divider).filter(s => !(s instanceof CategorySystem))

		let logicCallback: () => void
		let renderCallback: (time: number) => void

		logicCallback = () => {
			for(let system of logicSystems)
				system.update(World.entities)
		}

		renderCallback = time => {
			Simulator.#deltaTime = (time - lastTime) / 1000
			lastTime = time

			for(let system of graphicsSystems)
				system.update(World.entities)

			this.renderHandle = requestAnimationFrame(renderCallback)
		}

		this.logicHandle = setInterval(logicCallback, 1000 * Simulator.fixedDeltaTime)
		this.renderHandle = requestAnimationFrame(renderCallback)
	}

	/**
	 * Suspends world simulation
	 */
	public static suspend(): void {
		if(!this.active)
			return

		clearInterval(this.logicHandle)
		this.logicHandle = NaN

		cancelAnimationFrame(this.renderHandle)
		this.renderHandle = NaN
	}

	/**
	 * @param category Category for the system to be placed in
	 * @param param1 Additional systems describing update order
	 * @returns Creates an order which updates the system within the specified category
	 */
	public static phase(category: Constructor<CategorySystem>, {after, before}: System.Order = {}): System.Order {
		after ??= []
		before ??= []

		after.push(category)

		switch(category) {
			case Simulator.Category.Physics:
				before.push(Simulator.Category.Input)
				break
			case Simulator.Category.Input:
				before.push(Simulator.Category.Logic)
				break
			case Simulator.Category.Logic:
				before.push(Simulator.Category.UI)
				break
			case Simulator.Category.UI:
				before.push(Simulator.Category.Graphics)
				break
			case Simulator.Category.Graphics:
				break
			default:
				throw new Error(`Unknown phase: '${category.name}'`)
		}

		return <System.Order>{
			after: after,
			before: before
		}
	}
}

class CategorySystem extends System {
	public update(_: Entities): void {
		throw new Error("Unexpected update call on categorical system?")
	}
}

export namespace Simulator {
	/**
	 * System categories for organizational purposes
	 */
	export namespace Category {
		@World.register.system() export class Physics extends CategorySystem {}
		@World.register.system({after: [Physics]}) export class Input extends CategorySystem {}
		@World.register.system({after: [Input]}) export class Logic extends CategorySystem {}
		@World.register.system({after: [Logic]}) export class UI extends CategorySystem {}
		@World.register.system({after: [UI]}) export class Graphics extends CategorySystem {}
	}
}

export default World