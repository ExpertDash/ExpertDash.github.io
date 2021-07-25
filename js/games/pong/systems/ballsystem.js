var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Collider, Model, Motion, Transform } from "../../../common/lib.js";
import World, { Simulator } from "../../../common/world.js";
import Vector3, { vec3 } from "../../../math/vec3.js";
import { Ball, Wall } from "../components/lib.js";
import Pong from "../pong.js";
let BallSystem = class BallSystem {
    update(entities) {
        let walls = [...entities.with(Wall, Model)];
        if (walls.length == 0)
            return;
        let [wall] = walls;
        entities.forEach((ball, transform, motion, collider) => {
            let speed = motion.velocity.magnitude;
            let bb = collider.boundingBox;
            let maxWidth = Pong.width / 2 - (bb.max.x - bb.min.x) / 2;
            let maxHeight = Pong.height / 2 - (bb.max.y - bb.min.y) / 2;
            if (collider.collided) {
                let [collision] = collider.collisions;
                entities.from(collision.entityId).run(t => {
                    let r = Vector3.angle(t.position, transform.position) * Math.PI / 180;
                    // console.log(r * 180 / Math.PI)
                    motion.velocity = vec3(Math.cos(r), Math.sin(r)).mul(speed);
                }, Transform);
            }
            if (Math.abs(transform.position.y) > maxHeight) {
                motion.velocity = vec3(motion.velocity.x, (transform.position.y < 0 ? 1 : -1) * speed);
                if (wall) {
                    let model = wall.get(Model);
                    let [, , b] = model.material.getValue("color");
                    model.material.setValue("color", [0.5, 0.5, b]);
                }
            }
            else {
                if (wall) {
                    let model = wall.get(Model);
                    let [r, g, b] = model.material.getValue("color");
                    let incr = 3 * Simulator.deltaTime;
                    model.material.setValue("color", [
                        Math.min(1, r + incr),
                        Math.min(1, g + incr),
                        b
                    ]);
                }
            }
            if (Math.abs(transform.position.x) > maxWidth)
                Pong.resetRound();
        }, Ball, Transform, Motion, Collider);
    }
};
BallSystem = __decorate([
    World.register.system({ after: [Simulator.Category.Physics] })
], BallSystem);
export default BallSystem;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFsbHN5c3RlbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9nYW1lcy9wb25nL3N5c3RlbXMvYmFsbHN5c3RlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFDLE1BQU0sd0JBQXdCLENBQUE7QUFDekUsT0FBTyxLQUFLLEVBQUUsRUFBQyxTQUFTLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQTtBQUV6RCxPQUFPLE9BQU8sRUFBRSxFQUFDLElBQUksRUFBQyxNQUFNLHVCQUF1QixDQUFBO0FBQ25ELE9BQU8sRUFBQyxJQUFJLEVBQUUsSUFBSSxFQUFDLE1BQU0sc0JBQXNCLENBQUE7QUFDL0MsT0FBTyxJQUFJLE1BQU0sWUFBWSxDQUFBO0FBRzdCLElBQXFCLFVBQVUsR0FBL0IsTUFBcUIsVUFBVTtJQUN2QixNQUFNLENBQUMsUUFBa0I7UUFDL0IsSUFBSSxLQUFLLEdBQUcsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUE7UUFFM0MsSUFBRyxLQUFLLENBQUMsTUFBTSxJQUFJLENBQUM7WUFDbkIsT0FBTTtRQUVQLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUE7UUFFbEIsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFO1lBQ3RELElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFBO1lBQ3JDLElBQUksRUFBRSxHQUFHLFFBQVEsQ0FBQyxXQUFXLENBQUE7WUFDN0IsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxD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QUMsTUFBTSxDQUFDLEVBQUMsS0FBSyxFQUFFLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBQyxDQUFDO0dBQ3hDLFVBQVUsQ0F1RDlCO2VBdkRvQixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb2xsaWRlciwgTW9kZWwsIE1vdGlvbiwgVHJhbnNmb3JtfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL2xpYi5qc1wiXHJcbmltcG9ydCBXb3JsZCwge1NpbXVsYXRvcn0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi93b3JsZC5qc1wiXHJcbmltcG9ydCB7RW50aXRpZXN9IGZyb20gXCIuLi8uLi8uLi9lY3MuanNcIlxyXG5pbXBvcnQgVmVjdG9yMywge3ZlYzN9IGZyb20gXCIuLi8uLi8uLi9tYXRoL3ZlYzMuanNcIlxyXG5pbXBvcnQge0JhbGwsIFdhbGx9IGZyb20gXCIuLi9jb21wb25lbnRzL2xpYi5qc1wiXHJcbmltcG9ydCBQb25nIGZyb20gXCIuLi9wb25nLmpzXCJcclxuXHJcbkBXb3JsZC5yZWdpc3Rlci5zeXN0ZW0oe2FmdGVyOiBbU2ltdWxhdG9yLkNhdGVnb3J5LlBoeXNpY3NdfSlcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFsbFN5c3RlbSB7XHJcblx0cHVibGljIHVwZGF0ZShlbnRpdGllczogRW50aXRpZXMpOiB2b2lkIHtcclxuXHRcdGxldCB3YWxscyA9IFsuLi5lbnRpdGllcy53aXRoKFdhbGwsIE1vZGVsKV1cclxuXHJcblx0XHRpZih3YWxscy5sZW5ndGggPT0gMClcclxuXHRcdFx0cmV0dXJuXHJcblxyXG5cdFx0bGV0IFt3YWxsXSA9IHdhbGxzXHJcblxyXG5cdFx0ZW50aXRpZXMuZm9yRWFjaCgoYmFsbCwgdHJhbnNmb3JtLCBtb3Rpb24sIGNvbGxpZGVyKSA9PiB7XHJcblx0XHRcdGxldCBzcGVlZCA9IG1vdGlvbi52ZWxvY2l0eS5tYWduaXR1ZGVcclxuXHRcdFx0bGV0IGJiID0gY29sbGlkZXIuYm91bmRpbmdCb3hcclxuXHRcdFx0bGV0IG1heFdpZHRoID0gUG9uZy53aWR0aCAvIDIgLSAoYmIubWF4LnggLSBiYi5taW4ueCkgLyAyXHJcblx0XHRcdGxldCBtYXhIZWlnaHQgPSBQb25nLmhlaWdodCAvIDIgLSAoYmIubWF4LnkgLSBiYi5taW4ueSkgLyAyXHJcblxyXG5cdFx0XHRpZihjb2xsaWRlci5jb2xsaWRlZCkge1xyXG5cdFx0XHRcdGxldCBbY29sbGlzaW9uXSA9IGNvbGxpZGVyLmNvbGxpc2lvbnNcclxuXHJcblx0XHRcdFx0ZW50aXRpZXMuZnJvbShjb2xsaXNpb24uZW50aXR5SWQpLnJ1bih0ID0+IHtcclxuXHRcdFx0XHRcdGxldCByID0gVmVjdG9yMy5hbmdsZSh0LnBvc2l0aW9uLCB0cmFuc2Zvcm0ucG9zaXRpb24pICogTWF0aC5QSSAvIDE4MFxyXG5cdFx0XHRcdFx0Ly8gY29uc29sZS5sb2cociAqIDE4MCAvIE1hdGguUEkpXHJcblx0XHRcdFx0XHRtb3Rpb24udmVsb2NpdHkgPSB2ZWMzKE1hdGguY29zKHIpLCBNYXRoLnNpbihyKSkubXVsKHNwZWVkKVxyXG5cdFx0XHRcdH0sIFRyYW5zZm9ybSlcclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdFx0aWYoTWF0aC5hYnModHJhbnNmb3JtLnBvc2l0aW9uLnkpID4gbWF4SGVpZ2h0KSB7XHJcblx0XHRcdFx0bW90aW9uLnZlbG9jaXR5ID0gdmVjMyhcclxuXHRcdFx0XHRcdG1vdGlvbi52ZWxvY2l0eS54LFxyXG5cdFx0XHRcdFx0KHRyYW5zZm9ybS5wb3NpdGlvbi55IDwgMCA/IDEgOiAtMSkgKiBzcGVlZFxyXG5cdFx0XHRcdClcclxuXHJcblx0XHRcdFx0aWYod2FsbCkge1xyXG5cdFx0XHRcdFx0bGV0IG1vZGVsID0gd2FsbC5nZXQoTW9kZWwpXHJcblx0XHRcdFx0XHRsZXQgWywsIGJdID0gbW9kZWwubWF0ZXJpYWwuZ2V0VmFsdWU8W251bWJlciwgbnVtYmVyLCBudW1iZXJdPihcImNvbG9yXCIpXHJcblx0XHRcdFx0XHRtb2RlbC5tYXRlcmlhbC5zZXRWYWx1ZShcImNvbG9yXCIsIFswLjUsIDAuNSwgYl0pXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGlmKHdhbGwpIHtcclxuXHRcdFx0XHRcdGxldCBtb2RlbCA9IHdhbGwuZ2V0KE1vZGVsKVxyXG5cdFx0XHRcdFx0bGV0IFtyLCBnLCBiXSA9IG1vZGVsLm1hdGVyaWFsLmdldFZhbHVlKFwiY29sb3JcIilcclxuXHJcblx0XHRcdFx0XHRsZXQgaW5jciA9IDMgKiBTaW11bGF0b3IuZGVsdGFUaW1lXHJcblxyXG5cdFx0XHRcdFx0bW9kZWwubWF0ZXJpYWwuc2V0VmFsdWUoXCJjb2xvclwiLCBbXHJcblx0XHRcdFx0XHRcdE1hdGgubWluKDEsIHIgKyBpbmNyKSxcclxuXHRcdFx0XHRcdFx0TWF0aC5taW4oMSwgZyArIGluY3IpLFxyXG5cdFx0XHRcdFx0XHRiXHJcblx0XHRcdFx0XHRdKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYoTWF0aC5hYnModHJhbnNmb3JtLnBvc2l0aW9uLngpID4gbWF4V2lkdGgpXHJcblx0XHRcdFx0UG9uZy5yZXNldFJvdW5kKClcclxuXHRcdH0sIEJhbGwsIFRyYW5zZm9ybSwgTW90aW9uLCBDb2xsaWRlcilcclxuXHR9XHJcbn0iXX0=