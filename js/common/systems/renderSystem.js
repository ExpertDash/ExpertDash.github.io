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
        this.viewMatrix = new Matrix4x4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, -10, 0, 0, 0, 1);
        __classPrivateFieldSet(this, _RenderSystem_ortho, true, "f");
        this.canvas = target;
        this.context = target.getContext("webgl");
        this.fit();
        window.removeEventListener("resize", () => this.fit());
        window.addEventListener("resize", () => this.fit());
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
    /**
     * Fit's the render boundaries to the current screen size
     */
    fit() {
        this.canvas.width = screen.width;
        this.canvas.height = screen.height;
        __classPrivateFieldSet(this, _RenderSystem_width, this.canvas.clientWidth, "f");
        __classPrivateFieldSet(this, _RenderSystem_height, this.canvas.clientHeight, "f");
        this.context.viewport(0, 0, this.canvas.width, this.canvas.height);
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
    /**
     * Refresh the projection matrix based on the specified parameters
     */
    refreshProjection() {
        if (__classPrivateFieldGet(this, _RenderSystem_ortho, "f"))
            this.projectionMatrix = Matrix4x4.createOrtho(__classPrivateFieldGet(this, _RenderSystem_width, "f") * __classPrivateFieldGet(this, _RenderSystem_size, "f"), __classPrivateFieldGet(this, _RenderSystem_height, "f") * __classPrivateFieldGet(this, _RenderSystem_size, "f"), this.nearClip, this.farClip);
        else
            this.projectionMatrix = Matrix4x4.createPerspective(__classPrivateFieldGet(this, _RenderSystem_fov, "f") * Math.PI / 180, __classPrivateFieldGet(this, _RenderSystem_width, "f") / __classPrivateFieldGet(this, _RenderSystem_height, "f"), this.nearClip, this.farClip);
        this.projectionMatrix = this.projectionMatrix.transpose();
    }
};
_RenderSystem_width = new WeakMap(), _RenderSystem_height = new WeakMap(), _RenderSystem_ortho = new WeakMap(), _RenderSystem_size = new WeakMap(), _RenderSystem_fov = new WeakMap();
RenderSystem = RenderSystem_1 = __decorate([
    World.register.system(Simulator.phase(Simulator.Category.Graphics), document.querySelector("canvas")),
    __metadata("design:paramtypes", [HTMLCanvasElement])
], RenderSystem);
export default RenderSystem;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyU3lzdGVtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1vbi9zeXN0ZW1zL3JlbmRlclN5c3RlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLGNBQWMsQ0FBQTtBQUVuQyxPQUFPLFNBQVMsTUFBTSxvQkFBb0IsQ0FBQTtBQUMxQyxPQUFPLEVBQUMsS0FBSyxFQUFFLFNBQVMsRUFBQyxNQUFNLFdBQVcsQ0FBQTtBQUMxQyxPQUFPLEtBQUssRUFBRSxFQUFDLFNBQVMsRUFBQyxNQUFNLGFBQWEsQ0FBQTtBQUU1QyxNQUFNLEVBQUUsR0FBRyxxQkFBcUIsQ0FBQTtBQUVoQyw2Q0FBNkM7QUFFN0MsSUFBcUIsWUFBWSxvQkFBakMsTUFBcUIsWUFBYSxTQUFRLE1BQU07SUFhL0M7O09BRUc7SUFDSCxZQUFtQixNQUF5QjtRQUMzQyxLQUFLLEVBQUUsQ0FBQTtRQWRBLGFBQVEsR0FBVyxHQUFHLENBQUE7UUFDdEIsWUFBTyxHQUFXLElBQUksQ0FBQTtRQUc5QixzQ0FBYztRQUNkLHVDQUFlO1FBQ2Ysc0NBQWU7UUFDZiw2QkFBZ0IsSUFBSSxFQUFBO1FBQ3BCLDRCQUFlLEVBQUU7UUFFakI7O1dBRUc7VUFKYztRQVFoQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksU0FBUyxDQUM5QixDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQ1YsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUNWLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUNaLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FDVixDQUFBO1FBRUQsdUJBQUEsSUFBSSx1QkFBVSxJQUFJLE1BQUEsQ0FBQTtRQUNsQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQTtRQUNwQixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDekMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFBO1FBRVYsTUFBTSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQTtRQUN0RCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFBO0lBQ3BELENBQUM7SUFFRCxvQkFBb0I7SUFDcEIsSUFBVyxLQUFLO1FBQ2YsT0FBTyx1QkFBQSxJQUFJLDJCQUFPLENBQUE7SUFDbkIsQ0FBQztJQUVELHFCQUFxQjtJQUNyQixJQUFXLE1BQU07UUFDaEIsT0FBTyx1QkFBQSxJQUFJLDRCQUFRLENBQUE7SUFDcEIsQ0FBQztJQUVELDJCQUEyQjtJQUMzQixJQUFXLFdBQVc7UUFDckIsT0FBTyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUE7SUFDaEMsQ0FBQztJQUVELHNFQUFzRTtJQUN0RSxJQUFXLEtBQUs7UUFDZixPQUFPLHVCQUFBLElBQUksMkJBQU8sQ0FBQTtJQUNuQixDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUFXLEtBQUssQ0FBQyxLQUFjO1FBQzlCLHVCQUFBLElBQUksdUJBQVUsS0FBSyxNQUFBLENBQUE7UUFDbkIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUE7SUFDekIsQ0FBQztJQUVELG1DQUFtQztJQUNuQyxJQUFXLElBQUk7UUFDZCxPQUFPLHVCQUFBLElBQUksMEJBQU0sQ0FBQTtJQUNsQixDQUFDO0lBRUQsSUFBVyxJQUFJLENBQUMsS0FBYTtRQUM1Qix1QkFBQSxJQUFJLHNCQUFTLEtBQUssTUFBQSxDQUFBO1FBQ2xCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFBO0lBQ3pCLENBQUM7SUFFRCwyQ0FBMkM7SUFDM0MsSUFBVyxHQUFHO1FBQ2IsT0FBTyx1QkFBQSxJQUFJLHlCQUFLLENBQUE7SUFDakIsQ0FBQztJQUVELElBQVcsR0FBRyxDQUFDLEtBQWE7UUFDM0IsdUJBQUEsSUFBSSxxQkFBUSxLQUFLLE1BQUEsQ0FBQTtRQUNqQixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQTtJQUN6QixDQUFDO0lBRUQ7O09BRUc7SUFDSSxHQUFHO1FBQ1QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQTtRQUNoQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFBO1FBQ2xDLHVCQUFBLElBQUksdUJBQVUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLE1BQUEsQ0FBQTtRQUNyQyx1QkFBQSxJQUFJLHdCQUFXLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxNQUFBLENBQUE7UUFDdkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQ2xFLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFBO0lBQ3pCLENBQUM7SUFFTSxNQUFNLENBQUMsUUFBa0I7UUFDL0IsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQTtRQUV2QixFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQ3pCLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDaEIsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUE7UUFDeEIsRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDdkIsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDLGdCQUFnQixDQUFDLENBQUE7UUFFbkQsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsRUFBRTtZQUNyQyxJQUFHLENBQUMsS0FBSyxDQUFDLFFBQVE7Z0JBQ2pCLE9BQU07WUFFUCxJQUFJLGNBQWMsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxRQUFRLENBQUE7WUFDbEYsSUFBSSxnQkFBZ0IsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxRQUFRLENBQUE7WUFDcEYsSUFBSSxlQUFlLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUFDLENBQUMsUUFBUSxDQUFBO1lBRWxGLEVBQUUsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUE7WUFDNUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQTtZQUNsRCxFQUFFLENBQUMsbUJBQW1CLENBQUMsY0FBYyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7WUFDaEUsRUFBRSxDQUFDLHVCQUF1QixDQUFDLGNBQWMsQ0FBQyxDQUFBO1lBQzFDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFBO1lBQ3hCLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUE7WUFDbkUsRUFBRSxDQUFDLGdCQUFnQixDQUFDLGVBQWUsRUFBRSxLQUFLLEVBQUUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUE7WUFDOUYsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsY0FBYyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUN2QyxDQUFDLEVBQUUsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFBO0lBQ3JCLENBQUM7SUFFRDs7T0FFRztJQUNLLGlCQUFpQjtRQUN4QixJQUFHLHVCQUFBLElBQUksMkJBQU87WUFDYixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsU0FBUyxDQUFDLFdBQVcsQ0FDNUMsdUJBQUEsSUFBSSwyQkFBTyxHQUFHLHVCQUFBLElBQUksMEJBQU0sRUFDeEIsdUJBQUEsSUFBSSw0QkFBUSxHQUFHLHVCQUFBLElBQUksMEJBQU0sRUFDekIsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUMzQixDQUFBOztZQUVELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxTQUFTLENBQUMsaUJBQWlCLENBQ2xELHVCQUFBLElBQUkseUJBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLEdBQUcsRUFDekIsdUJBQUEsSUFBSSwyQkFBTyxHQUFHLHVCQUFBLElBQUksNEJBQVEsRUFDMUIsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUMzQixDQUFBO1FBRUYsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsQ0FBQTtJQUMxRCxDQUFDO0NBQ0QsQ0FBQTs7QUE5SW9CLFlBQVk7SUFEaEMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQXNCLFNBQVMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRSxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO3FDQWlCL0YsaUJBQWlCO0dBaEJ4QixZQUFZLENBOEloQztlQTlJb0IsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7U3lzdGVtfSBmcm9tIFwiLi4vLi4vZWNzLmpzXCJcclxuaW1wb3J0IEVudGl0aWVzIGZyb20gXCIuLi8uLi9lY3MvZW50aXRpZXMuanNcIlxyXG5pbXBvcnQgTWF0cml4NHg0IGZyb20gXCIuLi8uLi9tYXRoL21hdDQuanNcIlxyXG5pbXBvcnQge01vZGVsLCBUcmFuc2Zvcm19IGZyb20gXCIuLi9saWIuanNcIlxyXG5pbXBvcnQgV29ybGQsIHtTaW11bGF0b3J9IGZyb20gXCIuLi93b3JsZC5qc1wiXHJcblxyXG5jb25zdCBHTCA9IFdlYkdMUmVuZGVyaW5nQ29udGV4dFxyXG5cclxuLyoqIFJlbmRlcnMgZW50aXRpZXMgb250byBhIHRhcmdldCBkaXNwbGF5ICovXHJcbkBXb3JsZC5yZWdpc3Rlci5zeXN0ZW08dHlwZW9mIFJlbmRlclN5c3RlbT4oU2ltdWxhdG9yLnBoYXNlKFNpbXVsYXRvci5DYXRlZ29yeS5HcmFwaGljcyksIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJjYW52YXNcIikpXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlbmRlclN5c3RlbSBleHRlbmRzIFN5c3RlbSB7XHJcblx0cHVibGljIHJlYWRvbmx5IGNvbnRleHQ6IFdlYkdMUmVuZGVyaW5nQ29udGV4dFxyXG5cdHByaXZhdGUgcmVhZG9ubHkgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudFxyXG5cdHByaXZhdGUgbmVhckNsaXA6IG51bWJlciA9IDAuMVxyXG5cdHByaXZhdGUgZmFyQ2xpcDogbnVtYmVyID0gMTAwMFxyXG5cdHByaXZhdGUgdmlld01hdHJpeDogTWF0cml4NHg0XHJcblx0cHJpdmF0ZSBwcm9qZWN0aW9uTWF0cml4OiBNYXRyaXg0eDRcclxuXHQjd2lkdGg6IG51bWJlclxyXG5cdCNoZWlnaHQ6IG51bWJlclxyXG5cdCNvcnRobzogYm9vbGVhblxyXG5cdCNzaXplOiBudW1iZXIgPSAwLjAzXHJcblx0I2ZvdjogbnVtYmVyID0gNDVcclxuXHJcblx0LyoqXHJcblx0ICogQHBhcmFtIHRhcmdldCBDYW52YXMgdG8gcmVuZGVyIHRvXHJcblx0ICovXHJcblx0cHVibGljIGNvbnN0cnVjdG9yKHRhcmdldDogSFRNTENhbnZhc0VsZW1lbnQpIHtcclxuXHRcdHN1cGVyKClcclxuXHJcblx0XHR0aGlzLnZpZXdNYXRyaXggPSBuZXcgTWF0cml4NHg0KFxyXG5cdFx0XHQxLCAwLCAwLCAwLFxyXG5cdFx0XHQwLCAxLCAwLCAwLFxyXG5cdFx0XHQwLCAwLCAxLCAtMTAsXHJcblx0XHRcdDAsIDAsIDAsIDFcclxuXHRcdClcclxuXHJcblx0XHR0aGlzLiNvcnRobyA9IHRydWVcclxuXHRcdHRoaXMuY2FudmFzID0gdGFyZ2V0XHJcblx0XHR0aGlzLmNvbnRleHQgPSB0YXJnZXQuZ2V0Q29udGV4dChcIndlYmdsXCIpXHJcblx0XHR0aGlzLmZpdCgpXHJcblxyXG5cdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgKCkgPT4gdGhpcy5maXQoKSlcclxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsICgpID0+IHRoaXMuZml0KCkpXHJcblx0fVxyXG5cclxuXHQvKiogRGlzcGxheSB3aWR0aCAqL1xyXG5cdHB1YmxpYyBnZXQgd2lkdGgoKTogbnVtYmVyIHtcclxuXHRcdHJldHVybiB0aGlzLiN3aWR0aFxyXG5cdH1cclxuXHJcblx0LyoqIERpc3BsYXkgaGVpZ2h0ICovXHJcblx0cHVibGljIGdldCBoZWlnaHQoKTogbnVtYmVyIHtcclxuXHRcdHJldHVybiB0aGlzLiNoZWlnaHRcclxuXHR9XHJcblxyXG5cdC8qKiBEaXNwbGF5IGFzcGVjdCByYXRpbyAqL1xyXG5cdHB1YmxpYyBnZXQgYXNwZWN0UmF0aW8oKTogbnVtYmVyIHtcclxuXHRcdHJldHVybiB0aGlzLndpZHRoIC8gdGhpcy5oZWlnaHRcclxuXHR9XHJcblxyXG5cdC8qKiBXaGV0aGVyIHRvIHVzZSBhbiBvcnRob2dyYXBoaWMgb3IgcGVyc3BlY3RpdmUgcHJvamVjdGlvbiBtYXRyaXggKi9cclxuXHRwdWJsaWMgZ2V0IG9ydGhvKCk6IGJvb2xlYW4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuI29ydGhvXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBAcGFyYW0gdmFsdWUgV2hldGhlciB0byB1c2Ugb3J0aG8gb3IgcGVyc3BlY3RpdmVcclxuXHQgKi9cclxuXHRwdWJsaWMgc2V0IG9ydGhvKHZhbHVlOiBib29sZWFuKSB7XHJcblx0XHR0aGlzLiNvcnRobyA9IHZhbHVlXHJcblx0XHR0aGlzLnJlZnJlc2hQcm9qZWN0aW9uKClcclxuXHR9XHJcblxyXG5cdC8qKiBPcnRob2dyYXBoaWMgcHJvamVjdGlvbiBzaXplICovXHJcblx0cHVibGljIGdldCBzaXplKCk6IG51bWJlciB7XHJcblx0XHRyZXR1cm4gdGhpcy4jc2l6ZVxyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCBzaXplKHZhbHVlOiBudW1iZXIpIHtcclxuXHRcdHRoaXMuI3NpemUgPSB2YWx1ZVxyXG5cdFx0dGhpcy5yZWZyZXNoUHJvamVjdGlvbigpXHJcblx0fVxyXG5cclxuXHQvKiogUGVyc3BlY3RpdmUgcHJvamVjdGlvbiBmaWVsZCBvZiB2aWV3ICovXHJcblx0cHVibGljIGdldCBmb3YoKTogbnVtYmVyIHtcclxuXHRcdHJldHVybiB0aGlzLiNmb3ZcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgZm92KHZhbHVlOiBudW1iZXIpIHtcclxuXHRcdHRoaXMuI2ZvdiA9IHZhbHVlXHJcblx0XHR0aGlzLnJlZnJlc2hQcm9qZWN0aW9uKClcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEZpdCdzIHRoZSByZW5kZXIgYm91bmRhcmllcyB0byB0aGUgY3VycmVudCBzY3JlZW4gc2l6ZVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBmaXQoKSB7XHJcblx0XHR0aGlzLmNhbnZhcy53aWR0aCA9IHNjcmVlbi53aWR0aFxyXG5cdFx0dGhpcy5jYW52YXMuaGVpZ2h0ID0gc2NyZWVuLmhlaWdodFxyXG5cdFx0dGhpcy4jd2lkdGggPSB0aGlzLmNhbnZhcy5jbGllbnRXaWR0aFxyXG5cdFx0dGhpcy4jaGVpZ2h0ID0gdGhpcy5jYW52YXMuY2xpZW50SGVpZ2h0XHJcblx0XHR0aGlzLmNvbnRleHQudmlld3BvcnQoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodClcclxuXHRcdHRoaXMucmVmcmVzaFByb2plY3Rpb24oKVxyXG5cdH1cclxuXHJcblx0cHVibGljIHVwZGF0ZShlbnRpdGllczogRW50aXRpZXMpOiB2b2lkIHtcclxuXHRcdGNvbnN0IGdsID0gdGhpcy5jb250ZXh0XHJcblxyXG5cdFx0Z2wuY2xlYXJDb2xvcigwLCAwLCAwLCAxKVxyXG5cdFx0Z2wuY2xlYXJEZXB0aCgxKVxyXG5cdFx0Z2wuZW5hYmxlKEdMLkRFUFRIX1RFU1QpXHJcblx0XHRnbC5kZXB0aEZ1bmMoR0wuTEVRVUFMKVxyXG5cdFx0Z2wuY2xlYXIoR0wuQ09MT1JfQlVGRkVSX0JJVCB8IEdMLkRFUFRIX0JVRkZFUl9CSVQpXHJcblxyXG5cdFx0ZW50aXRpZXMuZm9yRWFjaCgobW9kZWwsIHRyYW5zZm9ybSkgPT4ge1xyXG5cdFx0XHRpZighbW9kZWwubWF0ZXJpYWwpXHJcblx0XHRcdFx0cmV0dXJuXHJcblxyXG5cdFx0XHRsZXQgdmVydGV4UG9zaXRpb24gPSBtb2RlbC5tYXRlcmlhbC5zaGFkZXIuZ2V0QXR0cmlidXRlKFwidmVydGV4UG9zaXRpb25cIikubG9jYXRpb25cclxuXHRcdFx0bGV0IHByb2plY3Rpb25NYXRyaXggPSBtb2RlbC5tYXRlcmlhbC5zaGFkZXIuZ2V0VW5pZm9ybShcInByb2plY3Rpb25NYXRyaXhcIikubG9jYXRpb25cclxuXHRcdFx0bGV0IG1vZGVsVmlld01hdHJpeCA9IG1vZGVsLm1hdGVyaWFsLnNoYWRlci5nZXRVbmlmb3JtKFwibW9kZWxWaWV3TWF0cml4XCIpLmxvY2F0aW9uXHJcblxyXG5cdFx0XHRnbC51c2VQcm9ncmFtKG1vZGVsLm1hdGVyaWFsLnNoYWRlci5wcm9ncmFtKVxyXG5cdFx0XHRnbC5iaW5kQnVmZmVyKEdMLkFSUkFZX0JVRkZFUiwgbW9kZWwudmVydGV4QnVmZmVyKVxyXG5cdFx0XHRnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHZlcnRleFBvc2l0aW9uLCAyLCBHTC5GTE9BVCwgZmFsc2UsIDAsIDApXHJcblx0XHRcdGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHZlcnRleFBvc2l0aW9uKVxyXG5cdFx0XHRtb2RlbC5tYXRlcmlhbC5hcHBseShnbClcclxuXHRcdFx0Z2wudW5pZm9ybU1hdHJpeDRmdihwcm9qZWN0aW9uTWF0cml4LCBmYWxzZSwgdGhpcy5wcm9qZWN0aW9uTWF0cml4KVxyXG5cdFx0XHRnbC51bmlmb3JtTWF0cml4NGZ2KG1vZGVsVmlld01hdHJpeCwgZmFsc2UsIHRyYW5zZm9ybS5tYXRyaXgubXVsKHRoaXMudmlld01hdHJpeCkudHJhbnNwb3NlKCkpXHJcblx0XHRcdGdsLmRyYXdBcnJheXMoR0wuVFJJQU5HTEVfU1RSSVAsIDAsIDQpXHJcblx0XHR9LCBNb2RlbCwgVHJhbnNmb3JtKVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVmcmVzaCB0aGUgcHJvamVjdGlvbiBtYXRyaXggYmFzZWQgb24gdGhlIHNwZWNpZmllZCBwYXJhbWV0ZXJzXHJcblx0ICovXHJcblx0cHJpdmF0ZSByZWZyZXNoUHJvamVjdGlvbigpIHtcclxuXHRcdGlmKHRoaXMuI29ydGhvKVxyXG5cdFx0XHR0aGlzLnByb2plY3Rpb25NYXRyaXggPSBNYXRyaXg0eDQuY3JlYXRlT3J0aG8oXHJcblx0XHRcdFx0dGhpcy4jd2lkdGggKiB0aGlzLiNzaXplLFxyXG5cdFx0XHRcdHRoaXMuI2hlaWdodCAqIHRoaXMuI3NpemUsXHJcblx0XHRcdFx0dGhpcy5uZWFyQ2xpcCwgdGhpcy5mYXJDbGlwXHJcblx0XHRcdClcclxuXHRcdGVsc2VcclxuXHRcdFx0dGhpcy5wcm9qZWN0aW9uTWF0cml4ID0gTWF0cml4NHg0LmNyZWF0ZVBlcnNwZWN0aXZlKFxyXG5cdFx0XHRcdHRoaXMuI2ZvdiAqIE1hdGguUEkgLyAxODAsXHJcblx0XHRcdFx0dGhpcy4jd2lkdGggLyB0aGlzLiNoZWlnaHQsXHJcblx0XHRcdFx0dGhpcy5uZWFyQ2xpcCwgdGhpcy5mYXJDbGlwXHJcblx0XHRcdClcclxuXHJcblx0XHR0aGlzLnByb2plY3Rpb25NYXRyaXggPSB0aGlzLnByb2plY3Rpb25NYXRyaXgudHJhbnNwb3NlKClcclxuXHR9XHJcbn0iXX0=