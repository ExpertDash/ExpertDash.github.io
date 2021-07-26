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
var _RenderSystem_width, _RenderSystem_height, _RenderSystem_ortho, _RenderSystem_size, _RenderSystem_fov;
var RenderSystem_1;
import { System } from "../../ecs.js";
import Matrix4x4 from "../../math/mat4.js";
import { Model, Transform } from "../lib.js";
import World, { Simulator } from "../world.js";
const GL = WebGLRenderingContext;
/** Renders entities onto a target display */
let RenderSystem = RenderSystem_1 = class RenderSystem extends System {
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
                this.projectionMatrix = Matrix4x4.createOrtho(__classPrivateFieldGet(this, _RenderSystem_width, "f") * __classPrivateFieldGet(this, _RenderSystem_size, "f"), __classPrivateFieldGet(this, _RenderSystem_height, "f") * __classPrivateFieldGet(this, _RenderSystem_size, "f"), this.nearClip, this.farClip);
            else
                this.projectionMatrix = Matrix4x4.createPerspective(__classPrivateFieldGet(this, _RenderSystem_fov, "f") * Math.PI / 180, __classPrivateFieldGet(this, _RenderSystem_width, "f") / __classPrivateFieldGet(this, _RenderSystem_height, "f"), this.nearClip, this.farClip);
            this.projectionMatrix = this.projectionMatrix.transpose();
        };
        this.viewMatrix = new Matrix4x4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, -10, 0, 0, 0, 1);
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
        entities.forEach((model, transform) => {
            if (!model.material)
                return;
            let vertexPosition = model.material.shader.getAttribute("vertexPosition").location;
            let projectionMatrix = model.material.shader.getUniform("projectionMatrix").location;
            let modelViewMatrix = model.material.shader.getUniform("modelViewMatrix").location;
            gl.useProgram(model.material.shader.program);
            gl.bindBuffer(GL.ARRAY_BUFFER, model.vertexBuffer);
            gl.vertexAttribPointer(vertexPosition, 2, GL.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(vertexPosition);
            model.material.apply(gl);
            gl.uniformMatrix4fv(projectionMatrix, false, this.projectionMatrix);
            gl.uniformMatrix4fv(modelViewMatrix, false, transform.matrix.mul(this.viewMatrix).transpose());
            gl.drawArrays(GL.TRIANGLE_STRIP, 0, 4);
        }, Model, Transform);
    }
};
_RenderSystem_width = new WeakMap(), _RenderSystem_height = new WeakMap(), _RenderSystem_ortho = new WeakMap(), _RenderSystem_size = new WeakMap(), _RenderSystem_fov = new WeakMap();
RenderSystem = RenderSystem_1 = __decorate([
    World.register.system({ after: [Simulator.Category.Graphics] }, document.querySelector("canvas")),
    __metadata("design:paramtypes", [HTMLCanvasElement])
], RenderSystem);
export default RenderSystem;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyU3lzdGVtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1vbi9zeXN0ZW1zL3JlbmRlclN5c3RlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLGNBQWMsQ0FBQTtBQUVuQyxPQUFPLFNBQVMsTUFBTSxvQkFBb0IsQ0FBQTtBQUMxQyxPQUFPLEVBQUMsS0FBSyxFQUFFLFNBQVMsRUFBQyxNQUFNLFdBQVcsQ0FBQTtBQUMxQyxPQUFPLEtBQUssRUFBRSxFQUFDLFNBQVMsRUFBQyxNQUFNLGFBQWEsQ0FBQTtBQUU1QyxNQUFNLEVBQUUsR0FBRyxxQkFBcUIsQ0FBQTtBQUVoQyw2Q0FBNkM7QUFFN0MsSUFBcUIsWUFBWSxvQkFBakMsTUFBcUIsWUFBYSxTQUFRLE1BQU07SUFZL0M7O09BRUc7SUFDSCxZQUFtQixNQUF5QjtRQUMzQyxLQUFLLEVBQUUsQ0FBQTtRQWRBLGFBQVEsR0FBVyxHQUFHLENBQUE7UUFDdEIsWUFBTyxHQUFXLElBQUksQ0FBQTtRQUc5QixzQ0FBYztRQUNkLHVDQUFlO1FBQ2Ysc0NBQWU7UUFDZiw2QkFBZ0IsSUFBSSxFQUFBO1FBQ3BCLDRCQUFlLEVBQUU7UUFFakI7O1dBRUc7VUFKYztRQW1HVCxnQkFBVyxHQUFHLENBQUMsTUFBeUIsRUFBRSxFQUFFO1lBQ25ELE1BQU0sQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQTtZQUMzQixNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUE7WUFDN0IsdUJBQUEsSUFBSSx1QkFBVSxNQUFNLENBQUMsV0FBVyxNQUFBLENBQUE7WUFDaEMsdUJBQUEsSUFBSSx3QkFBVyxNQUFNLENBQUMsWUFBWSxNQUFBLENBQUE7WUFDbEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxNQUFNLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUN4RCxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQTtRQUN6QixDQUFDLENBQUE7UUFFRCxzRUFBc0U7UUFDOUQsc0JBQWlCLEdBQUcsR0FBRyxFQUFFO1lBQ2hDLElBQUcsdUJBQUEsSUFBSSwyQkFBTztnQkFDYixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsU0FBUyxDQUFDLFdBQVcsQ0FDNUMsdUJBQUEsSUFBSSwyQkFBTyxHQUFHLHVCQUFBLElBQUksMEJBQU0sRUFDeEIsdUJBQUEsSUFBSSw0QkFBUSxHQUFHLHVCQUFBLElBQUksMEJBQU0sRUFDekIsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUMzQixDQUFBOztnQkFFRCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsU0FBUyxDQUFDLGlCQUFpQixDQUNsRCx1QkFBQSxJQUFJLHlCQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxHQUFHLEVBQ3pCLHVCQUFBLElBQUksMkJBQU8sR0FBRyx1QkFBQSxJQUFJLDRCQUFRLEVBQzFCLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FDM0IsQ0FBQTtZQUVGLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLENBQUE7UUFDMUQsQ0FBQyxDQUFBO1FBcEhBLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxTQUFTLENBQzlCLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFDVixDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQ1YsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQ1osQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUNWLENBQUE7UUFFRCx1QkFBQSxJQUFJLHVCQUFVLElBQUksTUFBQSxDQUFBO1FBQ2xCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUN6QyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBRXhCLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBO1FBQ3BFLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBO0lBQ2xFLENBQUM7SUFFRCxvQkFBb0I7SUFDcEIsSUFBVyxLQUFLO1FBQ2YsT0FBTyx1QkFBQSxJQUFJLDJCQUFPLENBQUE7SUFDbkIsQ0FBQztJQUVELHFCQUFxQjtJQUNyQixJQUFXLE1BQU07UUFDaEIsT0FBTyx1QkFBQSxJQUFJLDRCQUFRLENBQUE7SUFDcEIsQ0FBQztJQUVELDJCQUEyQjtJQUMzQixJQUFXLFdBQVc7UUFDckIsT0FBTyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUE7SUFDaEMsQ0FBQztJQUVELHNFQUFzRTtJQUN0RSxJQUFXLEtBQUs7UUFDZixPQUFPLHVCQUFBLElBQUksMkJBQU8sQ0FBQTtJQUNuQixDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUFXLEtBQUssQ0FBQyxLQUFjO1FBQzlCLHVCQUFBLElBQUksdUJBQVUsS0FBSyxNQUFBLENBQUE7UUFDbkIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUE7SUFDekIsQ0FBQztJQUVELG1DQUFtQztJQUNuQyxJQUFXLElBQUk7UUFDZCxPQUFPLHVCQUFBLElBQUksMEJBQU0sQ0FBQTtJQUNsQixDQUFDO0lBRUQsSUFBVyxJQUFJLENBQUMsS0FBYTtRQUM1Qix1QkFBQSxJQUFJLHNCQUFTLEtBQUssTUFBQSxDQUFBO1FBQ2xCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFBO0lBQ3pCLENBQUM7SUFFRCwyQ0FBMkM7SUFDM0MsSUFBVyxHQUFHO1FBQ2IsT0FBTyx1QkFBQSxJQUFJLHlCQUFLLENBQUE7SUFDakIsQ0FBQztJQUVELElBQVcsR0FBRyxDQUFDLEtBQWE7UUFDM0IsdUJBQUEsSUFBSSxxQkFBUSxLQUFLLE1BQUEsQ0FBQTtRQUNqQixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQTtJQUN6QixDQUFDO0lBRU0sTUFBTSxDQUFDLFFBQWtCO1FBQy9CLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUE7UUFFdkIsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUN6QixFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ2hCLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBQ3hCLEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQ3ZCLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLGdCQUFnQixHQUFHLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO1FBRW5ELFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLEVBQUU7WUFDckMsSUFBRyxDQUFDLEtBQUssQ0FBQyxRQUFRO2dCQUNqQixPQUFNO1lBRVAsSUFBSSxjQUFjLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLENBQUMsUUFBUSxDQUFBO1lBQ2xGLElBQUksZ0JBQWdCLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLGtCQUFrQixDQUFDLENBQUMsUUFBUSxDQUFBO1lBQ3BGLElBQUksZUFBZSxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLFFBQVEsQ0FBQTtZQUVsRixFQUFFLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBQzVDLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUE7WUFDbEQsRUFBRSxDQUFDLG1CQUFtQixDQUFDLGNBQWMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO1lBQ2hFLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQyxjQUFjLENBQUMsQ0FBQTtZQUMxQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQTtZQUN4QixFQUFFLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO1lBQ25FLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLEVBQUUsS0FBSyxFQUFFLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFBO1lBQzlGLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLGNBQWMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDdkMsQ0FBQyxFQUFFLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQTtJQUNyQixDQUFDO0NBNEJELENBQUE7O0FBdklvQixZQUFZO0lBRGhDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFzQixFQUFDLEtBQUssRUFBRSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUMsRUFBRSxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO3FDQWdCekYsaUJBQWlCO0dBZnhCLFlBQVksQ0F1SWhDO2VBdklvQixZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtTeXN0ZW19IGZyb20gXCIuLi8uLi9lY3MuanNcIlxyXG5pbXBvcnQgRW50aXRpZXMgZnJvbSBcIi4uLy4uL2Vjcy9lbnRpdGllcy5qc1wiXHJcbmltcG9ydCBNYXRyaXg0eDQgZnJvbSBcIi4uLy4uL21hdGgvbWF0NC5qc1wiXHJcbmltcG9ydCB7TW9kZWwsIFRyYW5zZm9ybX0gZnJvbSBcIi4uL2xpYi5qc1wiXHJcbmltcG9ydCBXb3JsZCwge1NpbXVsYXRvcn0gZnJvbSBcIi4uL3dvcmxkLmpzXCJcclxuXHJcbmNvbnN0IEdMID0gV2ViR0xSZW5kZXJpbmdDb250ZXh0XHJcblxyXG4vKiogUmVuZGVycyBlbnRpdGllcyBvbnRvIGEgdGFyZ2V0IGRpc3BsYXkgKi9cclxuQFdvcmxkLnJlZ2lzdGVyLnN5c3RlbTx0eXBlb2YgUmVuZGVyU3lzdGVtPih7YWZ0ZXI6IFtTaW11bGF0b3IuQ2F0ZWdvcnkuR3JhcGhpY3NdfSwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImNhbnZhc1wiKSlcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVuZGVyU3lzdGVtIGV4dGVuZHMgU3lzdGVtIHtcclxuXHRwdWJsaWMgcmVhZG9ubHkgY29udGV4dDogV2ViR0xSZW5kZXJpbmdDb250ZXh0XHJcblx0cHJpdmF0ZSBuZWFyQ2xpcDogbnVtYmVyID0gMC4xXHJcblx0cHJpdmF0ZSBmYXJDbGlwOiBudW1iZXIgPSAxMDAwXHJcblx0cHJpdmF0ZSB2aWV3TWF0cml4OiBNYXRyaXg0eDRcclxuXHRwcml2YXRlIHByb2plY3Rpb25NYXRyaXg6IE1hdHJpeDR4NFxyXG5cdCN3aWR0aDogbnVtYmVyXHJcblx0I2hlaWdodDogbnVtYmVyXHJcblx0I29ydGhvOiBib29sZWFuXHJcblx0I3NpemU6IG51bWJlciA9IDAuMDNcclxuXHQjZm92OiBudW1iZXIgPSA0NVxyXG5cclxuXHQvKipcclxuXHQgKiBAcGFyYW0gdGFyZ2V0IENhbnZhcyB0byByZW5kZXIgdG9cclxuXHQgKi9cclxuXHRwdWJsaWMgY29uc3RydWN0b3IodGFyZ2V0OiBIVE1MQ2FudmFzRWxlbWVudCkge1xyXG5cdFx0c3VwZXIoKVxyXG5cclxuXHRcdHRoaXMudmlld01hdHJpeCA9IG5ldyBNYXRyaXg0eDQoXHJcblx0XHRcdDEsIDAsIDAsIDAsXHJcblx0XHRcdDAsIDEsIDAsIDAsXHJcblx0XHRcdDAsIDAsIDEsIC0xMCxcclxuXHRcdFx0MCwgMCwgMCwgMVxyXG5cdFx0KVxyXG5cclxuXHRcdHRoaXMuI29ydGhvID0gdHJ1ZVxyXG5cdFx0dGhpcy5jb250ZXh0ID0gdGFyZ2V0LmdldENvbnRleHQoXCJ3ZWJnbFwiKVxyXG5cdFx0dGhpcy5yZWZyZXNoU2l6ZSh0YXJnZXQpXHJcblxyXG5cdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgKCkgPT4gdGhpcy5yZWZyZXNoU2l6ZSh0YXJnZXQpKVxyXG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgKCkgPT4gdGhpcy5yZWZyZXNoU2l6ZSh0YXJnZXQpKVxyXG5cdH1cclxuXHJcblx0LyoqIERpc3BsYXkgd2lkdGggKi9cclxuXHRwdWJsaWMgZ2V0IHdpZHRoKCk6IG51bWJlciB7XHJcblx0XHRyZXR1cm4gdGhpcy4jd2lkdGhcclxuXHR9XHJcblxyXG5cdC8qKiBEaXNwbGF5IGhlaWdodCAqL1xyXG5cdHB1YmxpYyBnZXQgaGVpZ2h0KCk6IG51bWJlciB7XHJcblx0XHRyZXR1cm4gdGhpcy4jaGVpZ2h0XHJcblx0fVxyXG5cclxuXHQvKiogRGlzcGxheSBhc3BlY3QgcmF0aW8gKi9cclxuXHRwdWJsaWMgZ2V0IGFzcGVjdFJhdGlvKCk6IG51bWJlciB7XHJcblx0XHRyZXR1cm4gdGhpcy53aWR0aCAvIHRoaXMuaGVpZ2h0XHJcblx0fVxyXG5cclxuXHQvKiogV2hldGhlciB0byB1c2UgYW4gb3J0aG9ncmFwaGljIG9yIHBlcnNwZWN0aXZlIHByb2plY3Rpb24gbWF0cml4ICovXHJcblx0cHVibGljIGdldCBvcnRobygpOiBib29sZWFuIHtcclxuXHRcdHJldHVybiB0aGlzLiNvcnRob1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQHBhcmFtIHZhbHVlIFdoZXRoZXIgdG8gdXNlIG9ydGhvIG9yIHBlcnNwZWN0aXZlXHJcblx0ICovXHJcblx0cHVibGljIHNldCBvcnRobyh2YWx1ZTogYm9vbGVhbikge1xyXG5cdFx0dGhpcy4jb3J0aG8gPSB2YWx1ZVxyXG5cdFx0dGhpcy5yZWZyZXNoUHJvamVjdGlvbigpXHJcblx0fVxyXG5cclxuXHQvKiogT3J0aG9ncmFwaGljIHByb2plY3Rpb24gc2l6ZSAqL1xyXG5cdHB1YmxpYyBnZXQgc2l6ZSgpOiBudW1iZXIge1xyXG5cdFx0cmV0dXJuIHRoaXMuI3NpemVcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgc2l6ZSh2YWx1ZTogbnVtYmVyKSB7XHJcblx0XHR0aGlzLiNzaXplID0gdmFsdWVcclxuXHRcdHRoaXMucmVmcmVzaFByb2plY3Rpb24oKVxyXG5cdH1cclxuXHJcblx0LyoqIFBlcnNwZWN0aXZlIHByb2plY3Rpb24gZmllbGQgb2YgdmlldyAqL1xyXG5cdHB1YmxpYyBnZXQgZm92KCk6IG51bWJlciB7XHJcblx0XHRyZXR1cm4gdGhpcy4jZm92XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IGZvdih2YWx1ZTogbnVtYmVyKSB7XHJcblx0XHR0aGlzLiNmb3YgPSB2YWx1ZVxyXG5cdFx0dGhpcy5yZWZyZXNoUHJvamVjdGlvbigpXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgdXBkYXRlKGVudGl0aWVzOiBFbnRpdGllcyk6IHZvaWQge1xyXG5cdFx0Y29uc3QgZ2wgPSB0aGlzLmNvbnRleHRcclxuXHJcblx0XHRnbC5jbGVhckNvbG9yKDAsIDAsIDAsIDEpXHJcblx0XHRnbC5jbGVhckRlcHRoKDEpXHJcblx0XHRnbC5lbmFibGUoR0wuREVQVEhfVEVTVClcclxuXHRcdGdsLmRlcHRoRnVuYyhHTC5MRVFVQUwpXHJcblx0XHRnbC5jbGVhcihHTC5DT0xPUl9CVUZGRVJfQklUIHwgR0wuREVQVEhfQlVGRkVSX0JJVClcclxuXHJcblx0XHRlbnRpdGllcy5mb3JFYWNoKChtb2RlbCwgdHJhbnNmb3JtKSA9PiB7XHJcblx0XHRcdGlmKCFtb2RlbC5tYXRlcmlhbClcclxuXHRcdFx0XHRyZXR1cm5cclxuXHJcblx0XHRcdGxldCB2ZXJ0ZXhQb3NpdGlvbiA9IG1vZGVsLm1hdGVyaWFsLnNoYWRlci5nZXRBdHRyaWJ1dGUoXCJ2ZXJ0ZXhQb3NpdGlvblwiKS5sb2NhdGlvblxyXG5cdFx0XHRsZXQgcHJvamVjdGlvbk1hdHJpeCA9IG1vZGVsLm1hdGVyaWFsLnNoYWRlci5nZXRVbmlmb3JtKFwicHJvamVjdGlvbk1hdHJpeFwiKS5sb2NhdGlvblxyXG5cdFx0XHRsZXQgbW9kZWxWaWV3TWF0cml4ID0gbW9kZWwubWF0ZXJpYWwuc2hhZGVyLmdldFVuaWZvcm0oXCJtb2RlbFZpZXdNYXRyaXhcIikubG9jYXRpb25cclxuXHJcblx0XHRcdGdsLnVzZVByb2dyYW0obW9kZWwubWF0ZXJpYWwuc2hhZGVyLnByb2dyYW0pXHJcblx0XHRcdGdsLmJpbmRCdWZmZXIoR0wuQVJSQVlfQlVGRkVSLCBtb2RlbC52ZXJ0ZXhCdWZmZXIpXHJcblx0XHRcdGdsLnZlcnRleEF0dHJpYlBvaW50ZXIodmVydGV4UG9zaXRpb24sIDIsIEdMLkZMT0FULCBmYWxzZSwgMCwgMClcclxuXHRcdFx0Z2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkodmVydGV4UG9zaXRpb24pXHJcblx0XHRcdG1vZGVsLm1hdGVyaWFsLmFwcGx5KGdsKVxyXG5cdFx0XHRnbC51bmlmb3JtTWF0cml4NGZ2KHByb2plY3Rpb25NYXRyaXgsIGZhbHNlLCB0aGlzLnByb2plY3Rpb25NYXRyaXgpXHJcblx0XHRcdGdsLnVuaWZvcm1NYXRyaXg0ZnYobW9kZWxWaWV3TWF0cml4LCBmYWxzZSwgdHJhbnNmb3JtLm1hdHJpeC5tdWwodGhpcy52aWV3TWF0cml4KS50cmFuc3Bvc2UoKSlcclxuXHRcdFx0Z2wuZHJhd0FycmF5cyhHTC5UUklBTkdMRV9TVFJJUCwgMCwgNClcclxuXHRcdH0sIE1vZGVsLCBUcmFuc2Zvcm0pXHJcblx0fVxyXG5cclxuXHRwcml2YXRlIHJlZnJlc2hTaXplID0gKHRhcmdldDogSFRNTENhbnZhc0VsZW1lbnQpID0+IHtcclxuXHRcdHRhcmdldC53aWR0aCA9IHNjcmVlbi53aWR0aFxyXG5cdFx0dGFyZ2V0LmhlaWdodCA9IHNjcmVlbi5oZWlnaHRcclxuXHRcdHRoaXMuI3dpZHRoID0gdGFyZ2V0LmNsaWVudFdpZHRoXHJcblx0XHR0aGlzLiNoZWlnaHQgPSB0YXJnZXQuY2xpZW50SGVpZ2h0XHJcblx0XHR0aGlzLmNvbnRleHQudmlld3BvcnQoMCwgMCwgdGFyZ2V0LndpZHRoLCB0YXJnZXQuaGVpZ2h0KVxyXG5cdFx0dGhpcy5yZWZyZXNoUHJvamVjdGlvbigpXHJcblx0fVxyXG5cclxuXHQvKiogUmVmcmVzaCB0aGUgcHJvamVjdGlvbiBtYXRyaXggYmFzZWQgb24gdGhlIHNwZWNpZmllZCBwYXJhbWV0ZXJzICovXHJcblx0cHJpdmF0ZSByZWZyZXNoUHJvamVjdGlvbiA9ICgpID0+IHtcclxuXHRcdGlmKHRoaXMuI29ydGhvKVxyXG5cdFx0XHR0aGlzLnByb2plY3Rpb25NYXRyaXggPSBNYXRyaXg0eDQuY3JlYXRlT3J0aG8oXHJcblx0XHRcdFx0dGhpcy4jd2lkdGggKiB0aGlzLiNzaXplLFxyXG5cdFx0XHRcdHRoaXMuI2hlaWdodCAqIHRoaXMuI3NpemUsXHJcblx0XHRcdFx0dGhpcy5uZWFyQ2xpcCwgdGhpcy5mYXJDbGlwXHJcblx0XHRcdClcclxuXHRcdGVsc2VcclxuXHRcdFx0dGhpcy5wcm9qZWN0aW9uTWF0cml4ID0gTWF0cml4NHg0LmNyZWF0ZVBlcnNwZWN0aXZlKFxyXG5cdFx0XHRcdHRoaXMuI2ZvdiAqIE1hdGguUEkgLyAxODAsXHJcblx0XHRcdFx0dGhpcy4jd2lkdGggLyB0aGlzLiNoZWlnaHQsXHJcblx0XHRcdFx0dGhpcy5uZWFyQ2xpcCwgdGhpcy5mYXJDbGlwXHJcblx0XHRcdClcclxuXHJcblx0XHR0aGlzLnByb2plY3Rpb25NYXRyaXggPSB0aGlzLnByb2plY3Rpb25NYXRyaXgudHJhbnNwb3NlKClcclxuXHR9XHJcbn0iXX0=