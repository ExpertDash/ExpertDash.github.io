import Matrix4x4 from "../../../js/math/mat4.js"
import Vector2 from "../../../js/math/vec2.js"
import seq from "../../../js/math/seq.js"

const count = 1000
const times = []

function clock(name, f) {
	let ti = performance.now()

	for(let i = count - 1; i >= 0; i--)
		f()

	let dt = parseFloat((performance.now() - ti).toFixed(2))
	console.log(`${name}: ${dt}ms | ${f()}`)

	times.push([name, dt])
}


clock("Direct", () => Vector2.left.add(Vector2.up))
clock("Sequence", () => seq`${Vector2.left} + ${Vector2.up}`)

times.sort((a, b) => {
	return a[1] - b[1]
})

let results = `${times[0][0]} is:`

for(let i = 1; i < times.length; i++) {
	let [name, dt] = times[i]
	results += `\n\t${Math.round((dt / times[0][1] - 1) * 100)}% faster than ${name}`
}

console.log(results)