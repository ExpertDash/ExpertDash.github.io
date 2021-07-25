var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Collider, Model, Motion, MotionSystem, Name, RenderSystem, TextSystem, Transform } from "../../common/lib.js";
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
    let ball = World.entities.create(new Name("Ball"), new Transform({ scale: vec3(0.2, 0.2, 1) }), new Model(Mesh.Primitives.quad, mat), Collider, Ball);
    let leftBoard = World.entities.create(new Name("Right Board"), new Transform({ position: vec3(-Pong.width * 0.425, 0), scale: vec3(0.2, 1, 1) }), new Model(Mesh.Primitives.quad, mat), Collider);
    let rightBoard = World.entities.create(new Name("Right Board"), new Transform({ position: vec3(Pong.width * 0.425, 0), scale: vec3(0.2, 1, 1) }), new Model(Mesh.Primitives.quad, mat), Collider);
    World.entities.create(new Transform({ position: Vector3.back, scale: vec3(Pong.width * 0.525, Pong.height * 0.54, 1) }), new Model(Mesh.Primitives.quad, new Material(shader).setValue("color", [1, 1, 1])), Wall);
    World.entities.create(new Transform({ position: Vector3.back, scale: vec3(Pong.width * 0.5, Pong.height * 0.5, 1) }), new Model(Mesh.Primitives.quad, new Material(shader).setValue("color", [0, 0, 0])));
    switch (mode) {
        case "sp":
            leftBoard.add(Controllable);
            rightBoard.add(new CpuController(0.1));
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
        Simulator.suspend();
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
    World.register.system({ after: [Simulator.Category.UI, TextSystem] })
], DebugSystem);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9uZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9nYW1lcy9wb25nL3BvbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQTtBQUNwSCxPQUFPLEVBQUMsSUFBSSxFQUFFLFlBQVksRUFBRSxhQUFhLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBQyxNQUFNLHFCQUFxQixDQUFBO0FBQ3RGLE9BQU8sRUFBQyxVQUFVLEVBQUUsU0FBUyxFQUFDLE1BQU0sa0JBQWtCLENBQUE7QUFDdEQsT0FBTyxLQUFLLEVBQUUsRUFBQyxTQUFTLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQTtBQUN0RCxPQUFPLEVBQVcsTUFBTSxFQUFDLE1BQU0sY0FBYyxDQUFBO0FBQzdDLE9BQU8sT0FBTyxFQUFFLEVBQUMsSUFBSSxFQUFDLE1BQU0sb0JBQW9CLENBQUE7QUFDaEQsT0FBTyxRQUFRLE1BQU0sNkJBQTZCLENBQUE7QUFDbEQsT0FBTyxJQUFJLE1BQU0seUJBQXlCLENBQUE7QUFDMUMsT0FBTyxNQUFNLE1BQU0sMkJBQTJCLENBQUE7QUFJOUMsS0FBSyxVQUFVLElBQUksQ0FBQyxJQUFVO0lBQzdCLFFBQVEsQ0FBQyxhQUFhLENBQWMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUE7SUFDbkUsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQTtJQUV4RCxJQUFJLFlBQVksR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQTtJQUNsRCxZQUFZLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQTtJQUV6QixJQUFJLE1BQU0sR0FBRyxNQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMsK0JBQStCLENBQUMsQ0FBQTtJQUMvRCxJQUFJLEdBQUcsR0FBRyxJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBRTNELElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUMvQixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsRUFDaEIsSUFBSSxTQUFTLENBQUMsRUFBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUN6QyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsRUFDcEMsUUFBUSxFQUNSLElBQUksQ0FDSixDQUFBO0lBRUQsSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQ3BDLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUN2QixJQUFJLFNBQVMsQ0FBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUMvRSxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsRUFDcEMsUUFBUSxDQUNSLENBQUE7SUFFRCxJQUFJLFVBQVUsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FDckMsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQ3ZCLElBQUksU0FBUyxDQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUM5RSxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsRUFDcEMsUUFBUSxDQUNSLENBQUE7SUFFRCxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FDcEIsSUFBSSxTQUFTLENBQUMsRUFBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFDL0YsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNsRixJQUFJLENBQ0osQ0FBQTtJQUVELEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUNwQixJQUFJLFNBQVMsQ0FBQyxFQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLEVBQUUsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUM1RixJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQ2xGLENBQUE7SUFFRCxRQUFPLElBQUksRUFBRTtRQUNaLEtBQUssSUFBSTtZQUNSLFNBQVMsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUE7WUFDM0IsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO1lBQ3RDLE1BQUs7UUFDTixLQUFLLE1BQU07WUFDVixLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQTtZQUUvQixTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxZQUFZLENBQUMsQ0FBQTtZQUN0QyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFBO1lBQ25CLE1BQUs7UUFDTjtZQUNDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUNuQixZQUFZLEVBQ1osVUFBVSxFQUNWLFNBQVMsQ0FDVCxDQUFBO1lBRUQsVUFBVSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDLENBQUE7WUFDdkMsTUFBSztLQUNOO0lBRUQsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFBO0FBQ2xCLENBQUM7QUFFRCxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtBQUN6RSxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQTtBQUM3RSxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQTtBQUM5RSxRQUFRLENBQUMsYUFBYSxDQUFtQixlQUFlLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLEVBQUU7SUFDekYsUUFBTyxDQUFDLENBQUMsT0FBTyxFQUFFO1FBQ2pCLEtBQUssRUFBRTtZQUNOLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtZQUNiLE1BQUs7S0FDTjtBQUNGLENBQUMsQ0FBQyxDQUFBO0FBRUYsU0FBUyxZQUFZLENBQUMsSUFBWTtJQUNqQyxPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7QUFDN0QsQ0FBQztBQUVELElBQUcsWUFBWSxDQUFDLGNBQWMsQ0FBQztJQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7QUFFWCxNQUFNLENBQUMsT0FBTyxPQUFPLElBQUk7SUFDakIsTUFBTSxDQUFDLFVBQVU7UUFDdkIsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFO1lBQ2xELElBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQTtZQUNmLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFBO1lBQ3hELE1BQU0sQ0FBQyxRQUFRLEdBQUcsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQ3hFLFNBQVMsQ0FBQyxRQUFRLEdBQUcsSUFBSSxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUV4RSxJQUFHLFlBQVksQ0FBQyxlQUFlLENBQUMsRUFBRTtnQkFDakMsTUFBTSxDQUFDLFFBQVEsR0FBRyxJQUFJLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFBO2dCQUNyQyxTQUFTLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUE7YUFDakM7UUFDRixDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQTtRQUUzQixTQUFTLENBQUMsT0FBTyxFQUFFLENBQUE7UUFDbkIsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFBO0lBQ25CLENBQUM7SUFFTSxNQUFNLEtBQUssS0FBSztRQUN0QixPQUFPLEVBQUUsQ0FBQTtJQUNWLENBQUM7SUFFTSxNQUFNLEtBQUssTUFBTTtRQUN2QixPQUFPLENBQUMsQ0FBQTtJQUNULENBQUM7Q0FDRDtBQUdELElBQU0sV0FBVyxHQUFqQixNQUFNLFdBQVksU0FBUSxNQUFNO0lBQ3hCLE1BQU0sQ0FBQyxRQUFrQjtRQUMvQixJQUFJLFVBQVUsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUU5QyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxFQUFFO1lBQ3BDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxHQUFHLElBQUksRUFBRSxFQUFFLEVBQUMsS0FBSyxFQUFFLFNBQVMsRUFBQyxDQUFDLENBQUE7UUFDbkUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUNwQixDQUFDO0NBQ0QsQ0FBQTtBQVJLLFdBQVc7SUFEaEIsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBQyxLQUFLLEVBQUUsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxVQUFVLENBQUMsRUFBQyxDQUFDO0dBQzlELFdBQVcsQ0FRaEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbGxpZGVyLCBNb2RlbCwgTW90aW9uLCBNb3Rpb25TeXN0ZW0sIE5hbWUsIFJlbmRlclN5c3RlbSwgVGV4dFN5c3RlbSwgVHJhbnNmb3JtfSBmcm9tIFwiLi4vLi4vY29tbW9uL2xpYi5qc1wiXHJcbmltcG9ydCB7QmFsbCwgQ29udHJvbGxhYmxlLCBDcHVDb250cm9sbGVyLCBPd25lcnNoaXAsIFdhbGx9IGZyb20gXCIuL2NvbXBvbmVudHMvbGliLmpzXCJcclxuaW1wb3J0IHtCYWxsU3lzdGVtLCBDcHVTeXN0ZW19IGZyb20gXCIuL3N5c3RlbXMvbGliLmpzXCJcclxuaW1wb3J0IFdvcmxkLCB7U2ltdWxhdG9yfSBmcm9tIFwiLi4vLi4vY29tbW9uL3dvcmxkLmpzXCJcclxuaW1wb3J0IHtFbnRpdGllcywgU3lzdGVtfSBmcm9tIFwiLi4vLi4vZWNzLmpzXCJcclxuaW1wb3J0IFZlY3RvcjMsIHt2ZWMzfSBmcm9tIFwiLi4vLi4vbWF0aC92ZWMzLmpzXCJcclxuaW1wb3J0IE1hdGVyaWFsIGZyb20gXCIuLi8uLi9yZW5kZXJpbmcvbWF0ZXJpYWwuanNcIlxyXG5pbXBvcnQgTWVzaCBmcm9tIFwiLi4vLi4vcmVuZGVyaW5nL21lc2guanNcIlxyXG5pbXBvcnQgU2hhZGVyIGZyb20gXCIuLi8uLi9yZW5kZXJpbmcvc2hhZGVyLmpzXCJcclxuXHJcbnR5cGUgTW9kZSA9IFwic3BcIiB8IFwiaG9zdFwiIHwgXCJndWVzdFwiXHJcblxyXG5hc3luYyBmdW5jdGlvbiBwbGF5KG1vZGU6IE1vZGUpOiBQcm9taXNlPHZvaWQ+IHtcclxuXHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50PihcIiNtZW51XCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIlxyXG5cdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJjYW52YXNcIikuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIlxyXG5cclxuXHRsZXQgcmVuZGVyU3lzdGVtID0gV29ybGQuc3lzdGVtcy5nZXQoUmVuZGVyU3lzdGVtKVxyXG5cdHJlbmRlclN5c3RlbS5zaXplID0gMC4wMTVcclxuXHJcblx0bGV0IHNoYWRlciA9IGF3YWl0IFNoYWRlci5sb2FkKFwiLi9yZXNvdXJjZXMvc2hhZGVycy9mbGF0Lmdsc2xcIilcclxuXHRsZXQgbWF0ID0gbmV3IE1hdGVyaWFsKHNoYWRlcikuc2V0VmFsdWUoXCJjb2xvclwiLCBbMSwgMSwgMV0pXHJcblxyXG5cdGxldCBiYWxsID0gV29ybGQuZW50aXRpZXMuY3JlYXRlKFxyXG5cdFx0bmV3IE5hbWUoXCJCYWxsXCIpLFxyXG5cdFx0bmV3IFRyYW5zZm9ybSh7c2NhbGU6IHZlYzMoMC4yLCAwLjIsIDEpfSksXHJcblx0XHRuZXcgTW9kZWwoTWVzaC5QcmltaXRpdmVzLnF1YWQsIG1hdCksXHJcblx0XHRDb2xsaWRlcixcclxuXHRcdEJhbGxcclxuXHQpXHJcblxyXG5cdGxldCBsZWZ0Qm9hcmQgPSBXb3JsZC5lbnRpdGllcy5jcmVhdGUoXHJcblx0XHRuZXcgTmFtZShcIlJpZ2h0IEJvYXJkXCIpLFxyXG5cdFx0bmV3IFRyYW5zZm9ybSh7cG9zaXRpb246IHZlYzMoLVBvbmcud2lkdGggKiAwLjQyNSwgMCksIHNjYWxlOiB2ZWMzKDAuMiwgMSwgMSl9KSxcclxuXHRcdG5ldyBNb2RlbChNZXNoLlByaW1pdGl2ZXMucXVhZCwgbWF0KSxcclxuXHRcdENvbGxpZGVyXHJcblx0KVxyXG5cclxuXHRsZXQgcmlnaHRCb2FyZCA9IFdvcmxkLmVudGl0aWVzLmNyZWF0ZShcclxuXHRcdG5ldyBOYW1lKFwiUmlnaHQgQm9hcmRcIiksXHJcblx0XHRuZXcgVHJhbnNmb3JtKHtwb3NpdGlvbjogdmVjMyhQb25nLndpZHRoICogMC40MjUsIDApLCBzY2FsZTogdmVjMygwLjIsIDEsIDEpfSksXHJcblx0XHRuZXcgTW9kZWwoTWVzaC5QcmltaXRpdmVzLnF1YWQsIG1hdCksXHJcblx0XHRDb2xsaWRlclxyXG5cdClcclxuXHJcblx0V29ybGQuZW50aXRpZXMuY3JlYXRlKFxyXG5cdFx0bmV3IFRyYW5zZm9ybSh7cG9zaXRpb246IFZlY3RvcjMuYmFjaywgc2NhbGU6IHZlYzMoUG9uZy53aWR0aCAqIDAuNTI1LCBQb25nLmhlaWdodCAqIDAuNTQsIDEpfSksXHJcblx0XHRuZXcgTW9kZWwoTWVzaC5QcmltaXRpdmVzLnF1YWQsIG5ldyBNYXRlcmlhbChzaGFkZXIpLnNldFZhbHVlKFwiY29sb3JcIiwgWzEsIDEsIDFdKSksXHJcblx0XHRXYWxsXHJcblx0KVxyXG5cclxuXHRXb3JsZC5lbnRpdGllcy5jcmVhdGUoXHJcblx0XHRuZXcgVHJhbnNmb3JtKHtwb3NpdGlvbjogVmVjdG9yMy5iYWNrLCBzY2FsZTogdmVjMyhQb25nLndpZHRoICogMC41LCBQb25nLmhlaWdodCAqIDAuNSwgMSl9KSxcclxuXHRcdG5ldyBNb2RlbChNZXNoLlByaW1pdGl2ZXMucXVhZCwgbmV3IE1hdGVyaWFsKHNoYWRlcikuc2V0VmFsdWUoXCJjb2xvclwiLCBbMCwgMCwgMF0pKVxyXG5cdClcclxuXHJcblx0c3dpdGNoKG1vZGUpIHtcclxuXHRcdGNhc2UgXCJzcFwiOlxyXG5cdFx0XHRsZWZ0Qm9hcmQuYWRkKENvbnRyb2xsYWJsZSlcclxuXHRcdFx0cmlnaHRCb2FyZC5hZGQobmV3IENwdUNvbnRyb2xsZXIoMC4xKSlcclxuXHRcdFx0YnJlYWtcclxuXHRcdGNhc2UgXCJob3N0XCI6XHJcblx0XHRcdFdvcmxkLnN5c3RlbXMucmVtb3ZlKENwdVN5c3RlbSlcclxuXHJcblx0XHRcdGxlZnRCb2FyZC5hZGQoT3duZXJzaGlwLCBDb250cm9sbGFibGUpXHJcblx0XHRcdGJhbGwuYWRkKE93bmVyc2hpcClcclxuXHRcdFx0YnJlYWtcclxuXHRcdGRlZmF1bHQ6XHJcblx0XHRcdFdvcmxkLnN5c3RlbXMucmVtb3ZlKFxyXG5cdFx0XHRcdE1vdGlvblN5c3RlbSxcclxuXHRcdFx0XHRCYWxsU3lzdGVtLFxyXG5cdFx0XHRcdENwdVN5c3RlbVxyXG5cdFx0XHQpXHJcblxyXG5cdFx0XHRyaWdodEJvYXJkLmFkZChPd25lcnNoaXAsIENvbnRyb2xsYWJsZSlcclxuXHRcdFx0YnJlYWtcclxuXHR9XHJcblxyXG5cdFBvbmcucmVzZXRSb3VuZCgpXHJcbn1cclxuXHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc3BcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHBsYXkoXCJzcFwiKSlcclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNob3N0XCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBwbGF5KFwiaG9zdFwiKSlcclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNqb2luXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBwbGF5KFwiZ3Vlc3RcIikpXHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTElucHV0RWxlbWVudD4oXCIjY29kZSA+IGlucHV0XCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGUgPT4ge1xyXG5cdHN3aXRjaChlLmtleUNvZGUpIHtcclxuXHRcdGNhc2UgMTM6XHJcblx0XHRcdHBsYXkoXCJndWVzdFwiKVxyXG5cdFx0XHRicmVha1xyXG5cdH1cclxufSlcclxuXHJcbmZ1bmN0aW9uIGhhc1BhcmFtZXRlcihuYW1lOiBzdHJpbmcpIHtcclxuXHRyZXR1cm4gbG9jYXRpb24uaGFzaC5zbGljZSgxKS5zcGxpdCgnLCcpLmluZGV4T2YobmFtZSkgIT0gLTFcclxufVxyXG5cclxuaWYoaGFzUGFyYW1ldGVyKFwic2luZ2xlcGxheWVyXCIpKVxyXG5cdHBsYXkoXCJzcFwiKVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9uZyB7XHJcblx0cHVibGljIHN0YXRpYyByZXNldFJvdW5kKCk6IHZvaWQge1xyXG5cdFx0V29ybGQuZW50aXRpZXMuZm9yRWFjaCgoYmFsbCwgbW90aW9uLCB0cmFuc2Zvcm0pID0+IHtcclxuXHRcdFx0bGV0IHNwZWVkID0gMC4yXHJcblx0XHRcdGxldCBhbmdsZSA9IE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDE1KSAqIE1hdGguUEkgLyA3XHJcblx0XHRcdG1vdGlvbi52ZWxvY2l0eSA9IG5ldyBWZWN0b3IzKE1hdGguY29zKGFuZ2xlKSwgTWF0aC5zaW4oYW5nbGUpKS5tdWwoMC4yKVxyXG5cdFx0XHR0cmFuc2Zvcm0ucG9zaXRpb24gPSBuZXcgVmVjdG9yMygwLCAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiBQb25nLmhlaWdodClcclxuXHJcblx0XHRcdGlmKGhhc1BhcmFtZXRlcihcImRldGVybWluaXN0aWNcIikpIHtcclxuXHRcdFx0XHRtb3Rpb24udmVsb2NpdHkgPSBuZXcgVmVjdG9yMygtc3BlZWQpXHJcblx0XHRcdFx0dHJhbnNmb3JtLnBvc2l0aW9uID0gVmVjdG9yMy56ZXJvXHJcblx0XHRcdH1cclxuXHRcdH0sIEJhbGwsIE1vdGlvbiwgVHJhbnNmb3JtKVxyXG5cclxuXHRcdFNpbXVsYXRvci5zdXNwZW5kKClcclxuXHRcdFNpbXVsYXRvci5yZXN1bWUoKVxyXG5cdH1cclxuXHJcblx0cHVibGljIHN0YXRpYyBnZXQgd2lkdGgoKSB7XHJcblx0XHRyZXR1cm4gMTJcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzdGF0aWMgZ2V0IGhlaWdodCgpIHtcclxuXHRcdHJldHVybiA4XHJcblx0fVxyXG59XHJcblxyXG5AV29ybGQucmVnaXN0ZXIuc3lzdGVtKHthZnRlcjogW1NpbXVsYXRvci5DYXRlZ29yeS5VSSwgVGV4dFN5c3RlbV19KVxyXG5jbGFzcyBEZWJ1Z1N5c3RlbSBleHRlbmRzIFN5c3RlbSB7XHJcblx0cHVibGljIHVwZGF0ZShlbnRpdGllczogRW50aXRpZXMpOiB2b2lkIHtcclxuXHRcdGxldCB0ZXh0U3lzdGVtID0gV29ybGQuc3lzdGVtcy5nZXQoVGV4dFN5c3RlbSlcclxuXHJcblx0XHRlbnRpdGllcy5mb3JFYWNoKCh0cmFuc2Zvcm0sIG5hbWUpID0+IHtcclxuXHRcdFx0dGV4dFN5c3RlbS50ZXh0KHRyYW5zZm9ybS5wb3NpdGlvbiwgYCR7bmFtZX1gLCB7Y29sb3I6IFwiZGltZ3JheVwifSlcclxuXHRcdH0sIFRyYW5zZm9ybSwgTmFtZSlcclxuXHR9XHJcbn0iXX0=