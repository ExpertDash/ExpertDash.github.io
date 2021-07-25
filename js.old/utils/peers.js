import "https://unpkg.com/uuid@latest/dist/umd/uuidv4.min.js"

function getNextId() {
	return uuidv4()
}

/** @type {RTCConfiguration} */
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

export class Host {	
	/** @type {function(number, object):void} */
	onReceive

	/** @type {function(number):void} */
	onConnect

	/** @type {function(number):void} */
	onDisconnect

	/** @type {Map.<number, RTCDataChannel>} */
	#channels

	constructor() {
		this.#channels = new Map()
	}

	/** List of connected guest ids */
	get connected() {
		return [...this.#channels.keys()]
	}

	/**
	 * @param {string} sdp Offer sdp
	 * @param {function(string):void} onCandidate Callback when candidate created
	 * @param {Promise.<string>} getCandidate The received candidate
	 * @returns {Promise.<string>} Answer sdp
	 */
	async connect(sdp, onCandidate, getCandidate) {
		let id = getNextId()
		let local = new RTCPeerConnection(rtcConfig)

		local.ondatachannel = e1 => e1.channel.onmessage = e2 => {
			if(this.onReceive)
				this.onReceive(id, e2.data)
		}

		local.addEventListener("icecandidate", async e => {
			if(!e.candidate)
				return
	
			try {
				onCandidate(JSON.stringify({
					candidate: e.candidate.candidate,
					sdpMid: e.candidate.sdpMid,
					sdpMLineIndex: e.candidate.sdpMLineIndex,
					usernameFragment: e.candidate.usernameFragment
				}))
			} catch(e) {
				console.error(e)
			}
		}, {once: true})

		let sendChannel = local.createDataChannel("sendChannel")

		sendChannel.onopen = () => {
			if(sendChannel.readyState != "open")
				return

			this.#channels.set(id, sendChannel)

			if(this.onConnect)
				this.onConnect(id)
		}

		sendChannel.onclose = () => {
			this.#channels.delete(id)

			if(this.onDisconnect)
				this.onDisconnect(id)
		}

		getCandidate.then(c => local.addIceCandidate(new RTCIceCandidate(JSON.parse(c))))
		await local.setRemoteDescription({type: "offer", sdp: sdp})

		let answer = await local.createAnswer()
		await local.setLocalDescription(answer)

		return answer.sdp
	}

	/**
	 * Sends data to the specified guests
	 * @param {string|Blob|ArrayBuffer|ArrayBufferView} data
	 * @param {...number} ids Recipient ids
	 */
	send(data, ...ids) {
		for(let id of ids)
			this.#channels.get(id).send(data)
	}

	/**
	 * Sends data to all guests
	 * @param {string|Blob|ArrayBuffer|ArrayBufferView} data
	 */
	sendAll(data) {
		for(let channel of this.#channels.values())
			channel.send(data)
	}
}

export class Guest {
	/**
	 * @type {function(object):void}
	 */
	onReceive

	/** @type {function():void} */
	onConnect

	/** @type {function():void} */
	onDisconnect

	/** @type {RTCPeerConnection} */
	#local

	/** @type {RTCDataChannel} */
	#sendChannel

	constructor() {
		this.#local = new RTCPeerConnection(rtcConfig)
		this.#local.ondatachannel = e1 => e1.channel.onmessage = e2 => {
			if(this.onReceive)
				this.onReceive(e2.data)
		}
		
		let sendChannel = this.#local.createDataChannel("sendChannel")

		sendChannel.onopen = () => {
			if(sendChannel.readyState != "open")
				return

			this.#sendChannel = sendChannel
			
			if(this.onConnect)
				this.onConnect()
		}

		sendChannel.onclose = () => {
			if(this.onDisconnect)
				this.onDisconnect()

			this.#sendChannel = null
		}
	}

	/**
	 * Whether this guest is connected to a host
	 */
	get isConnected() {
		return this.#sendChannel != null
	}

	/**
	 * @returns {Promise.<string>} Offer sdp
	 */
	async joinRequest() {
		let offer = await this.#local.createOffer()
		this.#local.setLocalDescription(offer)

		return offer.sdp
	}

	/**
	 * @param {string} sdp Answer sdp
	 * @param {function(string):void} onCandidate Callback when candidate created
	 * @param {Promise.<string>} getCandidate The received candidate
	 */
	async connect(sdp, onCandidate, getCandidate) {
		this.#local.addEventListener("icecandidate", async e => {
			if(!e.candidate)
				return

			try {
				onCandidate(JSON.stringify({
					candidate: e.candidate.candidate,
					sdpMid: e.candidate.sdpMid,
					sdpMLineIndex: e.candidate.sdpMLineIndex,
					usernameFragment: e.candidate.usernameFragment
				}))
			} catch(e) {
				console.error(e)
			}
		}, {once: true})

		getCandidate.then(c => this.#local.addIceCandidate(new RTCIceCandidate(JSON.parse(c))))
		await this.#local.setRemoteDescription({type: "answer", sdp: sdp})
	}

	/**
	 * @param {string|Blob|ArrayBuffer|ArrayBufferView} data
	 */
	send(data) {
		this.#sendChannel.send(data)
	}
}