export default class Vector3 {
	/**
	 * x-component
	 * @type {number}
	 */
	x

	/**
	 * y-component
	 * @type {number}
	 */
	y

	/**
	 * z-component
	 * @type {number}
	 */
	z
	
	/**
	 * @param {number} x x-component
	 * @param {number} y y-component
	 * @param {number} z z-component
	 */
	constructor(x = 0, y = 0, z = 0) {
		this.x = x
		this.y = y
		this.z = z
	}

	/** Square magnitude */
	get sqrMagnitude() {
		return this.x * this.x + this.y * this.y + this.z * this.z
	}

	/** Magnitude */
	get magnitude() {
		return Math.sqrt(this.sqrMagnitude)
	}

	/** Normalized instance */
	get normalized() {
		return this.div(this.magnitude)
	}

	/** Inverse */
	get inv() {
		return new Vector3(1 / this.x, 1 / this.y, 1 / this.z)
	}

	/** Whether a component is NaN */
	get isNan() {
		return isNaN(this.x) || isNaN(this.y) || isNaN(this.z)
	}

	/** 4d vector array */
	get xyzw() {
		return [this.x, this.y, this.z, 1]
	}

	static get left() { return left }
	static get up() { return up }
	static get right() { return right }
	static get down() { return down }
	static get forward() { return forward }
	static get back() { return back }
	static get zero() { return zero }
	static get one() { return one }

	/**
	 * @param {Vector3} other
	 * @returns {Vector3} Vector resulting from addition
	 */
	add(other) {
		return new Vector3(this.x + other.x, this.y + other.y, this.z + other.z)
	}

	/**
	 * @param {Vector3} other
	 * @returns {Vector3} Vector resulting from subtraction
	 */
	sub(other) {
		return new Vector3(this.x - other.x, this.y - other.y, this.z - other.z)
	}

	/**
	 * @param {number} scalar
	 * @returns {Vector3} Vector resulting from scaling each component
	 */
	mul(scalar) {
		return new Vector3(this.x * scalar, this.y * scalar, this.z * scalar)
	}

	/**
	 * @param {number} scalar
	 * @returns {Vector3} Vector resulting from inversely scaling each component
	 */
	div(scalar) {
		return new Vector3(this.x / scalar, this.y / scalar, this.z / scalar)
	}

	/**
	 * @param {Vector3} other Vector to scale by
	 * @returns {Vector3} Vector resulting from component-wise multiplication
	 */
	scale(other) {
		return new Vector3(
			this.x * other.x,
			this.y * other.y,
			this.z * other.z
		)
	}

	/**
	 * @param {Vector3} other Vector to dot with
	 * @returns {number} Dot product
	 */
	dot(other) {
		return this.x * other.x + this.y * other.y + this.z * this.z
	}

	/**
	 * @param {Vector3} other Vector to cross with
	 * @returns {Vector3} Cross product
	 */
	cross(other) {
		return new Vector3(this.y * other.z - this.z * other.y, this.z * other.x - this.x * other.z, this.x * other.y - this.y * other.x)
	}

	/**
	 * @param {Vector3} other Vector to cross with
	 * @returns {number} Cross product
	 */
	cross2d(other) {
		return this.x * other.y - this.y * other.x
	}

	/**
	 * @returns {number[]} xyz array
	 */
	valueOf() {
		return [this.x, this.y, this.z]
	}

	toString() {
		return `(${parseFloat(this.x.toFixed(3))}, ${parseFloat(this.y.toFixed(3))}, ${parseFloat(this.z.toFixed(3))})`
	}

	/**
	 * @param {Vector3} other Whether xyz values are identical
	 */
	equals(other) {
		return other instanceof Vector3 && this.x === other.x && this.y === other.y && this.z === other.z
	}

	/**
	 * @param {Vector3} from Point 1
	 * @param {Vector3} to Point 2
	 * @returns {number} Angle between the points in degrees
	 */
	static angle(from, to) {
		return Math.atan2(to.y - from.y, to.x - from.x) * 180 / Math.PI
	}
}

const left = Object.freeze(new Vector3(-1, 0, 0))
const up = Object.freeze(new Vector3(0, 1, 0))
const right = Object.freeze(new Vector3(1, 0, 0))
const down = Object.freeze(new Vector3(0, -1, 0))
const forward = Object.freeze(new Vector3(0, 0, 1))
const back = Object.freeze(new Vector3(0, 0, -1))
const zero = Object.freeze(new Vector3(0, 0, 0))
const one = Object.freeze(new Vector3(1, 1, 1))

/**
 * @param {number} x x-component
 * @param {number} y y-component
 * @param {number} z z-component
 */
export function vec3(x = 0, y = 0, z = 0) {
	return new Vector3(x, y, z)
}