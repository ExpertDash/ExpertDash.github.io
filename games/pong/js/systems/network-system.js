import System from "../../../../js/ecs/system.js"
import Entity from "../../../../js/ecs/entity.js"
import Transform from "../../../../js/ecs/components/transform.js"
import {Host, Guest} from "../../../../js/utils/peers.js"
import Vector3 from "../../../../js/math/vec3.js"
import Ownership from "../components/ownership.js"

export class ServerSystem extends System {
	static host = new Host()

	constructor() {
		super()
		ServerSystem.host.onReceive = this.receive
	}

	update() {
		for(let entity of Entity.find(Transform, Ownership)) {
			let transform = entity.get(Transform)

			ServerSystem.host.sendAll(JSON.stringify({
				type: "position",
				data: {
					id: entity.id,
					x: transform.position.x,
					y: transform.position.y
				}
			}))
		}
	}

	receive(_, info) {
		info = JSON.parse(info)

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
		ClientSystem.guest.onReceive = this.receive
	}

	update() {
		if(!ClientSystem.guest.isConnected)
			return

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
		info = JSON.parse(info)

		switch(info.type) {
			case "position":
				let data = info.data
				let entity = new Entity(data.id)
				entity.try(Transform, t => t.position = new Vector3(data.x, data.y))
				break
		}
	}
}