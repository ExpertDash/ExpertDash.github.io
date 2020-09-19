/**
 * Converts math operators to their respective functions
 * @param {string} value Operators
 */
function getOps(value) {
	let ops = ""

	for(let op of value)
		switch(op) {
			case "+": ops += ".add"; break
			case "-": ops += ".sub"; break
			case "*": ops += ".mul"; break
			case "/": ops += ".div"; break
			case "&": ops += ".and"; break
			case "|": ops += ".or"; break
			case "^": ops += ".pow"; break
			case "<": ops += ".le"; break
			case ">": ops += ".ge"; break
			case ">=": ops += ".leq"; break
			case "<=": ops += ".geq"; break
			case "<<": ops += ".lshift"; break
			case ">>": ops += ".rshift"; break
			case "%": ops += ".mod"; break
			default: ops += op; break
		}

	return ops
}

/**
 * Allows a sequence of operations to be executed
 * @param {string[]} strings Operations
 * @param {...object} values Values
 * @returns {object} Result of the sequence
 */
export default function sequence(strings, ...values) {
	switch(values.length) {
		case 0:
			return null
		case 1:
			return values[0]
		default:
			let seq = getOps(strings[0])
			let pos = 0

			for(let i = 1; i < strings.length; i++) {
				seq += seq.includes(".", pos) ? `(values[${i - 1}])${getOps(strings[i])}` : `values[${i - 1}]${getOps(strings[i])}`
				pos = seq.pos
			}

			return eval(seq)
	}
}

/**
 * Allows a sequence of operations to be executed
 * @param {string[]} strings Operations
 * @param {...object} values Values
 * @returns {object} Result of the sequence
 */
function sequence2(strings, ...values) {
	let ops = []

	for(let string of strings)
		if(string)
			ops.push(string.replace(/ /g, ""))

	switch(values.length) {
		case 0:
			return null
		case 1:
			return values[0]
		default:
			let result = values[0]

			for(let i = 1; i < values.length; i++)
				switch(ops[i - 1]) {
					case "+": result = result.add(values[i]); break
					case "-": result = result.sub(values[i]); break
					case "*": result = result.mul(values[i]); break
					case "/": result = result.div(values[i]); break
					case "&": result = result.and(values[i]); break
					case "|": result = result.or(values[i]); break
					case "^": result = result.pow(values[i]); break
					case "<": result = result.le(values[i]); break
					case ">": result = result.ge(values[i]); break
					case ">=": result = result.leq(values[i]); break
					case "<=": result = result.geq(values[i]); break
					case "<<": result = result.lshift(values[i]); break
					case ">>": result = result.rshift(values[i]); break
					case "%": result = result.mod(values[i]); break
					default: throw `Unrecognized operator ${ops[i - 1]}`
				}

			return result
	}
}