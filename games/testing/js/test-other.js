function appraise(target, key, descriptor) {
	return {
		...descriptor,
		writable: false
	}
}

@appraise
class Thing {
	toString() {
		return "Something"
	}
}

let thing = new Thing()
console.log(`${thing}`)