import "https://unpkg.com/uuid@latest/dist/umd/uuidv4.min.js"
const uuid = uuidv4

import Dispatcher from "./dispatcher.js"

const rtcConfig = {
	iceServers: [
		{
			urls: [
				"stun:stun.l.google.com:19302",
				"stun:stun1.l.google.com:19302",
				"stun:stun2.l.google.com:19302",
				"stun:stun3.l.google.com:19302",
				"stun:stun4.l.google.com:19302"
			]
		}
	]
}

/**
 * Host peer
 */
export default class Host extends Dispatcher {
	#channels

	constructor() {
		super()

		this.registerEvent(
			"connect",
			"disconnect",
			"recieve"
		)

		this.#channels = new Map()
	}

	get connected() {
		return [...this.#channels.keys()]
	}

	send(msg, ids) {
		for(let id of (ids ?? this.connected))
			if(this.#channels.get(id).readyState == "open")
				this.#channels.get(id).send(msg)
	}

	async connect(sdp, onCandidateOut) {
		let id = uuid()

		let connection = new RTCPeerConnection(rtcConfig)
		connection.ondatachannel = e1 => e1.channel.onmessage = e2 => this.fire("recieve", {id: id, message: e2.data})
		connection.onicecandidate = e => onCandidateOut(e.candidate ?? {})
		connection.onconnectionstatechange = e => {
			if(connection.connectionState != "closed")
				return

			this.lines.delete(id)
		}

		let channel = connection.createDataChannel("send")
		channel.onopen = () => this.fire("connect", {id: id})
		channel.onclose = () => this.fire("disconnect", {id: id})
		
		this.#channels.set(id, channel)

		await connection.setRemoteDescription({type: "offer", sdp: sdp})
		await connection.setLocalDescription(await connection.createAnswer())

		return [
			c => connection?.addIceCandidate(new RTCIceCandidate(c)),
			connection.localDescription.sdp
		]
	}

	disconnect(id) {
		this.#channels.get(id).close()
	}
}