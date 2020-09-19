import {Host, Guest} from "./peers.js"

/**
 * @param {string} address Lobby server (<hostname>:<port>)
 * @returns {string} Formatted address
 */
function getLobbyAddress(address) {
	return `ws://${address}`
}

export default class Lobby {
	/**
	 * Lobby code
	 * @type {number}
	 */
	code

	/** @type {WebSocket} */
	#socket

	/** @type {Host} */
	#host

	/**
	 * @param {string} address Lobby server address
	 * @param {Host} host Host instance
	 */
	constructor(address, host) {
		this.#socket = new WebSocket(getLobbyAddress(address))
		this.#host = host

		return new Promise(r => {
			this.#socket.onmessage = async e => {
				let info = JSON.parse(e.data)

				switch(info.type) {
					case "create":
						this.code = info.code
						r(this)
						break
					case "join":
						let response = await this.#host.connect(
							info.request,
							candidate => this.#socket.send(JSON.stringify({
								type: "candidate",
								id: info.id,
								candidate: candidate
							})),
							new Promise(r2 => {
								let candidateListener = e2 => {
									let info2 = JSON.parse(e2.data)
	
									switch(info2.type) {
										case "candidate":
											if(info2.id == info.id)
												r2(info2.candidate)
											break
									}
	
									this.#socket.removeEventListener("message", candidateListener)
								}
	
								this.#socket.addEventListener("message", candidateListener)
							})
						)

						this.#socket.send(JSON.stringify({
							type: "accept",
							id: info.id,
							response: response
						}))
						break
				}
			}
	
			this.#socket.onopen = () => this.#socket.send(JSON.stringify({type: "create"}))
		})
	}

	/** Close the lobby to further connections */
	close() {
		this.#socket.close()
	}

	/**
	 * Join a lobby
	 * @param {string} address Lobby server address
	 * @param {number} code Lobby code
	 * @param {Guest} guest Guest instance
	 * @returns {Promise.<boolean>} Whether the lobby could be joined
	 */
	static join(address, code, guest) {
		return new Promise(r => {
			let socket = new WebSocket(getLobbyAddress(address))

			socket.onmessage = async e => {
				let info = JSON.parse(e.data)

				switch(info.type) {
					case "accept":
						await guest.connect(
							info.response,
							candidate => socket.send(JSON.stringify({
								type: "candidate",
								candidate: candidate
							})),
							new Promise(r2 => {
								let candidateListener = e2 => {
									let info2 = JSON.parse(e2.data)
	
									switch(info2.type) {
										case "candidate":
											socket.close()
											r2(info2.candidate)
											r(true)
											break
									}
	
									socket.removeEventListener("message", candidateListener)
								}
	
								socket.addEventListener("message", candidateListener)
							})
						)
						break
				}
			}

			socket.onopen = async () => socket.send(JSON.stringify({
				type: "join",
				code: code,
				request: await guest.joinRequest()
			}))
		})
	}
}