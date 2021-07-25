import Dispatcher from "./dispatcher.js"

export default class Guest extends Dispatcher {
	#connection
	#channel

	constructor() {
		super()

		this.registerEvent(
			"connect",
			"disconnect",
			"recieve"
		)

		this.#connection = new RTCPeerConnection()
		this.#connection.ondatachannel = e1 => e1.channel.onmessage = e2 => this.fire("recieve", {message: e2.data})

		this.#channel = this.#connection.createDataChannel("send")
		this.#channel.onclose = () => this.fire("disconnect")
		this.#channel.onopen = () => {
			if(this.#channel.readyState != "open")
				return

			this.fire("connect")
		}
	}

	send(msg) {
		if(this.#channel.readyState != "open")
			return

		this.#channel.send(msg)
	}

	async createJoinRequest() {
		let offer = await this.#connection.createOffer()
		await this.#connection.setLocalDescription(offer)

		return offer.sdp
	}

	async connect(sdp, onCandidateOut) {
		this.#connection.onicecandidate = e => {
			if(e.candidate == null)
				this.#connection.onicecandidate = null

			onCandidateOut(e.candidate ?? {})
		}

		await this.#connection.setRemoteDescription({type: "answer", sdp: sdp})

		return c => this.#connection?.addIceCandidate(new RTCIceCandidate(c))
	}

	disconnect() {
		this.#connection.close()
		this.#channel.close()

		this.#connection = null
		this.#channel = null
	}
}