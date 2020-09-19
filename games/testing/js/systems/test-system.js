import System from "../../../../js/ecs/system.js"
import Entity from "../../../../js/ecs/entity.js"
import Time from "../../../../js/ecs/components/time.js"
import Transform from "../../../../js/ecs/components/transform.js"
import Collider from "../components/collider.js"
import Name from "../../../../js/ecs/components/name.js"
import Vector2 from "../../../../js/math/vec2.js"
import seq from "../../../../js/math/seq.js"

export default class TestSystem extends System {
	update() {
		Time.timescale = Math.abs(Math.cos(0.3 * Time.realtime))

		for(let entity of Entity.find(Transform, Time)) {
			let [transform, time] = [entity.get(Transform), entity.get(Time)]

			let d = time.duration
			let t = d * 8

			transform.position = seq`${new Vector2(Math.cos(t), Math.sin(t))} * ${0.5 * Math.sin(d) + 1.5}`
			transform.rotation = -270 * d
			transform.scale = seq`${Vector2.one} * ${3 - Math.abs(2 * Math.sin(d))}`
		}

		for(let entity of Entity.find(Name, Collider)) {
			let collider = entity.get(Collider)
			if(collider.collided)
				console.log(`${entity}`, collider.entities.map(e => `${e}`))
		}
	}
}