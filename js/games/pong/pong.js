var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Collider, GravitySystem, Model, Motion, MotionSystem, Name, RenderSystem, TextSystem, Transform } from "../../common/lib.js";
import { Ball, Controllable, CpuController, Ownership, Wall } from "./components/lib.js";
import { BallSystem, CpuSystem } from "./systems/lib.js";
import World, { Simulator } from "../../common/world.js";
import { System } from "../../ecs.js";
import Vector3, { vec3 } from "../../math/vec3.js";
import Material from "../../rendering/material.js";
import Mesh from "../../rendering/mesh.js";
import Shader from "../../rendering/shader.js";
async function play(mode) {
    document.querySelector("#menu").style.display = "none";
    document.querySelector("canvas").style.display = "block";
    let renderSystem = World.systems.get(RenderSystem);
    renderSystem.size = 0.015;
    let shader = await Shader.load("./resources/shaders/flat.glsl");
    let mat = new Material(shader).setValue("color", [1, 1, 1]);
    let ball = World.entities.create(new Name("Ball"), new Transform({ scale: vec3(0.2, 0.2, 1) }), new Model(Mesh.Primitives.quad, mat), Collider, Motion, Ball);
    let leftBoard = World.entities.create(new Name("Right Board"), new Transform({ position: vec3(-Pong.width * 0.425, 0), scale: vec3(0.2, 1, 1) }), new Model(Mesh.Primitives.quad, mat), Collider);
    let rightBoard = World.entities.create(new Name("Right Board"), new Transform({ position: vec3(Pong.width * 0.425, 0), scale: vec3(0.2, 1, 1) }), new Model(Mesh.Primitives.quad, mat), Collider);
    World.entities.create(new Transform({ position: Vector3.back, scale: vec3(Pong.width * 0.525, Pong.height * 0.54, 1) }), new Model(Mesh.Primitives.quad, new Material(shader).setValue("color", [1, 1, 1])), Wall);
    World.entities.create(new Transform({ position: Vector3.back, scale: vec3(Pong.width * 0.5, Pong.height * 0.5, 1) }), new Model(Mesh.Primitives.quad, new Material(shader).setValue("color", [0, 0, 0])));
    switch (mode) {
        case "sp":
            leftBoard.add(Controllable);
            rightBoard.add(new CpuController(0.2));
            break;
        case "host":
            World.systems.remove(CpuSystem);
            leftBoard.add(Ownership, Controllable);
            ball.add(Ownership);
            break;
        default:
            World.systems.remove(MotionSystem, BallSystem, CpuSystem);
            rightBoard.add(Ownership, Controllable);
            break;
    }
    console.log([...World.systems]);
    World.systems.remove(GravitySystem);
    World.systems.get(RenderSystem).fit();
    Pong.resetRound();
}
document.querySelector("#sp").addEventListener("click", () => play("sp"));
document.querySelector("#host").addEventListener("click", () => play("host"));
document.querySelector("#join").addEventListener("click", () => play("guest"));
document.querySelector("#code > input").addEventListener("keydown", e => {
    switch (e.keyCode) {
        case 13:
            play("guest");
            break;
    }
});
function hasParameter(name) {
    return location.hash.slice(1).split(',').indexOf(name) != -1;
}
if (hasParameter("singleplayer"))
    play("sp");
export default class Pong {
    static resetRound() {
        World.entities.forEach((ball, motion, transform) => {
            let speed = 0.2;
            let angle = Math.round(Math.random() * 15) * Math.PI / 7;
            motion.velocity = new Vector3(Math.cos(angle), Math.sin(angle)).mul(0.2);
            transform.position = new Vector3(0, (Math.random() - 0.5) * Pong.height);
            if (hasParameter("deterministic")) {
                motion.velocity = new Vector3(-speed);
                transform.position = Vector3.zero;
            }
        }, Ball, Motion, Transform);
        Simulator.resume();
    }
    static get width() {
        return 12;
    }
    static get height() {
        return 8;
    }
}
let DebugSystem = class DebugSystem extends System {
    update(entities) {
        let textSystem = World.systems.get(TextSystem);
        entities.forEach((transform, name) => {
            textSystem.text(transform.position, `${name}`, { color: "dimgray" });
        }, Transform, Name);
    }
};
DebugSystem = __decorate([
    World.register.system(Simulator.phase(Simulator.Category.UI, { after: [TextSystem] }))
], DebugSystem);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9uZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9nYW1lcy9wb25nL3BvbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFDLE1BQU0scUJBQXFCLENBQUE7QUFDbkksT0FBTyxFQUFDLElBQUksRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQTtBQUN0RixPQUFPLEVBQUMsVUFBVSxFQUFFLFNBQVMsRUFBQyxNQUFNLGtCQUFrQixDQUFBO0FBQ3RELE9BQU8sS0FBSyxFQUFFLEVBQUMsU0FBUyxFQUFDLE1BQU0sdUJBQXVCLENBQUE7QUFDdEQsT0FBTyxFQUFXLE1BQU0sRUFBQyxNQUFNLGNBQWMsQ0FBQTtBQUM3QyxPQUFPLE9BQU8sRUFBRSxFQUFDLElBQUksRUFBQyxNQUFNLG9CQUFvQixDQUFBO0FBQ2hELE9BQU8sUUFBUSxNQUFNLDZCQUE2QixDQUFBO0FBQ2xELE9BQU8sSUFBSSxNQUFNLHlCQUF5QixDQUFBO0FBQzFDLE9BQU8sTUFBTSxNQUFNLDJCQUEyQixDQUFBO0FBSTlDLEtBQUssVUFBVSxJQUFJLENBQUMsSUFBVTtJQUM3QixRQUFRLENBQUMsYUFBYSxDQUFjLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFBO0lBQ25FLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUE7SUFFeEQsSUFBSSxZQUFZLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUE7SUFDbEQsWUFBWSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUE7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RUFBQyxLQUFLLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBQyxDQUFDLENBQUM7R0FDL0UsV0FBVyxDQVFoQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29sbGlkZXIsIEdyYXZpdHlTeXN0ZW0sIE1vZGVsLCBNb3Rpb24sIE1vdGlvblN5c3RlbSwgTmFtZSwgUmVuZGVyU3lzdGVtLCBUZXh0U3lzdGVtLCBUcmFuc2Zvcm19IGZyb20gXCIuLi8uLi9jb21tb24vbGliLmpzXCJcclxuaW1wb3J0IHtCYWxsLCBDb250cm9sbGFibGUsIENwdUNvbnRyb2xsZXIsIE93bmVyc2hpcCwgV2FsbH0gZnJvbSBcIi4vY29tcG9uZW50cy9saWIuanNcIlxyXG5pbXBvcnQge0JhbGxTeXN0ZW0sIENwdVN5c3RlbX0gZnJvbSBcIi4vc3lzdGVtcy9saWIuanNcIlxyXG5pbXBvcnQgV29ybGQsIHtTaW11bGF0b3J9IGZyb20gXCIuLi8uLi9jb21tb24vd29ybGQuanNcIlxyXG5pbXBvcnQge0VudGl0aWVzLCBTeXN0ZW19IGZyb20gXCIuLi8uLi9lY3MuanNcIlxyXG5pbXBvcnQgVmVjdG9yMywge3ZlYzN9IGZyb20gXCIuLi8uLi9tYXRoL3ZlYzMuanNcIlxyXG5pbXBvcnQgTWF0ZXJpYWwgZnJvbSBcIi4uLy4uL3JlbmRlcmluZy9tYXRlcmlhbC5qc1wiXHJcbmltcG9ydCBNZXNoIGZyb20gXCIuLi8uLi9yZW5kZXJpbmcvbWVzaC5qc1wiXHJcbmltcG9ydCBTaGFkZXIgZnJvbSBcIi4uLy4uL3JlbmRlcmluZy9zaGFkZXIuanNcIlxyXG5cclxudHlwZSBNb2RlID0gXCJzcFwiIHwgXCJob3N0XCIgfCBcImd1ZXN0XCJcclxuXHJcbmFzeW5jIGZ1bmN0aW9uIHBsYXkobW9kZTogTW9kZSk6IFByb21pc2U8dm9pZD4ge1xyXG5cdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQ+KFwiI21lbnVcIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiXHJcblx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImNhbnZhc1wiKS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiXHJcblxyXG5cdGxldCByZW5kZXJTeXN0ZW0gPSBXb3JsZC5zeXN0ZW1zLmdldChSZW5kZXJTeXN0ZW0pXHJcblx0cmVuZGVyU3lzdGVtLnNpemUgPSAwLjAxNVxyXG5cclxuXHRsZXQgc2hhZGVyID0gYXdhaXQgU2hhZGVyLmxvYWQoXCIuL3Jlc291cmNlcy9zaGFkZXJzL2ZsYXQuZ2xzbFwiKVxyXG5cdGxldCBtYXQgPSBuZXcgTWF0ZXJpYWwoc2hhZGVyKS5zZXRWYWx1ZShcImNvbG9yXCIsIFsxLCAxLCAxXSlcclxuXHJcblx0bGV0IGJhbGwgPSBXb3JsZC5lbnRpdGllcy5jcmVhdGUoXHJcblx0XHRuZXcgTmFtZShcIkJhbGxcIiksXHJcblx0XHRuZXcgVHJhbnNmb3JtKHtzY2FsZTogdmVjMygwLjIsIDAuMiwgMSl9KSxcclxuXHRcdG5ldyBNb2RlbChNZXNoLlByaW1pdGl2ZXMucXVhZCwgbWF0KSxcclxuXHRcdENvbGxpZGVyLFxyXG5cdFx0TW90aW9uLFxyXG5cdFx0QmFsbFxyXG5cdClcclxuXHJcblx0bGV0IGxlZnRCb2FyZCA9IFdvcmxkLmVudGl0aWVzLmNyZWF0ZShcclxuXHRcdG5ldyBOYW1lKFwiUmlnaHQgQm9hcmRcIiksXHJcblx0XHRuZXcgVHJhbnNmb3JtKHtwb3NpdGlvbjogdmVjMygtUG9uZy53aWR0aCAqIDAuNDI1LCAwKSwgc2NhbGU6IHZlYzMoMC4yLCAxLCAxKX0pLFxyXG5cdFx0bmV3IE1vZGVsKE1lc2guUHJpbWl0aXZlcy5xdWFkLCBtYXQpLFxyXG5cdFx0Q29sbGlkZXJcclxuXHQpXHJcblxyXG5cdGxldCByaWdodEJvYXJkID0gV29ybGQuZW50aXRpZXMuY3JlYXRlKFxyXG5cdFx0bmV3IE5hbWUoXCJSaWdodCBCb2FyZFwiKSxcclxuXHRcdG5ldyBUcmFuc2Zvcm0oe3Bvc2l0aW9uOiB2ZWMzKFBvbmcud2lkdGggKiAwLjQyNSwgMCksIHNjYWxlOiB2ZWMzKDAuMiwgMSwgMSl9KSxcclxuXHRcdG5ldyBNb2RlbChNZXNoLlByaW1pdGl2ZXMucXVhZCwgbWF0KSxcclxuXHRcdENvbGxpZGVyXHJcblx0KVxyXG5cclxuXHRXb3JsZC5lbnRpdGllcy5jcmVhdGUoXHJcblx0XHRuZXcgVHJhbnNmb3JtKHtwb3NpdGlvbjogVmVjdG9yMy5iYWNrLCBzY2FsZTogdmVjMyhQb25nLndpZHRoICogMC41MjUsIFBvbmcuaGVpZ2h0ICogMC41NCwgMSl9KSxcclxuXHRcdG5ldyBNb2RlbChNZXNoLlByaW1pdGl2ZXMucXVhZCwgbmV3IE1hdGVyaWFsKHNoYWRlcikuc2V0VmFsdWUoXCJjb2xvclwiLCBbMSwgMSwgMV0pKSxcclxuXHRcdFdhbGxcclxuXHQpXHJcblxyXG5cdFdvcmxkLmVudGl0aWVzLmNyZWF0ZShcclxuXHRcdG5ldyBUcmFuc2Zvcm0oe3Bvc2l0aW9uOiBWZWN0b3IzLmJhY2ssIHNjYWxlOiB2ZWMzKFBvbmcud2lkdGggKiAwLjUsIFBvbmcuaGVpZ2h0ICogMC41LCAxKX0pLFxyXG5cdFx0bmV3IE1vZGVsKE1lc2guUHJpbWl0aXZlcy5xdWFkLCBuZXcgTWF0ZXJpYWwoc2hhZGVyKS5zZXRWYWx1ZShcImNvbG9yXCIsIFswLCAwLCAwXSkpXHJcblx0KVxyXG5cclxuXHRzd2l0Y2gobW9kZSkge1xyXG5cdFx0Y2FzZSBcInNwXCI6XHJcblx0XHRcdGxlZnRCb2FyZC5hZGQoQ29udHJvbGxhYmxlKVxyXG5cdFx0XHRyaWdodEJvYXJkLmFkZChuZXcgQ3B1Q29udHJvbGxlcigwLjIpKVxyXG5cdFx0XHRicmVha1xyXG5cdFx0Y2FzZSBcImhvc3RcIjpcclxuXHRcdFx0V29ybGQuc3lzdGVtcy5yZW1vdmUoQ3B1U3lzdGVtKVxyXG5cclxuXHRcdFx0bGVmdEJvYXJkLmFkZChPd25lcnNoaXAsIENvbnRyb2xsYWJsZSlcclxuXHRcdFx0YmFsbC5hZGQoT3duZXJzaGlwKVxyXG5cdFx0XHRicmVha1xyXG5cdFx0ZGVmYXVsdDpcclxuXHRcdFx0V29ybGQuc3lzdGVtcy5yZW1vdmUoXHJcblx0XHRcdFx0TW90aW9uU3lzdGVtLFxyXG5cdFx0XHRcdEJhbGxTeXN0ZW0sXHJcblx0XHRcdFx0Q3B1U3lzdGVtXHJcblx0XHRcdClcclxuXHJcblx0XHRcdHJpZ2h0Qm9hcmQuYWRkKE93bmVyc2hpcCwgQ29udHJvbGxhYmxlKVxyXG5cdFx0XHRicmVha1xyXG5cdH1cclxuXHJcblx0Y29uc29sZS5sb2coWy4uLldvcmxkLnN5c3RlbXNdKVxyXG5cclxuXHRXb3JsZC5zeXN0ZW1zLnJlbW92ZShHcmF2aXR5U3lzdGVtKVxyXG5cdFdvcmxkLnN5c3RlbXMuZ2V0KFJlbmRlclN5c3RlbSkuZml0KClcclxuXHRQb25nLnJlc2V0Um91bmQoKVxyXG59XHJcblxyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NwXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBwbGF5KFwic3BcIikpXHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaG9zdFwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gcGxheShcImhvc3RcIikpXHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjam9pblwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gcGxheShcImd1ZXN0XCIpKVxyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxJbnB1dEVsZW1lbnQ+KFwiI2NvZGUgPiBpbnB1dFwiKS5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBlID0+IHtcclxuXHRzd2l0Y2goZS5rZXlDb2RlKSB7XHJcblx0XHRjYXNlIDEzOlxyXG5cdFx0XHRwbGF5KFwiZ3Vlc3RcIilcclxuXHRcdFx0YnJlYWtcclxuXHR9XHJcbn0pXHJcblxyXG5mdW5jdGlvbiBoYXNQYXJhbWV0ZXIobmFtZTogc3RyaW5nKSB7XHJcblx0cmV0dXJuIGxvY2F0aW9uLmhhc2guc2xpY2UoMSkuc3BsaXQoJywnKS5pbmRleE9mKG5hbWUpICE9IC0xXHJcbn1cclxuXHJcbmlmKGhhc1BhcmFtZXRlcihcInNpbmdsZXBsYXllclwiKSlcclxuXHRwbGF5KFwic3BcIilcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvbmcge1xyXG5cdHB1YmxpYyBzdGF0aWMgcmVzZXRSb3VuZCgpOiB2b2lkIHtcclxuXHRcdFdvcmxkLmVudGl0aWVzLmZvckVhY2goKGJhbGwsIG1vdGlvbiwgdHJhbnNmb3JtKSA9PiB7XHJcblx0XHRcdGxldCBzcGVlZCA9IDAuMlxyXG5cdFx0XHRsZXQgYW5nbGUgPSBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAxNSkgKiBNYXRoLlBJIC8gN1xyXG5cdFx0XHRtb3Rpb24udmVsb2NpdHkgPSBuZXcgVmVjdG9yMyhNYXRoLmNvcyhhbmdsZSksIE1hdGguc2luKGFuZ2xlKSkubXVsKDAuMilcclxuXHRcdFx0dHJhbnNmb3JtLnBvc2l0aW9uID0gbmV3IFZlY3RvcjMoMCwgKE1hdGgucmFuZG9tKCkgLSAwLjUpICogUG9uZy5oZWlnaHQpXHJcblxyXG5cdFx0XHRpZihoYXNQYXJhbWV0ZXIoXCJkZXRlcm1pbmlzdGljXCIpKSB7XHJcblx0XHRcdFx0bW90aW9uLnZlbG9jaXR5ID0gbmV3IFZlY3RvcjMoLXNwZWVkKVxyXG5cdFx0XHRcdHRyYW5zZm9ybS5wb3NpdGlvbiA9IFZlY3RvcjMuemVyb1xyXG5cdFx0XHR9XHJcblx0XHR9LCBCYWxsLCBNb3Rpb24sIFRyYW5zZm9ybSlcclxuXHJcblx0XHRTaW11bGF0b3IucmVzdW1lKClcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzdGF0aWMgZ2V0IHdpZHRoKCkge1xyXG5cdFx0cmV0dXJuIDEyXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc3RhdGljIGdldCBoZWlnaHQoKSB7XHJcblx0XHRyZXR1cm4gOFxyXG5cdH1cclxufVxyXG5cclxuQFdvcmxkLnJlZ2lzdGVyLnN5c3RlbShTaW11bGF0b3IucGhhc2UoU2ltdWxhdG9yLkNhdGVnb3J5LlVJLCB7YWZ0ZXI6IFtUZXh0U3lzdGVtXX0pKVxyXG5jbGFzcyBEZWJ1Z1N5c3RlbSBleHRlbmRzIFN5c3RlbSB7XHJcblx0cHVibGljIHVwZGF0ZShlbnRpdGllczogRW50aXRpZXMpOiB2b2lkIHtcclxuXHRcdGxldCB0ZXh0U3lzdGVtID0gV29ybGQuc3lzdGVtcy5nZXQoVGV4dFN5c3RlbSlcclxuXHJcblx0XHRlbnRpdGllcy5mb3JFYWNoKCh0cmFuc2Zvcm0sIG5hbWUpID0+IHtcclxuXHRcdFx0dGV4dFN5c3RlbS50ZXh0KHRyYW5zZm9ybS5wb3NpdGlvbiwgYCR7bmFtZX1gLCB7Y29sb3I6IFwiZGltZ3JheVwifSlcclxuXHRcdH0sIFRyYW5zZm9ybSwgTmFtZSlcclxuXHR9XHJcbn0iXX0=