import Vector3 from "./vec3.js"

type Line = [Vector3, Vector3]

export default abstract class Geometry {
	/**
	 * Determines whether the points are colinear, clockwise, or counterclockwise
	 * @param a Point 1
	 * @param b Point 2
	 * @param c Point 3
	 * @returns 0 if colinear, > 0 if cc, or < 0 if ccw
	 */
	public static direction(a: Vector3, b: Vector3, c: Vector3): number {
		return Math.sign((b.y - a.y) * (c.x - b.x) - (b.x - a.x) * (c.y - b.y))
	}

	/**
	 * @param l Line
	 * @param p Point
	 * @returns Whether the point is on the line
	 */
	public static on(l: Line, p: Vector3): boolean {
		let [ls, le] = l
		return Math.min(ls.x, le.x) <= p.x && p.x <= Math.max(ls.x, le.x)
			&& Math.min(ls.y, le.y) <= p.y && p.y <= Math.max(ls.y, le.y)
	}

	/**
	 * @param l1 Line 1
	 * @param l2 Line 2
	 * @returns Intersection point between lines 1 and 2. NaN vector if none
	 */
	public static intersection(l1: Line, l2: Line): Vector3 {
		let [s1, e1] = l1
		let [s2, e2] = l2
		let [d1, d2] = [e1.sub(s1), e2.sub(s2)]

		let u = s2.sub(s1).cross2d(d2.div(d1.cross2d(d2)))
		let v = s2.sub(s1).cross2d(d1.div(d1.cross2d(d2)))

		if(d1.cross2d(d2) == 0 && s2.sub(s1).cross2d(d1) == 0) {
			let a = s2.sub(s1).dot(d1.div(d1.dot(d1)))
			let b = a + d2.dot(d1.div(d1.dot(d1)))

			let t0 = Math.min(a, b)
			let t1 = Math.max(a, b)

			return (t0 <= 0 && 0 <= t1) ||
				(0 <= t0 && t1 <= 1) ||
				(t0 <= 1 && 1 <= t1) ? new Vector3(u, v) : new Vector3(NaN, NaN)
		}

		if(d2.cross2d(d1) == 0 && s2.sub(s1).cross2d(d1) != 0)
			return new Vector3(NaN, NaN)

		return d2.cross2d(d1) != 0 &&
			0 <= u && u <= 1 &&
			0 <= v && v <= 1 ? new Vector3(u, v) : new Vector3(NaN, NaN)
	}

	/**
	 * @param l1 Line 1
	 * @param l2 Line 2
	 * @returns Whether line 1 intersects line 2
	 */
	public static intersects(l1: Line, l2: Line): boolean {
		return !Geometry.intersection(l1, l2).isNan
	}
}