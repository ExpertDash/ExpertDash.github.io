import Lobby from "../../../js/utils/lobby.js"
import {Host, Guest} from "../../../js/utils/peers.js"

let lobbyAddress = "localhost:25575"

void (async () => {
	let host = new Host()
	host.onReceive = (id, data) => console.log(`(Host, ${id})`, data)
	host.onConnect = id => host.send("Hello guest", id)

	let guest = new Guest()
	guest.onReceive = data => console.log("(Guest)", data)
	guest.onConnect = () => guest.send("Hello host")

	let lobby = await new Lobby(lobbyAddress, host)
	await Lobby.join(lobbyAddress, lobby.code, guest)
	lobby.close()
})()