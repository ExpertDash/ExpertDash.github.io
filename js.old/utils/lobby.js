import Host from "./peer/host.js"
import Guest from "./peer/guest.js"
// import {Host, Guest} from "./peers.js"

/**
 * @param {string} address Lobby server (<hostname>:<port>)
 * @returns {WebSocket} WebScoket instance
 */
function getLobby(address) {
	return new WebSocket(`ws://${address}`)
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
		this.code = Math.round(Math.random() * 99999)

		this.#socket = getLobby(address)
		this.#host = host

		this.#socket.onmessage = async e => {
			let info = JSON.parse(e.data)
			let {id, data} = info

			if(data.type == "join") {
				let [onCandidateIn, response] = await this.#host.connect(
					data.request,
					candidate => this.#socket.send(JSON.stringify({
						type: "candidate",
						id: id,
						candidate: candidate
					}))
				)

				let candidateListener = e2 => {
					let info2 = JSON.parse(e2.data)
					let {id: id2, data: data2} = info2

					if(data2.type == "candidate" && id2 == id) {
						if(Object.keys(data2.candidate).length == 0) {
							this.#socket.removeEventListener("message", candidateListener)
							return
						}

						onCandidateIn(data2.candidate)
					}
				}

				this.#socket.addEventListener("message", candidateListener)

				this.#socket.send(JSON.stringify({
					type: "accept",
					id: id,
					response: response
				}))
			}
		}

		return new Promise(r => this.#socket.onopen = () => r(this))
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
			let socket = getLobby(address)

			socket.onmessage = async e => {
				let info = JSON.parse(e.data)
				let {data} = info

				if(data.type == "accept") {
					let onCandidateIn = await guest.connect(
						data.response,
						candidate => socket.send(JSON.stringify({
							type: "candidate",
							candidate: candidate
						}))
					)

					let candidateListener = e2 => {
						let info2 = JSON.parse(e2.data)
						let {data: data2} = info2

						if(data2.type == "candidate") {
							if(Object.keys(data2.candidate).length == 0) {
								socket.removeEventListener("message", candidateListener)
								socket.close()
								r(true)
								return
							}

							onCandidateIn(data2.candidate)
						}
					}

					socket.addEventListener("message", candidateListener)
				}
			}

			socket.onopen = async () => socket.send(JSON.stringify({
				type: "join",
				code: code,
				request: await guest.createJoinRequest()
			}))
		})
	}
}