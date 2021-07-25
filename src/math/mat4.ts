import Vector3 from "./vec3.js"
type Vector = [number, number, number, number]

export class Matrix4x4 {
	private readonly value: number[]

	public constructor(...value: number[]) {
		this.value = value
	}

	public static get identity(): Readonly<Matrix4x4> { return identity }
	public static get zero(): Readonly<Matrix4x4> { return zero }

	public getRow(i: number): Vector {
		return [this.value[4 * i], this.value[4 * i + 1], this.value[4 * i + 2], this.value[4 * i + 3]]
	}

	public getColumn(j: number): Vector {
		return [this.value[j], this.value[4 + j], this.value[8 + j], this.value[12 + j]]
	}

	public mul(other: Matrix4x4): Matrix4x4 {
		const [m, n] = [4, 4]
		let value = new Array<number>(m * n)

		for(let i = m - 1; i >= 0; i--)
			for(let j = n - 1; j >= 0; j--)
				value[4 * i + j] = Matrix4x4.dot4(this.getRow(i), other.getColumn(j))

		return new Matrix4x4(...value)
	}

	public mulVec(vec: Vector): Vector {
		return [
			Matrix4x4.dot4(this.getRow(0), vec),
			Matrix4x4.dot4(this.getRow(1), vec),
			Matrix4x4.dot4(this.getRow(2), vec),
			Matrix4x4.dot4(this.getRow(3), vec)
		]
	}

	public transpose(): Matrix4x4 {
		return new Matrix4x4(
			...this.getColumn(0),
			...this.getColumn(1),
			...this.getColumn(2),
			...this.getColumn(3)
		)
	}

	public toString(): string {
		return `[[${this.getRow(0)}],[${this.getRow(1)}],[${this.getRow(2)}],[${this.getRow(3)}]]`
	}

	public [Symbol.iterator]() {
		return this.value.values()
	}

	/**
	 * @param fov Field of view in radians
	 * @param aspect Aspect ratio
	 * @param near Near clipping field
	 * @param far Far clipping field
	 */
	public static createPerspective(fov: number, aspect: number, near: number, far: number) {
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
	 * @param width Width
	 * @param height Height
	 * @param near Near clipping field
	 * @param far Far clipping field
	 */
	public static createOrtho(width: number, height: number, near: number, far: number) {
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
	 * @param p Global position
	 * @param r Global rotation
	 * @param s Global scale
	 * @return Translation, rotation, scale matrix
	 */
	public static trs(p: Vector3, r: number, s: Vector3): Matrix4x4 {
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

	private static dot4(lhs: [number, number, number, number], rhs: [number, number, number, number]) {
		return lhs[0] * rhs[0] + lhs[1] * rhs[1] + lhs[2] * rhs[2] + lhs[3] * rhs[3]
	}
}

const identity = Object.freeze(mat4(
	1, 0, 0, 0,
	0, 1, 0, 0,
	0, 0, 1, 0,
	0, 0, 0, 1
))

const zero = Object.freeze(mat4(
	0, 0, 0, 0,
	0, 0, 0, 0,
	0, 0, 0, 0,
	0, 0, 0, 0
))

export function mat4(...value: number[]): Matrix4x4 {
	return new Matrix4x4(...value)
}

export default Matrix4x4