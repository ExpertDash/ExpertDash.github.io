import System from "../../../../js/ecs/system.js"
import Entity from "../../../../js/ecs/entity.js"
import Transform from "../../../../js/ecs/components/transform.js"
import Vector3 from "../../../../js/math/vec3.js"
import Ownership from "../components/ownership.js"

import Host from "../../../../js/utils/peer/host.js"
import Guest from "../../../../js/utils/peer/guest.js"
// import {Host, Guest} from "../../../../js/utils/peers.js"

export class ServerSystem extends System {
	static host = new Host()

	constructor() {
		super()
		ServerSystem.host.on("recieve", this.receive)
	}

	update() {
		for(let entity of Entity.find(Transform, Ownership)) {
			let transform = entity.get(Transform)

			ServerSystem.host.send(JSON.stringify({
				type: "position",
				data: {
					id: entity.id,
					x: transform.position.x,
					y: transform.position.y
				}
			}))
		}
	}

	receive(info) {
		info = JSON.parse(info.message)

		switch(info.type) {
			case "position":
				let data = info.data
				let entity = new Entity(data.id)
				entity.try(Transform, t => t.position = new Vector3(data.x, data.y))
				break
		}
	}
}

export class ClientSystem extends System {
	static guest =  new Guest()

	constructor() {
		super()
		ClientSystem.guest.on("recieve", this.receive)
	}

	update() {
		for(let entity of Entity.find(Transform, Ownership)) {
			let transform = entity.get(Transform)

			ClientSystem.guest.send(JSON.stringify({
				type: "position",
				data: {
					id: entity.id,
					x: transform.position.x,
					y: transform.position.y
				}
			}))
		}
	}

	receive(info) {
		info = JSON.parse(info.message)

		switch(info.type) {
			case "position":
				let data = info.data
				let entity = new Entity(data.id)
				entity.try(Transform, t => t.position = new Vector3(data.x, data.y))
				break
		}
	}
}