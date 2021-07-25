"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var _RenderSystem_width, _RenderSystem_height, _RenderSystem_ortho, _RenderSystem_size, _RenderSystem_fov;
var RenderSystem_1;
Object.defineProperty(exports, "__esModule", { value: true });
const ecs_js_1 = require("../../ecs.js");
const mat4_js_1 = __importDefault(require("../../math/mat4.js"));
const mesh_js_1 = __importDefault(require("../components/mesh.js"));
const transform_js_1 = __importDefault(require("../components/transform.js"));
const world_js_1 = __importStar(require("../world.js"));
const GL = WebGLRenderingContext;
/** Renders entities onto a target display */
let RenderSystem = RenderSystem_1 = class RenderSystem extends ecs_js_1.System {
    /**
     * @param target Canvas to render to
     */
    constructor(target) {
        super();
        this.nearClip = 0.1;
        this.farClip = 1000;
        _RenderSystem_width.set(this, void 0);
        _RenderSystem_height.set(this, void 0);
        _RenderSystem_ortho.set(this, void 0);
        _RenderSystem_size.set(this, 0.03);
        _RenderSystem_fov.set(this, 45
        /**
         * @param target Canvas to render to
         */
        );
        this.refreshSize = (target) => {
            target.width = screen.width;
            target.height = screen.height;
            __classPrivateFieldSet(this, _RenderSystem_width, target.clientWidth, "f");
            __classPrivateFieldSet(this, _RenderSystem_height, target.clientHeight, "f");
            this.context.viewport(0, 0, target.width, target.height);
            this.refreshProjection();
        };
        /** Refresh the projection matrix based on the specified parameters */
        this.refreshProjection = () => {
            if (__classPrivateFieldGet(this, _RenderSystem_ortho, "f"))
                this.projectionMatrix = mat4_js_1.default.createOrtho(__classPrivateFieldGet(this, _RenderSystem_width, "f") * __classPrivateFieldGet(this, _RenderSystem_size, "f"), __classPrivateFieldGet(this, _RenderSystem_height, "f") * __classPrivateFieldGet(this, _RenderSystem_size, "f"), this.nearClip, this.farClip);
            else
                this.projectionMatrix = mat4_js_1.default.createPerspective(__classPrivateFieldGet(this, _RenderSystem_fov, "f") * Math.PI / 180, __classPrivateFieldGet(this, _RenderSystem_width, "f") / __classPrivateFieldGet(this, _RenderSystem_height, "f"), this.nearClip, this.farClip);
            this.projectionMatrix = this.projectionMatrix.transpose();
        };
        this.viewMatrix = new mat4_js_1.default(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, -10, 0, 0, 0, 1);
        __classPrivateFieldSet(this, _RenderSystem_ortho, true, "f");
        this.context = target.getContext("webgl");
        this.refreshSize(target);
        window.removeEventListener("resize", () => this.refreshSize(target));
        window.addEventListener("resize", () => this.refreshSize(target));
    }
    /** Display width */
    get width() {
        return __classPrivateFieldGet(this, _RenderSystem_width, "f");
    }
    /** Display height */
    get height() {
        return __classPrivateFieldGet(this, _RenderSystem_height, "f");
    }
    /** Display aspect ratio */
    get aspectRatio() {
        return this.width / this.height;
    }
    /** Whether to use an orthographic or perspective projection matrix */
    get ortho() {
        return __classPrivateFieldGet(this, _RenderSystem_ortho, "f");
    }
    /**
     * @param value Whether to use ortho or perspective
     */
    set ortho(value) {
        __classPrivateFieldSet(this, _RenderSystem_ortho, value, "f");
        this.refreshProjection();
    }
    /** Orthographic projection size */
    get size() {
        return __classPrivateFieldGet(this, _RenderSystem_size, "f");
    }
    set size(value) {
        __classPrivateFieldSet(this, _RenderSystem_size, value, "f");
        this.refreshProjection();
    }
    /** Perspective projection field of view */
    get fov() {
        return __classPrivateFieldGet(this, _RenderSystem_fov, "f");
    }
    set fov(value) {
        __classPrivateFieldSet(this, _RenderSystem_fov, value, "f");
        this.refreshProjection();
    }
    update(entities) {
        const gl = this.context;
        gl.clearColor(0, 0, 0, 1);
        gl.clearDepth(1);
        gl.enable(GL.DEPTH_TEST);
        gl.depthFunc(GL.LEQUAL);
        gl.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);
        entities.forEach((mesh, transform) => {
            if (!mesh.material)
                return;
            let vertexPosition = mesh.material.shader.getAttribute("vertexPosition").location;
            let projectionMatrix = mesh.material.shader.getUniform("projectionMatrix").location;
            let modelViewMatrix = mesh.material.shader.getUniform("modelViewMatrix").location;
            gl.useProgram(mesh.material.shader.program);
            gl.bindBuffer(GL.ARRAY_BUFFER, mesh.vertexBuffer);
            gl.vertexAttribPointer(vertexPosition, 2, GL.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(vertexPosition);
            mesh.material.apply(gl);
            gl.uniformMatrix4fv(projectionMatrix, false, this.projectionMatrix);
            gl.uniformMatrix4fv(modelViewMatrix, false, transform.matrix.mul(this.viewMatrix).transpose());
            gl.drawArrays(GL.TRIANGLE_STRIP, 0, 4);
        }, mesh_js_1.default, transform_js_1.default);
    }
};
_RenderSystem_width = new WeakMap(), _RenderSystem_height = new WeakMap(), _RenderSystem_ortho = new WeakMap(), _RenderSystem_size = new WeakMap(), _RenderSystem_fov = new WeakMap();
RenderSystem = RenderSystem_1 = __decorate([
    world_js_1.default.register.system({ after: [world_js_1.Simulator.Category.Graphics] }, document.querySelector("canvas")),
    __metadata("design:paramtypes", [HTMLCanvasElement])
], RenderSystem);
exports.default = RenderSystem;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyU3lzdGVtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1vbi9zeXN0ZW1zL3JlbmRlclN5c3RlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseUNBQW1DO0FBRW5DLGlFQUEwQztBQUMxQyxvRUFBd0M7QUFDeEMsOEVBQWtEO0FBQ2xELHdEQUE0QztBQUU1QyxNQUFNLEVBQUUsR0FBRyxxQkFBcUIsQ0FBQTtBQUVoQyw2Q0FBNkM7QUFFN0MsSUFBcUIsWUFBWSxvQkFBakMsTUFBcUIsWUFBYSxTQUFRLGVBQU07SUFZL0M7O09BRUc7SUFDSCxZQUFtQixNQUF5QjtRQUMzQyxLQUFLLEVBQUUsQ0FBQTtRQWRBLGFBQVEsR0FBVyxHQUFHLENBQUE7UUFDdEIsWUFBTyxHQUFXLElBQUksQ0FBQTtRQUc5QixzQ0FBYztRQUNkLHVDQUFlO1FBQ2Ysc0NBQWU7UUFDZiw2QkFBZ0IsSUFBSSxFQUFBO1FBQ3BCLDRCQUFlLEVBQUU7UUFFakI7O1dBRUc7VUFKYztRQW1HVCxnQkFBVyxHQUFHLENBQUMsTUFBeUIsRUFBRSxFQUFFO1lBQ25ELE1BQU0sQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQTtZQUMzQixNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUE7WUFDN0IsdUJBQUEsSUFBSSx1QkFBVSxNQUFNLENBQUMsV0FBVyxNQUFBLENBQUE7WUFDaEMsdUJBQUEsSUFBSSx3QkFBVyxNQUFNLENBQUMsWUFBWSxNQUFBLENBQUE7WUFDbEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxNQUFNLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUN4RCxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQTtRQUN6QixDQUFDLENB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QUMsWUFBWSxDQUFDLENBQUE7WUFDakQsRUFBRSxDQUFDLG1CQUFtQixDQUFDLGNBQWMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO1lBQ2hFLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQyxjQUFjLENBQUMsQ0FBQTtZQUMxQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQTtZQUN2QixFQUFFLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO1lBQ25FLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLEVBQUUsS0FBSyxFQUFFLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFBO1lBQzlGLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLGNBQWMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDdkMsQ0FBQyxFQUFFLGlCQUFJLEVBQUUsc0JBQVMsQ0FBQyxDQUFBO0lBQ3BCLENBQUM7Q0E0QkQsQ0FBQTs7QUF2SW9CLFlBQVk7SUFEaEMsa0JBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFzQixFQUFDLEtBQUssRUFBRSxDQUFDLG9CQUFTLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFDLEVBQUUsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztxQ0FnQnpGLGlCQUFpQjtHQWZ4QixZQUFZLENBdUloQztrQkF2SW9CLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1N5c3RlbX0gZnJvbSBcIi4uLy4uL2Vjcy5qc1wiXHJcbmltcG9ydCBFbnRpdGllcyBmcm9tIFwiLi4vLi4vZWNzL2VudGl0aWVzLmpzXCJcclxuaW1wb3J0IE1hdHJpeDR4NCBmcm9tIFwiLi4vLi4vbWF0aC9tYXQ0LmpzXCJcclxuaW1wb3J0IE1lc2ggZnJvbSBcIi4uL2NvbXBvbmVudHMvbWVzaC5qc1wiXHJcbmltcG9ydCBUcmFuc2Zvcm0gZnJvbSBcIi4uL2NvbXBvbmVudHMvdHJhbnNmb3JtLmpzXCJcclxuaW1wb3J0IFdvcmxkLCB7U2ltdWxhdG9yfSBmcm9tIFwiLi4vd29ybGQuanNcIlxyXG5cclxuY29uc3QgR0wgPSBXZWJHTFJlbmRlcmluZ0NvbnRleHRcclxuXHJcbi8qKiBSZW5kZXJzIGVudGl0aWVzIG9udG8gYSB0YXJnZXQgZGlzcGxheSAqL1xyXG5AV29ybGQucmVnaXN0ZXIuc3lzdGVtPHR5cGVvZiBSZW5kZXJTeXN0ZW0+KHthZnRlcjogW1NpbXVsYXRvci5DYXRlZ29yeS5HcmFwaGljc119LCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiY2FudmFzXCIpKVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZW5kZXJTeXN0ZW0gZXh0ZW5kcyBTeXN0ZW0ge1xyXG5cdHB1YmxpYyByZWFkb25seSBjb250ZXh0OiBXZWJHTFJlbmRlcmluZ0NvbnRleHRcclxuXHRwcml2YXRlIG5lYXJDbGlwOiBudW1iZXIgPSAwLjFcclxuXHRwcml2YXRlIGZhckNsaXA6IG51bWJlciA9IDEwMDBcclxuXHRwcml2YXRlIHZpZXdNYXRyaXg6IE1hdHJpeDR4NFxyXG5cdHByaXZhdGUgcHJvamVjdGlvbk1hdHJpeDogTWF0cml4NHg0XHJcblx0I3dpZHRoOiBudW1iZXJcclxuXHQjaGVpZ2h0OiBudW1iZXJcclxuXHQjb3J0aG86IGJvb2xlYW5cclxuXHQjc2l6ZTogbnVtYmVyID0gMC4wM1xyXG5cdCNmb3Y6IG51bWJlciA9IDQ1XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBwYXJhbSB0YXJnZXQgQ2FudmFzIHRvIHJlbmRlciB0b1xyXG5cdCAqL1xyXG5cdHB1YmxpYyBjb25zdHJ1Y3Rvcih0YXJnZXQ6IEhUTUxDYW52YXNFbGVtZW50KSB7XHJcblx0XHRzdXBlcigpXHJcblxyXG5cdFx0dGhpcy52aWV3TWF0cml4ID0gbmV3IE1hdHJpeDR4NChcclxuXHRcdFx0MSwgMCwgMCwgMCxcclxuXHRcdFx0MCwgMSwgMCwgMCxcclxuXHRcdFx0MCwgMCwgMSwgLTEwLFxyXG5cdFx0XHQwLCAwLCAwLCAxXHJcblx0XHQpXHJcblxyXG5cdFx0dGhpcy4jb3J0aG8gPSB0cnVlXHJcblx0XHR0aGlzLmNvbnRleHQgPSB0YXJnZXQuZ2V0Q29udGV4dChcIndlYmdsXCIpXHJcblx0XHR0aGlzLnJlZnJlc2hTaXplKHRhcmdldClcclxuXHJcblx0XHR3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCAoKSA9PiB0aGlzLnJlZnJlc2hTaXplKHRhcmdldCkpXHJcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCAoKSA9PiB0aGlzLnJlZnJlc2hTaXplKHRhcmdldCkpXHJcblx0fVxyXG5cclxuXHQvKiogRGlzcGxheSB3aWR0aCAqL1xyXG5cdHB1YmxpYyBnZXQgd2lkdGgoKTogbnVtYmVyIHtcclxuXHRcdHJldHVybiB0aGlzLiN3aWR0aFxyXG5cdH1cclxuXHJcblx0LyoqIERpc3BsYXkgaGVpZ2h0ICovXHJcblx0cHVibGljIGdldCBoZWlnaHQoKTogbnVtYmVyIHtcclxuXHRcdHJldHVybiB0aGlzLiNoZWlnaHRcclxuXHR9XHJcblxyXG5cdC8qKiBEaXNwbGF5IGFzcGVjdCByYXRpbyAqL1xyXG5cdHB1YmxpYyBnZXQgYXNwZWN0UmF0aW8oKTogbnVtYmVyIHtcclxuXHRcdHJldHVybiB0aGlzLndpZHRoIC8gdGhpcy5oZWlnaHRcclxuXHR9XHJcblxyXG5cdC8qKiBXaGV0aGVyIHRvIHVzZSBhbiBvcnRob2dyYXBoaWMgb3IgcGVyc3BlY3RpdmUgcHJvamVjdGlvbiBtYXRyaXggKi9cclxuXHRwdWJsaWMgZ2V0IG9ydGhvKCk6IGJvb2xlYW4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuI29ydGhvXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBAcGFyYW0gdmFsdWUgV2hldGhlciB0byB1c2Ugb3J0aG8gb3IgcGVyc3BlY3RpdmVcclxuXHQgKi9cclxuXHRwdWJsaWMgc2V0IG9ydGhvKHZhbHVlOiBib29sZWFuKSB7XHJcblx0XHR0aGlzLiNvcnRobyA9IHZhbHVlXHJcblx0XHR0aGlzLnJlZnJlc2hQcm9qZWN0aW9uKClcclxuXHR9XHJcblxyXG5cdC8qKiBPcnRob2dyYXBoaWMgcHJvamVjdGlvbiBzaXplICovXHJcblx0cHVibGljIGdldCBzaXplKCk6IG51bWJlciB7XHJcblx0XHRyZXR1cm4gdGhpcy4jc2l6ZVxyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCBzaXplKHZhbHVlOiBudW1iZXIpIHtcclxuXHRcdHRoaXMuI3NpemUgPSB2YWx1ZVxyXG5cdFx0dGhpcy5yZWZyZXNoUHJvamVjdGlvbigpXHJcblx0fVxyXG5cclxuXHQvKiogUGVyc3BlY3RpdmUgcHJvamVjdGlvbiBmaWVsZCBvZiB2aWV3ICovXHJcblx0cHVibGljIGdldCBmb3YoKTogbnVtYmVyIHtcclxuXHRcdHJldHVybiB0aGlzLiNmb3ZcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgZm92KHZhbHVlOiBudW1iZXIpIHtcclxuXHRcdHRoaXMuI2ZvdiA9IHZhbHVlXHJcblx0XHR0aGlzLnJlZnJlc2hQcm9qZWN0aW9uKClcclxuXHR9XHJcblxyXG5cdHB1YmxpYyB1cGRhdGUoZW50aXRpZXM6IEVudGl0aWVzKTogdm9pZCB7XHJcblx0XHRjb25zdCBnbCA9IHRoaXMuY29udGV4dFxyXG5cclxuXHRcdGdsLmNsZWFyQ29sb3IoMCwgMCwgMCwgMSlcclxuXHRcdGdsLmNsZWFyRGVwdGgoMSlcclxuXHRcdGdsLmVuYWJsZShHTC5ERVBUSF9URVNUKVxyXG5cdFx0Z2wuZGVwdGhGdW5jKEdMLkxFUVVBTClcclxuXHRcdGdsLmNsZWFyKEdMLkNPTE9SX0JVRkZFUl9CSVQgfCBHTC5ERVBUSF9CVUZGRVJfQklUKVxyXG5cclxuXHRcdGVudGl0aWVzLmZvckVhY2goKG1lc2gsIHRyYW5zZm9ybSkgPT4ge1xyXG5cdFx0XHRpZighbWVzaC5tYXRlcmlhbClcclxuXHRcdFx0XHRyZXR1cm5cclxuXHJcblx0XHRcdGxldCB2ZXJ0ZXhQb3NpdGlvbiA9IG1lc2gubWF0ZXJpYWwuc2hhZGVyLmdldEF0dHJpYnV0ZShcInZlcnRleFBvc2l0aW9uXCIpLmxvY2F0aW9uXHJcblx0XHRcdGxldCBwcm9qZWN0aW9uTWF0cml4ID0gbWVzaC5tYXRlcmlhbC5zaGFkZXIuZ2V0VW5pZm9ybShcInByb2plY3Rpb25NYXRyaXhcIikubG9jYXRpb25cclxuXHRcdFx0bGV0IG1vZGVsVmlld01hdHJpeCA9IG1lc2gubWF0ZXJpYWwuc2hhZGVyLmdldFVuaWZvcm0oXCJtb2RlbFZpZXdNYXRyaXhcIikubG9jYXRpb25cclxuXHJcblx0XHRcdGdsLnVzZVByb2dyYW0obWVzaC5tYXRlcmlhbC5zaGFkZXIucHJvZ3JhbSlcclxuXHRcdFx0Z2wuYmluZEJ1ZmZlcihHTC5BUlJBWV9CVUZGRVIsIG1lc2gudmVydGV4QnVmZmVyKVxyXG5cdFx0XHRnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHZlcnRleFBvc2l0aW9uLCAyLCBHTC5GTE9BVCwgZmFsc2UsIDAsIDApXHJcblx0XHRcdGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHZlcnRleFBvc2l0aW9uKVxyXG5cdFx0XHRtZXNoLm1hdGVyaWFsLmFwcGx5KGdsKVxyXG5cdFx0XHRnbC51bmlmb3JtTWF0cml4NGZ2KHByb2plY3Rpb25NYXRyaXgsIGZhbHNlLCB0aGlzLnByb2plY3Rpb25NYXRyaXgpXHJcblx0XHRcdGdsLnVuaWZvcm1NYXRyaXg0ZnYobW9kZWxWaWV3TWF0cml4LCBmYWxzZSwgdHJhbnNmb3JtLm1hdHJpeC5tdWwodGhpcy52aWV3TWF0cml4KS50cmFuc3Bvc2UoKSlcclxuXHRcdFx0Z2wuZHJhd0FycmF5cyhHTC5UUklBTkdMRV9TVFJJUCwgMCwgNClcclxuXHRcdH0sIE1lc2gsIFRyYW5zZm9ybSlcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgcmVmcmVzaFNpemUgPSAodGFyZ2V0OiBIVE1MQ2FudmFzRWxlbWVudCkgPT4ge1xyXG5cdFx0dGFyZ2V0LndpZHRoID0gc2NyZWVuLndpZHRoXHJcblx0XHR0YXJnZXQuaGVpZ2h0ID0gc2NyZWVuLmhlaWdodFxyXG5cdFx0dGhpcy4jd2lkdGggPSB0YXJnZXQuY2xpZW50V2lkdGhcclxuXHRcdHRoaXMuI2hlaWdodCA9IHRhcmdldC5jbGllbnRIZWlnaHRcclxuXHRcdHRoaXMuY29udGV4dC52aWV3cG9ydCgwLCAwLCB0YXJnZXQud2lkdGgsIHRhcmdldC5oZWlnaHQpXHJcblx0XHR0aGlzLnJlZnJlc2hQcm9qZWN0aW9uKClcclxuXHR9XHJcblxyXG5cdC8qKiBSZWZyZXNoIHRoZSBwcm9qZWN0aW9uIG1hdHJpeCBiYXNlZCBvbiB0aGUgc3BlY2lmaWVkIHBhcmFtZXRlcnMgKi9cclxuXHRwcml2YXRlIHJlZnJlc2hQcm9qZWN0aW9uID0gKCkgPT4ge1xyXG5cdFx0aWYodGhpcy4jb3J0aG8pXHJcblx0XHRcdHRoaXMucHJvamVjdGlvbk1hdHJpeCA9IE1hdHJpeDR4NC5jcmVhdGVPcnRobyhcclxuXHRcdFx0XHR0aGlzLiN3aWR0aCAqIHRoaXMuI3NpemUsXHJcblx0XHRcdFx0dGhpcy4jaGVpZ2h0ICogdGhpcy4jc2l6ZSxcclxuXHRcdFx0XHR0aGlzLm5lYXJDbGlwLCB0aGlzLmZhckNsaXBcclxuXHRcdFx0KVxyXG5cdFx0ZWxzZVxyXG5cdFx0XHR0aGlzLnByb2plY3Rpb25NYXRyaXggPSBNYXRyaXg0eDQuY3JlYXRlUGVyc3BlY3RpdmUoXHJcblx0XHRcdFx0dGhpcy4jZm92ICogTWF0aC5QSSAvIDE4MCxcclxuXHRcdFx0XHR0aGlzLiN3aWR0aCAvIHRoaXMuI2hlaWdodCxcclxuXHRcdFx0XHR0aGlzLm5lYXJDbGlwLCB0aGlzLmZhckNsaXBcclxuXHRcdFx0KVxyXG5cclxuXHRcdHRoaXMucHJvamVjdGlvbk1hdHJpeCA9IHRoaXMucHJvamVjdGlvbk1hdHJpeC50cmFuc3Bvc2UoKVxyXG5cdH1cclxufSJdfQ==