import ECS, {Entities, Component, System} from "./ecs.js"

const World: ECS = new ECS()

@World.register.component()
class Transform extends Component {
	public position: [number, number] = [0, 0]
	public rotation: number = 0
	public scale: number = 1

	public constructor(x: number, y: number) {
		super()
		this.position = [x, y]
	}
}

@World.register.component()
class Motion extends Component {
	public mass: number
	public velocity: [number, number] = [0, 0]
	public acceleration: [number, number] = [0, 0]

	public constructor(mass: number) {
		super()
		this.mass = mass
	}
}

@World.register.component()
class Temperature extends Component {
	public value: number

	public constructor(value: number) {
		super()
		this.value = value
	}
}

@World.register.system()
class Movement extends System {
	public override update(entities: Entities): void {
		entities.forEach((transform, motion) => {
			let [x, y] = transform.position
			let [vx, vy] = motion.velocity
			let [ax, ay] = motion.acceleration

			motion.velocity = [vx + ax, vy + ay]
			motion.acceleration = [0, 0]
			transform.position = [x + vx, y + vy]
		}, Transform, Motion)
	}
}

@World.register.system<typeof Gravity>({before: [Movement]}, 9.8)
class Gravity extends System {
	public acceleration: number

	public constructor(acceleration: number) {
		super()
		this.acceleration = acceleration
	}

	public override update(entities: Entities): void {
		entities.forEach(motion => {
			let [x, y] = motion.acceleration
			motion.acceleration = [x, y - this.acceleration]
		}, Motion)
	}
}

@World.register.system<typeof Thermodynamics>({after: [Movement]})
class Thermodynamics extends System {
	public update(entities: Entities): void {
		let es = [...entities.with(Motion, Transform, Temperature)]

		for(let i = es.length - 1; i >= 0; i--) {
			let [transform1, temperature1] = [es[i].get(Transform), es[i].get(Temperature)]

			for(let j = i - 1; j >= 0; j--) {
				let [transform2, temperature2] = [es[j].get(Transform), es[j].get(Temperature)]

				let [dx, dy] = [transform2.position[0] - transform1.position[0], transform2.position[1] - transform1.position[1]]
				let d2 = dx * dx + dy * dy
				let f = 1 / d2

				temperature1.value += (temperature2.value - temperature1.value) * f
				temperature2.value += (temperature1.value - temperature2.value) * f
			}
		}
	}
}

World.entities.create(new Transform(0, 0), new Motion(60), new Temperature(90))
World.entities.create(new Transform(10, 0), new Motion(60), new Temperature(40))

console.log(...World.systems)
console.log()

for(let i = 0; i < 5; i++) {
	if(i != 0)
		World.step()

	console.log([...World.entities.with(Temperature)].map(e => `${e.get(Temperature).value}`))
}