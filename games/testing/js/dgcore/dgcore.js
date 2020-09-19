
let wasm;

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachegetUint8Memory0 = null;
function getUint8Memory0() {
    if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
    return instance.ptr;
}

let cachegetInt32Memory0 = null;
function getInt32Memory0() {
    if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== wasm.memory.buffer) {
        cachegetInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachegetInt32Memory0;
}
/**
* @returns {number}
*/
export function test() {
    var ret = wasm.test();
    return ret;
}

/**
* Returns a new Matrix4x4 with the given elements
* @param {number} e11
* @param {number} e12
* @param {number} e13
* @param {number} e14
* @param {number} e21
* @param {number} e22
* @param {number} e23
* @param {number} e24
* @param {number} e31
* @param {number} e32
* @param {number} e33
* @param {number} e34
* @param {number} e41
* @param {number} e42
* @param {number} e43
* @param {number} e44
* @returns {Matrix4}
*/
export function mat4(e11, e12, e13, e14, e21, e22, e23, e24, e31, e32, e33, e34, e41, e42, e43, e44) {
    var ret = wasm.mat4(e11, e12, e13, e14, e21, e22, e23, e24, e31, e32, e33, e34, e41, e42, e43, e44);
    return Matrix4.__wrap(ret);
}

/**
* Returns a new Quaternion from the given euler angles
* @param {number} x
* @param {number} y
* @param {number} z
* @param {number} w
* @returns {Quaternion}
*/
export function quat(x, y, z, w) {
    var ret = wasm.quat(x, y, z, w);
    return Quaternion.__wrap(ret);
}

/**
* Returns a new Vector2 with the given components
* @param {number} x
* @param {number} y
* @returns {Vector2}
*/
export function vec2(x, y) {
    var ret = wasm.vec2(x, y);
    return Vector2.__wrap(ret);
}

/**
* Returns a new Vector3 with the given components
* @param {number} x
* @param {number} y
* @param {number} z
* @returns {Vector3}
*/
export function vec3(x, y, z) {
    var ret = wasm.vec3(x, y, z);
    return Vector3.__wrap(ret);
}

/**
* Returns a new Vector4 with the given components
* @param {number} x
* @param {number} y
* @param {number} z
* @param {number} w
* @returns {Vector4}
*/
export function vec4(x, y, z, w) {
    var ret = wasm.quat(x, y, z, w);
    return Vector4.__wrap(ret);
}

/**
* 4x4 Matrix
*/
export class Matrix4 {

    static __wrap(ptr) {
        const obj = Object.create(Matrix4.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_matrix4_free(ptr);
    }
    /**
    * Creates a new 4x4 matrix from the given elements
    * @param {number} e11
    * @param {number} e12
    * @param {number} e13
    * @param {number} e14
    * @param {number} e21
    * @param {number} e22
    * @param {number} e23
    * @param {number} e24
    * @param {number} e31
    * @param {number} e32
    * @param {number} e33
    * @param {number} e34
    * @param {number} e41
    * @param {number} e42
    * @param {number} e43
    * @param {number} e44
    */
    constructor(e11, e12, e13, e14, e21, e22, e23, e24, e31, e32, e33, e34, e41, e42, e43, e44) {
        var ret = wasm.matrix4_new(e11, e12, e13, e14, e21, e22, e23, e24, e31, e32, e33, e34, e41, e42, e43, e44);
        return Matrix4.__wrap(ret);
    }
    /**
    * Returns the ith row as a vector
    * * i - Row index
    * @param {number} i
    * @returns {Vector4}
    */
    getRow(i) {
        var ret = wasm.matrix4_getRow(this.ptr, i);
        return Vector4.__wrap(ret);
    }
    /**
    * Returns the ith column as a vector
    * * i - Column index
    * @param {number} j
    * @returns {Vector4}
    */
    getColumn(j) {
        var ret = wasm.matrix4_getColumn(this.ptr, j);
        return Vector4.__wrap(ret);
    }
    /**
    * Returns a new matrix whose rows are this original's columns
    * @returns {Matrix4}
    */
    transpose() {
        var ret = wasm.matrix4_transpose(this.ptr);
        return Matrix4.__wrap(ret);
    }
    /**
    * Returns a new perspective matrix
    * * fov - Field of view
    * * aspect - Aspect ratio
    * * near - Near clipping field
    * * far - Far clipping field
    * @param {number} fov
    * @param {number} aspect
    * @param {number} near
    * @param {number} far
    * @returns {Matrix4}
    */
    static createPerspective(fov, aspect, near, far) {
        var ret = wasm.matrix4_createPerspective(fov, aspect, near, far);
        return Matrix4.__wrap(ret);
    }
    /**
    * Returns a new orthographic matrix
    * * fov - Field of view
    * * aspect - Aspect ratio
    * * near - Near clipping field
    * * far - Far clipping field
    * @param {number} width
    * @param {number} height
    * @param {number} near
    * @param {number} far
    * @returns {Matrix4}
    */
    static createOrtho(width, height, near, far) {
        var ret = wasm.matrix4_createOrtho(width, height, near, far);
        return Matrix4.__wrap(ret);
    }
    /**
    * Returns a model view matrix from the transformations
    * * p - Position
    * * r - Rotation
    * * s - Scale
    * @param {Vector3} p
    * @param {Quaternion} r
    * @param {Vector3} s
    * @returns {Matrix4}
    */
    static trs(p, r, s) {
        _assertClass(p, Vector3);
        var ptr0 = p.ptr;
        p.ptr = 0;
        _assertClass(r, Quaternion);
        var ptr1 = r.ptr;
        r.ptr = 0;
        _assertClass(s, Vector3);
        var ptr2 = s.ptr;
        s.ptr = 0;
        var ret = wasm.matrix4_trs(ptr0, ptr1, ptr2);
        return Matrix4.__wrap(ret);
    }
    /**
    * @returns {string}
    */
    toString() {
        try {
            wasm.matrix4_toString(8, this.ptr);
            var r0 = getInt32Memory0()[8 / 4 + 0];
            var r1 = getInt32Memory0()[8 / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_free(r0, r1);
        }
    }
    /**
    * @returns {Matrix4}
    */
    static identity() {
        var ret = wasm.matrix4_identity();
        return Matrix4.__wrap(ret);
    }
    /**
    * @returns {Matrix4}
    */
    static zero() {
        var ret = wasm.matrix4_zero();
        return Matrix4.__wrap(ret);
    }
}
/**
*/
export class Quaternion {

    static __wrap(ptr) {
        const obj = Object.create(Quaternion.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_quaternion_free(ptr);
    }
    /**
    * x-component
    * @returns {number}
    */
    get x() {
        var ret = wasm.__wbg_get_quaternion_x(this.ptr);
        return ret;
    }
    /**
    * x-component
    * @param {number} arg0
    */
    set x(arg0) {
        wasm.__wbg_set_quaternion_x(this.ptr, arg0);
    }
    /**
    * y-component
    * @returns {number}
    */
    get y() {
        var ret = wasm.__wbg_get_quaternion_y(this.ptr);
        return ret;
    }
    /**
    * y-component
    * @param {number} arg0
    */
    set y(arg0) {
        wasm.__wbg_set_quaternion_y(this.ptr, arg0);
    }
    /**
    * z-component
    * @returns {number}
    */
    get z() {
        var ret = wasm.__wbg_get_quaternion_z(this.ptr);
        return ret;
    }
    /**
    * z-component
    * @param {number} arg0
    */
    set z(arg0) {
        wasm.__wbg_set_quaternion_z(this.ptr, arg0);
    }
    /**
    * w-component
    * @returns {number}
    */
    get w() {
        var ret = wasm.__wbg_get_quaternion_w(this.ptr);
        return ret;
    }
    /**
    * w-component
    * @param {number} arg0
    */
    set w(arg0) {
        wasm.__wbg_set_quaternion_w(this.ptr, arg0);
    }
    /**
    * Returns a new vector
    * @param {number} x
    * @param {number} y
    * @param {number} z
    * @param {number} w
    */
    constructor(x, y, z, w) {
        var ret = wasm.quaternion_new(x, y, z, w);
        return Quaternion.__wrap(ret);
    }
    /**
    * Returns an associated quaternion from the euler angles in degrees
    * @param {Vector3} angles
    * @returns {Quaternion}
    */
    static euler(angles) {
        _assertClass(angles, Vector3);
        var ptr0 = angles.ptr;
        angles.ptr = 0;
        var ret = wasm.quaternion_euler(ptr0);
        return Quaternion.__wrap(ret);
    }
    /**
    * @returns {string}
    */
    toString() {
        try {
            wasm.quaternion_toString(8, this.ptr);
            var r0 = getInt32Memory0()[8 / 4 + 0];
            var r1 = getInt32Memory0()[8 / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_free(r0, r1);
        }
    }
    /**
    * @returns {Quaternion}
    */
    static identity() {
        var ret = wasm.quaternion_identity();
        return Quaternion.__wrap(ret);
    }
}
/**
*/
export class Transform {

    static __wrap(ptr) {
        const obj = Object.create(Transform.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_transform_free(ptr);
    }
    /**
    * @returns {Vector3}
    */
    get position() {
        var ret = wasm.__wbg_get_transform_position(this.ptr);
        return Vector3.__wrap(ret);
    }
    /**
    * @param {Vector3} arg0
    */
    set position(arg0) {
        _assertClass(arg0, Vector3);
        var ptr0 = arg0.ptr;
        arg0.ptr = 0;
        wasm.__wbg_set_transform_position(this.ptr, ptr0);
    }
    /**
    * @returns {Quaternion}
    */
    get rotation() {
        var ret = wasm.__wbg_get_transform_rotation(this.ptr);
        return Quaternion.__wrap(ret);
    }
    /**
    * @param {Quaternion} arg0
    */
    set rotation(arg0) {
        _assertClass(arg0, Quaternion);
        var ptr0 = arg0.ptr;
        arg0.ptr = 0;
        wasm.__wbg_set_transform_rotation(this.ptr, ptr0);
    }
    /**
    * @returns {Vector3}
    */
    get scale() {
        var ret = wasm.__wbg_get_transform_scale(this.ptr);
        return Vector3.__wrap(ret);
    }
    /**
    * @param {Vector3} arg0
    */
    set scale(arg0) {
        _assertClass(arg0, Vector3);
        var ptr0 = arg0.ptr;
        arg0.ptr = 0;
        wasm.__wbg_set_transform_scale(this.ptr, ptr0);
    }
    /**
    * @param {Vector3} position
    * @param {Quaternion} rotation
    * @param {Vector3} scale
    */
    constructor(position, rotation, scale) {
        _assertClass(position, Vector3);
        var ptr0 = position.ptr;
        position.ptr = 0;
        _assertClass(rotation, Quaternion);
        var ptr1 = rotation.ptr;
        rotation.ptr = 0;
        _assertClass(scale, Vector3);
        var ptr2 = scale.ptr;
        scale.ptr = 0;
        var ret = wasm.transform_new(ptr0, ptr1, ptr2);
        return Transform.__wrap(ret);
    }
    /**
    * Returns the global transformation matrix
    * @returns {Matrix4}
    */
    get matrix() {
        var ret = wasm.transform_matrix(this.ptr);
        return Matrix4.__wrap(ret);
    }
}
/**
* 2d Vector
*/
export class Vector2 {

    static __wrap(ptr) {
        const obj = Object.create(Vector2.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_vector2_free(ptr);
    }
    /**
    * x-component
    * @returns {number}
    */
    get x() {
        var ret = wasm.__wbg_get_vector2_x(this.ptr);
        return ret;
    }
    /**
    * x-component
    * @param {number} arg0
    */
    set x(arg0) {
        wasm.__wbg_set_vector2_x(this.ptr, arg0);
    }
    /**
    * y-component
    * @returns {number}
    */
    get y() {
        var ret = wasm.__wbg_get_vector2_y(this.ptr);
        return ret;
    }
    /**
    * y-component
    * @param {number} arg0
    */
    set y(arg0) {
        wasm.__wbg_set_vector2_y(this.ptr, arg0);
    }
    /**
    * Returns a new vector
    * @param {number} x
    * @param {number} y
    */
    constructor(x, y) {
        var ret = wasm.vector2_new(x, y);
        return Vector2.__wrap(ret);
    }
    /**
    * Returns the quare magnitude scalar
    * @returns {number}
    */
    get sqrMagnitude() {
        var ret = wasm.vector2_sqrMagnitude(this.ptr);
        return ret;
    }
    /**
    * Returns the magnitude scalar
    * @returns {number}
    */
    get magnitude() {
        var ret = wasm.vector2_magnitude(this.ptr);
        return ret;
    }
    /**
    * Returns this vector with a magnitude of 1 as a new instance
    * @returns {Vector2}
    */
    get normalized() {
        var ret = wasm.vector2_normalized(this.ptr);
        return Vector2.__wrap(ret);
    }
    /**
    * Returns the inverse vector
    * @returns {Vector2}
    */
    get inv() {
        var ret = wasm.vector2_inv(this.ptr);
        return Vector2.__wrap(ret);
    }
    /**
    * Returns true if either component is NaN
    * @returns {boolean}
    */
    get isNaN() {
        var ret = wasm.vector2_isNaN(this.ptr);
        return ret !== 0;
    }
    /**
    * Returns the dot product scalar
    * * other - Vector to dot with
    * @param {Vector2} other
    * @returns {number}
    */
    dot(other) {
        _assertClass(other, Vector2);
        var ptr0 = other.ptr;
        other.ptr = 0;
        var ret = wasm.vector2_dot(this.ptr, ptr0);
        return ret;
    }
    /**
    * Returns the cross product 'scalar'
    * * other - Vector to cross with
    * @param {Vector2} other
    * @returns {number}
    */
    cross(other) {
        _assertClass(other, Vector2);
        var ptr0 = other.ptr;
        other.ptr = 0;
        var ret = wasm.vector2_cross(this.ptr, ptr0);
        return ret;
    }
    /**
    * Returns the angle between the points in degrees
    * * from - Starting point
    * * to - Ending point
    * @param {Vector2} from
    * @param {Vector2} to
    * @returns {number}
    */
    static angle(from, to) {
        _assertClass(from, Vector2);
        var ptr0 = from.ptr;
        from.ptr = 0;
        _assertClass(to, Vector2);
        var ptr1 = to.ptr;
        to.ptr = 0;
        var ret = wasm.vector2_angle(ptr0, ptr1);
        return ret;
    }
    /**
    * @returns {string}
    */
    toString() {
        try {
            wasm.vector2_toString(8, this.ptr);
            var r0 = getInt32Memory0()[8 / 4 + 0];
            var r1 = getInt32Memory0()[8 / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_free(r0, r1);
        }
    }
    /**
    * @returns {Vector2}
    */
    static one() {
        var ret = wasm.vector2_one();
        return Vector2.__wrap(ret);
    }
    /**
    * @returns {Vector2}
    */
    static left() {
        var ret = wasm.vector2_left();
        return Vector2.__wrap(ret);
    }
    /**
    * @returns {Vector2}
    */
    static up() {
        var ret = wasm.vector2_up();
        return Vector2.__wrap(ret);
    }
    /**
    * @returns {Vector2}
    */
    static right() {
        var ret = wasm.vector2_right();
        return Vector2.__wrap(ret);
    }
    /**
    * @returns {Vector2}
    */
    static down() {
        var ret = wasm.vector2_down();
        return Vector2.__wrap(ret);
    }
    /**
    * @returns {Vector2}
    */
    static zero() {
        var ret = wasm.vector2_zero();
        return Vector2.__wrap(ret);
    }
}
/**
* 3d Vector
*/
export class Vector3 {

    static __wrap(ptr) {
        const obj = Object.create(Vector3.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_vector3_free(ptr);
    }
    /**
    * x-component
    * @returns {number}
    */
    get x() {
        var ret = wasm.__wbg_get_vector3_x(this.ptr);
        return ret;
    }
    /**
    * x-component
    * @param {number} arg0
    */
    set x(arg0) {
        wasm.__wbg_set_vector3_x(this.ptr, arg0);
    }
    /**
    * y-component
    * @returns {number}
    */
    get y() {
        var ret = wasm.__wbg_get_vector3_y(this.ptr);
        return ret;
    }
    /**
    * y-component
    * @param {number} arg0
    */
    set y(arg0) {
        wasm.__wbg_set_vector3_y(this.ptr, arg0);
    }
    /**
    * z-component
    * @returns {number}
    */
    get z() {
        var ret = wasm.__wbg_get_vector3_z(this.ptr);
        return ret;
    }
    /**
    * z-component
    * @param {number} arg0
    */
    set z(arg0) {
        wasm.__wbg_set_vector3_z(this.ptr, arg0);
    }
    /**
    * Returns a new vector
    * @param {number} x
    * @param {number} y
    * @param {number} z
    */
    constructor(x, y, z) {
        var ret = wasm.vector3_new(x, y, z);
        return Vector3.__wrap(ret);
    }
    /**
    * Returns the quare magnitude scalar
    * @returns {number}
    */
    get sqrMagnitude() {
        var ret = wasm.vector3_sqrMagnitude(this.ptr);
        return ret;
    }
    /**
    * Returns the magnitude scalar
    * @returns {number}
    */
    get magnitude() {
        var ret = wasm.vector3_magnitude(this.ptr);
        return ret;
    }
    /**
    * Returns this vector with a magnitude of 1 as a new instance
    * @returns {Vector3}
    */
    get normalized() {
        var ret = wasm.vector3_normalized(this.ptr);
        return Vector3.__wrap(ret);
    }
    /**
    * Returns the inverse vector
    * @returns {Vector3}
    */
    get inv() {
        var ret = wasm.vector3_inv(this.ptr);
        return Vector3.__wrap(ret);
    }
    /**
    * Returns true if either component is NaN
    * @returns {boolean}
    */
    get isNaN() {
        var ret = wasm.vector3_isNaN(this.ptr);
        return ret !== 0;
    }
    /**
    * Returns the dot product scalar
    * * other - Vector to dot with
    * @param {Vector3} other
    * @returns {number}
    */
    dot(other) {
        _assertClass(other, Vector3);
        var ptr0 = other.ptr;
        other.ptr = 0;
        var ret = wasm.vector3_dot(this.ptr, ptr0);
        return ret;
    }
    /**
    * Returns the cross product 'scalar'
    * * other - Vector to cross with
    * @param {Vector3} other
    * @returns {Vector3}
    */
    cross(other) {
        _assertClass(other, Vector3);
        var ptr0 = other.ptr;
        other.ptr = 0;
        var ret = wasm.vector3_cross(this.ptr, ptr0);
        return Vector3.__wrap(ret);
    }
    /**
    * @returns {string}
    */
    toString() {
        try {
            wasm.vector3_toString(8, this.ptr);
            var r0 = getInt32Memory0()[8 / 4 + 0];
            var r1 = getInt32Memory0()[8 / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_free(r0, r1);
        }
    }
    /**
    * @returns {Vector3}
    */
    static one() {
        var ret = wasm.vector3_one();
        return Vector3.__wrap(ret);
    }
    /**
    * @returns {Vector3}
    */
    static left() {
        var ret = wasm.vector3_left();
        return Vector3.__wrap(ret);
    }
    /**
    * @returns {Vector3}
    */
    static up() {
        var ret = wasm.vector3_up();
        return Vector3.__wrap(ret);
    }
    /**
    * @returns {Vector3}
    */
    static right() {
        var ret = wasm.vector3_right();
        return Vector3.__wrap(ret);
    }
    /**
    * @returns {Vector3}
    */
    static down() {
        var ret = wasm.vector3_down();
        return Vector3.__wrap(ret);
    }
    /**
    * @returns {Vector3}
    */
    static forward() {
        var ret = wasm.vector3_forward();
        return Vector3.__wrap(ret);
    }
    /**
    * @returns {Vector3}
    */
    static back() {
        var ret = wasm.vector3_back();
        return Vector3.__wrap(ret);
    }
    /**
    * @returns {Vector3}
    */
    static zero() {
        var ret = wasm.vector3_zero();
        return Vector3.__wrap(ret);
    }
}
/**
*/
export class Vector4 {

    static __wrap(ptr) {
        const obj = Object.create(Vector4.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_vector4_free(ptr);
    }
    /**
    * x-component
    * @returns {number}
    */
    get x() {
        var ret = wasm.__wbg_get_vector4_x(this.ptr);
        return ret;
    }
    /**
    * x-component
    * @param {number} arg0
    */
    set x(arg0) {
        wasm.__wbg_set_vector4_x(this.ptr, arg0);
    }
    /**
    * y-component
    * @returns {number}
    */
    get y() {
        var ret = wasm.__wbg_get_vector4_y(this.ptr);
        return ret;
    }
    /**
    * y-component
    * @param {number} arg0
    */
    set y(arg0) {
        wasm.__wbg_set_vector4_y(this.ptr, arg0);
    }
    /**
    * z-component
    * @returns {number}
    */
    get z() {
        var ret = wasm.__wbg_get_vector4_z(this.ptr);
        return ret;
    }
    /**
    * z-component
    * @param {number} arg0
    */
    set z(arg0) {
        wasm.__wbg_set_vector4_z(this.ptr, arg0);
    }
    /**
    * w-component
    * @returns {number}
    */
    get w() {
        var ret = wasm.__wbg_get_vector4_w(this.ptr);
        return ret;
    }
    /**
    * w-component
    * @param {number} arg0
    */
    set w(arg0) {
        wasm.__wbg_set_vector4_w(this.ptr, arg0);
    }
    /**
    * Returns a new vector
    * @param {number} x
    * @param {number} y
    * @param {number} z
    * @param {number} w
    */
    constructor(x, y, z, w) {
        var ret = wasm.vector4_new(x, y, z, w);
        return Vector4.__wrap(ret);
    }
    /**
    * Returns the quare magnitude scalar
    * @returns {number}
    */
    get sqrMagnitude() {
        var ret = wasm.vector4_sqrMagnitude(this.ptr);
        return ret;
    }
    /**
    * Returns the magnitude scalar
    * @returns {number}
    */
    get magnitude() {
        var ret = wasm.vector4_magnitude(this.ptr);
        return ret;
    }
    /**
    * Returns this vector with a magnitude of 1 as a new instance
    * @returns {Vector4}
    */
    get normalized() {
        var ret = wasm.vector4_normalized(this.ptr);
        return Vector4.__wrap(ret);
    }
    /**
    * Returns the inverse vector
    * @returns {Vector4}
    */
    get inv() {
        var ret = wasm.vector4_inv(this.ptr);
        return Vector4.__wrap(ret);
    }
    /**
    * Returns true if either component is NaN
    * @returns {boolean}
    */
    get isNaN() {
        var ret = wasm.vector4_isNaN(this.ptr);
        return ret !== 0;
    }
    /**
    * Returns the dot product scalar
    * * other - Vector to dot with
    * @param {Vector4} other
    * @returns {number}
    */
    dot(other) {
        _assertClass(other, Vector4);
        var ptr0 = other.ptr;
        other.ptr = 0;
        var ret = wasm.vector4_dot(this.ptr, ptr0);
        return ret;
    }
    /**
    * @returns {string}
    */
    toString() {
        try {
            wasm.vector4_toString(8, this.ptr);
            var r0 = getInt32Memory0()[8 / 4 + 0];
            var r1 = getInt32Memory0()[8 / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_free(r0, r1);
        }
    }
    /**
    * @returns {Vector4}
    */
    static one() {
        var ret = wasm.vector4_one();
        return Vector4.__wrap(ret);
    }
    /**
    * @returns {Vector4}
    */
    static zero() {
        var ret = wasm.vector4_zero();
        return Vector4.__wrap(ret);
    }
}

async function load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {

        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {

        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

async function init(input) {
    if (typeof input === 'undefined') {
        input = import.meta.url.replace(/\.js$/, '_bg.wasm');
    }
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };

    if (typeof input === 'string' || (typeof Request === 'function' && input instanceof Request) || (typeof URL === 'function' && input instanceof URL)) {
        input = fetch(input);
    }

    const { instance, module } = await load(await input, imports);

    wasm = instance.exports;
    init.__wbindgen_wasm_module = module;

    return wasm;
}

export default init;

