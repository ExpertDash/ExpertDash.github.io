import World from "../../../common/world.js"
import {Component} from "../../../ecs.js"

@World.register.component()
export default class CpuController extends Component {
	public speed: number

	public constructor(speed: number) {
		super()
		this.speed = speed
	}
}