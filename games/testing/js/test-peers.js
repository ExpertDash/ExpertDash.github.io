import {Host, Guest} from "../../../js/utils/peers.js"

void (async () => {
	let host = new Host()
	host.onReceive = (id, data) => console.log(`(Host, ${id})`, data)
	host.onConnect = id => {
		host.send(`Hello guest ${id}`, id)
		host.send(`Welcome guest ${id}`, ...host.connected.filter(i => i != id))
	}

	for(let i = 0; i < 3; i++) {
		let guest = new Guest()
		guest.onReceive = data => console.log(`(Guest, ${i})`, data)
		guest.onConnect = () => guest.send("Hi")

		let request = await guest.joinRequest()

		let response = await host.connect(
			request,
			c => window.dispatchEvent(new CustomEvent("hostCandidate", {detail: {candidate: c}})),
			new Promise(r => window.addEventListener("guestCandidate", e => r(e.detail.candidate)))
		)

		await guest.connect(
			response,
			c => window.dispatchEvent(new CustomEvent("guestCandidate", {detail: {candidate: c}})),
			new Promise(r => window.addEventListener("hostCandidate", e => r(e.detail.candidate)))
		)
	}
})()

// let quadMesh = new Mesh(
// 	[
// 		new Vector2(-1, 1),
// 		new Vector2(1, 1),
// 		new Vector2(-1, -1),
// 		new Vector2(1, -1)
// 	]
// 	[
// 		new Vector2(0, 0),
// 		new Vector2(1, 0),
// 		new Vector2(0, 1),
// 		new Vector2(1, 1)
// 	],
// 	[
// 		0, 2, 1,
// 		2, 3, 1
// 	],
// 	[
// 		new Vector2(0, 0),
// 		new Vector2(1, 0),
// 		new Vector2(0, 1),
// 		new Vector2(1, 1)
// 	]
// )