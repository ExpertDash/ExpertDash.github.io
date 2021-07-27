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
import Pong from "../main.js";
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
    World.register.system(Simulator.phase(Simulator.Category.Physics))
], BallSystem);
export default BallSystem;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFsbHN5c3RlbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9nYW1lcy9wb25nL3N5c3RlbXMvYmFsbHN5c3RlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFDLE1BQU0sd0JBQXdCLENBQUE7QUFDekUsT0FBTyxLQUFLLEVBQUUsRUFBQyxTQUFTLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQTtBQUV6RCxPQUFPLE9BQU8sRUFBRSxFQUFDLElBQUksRUFBQyxNQUFNLHVCQUF1QixDQUFBO0FBQ25ELE9BQU8sRUFBQyxJQUFJLEVBQUUsSUFBSSxFQUFDLE1BQU0sc0JBQXNCLENBQUE7QUFDL0MsT0FBTyxJQUFJLE1BQU0sWUFBWSxDQUFBO0FBRzdCLElBQXFCLFVBQVUsR0FBL0IsTUFBcUIsVUFBVTtJQUN2QixNQUFNLENBQUMsUUFBa0I7UUFDL0IsSUFBSSxLQUFLLEdBQUcsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUE7UUFFM0MsSUFBRyxLQUFLLENBQUMsTUFBTSxJQUFJLENBQUM7WUFDbkIsT0FBTTtRQUVQLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUE7UUFFbEIsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFO1lBQ3RELElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFBO1lBQ3JDLElBQUksRUFBRSxHQUFHLFFBQVEsQ0FBQyxXQUFXLENBQUE7WUFDN0IsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUN6RCxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBRTNELElBQUcsUUFBUSxDQUFDLFFBQVEsRUFBRTtnQkFDckIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUE7Z0JBRXJDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTtvQkFDekMsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQTtvQkFDckUsaUNBQWlDO29CQUNqQyxNQUFNLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUE7Z0JBQzVELENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQTthQUNiO1lBRUQsSUFBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxFQUFFO2dCQUM5QyxNQUFNLENBQUMsUUFBUSxHQUFHLElBQUksQ0FDckIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQ2pCLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUMzQyxDQUFBO2dCQUVELElBQUcsSUFBSSxFQUFFO29CQUNSLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUE7b0JBQzNCLElBQUksQ0FBQyxFQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQTJCLE9BQU8sQ0FBQyxDQUFBO29CQUN2RSxLQUFLLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUE7aUJBQy9DO2FBQ0Q7aUJBQU07Z0JBQ04sSUFBRyxJQUFJLEVBQUU7b0JBQ1IsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQTtvQkFDM0IsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUE7b0JBRWhELElBQUksSUFBSSxHQUFHLENBQUMsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFBO29CQUVsQyxLQUFLLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUU7d0JBQ2hDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUM7d0JBQ3JCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUM7d0JBQ3JCLENBQUM7cUJBQ0QsQ0FBQyxDQUFBO2lCQUNGO2FBQ0Q7WUFFRCxJQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRO2dCQUMzQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUE7UUFDbkIsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBQ3RDLENBQUM7Q0FDRCxDQUFBO0FBdkRvQixVQUFVO0lBRDlCLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztHQUM5QyxVQUFVLENBdUQ5QjtlQXZEb0IsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29sbGlkZXIsIE1vZGVsLCBNb3Rpb24sIFRyYW5zZm9ybX0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9saWIuanNcIlxyXG5pbXBvcnQgV29ybGQsIHtTaW11bGF0b3J9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vd29ybGQuanNcIlxyXG5pbXBvcnQge0VudGl0aWVzfSBmcm9tIFwiLi4vLi4vLi4vZWNzLmpzXCJcclxuaW1wb3J0IFZlY3RvcjMsIHt2ZWMzfSBmcm9tIFwiLi4vLi4vLi4vbWF0aC92ZWMzLmpzXCJcclxuaW1wb3J0IHtCYWxsLCBXYWxsfSBmcm9tIFwiLi4vY29tcG9uZW50cy9saWIuanNcIlxyXG5pbXBvcnQgUG9uZyBmcm9tIFwiLi4vbWFpbi5qc1wiXHJcblxyXG5AV29ybGQucmVnaXN0ZXIuc3lzdGVtKFNpbXVsYXRvci5waGFzZShTaW11bGF0b3IuQ2F0ZWdvcnkuUGh5c2ljcykpXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhbGxTeXN0ZW0ge1xyXG5cdHB1YmxpYyB1cGRhdGUoZW50aXRpZXM6IEVudGl0aWVzKTogdm9pZCB7XHJcblx0XHRsZXQgd2FsbHMgPSBbLi4uZW50aXRpZXMud2l0aChXYWxsLCBNb2RlbCldXHJcblxyXG5cdFx0aWYod2FsbHMubGVuZ3RoID09IDApXHJcblx0XHRcdHJldHVyblxyXG5cclxuXHRcdGxldCBbd2FsbF0gPSB3YWxsc1xyXG5cclxuXHRcdGVudGl0aWVzLmZvckVhY2goKGJhbGwsIHRyYW5zZm9ybSwgbW90aW9uLCBjb2xsaWRlcikgPT4ge1xyXG5cdFx0XHRsZXQgc3BlZWQgPSBtb3Rpb24udmVsb2NpdHkubWFnbml0dWRlXHJcblx0XHRcdGxldCBiYiA9IGNvbGxpZGVyLmJvdW5kaW5nQm94XHJcblx0XHRcdGxldCBtYXhXaWR0aCA9IFBvbmcud2lkdGggLyAyIC0gKGJiLm1heC54IC0gYmIubWluLngpIC8gMlxyXG5cdFx0XHRsZXQgbWF4SGVpZ2h0ID0gUG9uZy5oZWlnaHQgLyAyIC0gKGJiLm1heC55IC0gYmIubWluLnkpIC8gMlxyXG5cclxuXHRcdFx0aWYoY29sbGlkZXIuY29sbGlkZWQpIHtcclxuXHRcdFx0XHRsZXQgW2NvbGxpc2lvbl0gPSBjb2xsaWRlci5jb2xsaXNpb25zXHJcblxyXG5cdFx0XHRcdGVudGl0aWVzLmZyb20oY29sbGlzaW9uLmVudGl0eUlkKS5ydW4odCA9PiB7XHJcblx0XHRcdFx0XHRsZXQgciA9IFZlY3RvcjMuYW5nbGUodC5wb3NpdGlvbiwgdHJhbnNmb3JtLnBvc2l0aW9uKSAqIE1hdGguUEkgLyAxODBcclxuXHRcdFx0XHRcdC8vIGNvbnNvbGUubG9nKHIgKiAxODAgLyBNYXRoLlBJKVxyXG5cdFx0XHRcdFx0bW90aW9uLnZlbG9jaXR5ID0gdmVjMyhNYXRoLmNvcyhyKSwgTWF0aC5zaW4ocikpLm11bChzcGVlZClcclxuXHRcdFx0XHR9LCBUcmFuc2Zvcm0pXHJcblx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHRcdGlmKE1hdGguYWJzKHRyYW5zZm9ybS5wb3NpdGlvbi55KSA+IG1heEhlaWdodCkge1xyXG5cdFx0XHRcdG1vdGlvbi52ZWxvY2l0eSA9IHZlYzMoXHJcblx0XHRcdFx0XHRtb3Rpb24udmVsb2NpdHkueCxcclxuXHRcdFx0XHRcdCh0cmFuc2Zvcm0ucG9zaXRpb24ueSA8IDAgPyAxIDogLTEpICogc3BlZWRcclxuXHRcdFx0XHQpXHJcblxyXG5cdFx0XHRcdGlmKHdhbGwpIHtcclxuXHRcdFx0XHRcdGxldCBtb2RlbCA9IHdhbGwuZ2V0KE1vZGVsKVxyXG5cdFx0XHRcdFx0bGV0IFssLCBiXSA9IG1vZGVsLm1hdGVyaWFsLmdldFZhbHVlPFtudW1iZXIsIG51bWJlciwgbnVtYmVyXT4oXCJjb2xvclwiKVxyXG5cdFx0XHRcdFx0bW9kZWwubWF0ZXJpYWwuc2V0VmFsdWUoXCJjb2xvclwiLCBbMC41LCAwLjUsIGJdKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRpZih3YWxsKSB7XHJcblx0XHRcdFx0XHRsZXQgbW9kZWwgPSB3YWxsLmdldChNb2RlbClcclxuXHRcdFx0XHRcdGxldCBbciwgZywgYl0gPSBtb2RlbC5tYXRlcmlhbC5nZXRWYWx1ZShcImNvbG9yXCIpXHJcblxyXG5cdFx0XHRcdFx0bGV0IGluY3IgPSAzICogU2ltdWxhdG9yLmRlbHRhVGltZVxyXG5cclxuXHRcdFx0XHRcdG1vZGVsLm1hdGVyaWFsLnNldFZhbHVlKFwiY29sb3JcIiwgW1xyXG5cdFx0XHRcdFx0XHRNYXRoLm1pbigxLCByICsgaW5jciksXHJcblx0XHRcdFx0XHRcdE1hdGgubWluKDEsIGcgKyBpbmNyKSxcclxuXHRcdFx0XHRcdFx0YlxyXG5cdFx0XHRcdFx0XSlcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmKE1hdGguYWJzKHRyYW5zZm9ybS5wb3NpdGlvbi54KSA+IG1heFdpZHRoKVxyXG5cdFx0XHRcdFBvbmcucmVzZXRSb3VuZCgpXHJcblx0XHR9LCBCYWxsLCBUcmFuc2Zvcm0sIE1vdGlvbiwgQ29sbGlkZXIpXHJcblx0fVxyXG59Il19