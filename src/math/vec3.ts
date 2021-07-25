export class Vector3 {
	/** x-component */
	public x: number

	/** y-component */
	public y: number

	/** z-component */
	public z: number

	/**
	 * @param x x-component
	 * @param y y-component
	 * @param z z-component
	 */
	public constructor(x: number = 0, y: number = 0, z: number = 0) {
		this.x = x
		this.y = y
		this.z = z
	}

	/** Square magnitude */
	public get sqrMagnitude(): number {
		return this.x * this.x + this.y * this.y + this.z * this.z
	}

	/** Magnitude */
	public get magnitude(): number {
		return Math.sqrt(this.sqrMagnitude)
	}

	/** Normalized instance */
	public get normalized(): Vector3 {
		return this.div(this.magnitude)
	}

	/** Inverse */
	public get inv(): Vector3 {
		return new Vector3(1 / this.x, 1 / this.y, 1 / this.z)
	}

	/** Whether a component is NaN */
	public get isNan(): boolean {
		return isNaN(this.x) || isNaN(this.y) || isNaN(this.z)
	}

	/** 4d vector array */
	public get xyzw(): [number, number, number, number] {
		return [this.x, this.y, this.z, 1]
	}

	public static get left(): Readonly<Vector3> { return left }
	public static get up(): Readonly<Vector3> { return up }
	public static get right(): Readonly<Vector3> { return right }
	public static get down(): Readonly<Vector3> { return down }
	public static get forward(): Readonly<Vector3> { return forward }
	public static get back(): Readonly<Vector3> { return back }
	public static get zero(): Readonly<Vector3> { return zero }
	public static get one(): Readonly<Vector3> { return one }

	/**
	 * @returns Vector resulting from addition
	 */
	public add(other: Vector3): Vector3 {
		return new Vector3(this.x + other.x, this.y + other.y, this.z + other.z)
	}

	/**
	 * @returns Vector resulting from subtraction
	 */
	public sub(other: Vector3): Vector3 {
		return new Vector3(this.x - other.x, this.y - other.y, this.z - other.z)
	}

	/**
	 * @returns Vector resulting from scaling each component
	 */
	public mul(scalar: number): Vector3 {
		return new Vector3(this.x * scalar, this.y * scalar, this.z * scalar)
	}

	/**
	 * @returns Vector resulting from inversely scaling each component
	 */
	public div(scalar: number): Vector3 {
		return new Vector3(this.x / scalar, this.y / scalar, this.z / scalar)
	}

	/**
	 * @param other Vector to scale by
	 * @returns Vector resulting from component-wise multiplication
	 */
	public scale(other: Vector3): Vector3 {
		return new Vector3(
			this.x * other.x,
			this.y * other.y,
			this.z * other.z
		)
	}

	/**
	 * @param other Vector to dot with
	 * @returns Dot product
	 */
	public dot(other: Vector3): number {
		return this.x * other.x + this.y * other.y + this.z * this.z
	}

	/**
	 * @param other Vector to cross with
	 * @returns Cross product
	 */
	public cross(other: Vector3): Vector3 {
		return new Vector3(this.y * other.z - this.z * other.y, this.z * other.x - this.x * other.z, this.x * other.y - this.y * other.x)
	}

	/**
	 * @param other Vector to cross with
	 * @returnsCross product
	 */
	public cross2d(other: Vector3): number {
		return this.x * other.y - this.y * other.x
	}

	/**
	 * @returns xyz array
	 */
	public valueOf(): [number, number, number] {
		return [this.x, this.y, this.z]
	}

	public toString(): string {
		return `(${parseFloat(this.x.toFixed(3))}, ${parseFloat(this.y.toFixed(3))}, ${parseFloat(this.z.toFixed(3))})`
	}

	/**
	 * @param other Whether xyz values are identical
	 */
	public equals(other: Vector3): boolean {
		return other instanceof Vector3 && this.x === other.x && this.y === other.y && this.z === other.z
	}

	/**
	 * @param from Point 1
	 * @param to Point 2
	 * @returns Angle between the points in degrees
	 */
	public static angle(from: Vector3, to: Vector3): number {
		return Math.atan2(to.y - from.y, to.x - from.x) * 180 / Math.PI
	}
}

const left = Object.freeze(vec3(-1, 0, 0))
const up = Object.freeze(vec3(0, 1, 0))
const right = Object.freeze(vec3(1, 0, 0))
const down = Object.freeze(vec3(0, -1, 0))
const forward = Object.freeze(vec3(0, 0, 1))
const back = Object.freeze(vec3(0, 0, -1))
const zero = Object.freeze(vec3(0, 0, 0))
const one = Object.freeze(vec3(1, 1, 1))

/**
 * @param x x-component
 * @param y y-component
 * @param z z-component
 */
export function vec3(x: number = 0, y: number = 0, z: number = 0): Vector3 {
	return new Vector3(x, y, z)
}

export default Vector3