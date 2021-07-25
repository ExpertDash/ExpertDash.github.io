"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _Mesh_vertexBuffer;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mesh = void 0;
const ecs_js_1 = require("../../ecs.js");
const vec3_js_1 = __importDefault(require("../../math/vec3.js"));
const boundingBox_js_1 = __importDefault(require("../../physics/boundingBox.js"));
const renderSystem_js_1 = __importDefault(require("../systems/renderSystem.js"));
const world_js_1 = __importDefault(require("../world.js"));
const GL = WebGLRenderingContext;
let Mesh = class Mesh extends ecs_js_1.Component {
    constructor(vertices, triangles, uvs) {
        super();
        _Mesh_vertexBuffer.set(this, void 0);
        this.vertices = vertices;
        this.triangles = triangles;
        this.uvs = uvs;
        this.boundingBox = new boundingBox_js_1.default(vertices);
        __classPrivateFieldSet(this, _Mesh_vertexBuffer, null, "f");
        // let hull = []
        // for(let v of vertices) {
        // }
    }
    get vertexBuffer() {
        return __classPrivateFieldGet(this, _Mesh_vertexBuffer, "f");
    }
    added(entity) {
        let gl = world_js_1.default.systems.get(renderSystem_js_1.default).context;
        if (!gl || __classPrivateFieldGet(this, _Mesh_vertexBuffer, "f") != null)
            return;
        let buffer = gl.createBuffer();
        gl.bindBuffer(GL.ARRAY_BUFFER, buffer);
        gl.bufferData(GL.ARRAY_BUFFER, new Float32Array(this.vertices.map(v => [v.x, v.y]).flat()), GL.STATIC_DRAW);
        __classPrivateFieldSet(this, _Mesh_vertexBuffer, buffer, "f");
    }
};
_Mesh_vertexBuffer = new WeakMap();
Mesh = __decorate([
    world_js_1.default.register.component(),
    __metadata("design:paramtypes", [Array, Array, Array])
], Mesh);
exports.Mesh = Mesh;
(function (Mesh) {
    class Primitives {
    }
    Primitives.quad = Object.freeze(new Mesh([
        new vec3_js_1.default(-1, 1),
        new vec3_js_1.default(1, 1),
        new vec3_js_1.default(-1, -1),
        new vec3_js_1.default(1, -1)
    ]));
    Mesh.Primitives = Primitives;
})(Mesh = exports.Mesh || (exports.Mesh = {}));
exports.Mesh = Mesh;
exports.default = Mesh;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tb24vY29tcG9uZW50cy9tZXNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlDQUFzQztBQUV0QyxpRUFBd0M7QUFDeEMsa0ZBQXNEO0FBRXRELGlGQUFxRDtBQUNyRCwyREFBK0I7QUFFL0IsTUFBTSxFQUFFLEdBQUcscUJBQXFCLENBQUE7QUFHaEMsSUFBYSxJQUFJLEdBQWpCLE1BQWEsSUFBSyxTQUFRLGtCQUFTO0lBZWxDLFlBQW1CLFFBQW1CLEVBQUUsU0FBb0IsRUFBRSxHQUFjO1FBQzNFLEtBQUssRUFBRSxDQUFBO1FBSFIscUNBQTBCO1FBSXpCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFBO1FBQ3hCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFBO1FBQzFCLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFBO1FBQ2QsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLHdCQUFXLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDNUMsdUJBQUEsSUFBSSxzQkFBaUIsSUFBSSxNQUFBLENBQUE7UUFFekIsZ0JBQWdCO1FBRWhCLDJCQUEyQjtRQUUzQixJQUFJO0lBQ0wsQ0FBQztJQUVELElBQVcsWUFBWTtRQUN0QixPQUFPLHVCQUFBLElBQUksMEJBQWMsQ0FBQTtJQUMxQixDQUFDO0lBRWUsS0FBSyxDQUFDLE1BQWM7UUFDbkMsSUFBSSxFQUFFLEdBQUcsa0JBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUFZLENBQUMsQ0FBQyxPQUFPLENBQUE7UUFFaEQsSUFBRyxDQUFDLEVBQUUsSUFBSSx1QkFBQSxJQUFJLDBCQUFjLElBQUksSUFBSTtZQUNuQyxPQUFNO1FBRVAsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFBO1FBQzlCLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsQ0FBQTtRQUN0QyxFQUFFLENBQUMsVUFBVSxDQUNaLEVBQUUsQ0FBQyxZQUFZLEVBQ2YsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsRUFDM0QsRUFBRSxDQUFDLFdBQVcsQ0FDZCxDQUFBO1FBRUQsdUJBQUEsSUFBSSxzQkFBaUIsTUFBTSxNQUFBLENBQUE7SUFDNUIsQ0FBQztDQUNELENBQUE7O0FBbERZLElBQUk7SUFEaEIsa0JBQUssQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFOztHQUNkLElBQUksQ0FrRGhCO0FBbERZLG9CQUFJO0FBb0RqQixXQUFpQixJQUFJO0lBQ3BCLE1BQWEsVUFBVTs7SUFDUixlQUFJLEdBQW1CLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUM7UUFDM0QsSUFBSSxpQkFBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNsQixJQUFJLGlCQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNqQixJQUFJLGlCQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbkIsSUFBSSxpQkFBTyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztLQUNsQixDQUFDLENBQUMsQ0FBQTtJQU5TLGVBQVUsYUFPdEIsQ0FBQTtBQUNGLENBQUMsRUFUZ0IsSUFBSSxHQUFKLFlBQUksS0FBSixZQUFJLFFBU3BCO0FBN0RZLG9CQUFJO0FBK0RqQixrQkFBZSxJQUFJLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSBcIi4uLy4uL2Vjcy5qc1wiXHJcbmltcG9ydCBFbnRpdHkgZnJvbSBcIi4uLy4uL2Vjcy9lbnRpdHkuanNcIlxyXG5pbXBvcnQgVmVjdG9yMyBmcm9tIFwiLi4vLi4vbWF0aC92ZWMzLmpzXCJcclxuaW1wb3J0IEJvdW5kaW5nQm94IGZyb20gXCIuLi8uLi9waHlzaWNzL2JvdW5kaW5nQm94LmpzXCJcclxuaW1wb3J0IE1hdGVyaWFsIGZyb20gXCIuLi8uLi9yZW5kZXJpbmcvbWF0ZXJpYWwuanNcIlxyXG5pbXBvcnQgUmVuZGVyU3lzdGVtIGZyb20gXCIuLi9zeXN0ZW1zL3JlbmRlclN5c3RlbS5qc1wiXHJcbmltcG9ydCBXb3JsZCBmcm9tIFwiLi4vd29ybGQuanNcIlxyXG5cclxuY29uc3QgR0wgPSBXZWJHTFJlbmRlcmluZ0NvbnRleHRcclxuXHJcbkBXb3JsZC5yZWdpc3Rlci5jb21wb25lbnQoKVxyXG5leHBvcnQgY2xhc3MgTWVzaCBleHRlbmRzIENvbXBvbmVudCB7XHJcblx0cHVibGljIHJlYWRvbmx5IHZlcnRpY2VzOiBWZWN0b3IzW11cclxuXHRwdWJsaWMgcmVhZG9ubHkgdHJpYW5nbGVzOiBudW1iZXJbXVxyXG5cdHB1YmxpYyByZWFkb25seSB1dnM6IG51bWJlcltdXHJcblxyXG5cdHB1YmxpYyBtYXRlcmlhbDogTWF0ZXJpYWxcclxuXHJcblx0LyoqIExvY2FsIGJvdW5kaW5nIGJveCAqL1xyXG5cdHB1YmxpYyByZWFkb25seSBib3VuZGluZ0JveDogQm91bmRpbmdCb3hcclxuXHJcblx0LyoqIExvY2FsIGNvbnZleCBodWxsIGNvbnRhaW5pbmcgcG9pbnRzIGluIGEgY291bnRlci1jbG9ja3dpc2UgZmFzaGlvbiBhcm91bmQgdGhlIG1lc2ggKi9cclxuXHRwdWJsaWMgcmVhZG9ubHkgaHVsbDogVmVjdG9yM1tdXHJcblxyXG5cdCN2ZXJ0ZXhCdWZmZXI6IFdlYkdMQnVmZmVyXHJcblxyXG5cdHB1YmxpYyBjb25zdHJ1Y3Rvcih2ZXJ0aWNlczogVmVjdG9yM1tdLCB0cmlhbmdsZXM/OiBudW1iZXJbXSwgdXZzPzogbnVtYmVyW10pIHtcclxuXHRcdHN1cGVyKClcclxuXHRcdHRoaXMudmVydGljZXMgPSB2ZXJ0aWNlc1xyXG5cdFx0dGhpcy50cmlhbmdsZXMgPSB0cmlhbmdsZXNcclxuXHRcdHRoaXMudXZzID0gdXZzXHJcblx0XHR0aGlzLmJvdW5kaW5nQm94ID0gbmV3IEJvdW5kaW5nQm94KHZlcnRpY2VzKVxyXG5cdFx0dGhpcy4jdmVydGV4QnVmZmVyID0gbnVsbFxyXG5cclxuXHRcdC8vIGxldCBodWxsID0gW11cclxuXHJcblx0XHQvLyBmb3IobGV0IHYgb2YgdmVydGljZXMpIHtcclxuXHRcdFx0XHJcblx0XHQvLyB9XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0IHZlcnRleEJ1ZmZlcigpOiBXZWJHTEJ1ZmZlciB7XHJcblx0XHRyZXR1cm4gdGhpcy4jdmVydGV4QnVmZmVyXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgb3ZlcnJpZGUgYWRkZWQoZW50aXR5OiBFbnRpdHkpOiB2b2lkIHtcclxuXHRcdGxldCBnbCA9IFdvcmxkLnN5c3RlbXMuZ2V0KFJlbmRlclN5c3RlbSkuY29udGV4dFxyXG5cclxuXHRcdGlmKCFnbCB8fCB0aGlzLiN2ZXJ0ZXhCdWZmZXIgIT0gbnVsbClcclxuXHRcdFx0cmV0dXJuXHJcblxyXG5cdFx0bGV0IGJ1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpXHJcblx0XHRnbC5iaW5kQnVmZmVyKEdMLkFSUkFZX0JVRkZFUiwgYnVmZmVyKVxyXG5cdFx0Z2wuYnVmZmVyRGF0YShcclxuXHRcdFx0R0wuQVJSQVlfQlVGRkVSLFxyXG5cdFx0XHRuZXcgRmxvYXQzMkFycmF5KHRoaXMudmVydGljZXMubWFwKHYgPT4gW3YueCwgdi55XSkuZmxhdCgpKSxcclxuXHRcdFx0R0wuU1RBVElDX0RSQVdcclxuXHRcdClcclxuXHJcblx0XHR0aGlzLiN2ZXJ0ZXhCdWZmZXIgPSBidWZmZXJcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBuYW1lc3BhY2UgTWVzaCB7XHJcblx0ZXhwb3J0IGNsYXNzIFByaW1pdGl2ZXMge1xyXG5cdFx0cHVibGljIHN0YXRpYyBxdWFkOiBSZWFkb25seTxNZXNoPiA9IE9iamVjdC5mcmVlemUobmV3IE1lc2goW1xyXG5cdFx0XHRuZXcgVmVjdG9yMygtMSwgMSksXHJcblx0XHRcdG5ldyBWZWN0b3IzKDEsIDEpLFxyXG5cdFx0XHRuZXcgVmVjdG9yMygtMSwgLTEpLFxyXG5cdFx0XHRuZXcgVmVjdG9yMygxLCAtMSlcclxuXHRcdF0pKVxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTWVzaCJdfQ==