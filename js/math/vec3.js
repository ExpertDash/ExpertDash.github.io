export class Vector3 {
    /**
     * @param x x-component
     * @param y y-component
     * @param z z-component
     */
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    /** Square magnitude */
    get sqrMagnitude() {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }
    /** Magnitude */
    get magnitude() {
        return Math.sqrt(this.sqrMagnitude);
    }
    /** Normalized instance */
    get normalized() {
        return this.div(this.magnitude);
    }
    /** Inverse */
    get inv() {
        return new Vector3(1 / this.x, 1 / this.y, 1 / this.z);
    }
    /** Whether a component is NaN */
    get isNan() {
        return isNaN(this.x) || isNaN(this.y) || isNaN(this.z);
    }
    /** 4d vector array */
    get xyzw() {
        return [this.x, this.y, this.z, 1];
    }
    static get left() { return left; }
    static get up() { return up; }
    static get right() { return right; }
    static get down() { return down; }
    static get forward() { return forward; }
    static get back() { return back; }
    static get zero() { return zero; }
    static get one() { return one; }
    /**
     * @returns Vector resulting from addition
     */
    add(other) {
        return new Vector3(this.x + other.x, this.y + other.y, this.z + other.z);
    }
    /**
     * @returns Vector resulting from subtraction
     */
    sub(other) {
        return new Vector3(this.x - other.x, this.y - other.y, this.z - other.z);
    }
    /**
     * @returns Vector resulting from scaling each component
     */
    mul(scalar) {
        return new Vector3(this.x * scalar, this.y * scalar, this.z * scalar);
    }
    /**
     * @returns Vector resulting from inversely scaling each component
     */
    div(scalar) {
        return new Vector3(this.x / scalar, this.y / scalar, this.z / scalar);
    }
    /**
     * @param other Vector to scale by
     * @returns Vector resulting from component-wise multiplication
     */
    scale(other) {
        return new Vector3(this.x * other.x, this.y * other.y, this.z * other.z);
    }
    /**
     * @param other Vector to dot with
     * @returns Dot product
     */
    dot(other) {
        return this.x * other.x + this.y * other.y + this.z * this.z;
    }
    /**
     * @param other Vector to cross with
     * @returns Cross product
     */
    cross(other) {
        return new Vector3(this.y * other.z - this.z * other.y, this.z * other.x - this.x * other.z, this.x * other.y - this.y * other.x);
    }
    /**
     * @param other Vector to cross with
     * @returnsCross product
     */
    cross2d(other) {
        return this.x * other.y - this.y * other.x;
    }
    /**
     * @returns xyz array
     */
    valueOf() {
        return [this.x, this.y, this.z];
    }
    toString() {
        return `(${parseFloat(this.x.toFixed(3))}, ${parseFloat(this.y.toFixed(3))}, ${parseFloat(this.z.toFixed(3))})`;
    }
    /**
     * @param other Whether xyz values are identical
     */
    equals(other) {
        return other instanceof Vector3 && this.x === other.x && this.y === other.y && this.z === other.z;
    }
    /**
     * @param from Point 1
     * @param to Point 2
     * @returns Angle between the points in degrees
     */
    static angle(from, to) {
        return Math.atan2(to.y - from.y, to.x - from.x) * 180 / Math.PI;
    }
}
const left = Object.freeze(vec3(-1, 0, 0));
const up = Object.freeze(vec3(0, 1, 0));
const right = Object.freeze(vec3(1, 0, 0));
const down = Object.freeze(vec3(0, -1, 0));
const forward = Object.freeze(vec3(0, 0, 1));
const back = Object.freeze(vec3(0, 0, -1));
const zero = Object.freeze(vec3(0, 0, 0));
const one = Object.freeze(vec3(1, 1, 1));
/**
 * @param x x-component
 * @param y y-component
 * @param z z-component
 */
export function vec3(x = 0, y = 0, z = 0) {
    return new Vector3(x, y, z);
}
export default Vector3;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVjMy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tYXRoL3ZlYzMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxPQUFPLE9BQU87SUFVbkI7Ozs7T0FJRztJQUNILFlBQW1CLElBQVksQ0FBQyxFQUFFLElBQVksQ0FBQyxFQUFFLElBQVksQ0FBQztRQUM3RCxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNWLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ1YsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDWCxDQUFDO0lBRUQsdUJBQXVCO0lBQ3ZCLElBQVcsWUFBWTtRQUN0QixPQUFPLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFBO0lBQzNELENBQUM7SUFFRCxnQkFBZ0I7SUFDaEIsSUFBVyxTQUFTO1FBQ25CLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUE7SUFDcEMsQ0FBQztJQUVELDBCQUEwQjtJQUMxQixJQUFXLFVBQVU7UUFDcEIsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUNoQyxDQUFDO0lBRUQsY0FBYztJQUNkLElBQVcsR0FBRztRQUNiLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUN2RCxDQUFDO0lBRUQsaUNBQWlDO0lBQ2pDLElBQVcsS0FBSztRQUNmLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFL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QUcsSUFBSSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ2xJLENBQUM7SUFFRDs7O09BR0c7SUFDSSxPQUFPLENBQUMsS0FBYztRQUM1QixPQUFPLElBQUksQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUE7SUFDM0MsQ0FBQztJQUVEOztPQUVHO0lBQ0ksT0FBTztRQUNiLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ2hDLENBQUM7SUFFTSxRQUFRO1FBQ2QsT0FBTyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUE7SUFDaEgsQ0FBQztJQUVEOztPQUVHO0lBQ0ksTUFBTSxDQUFDLEtBQWM7UUFDM0IsT0FBTyxLQUFLLFlBQVksT0FBTyxJQUFJLElBQUksQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFBO0lBQ2xHLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFhLEVBQUUsRUFBVztRQUM3QyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFBO0lBQ2hFLENBQUM7Q0FDRDtBQUVELE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQzFDLE1BQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUN2QyxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDMUMsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDMUMsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQzVDLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQzFDLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUN6QyxNQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFFeEM7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSxJQUFJLENBQUMsSUFBWSxDQUFDLEVBQUUsSUFBWSxDQUFDLEVBQUUsSUFBWSxDQUFDO0lBQy9ELE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtBQUM1QixDQUFDO0FBRUQsZUFBZSxPQUFPLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgVmVjdG9yMyB7XHJcblx0LyoqIHgtY29tcG9uZW50ICovXHJcblx0cHVibGljIHg6IG51bWJlclxyXG5cclxuXHQvKiogeS1jb21wb25lbnQgKi9cclxuXHRwdWJsaWMgeTogbnVtYmVyXHJcblxyXG5cdC8qKiB6LWNvbXBvbmVudCAqL1xyXG5cdHB1YmxpYyB6OiBudW1iZXJcclxuXHJcblx0LyoqXHJcblx0ICogQHBhcmFtIHggeC1jb21wb25lbnRcclxuXHQgKiBAcGFyYW0geSB5LWNvbXBvbmVudFxyXG5cdCAqIEBwYXJhbSB6IHotY29tcG9uZW50XHJcblx0ICovXHJcblx0cHVibGljIGNvbnN0cnVjdG9yKHg6IG51bWJlciA9IDAsIHk6IG51bWJlciA9IDAsIHo6IG51bWJlciA9IDApIHtcclxuXHRcdHRoaXMueCA9IHhcclxuXHRcdHRoaXMueSA9IHlcclxuXHRcdHRoaXMueiA9IHpcclxuXHR9XHJcblxyXG5cdC8qKiBTcXVhcmUgbWFnbml0dWRlICovXHJcblx0cHVibGljIGdldCBzcXJNYWduaXR1ZGUoKTogbnVtYmVyIHtcclxuXHRcdHJldHVybiB0aGlzLnggKiB0aGlzLnggKyB0aGlzLnkgKiB0aGlzLnkgKyB0aGlzLnogKiB0aGlzLnpcclxuXHR9XHJcblxyXG5cdC8qKiBNYWduaXR1ZGUgKi9cclxuXHRwdWJsaWMgZ2V0IG1hZ25pdHVkZSgpOiBudW1iZXIge1xyXG5cdFx0cmV0dXJuIE1hdGguc3FydCh0aGlzLnNxck1hZ25pdHVkZSlcclxuXHR9XHJcblxyXG5cdC8qKiBOb3JtYWxpemVkIGluc3RhbmNlICovXHJcblx0cHVibGljIGdldCBub3JtYWxpemVkKCk6IFZlY3RvcjMge1xyXG5cdFx0cmV0dXJuIHRoaXMuZGl2KHRoaXMubWFnbml0dWRlKVxyXG5cdH1cclxuXHJcblx0LyoqIEludmVyc2UgKi9cclxuXHRwdWJsaWMgZ2V0IGludigpOiBWZWN0b3IzIHtcclxuXHRcdHJldHVybiBuZXcgVmVjdG9yMygxIC8gdGhpcy54LCAxIC8gdGhpcy55LCAxIC8gdGhpcy56KVxyXG5cdH1cclxuXHJcblx0LyoqIFdoZXRoZXIgYSBjb21wb25lbnQgaXMgTmFOICovXHJcblx0cHVibGljIGdldCBpc05hbigpOiBib29sZWFuIHtcclxuXHRcdHJldHVybiBpc05hTih0aGlzLngpIHx8IGlzTmFOKHRoaXMueSkgfHwgaXNOYU4odGhpcy56KVxyXG5cdH1cclxuXHJcblx0LyoqIDRkIHZlY3RvciBhcnJheSAqL1xyXG5cdHB1YmxpYyBnZXQgeHl6dygpOiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXSB7XHJcblx0XHRyZXR1cm4gW3RoaXMueCwgdGhpcy55LCB0aGlzLnosIDFdXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc3RhdGljIGdldCBsZWZ0KCk6IFJlYWRvbmx5PFZlY3RvcjM+IHsgcmV0dXJuIGxlZnQgfVxyXG5cdHB1YmxpYyBzdGF0aWMgZ2V0IHVwKCk6IFJlYWRvbmx5PFZlY3RvcjM+IHsgcmV0dXJuIHVwIH1cclxuXHRwdWJsaWMgc3RhdGljIGdldCByaWdodCgpOiBSZWFkb25seTxWZWN0b3IzPiB7IHJldHVybiByaWdodCB9XHJcblx0cHVibGljIHN0YXRpYyBnZXQgZG93bigpOiBSZWFkb25seTxWZWN0b3IzPiB7IHJldHVybiBkb3duIH1cclxuXHRwdWJsaWMgc3RhdGljIGdldCBmb3J3YXJkKCk6IFJlYWRvbmx5PFZlY3RvcjM+IHsgcmV0dXJuIGZvcndhcmQgfVxyXG5cdHB1YmxpYyBzdGF0aWMgZ2V0IGJhY2soKTogUmVhZG9ubHk8VmVjdG9yMz4geyByZXR1cm4gYmFjayB9XHJcblx0cHVibGljIHN0YXRpYyBnZXQgemVybygpOiBSZWFkb25seTxWZWN0b3IzPiB7IHJldHVybiB6ZXJvIH1cclxuXHRwdWJsaWMgc3RhdGljIGdldCBvbmUoKTogUmVhZG9ubHk8VmVjdG9yMz4geyByZXR1cm4gb25lIH1cclxuXHJcblx0LyoqXHJcblx0ICogQHJldHVybnMgVmVjdG9yIHJlc3VsdGluZyBmcm9tIGFkZGl0aW9uXHJcblx0ICovXHJcblx0cHVibGljIGFkZChvdGhlcjogVmVjdG9yMyk6IFZlY3RvcjMge1xyXG5cdFx0cmV0dXJuIG5ldyBWZWN0b3IzKHRoaXMueCArIG90aGVyLngsIHRoaXMueSArIG90aGVyLnksIHRoaXMueiArIG90aGVyLnopXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBAcmV0dXJucyBWZWN0b3IgcmVzdWx0aW5nIGZyb20gc3VidHJhY3Rpb25cclxuXHQgKi9cclxuXHRwdWJsaWMgc3ViKG90aGVyOiBWZWN0b3IzKTogVmVjdG9yMyB7XHJcblx0XHRyZXR1cm4gbmV3IFZlY3RvcjModGhpcy54IC0gb3RoZXIueCwgdGhpcy55IC0gb3RoZXIueSwgdGhpcy56IC0gb3RoZXIueilcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEByZXR1cm5zIFZlY3RvciByZXN1bHRpbmcgZnJvbSBzY2FsaW5nIGVhY2ggY29tcG9uZW50XHJcblx0ICovXHJcblx0cHVibGljIG11bChzY2FsYXI6IG51bWJlcik6IFZlY3RvcjMge1xyXG5cdFx0cmV0dXJuIG5ldyBWZWN0b3IzKHRoaXMueCAqIHNjYWxhciwgdGhpcy55ICogc2NhbGFyLCB0aGlzLnogKiBzY2FsYXIpXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBAcmV0dXJucyBWZWN0b3IgcmVzdWx0aW5nIGZyb20gaW52ZXJzZWx5IHNjYWxpbmcgZWFjaCBjb21wb25lbnRcclxuXHQgKi9cclxuXHRwdWJsaWMgZGl2KHNjYWxhcjogbnVtYmVyKTogVmVjdG9yMyB7XHJcblx0XHRyZXR1cm4gbmV3IFZlY3RvcjModGhpcy54IC8gc2NhbGFyLCB0aGlzLnkgLyBzY2FsYXIsIHRoaXMueiAvIHNjYWxhcilcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBwYXJhbSBvdGhlciBWZWN0b3IgdG8gc2NhbGUgYnlcclxuXHQgKiBAcmV0dXJucyBWZWN0b3IgcmVzdWx0aW5nIGZyb20gY29tcG9uZW50LXdpc2UgbXVsdGlwbGljYXRpb25cclxuXHQgKi9cclxuXHRwdWJsaWMgc2NhbGUob3RoZXI6IFZlY3RvcjMpOiBWZWN0b3IzIHtcclxuXHRcdHJldHVybiBuZXcgVmVjdG9yMyhcclxuXHRcdFx0dGhpcy54ICogb3RoZXIueCxcclxuXHRcdFx0dGhpcy55ICogb3RoZXIueSxcclxuXHRcdFx0dGhpcy56ICogb3RoZXIuelxyXG5cdFx0KVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQHBhcmFtIG90aGVyIFZlY3RvciB0byBkb3Qgd2l0aFxyXG5cdCAqIEByZXR1cm5zIERvdCBwcm9kdWN0XHJcblx0ICovXHJcblx0cHVibGljIGRvdChvdGhlcjogVmVjdG9yMyk6IG51bWJlciB7XHJcblx0XHRyZXR1cm4gdGhpcy54ICogb3RoZXIueCArIHRoaXMueSAqIG90aGVyLnkgKyB0aGlzLnogKiB0aGlzLnpcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBwYXJhbSBvdGhlciBWZWN0b3IgdG8gY3Jvc3Mgd2l0aFxyXG5cdCAqIEByZXR1cm5zIENyb3NzIHByb2R1Y3RcclxuXHQgKi9cclxuXHRwdWJsaWMgY3Jvc3Mob3RoZXI6IFZlY3RvcjMpOiBWZWN0b3IzIHtcclxuXHRcdHJldHVybiBuZXcgVmVjdG9yMyh0aGlzLnkgKiBvdGhlci56IC0gdGhpcy56ICogb3RoZXIueSwgdGhpcy56ICogb3RoZXIueCAtIHRoaXMueCAqIG90aGVyLnosIHRoaXMueCAqIG90aGVyLnkgLSB0aGlzLnkgKiBvdGhlci54KVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQHBhcmFtIG90aGVyIFZlY3RvciB0byBjcm9zcyB3aXRoXHJcblx0ICogQHJldHVybnNDcm9zcyBwcm9kdWN0XHJcblx0ICovXHJcblx0cHVibGljIGNyb3NzMmQob3RoZXI6IFZlY3RvcjMpOiBudW1iZXIge1xyXG5cdFx0cmV0dXJuIHRoaXMueCAqIG90aGVyLnkgLSB0aGlzLnkgKiBvdGhlci54XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBAcmV0dXJucyB4eXogYXJyYXlcclxuXHQgKi9cclxuXHRwdWJsaWMgdmFsdWVPZigpOiBbbnVtYmVyLCBudW1iZXIsIG51bWJlcl0ge1xyXG5cdFx0cmV0dXJuIFt0aGlzLngsIHRoaXMueSwgdGhpcy56XVxyXG5cdH1cclxuXHJcblx0cHVibGljIHRvU3RyaW5nKCk6IHN0cmluZyB7XHJcblx0XHRyZXR1cm4gYCgke3BhcnNlRmxvYXQodGhpcy54LnRvRml4ZWQoMykpfSwgJHtwYXJzZUZsb2F0KHRoaXMueS50b0ZpeGVkKDMpKX0sICR7cGFyc2VGbG9hdCh0aGlzLnoudG9GaXhlZCgzKSl9KWBcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBwYXJhbSBvdGhlciBXaGV0aGVyIHh5eiB2YWx1ZXMgYXJlIGlkZW50aWNhbFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBlcXVhbHMob3RoZXI6IFZlY3RvcjMpOiBib29sZWFuIHtcclxuXHRcdHJldHVybiBvdGhlciBpbnN0YW5jZW9mIFZlY3RvcjMgJiYgdGhpcy54ID09PSBvdGhlci54ICYmIHRoaXMueSA9PT0gb3RoZXIueSAmJiB0aGlzLnogPT09IG90aGVyLnpcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBwYXJhbSBmcm9tIFBvaW50IDFcclxuXHQgKiBAcGFyYW0gdG8gUG9pbnQgMlxyXG5cdCAqIEByZXR1cm5zIEFuZ2xlIGJldHdlZW4gdGhlIHBvaW50cyBpbiBkZWdyZWVzXHJcblx0ICovXHJcblx0cHVibGljIHN0YXRpYyBhbmdsZShmcm9tOiBWZWN0b3IzLCB0bzogVmVjdG9yMyk6IG51bWJlciB7XHJcblx0XHRyZXR1cm4gTWF0aC5hdGFuMih0by55IC0gZnJvbS55LCB0by54IC0gZnJvbS54KSAqIDE4MCAvIE1hdGguUElcclxuXHR9XHJcbn1cclxuXHJcbmNvbnN0IGxlZnQgPSBPYmplY3QuZnJlZXplKHZlYzMoLTEsIDAsIDApKVxyXG5jb25zdCB1cCA9IE9iamVjdC5mcmVlemUodmVjMygwLCAxLCAwKSlcclxuY29uc3QgcmlnaHQgPSBPYmplY3QuZnJlZXplKHZlYzMoMSwgMCwgMCkpXHJcbmNvbnN0IGRvd24gPSBPYmplY3QuZnJlZXplKHZlYzMoMCwgLTEsIDApKVxyXG5jb25zdCBmb3J3YXJkID0gT2JqZWN0LmZyZWV6ZSh2ZWMzKDAsIDAsIDEpKVxyXG5jb25zdCBiYWNrID0gT2JqZWN0LmZyZWV6ZSh2ZWMzKDAsIDAsIC0xKSlcclxuY29uc3QgemVybyA9IE9iamVjdC5mcmVlemUodmVjMygwLCAwLCAwKSlcclxuY29uc3Qgb25lID0gT2JqZWN0LmZyZWV6ZSh2ZWMzKDEsIDEsIDEpKVxyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSB4IHgtY29tcG9uZW50XHJcbiAqIEBwYXJhbSB5IHktY29tcG9uZW50XHJcbiAqIEBwYXJhbSB6IHotY29tcG9uZW50XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdmVjMyh4OiBudW1iZXIgPSAwLCB5OiBudW1iZXIgPSAwLCB6OiBudW1iZXIgPSAwKTogVmVjdG9yMyB7XHJcblx0cmV0dXJuIG5ldyBWZWN0b3IzKHgsIHksIHopXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFZlY3RvcjMiXX0=