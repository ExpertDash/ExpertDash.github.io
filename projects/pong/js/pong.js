window.onload = event => {
	
}

let local = new RTCPeerConnection()
let sendChannel = local.createDataChannel("sendChannel")

let remote = new RTCPeerConnection()
remote.ondatachannel = event => {
	
}

local.onicecandidate = event => !event.candidate || remote.addIceCandidate(event.candidate).catch(reason => console.log(reason))
remote.onicecandidate = event => !event.candidate || local.addIceCandidate(event.candidate).catch(reason => console.log(reason))

local.createOffer()
	.then(offer => local.setLocalDescription(offer))
	.then(remote.setRemoteDescription(local.localDescription))
	.then(remote.createAnswer())
	.then(answer => remote.setLocalDescription(answer))
	.then(local.setRemoteDescription(remote.localDescription))