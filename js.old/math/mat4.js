import Vector3 from "./vec3.js"

export default class Matrix4x4 {
	/**
	 * @param {...number} value 
	 */
	constructor(...value) {
		this.value = value
	}

	[Symbol.iterator]() {
		return this.value.values()
	}

	static get identity() { return identity }
	static get zero() { return zero }

	/**
	 * @param {number} i 
	 */
	getRow(i) {
		return [this.value[4 * i], this.value[4 * i + 1], this.value[4 * i + 2], this.value[4 * i + 3]]
	}

	/**
	 * @param {number} j 
	 */
	getColumn(j) {
		return [this.value[j], this.value[4 + j], this.value[8 + j], this.value[12 + j]]
	}

	/**
	 * @param {Matrix4x4} other 
	 * @returns {Matrix4x4}
	 */
	mul(other) {
		const [m, n] = [4, 4]
		let value = new Array(m * n)

		for(let i = m - 1; i >= 0; i--)
			for(let j = n - 1; j >= 0; j--)
				value[4 * i + j] = this.#dot4(this.getRow(i), other.getColumn(j))

		return new Matrix4x4(...value)
	}

	/**
	 * @param {[number, number, number, number]} vec 
	 * @returns {[number, number, number, number]}
	 */
	mulVec(vec) {
		return [
			this.#dot4(this.getRow(0), vec),
			this.#dot4(this.getRow(1), vec),
			this.#dot4(this.getRow(2), vec),
			this.#dot4(this.getRow(3), vec)
		]
	}

	/**
	 * @returns {Matrix4x4}
	 */
	transpose() {
		return new Matrix4x4(
			...this.getColumn(0),
			...this.getColumn(1),
			...this.getColumn(2),
			...this.getColumn(3)
		)
	}

	toString() {
		return `[[${this.getRow(0)}],[${this.getRow(1)}],[${this.getRow(2)}],[${this.getRow(3)}]]`
	}

	/**
	 * @param {number[]} lhs 
	 * @param {number[]} rhs 
	 */
	#dot4 = (lhs, rhs) => {
		return lhs[0] * rhs[0] + lhs[1] * rhs[1] + lhs[2] * rhs[2] + lhs[3] * rhs[3]
	}

	/**
	 * @param {number} fov Field of view in radians
	 * @param {number} aspect Aspect ratio
	 * @param {number} near Near clipping field
	 * @param {number} far Far clipping field
	 */
	static createPerspective(fov, aspect, near, far) {
		const a = 1 / Math.tan(fov / 2)
		const b = 1 / (near - far)

		return new Matrix4x4(
			a / aspect, 0, 0, 0,
			0, a, 0, 0,
			0, 0, (far + near) * b, 2 * far * near * b,
			0, 0, -1, 0
		)
	}

	/**
	 * @param {number} width Width
	 * @param {number} height Height
	 * @param {number} near Near clipping field
	 * @param {number} far Far clipping field
	 */
	static createOrtho(width, height, near, far) {
		let [l, r] = [-width / 2, width / 2]
		let [t, b] = [height / 2, -height / 2]

		return new Matrix4x4(
			2 / (r - l), 0, 0, -(r + l) / (r - l),
			0, 2 / (t - b), 0, -(t + b) / (t - b),
			0, 0, -2 / (far - near), -(far + near) / (far - near),
			0, 0, 0, 1
		)
	}

	/**
	 * @param {Vector3} p Global position
	 * @param {number} r Global rotation
	 * @param {Vector3} s Global scale
	 * @return {Matrix4x4} Translation, rotation, scale matrix
	 */
	static trs(p, r, s) {
		return new Matrix4x4(
			1, 0, 0, p.x,
			0, 1, 0, p.y,
			0, 0, 1, p.z,
			0, 0, 0, 1
		).mul(new Matrix4x4(
			Math.cos(r), -Math.sin(r), 0, 0,
			Math.sin(r), Math.cos(r), 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1
		)).mul(new Matrix4x4(
			s.x, 0, 0, 0,
			0, s.y, 0, 0,
			0, 0, s.z, 0,
			0, 0, 0, 1
		))
	}
}

const identity = Object.freeze(new Matrix4x4(
	1, 0, 0, 0,
	0, 1, 0, 0,
	0, 0, 1, 0,
	0, 0, 0, 1
))

const zero = Object.freeze(new Matrix4x4(
	0, 0, 0, 0,
	0, 0, 0, 0,
	0, 0, 0, 0,
	0, 0, 0, 0
))

/**
 * @param {...number} value 
 * @returns {Matrix4x4}
 */
export function mat4(...value) {
	return new Matrix4x4(value)
}