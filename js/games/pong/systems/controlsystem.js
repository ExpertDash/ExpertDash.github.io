var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import Collider from "../../../common/components/collider.js";
import Transform from "../../../common/components/transform.js";
import World, { Simulator } from "../../../common/world.js";
import { System } from "../../../ecs.js";
import { vec3 } from "../../../math/vec3.js";
import Input from "../../../utils/input.js";
import Controllable from "../components/controllable.js";
import Pong from "../main.js";
let ControlSystem = class ControlSystem extends System {
    update(entities) {
        entities.forEach((t, c, _) => {
            let direction = (Input.held("w") ? 1 : 0) + (Input.held("s") ? -1 : 0);
            let speed = 12.5 * Simulator.deltaTime;
            let maxHeight = Pong.height / 2 - (c.boundingBox.max.y - c.boundingBox.min.y) / 2;
            t.position = vec3(t.position.x, Math.max(-maxHeight, Math.min(t.position.y + direction * speed, maxHeight)));
        }, Transform, Collider, Controllable);
    }
};
ControlSystem = __decorate([
    World.register.system(Simulator.phase(Simulator.Category.Input))
], ControlSystem);
export default ControlSystem;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbHN5c3RlbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9nYW1lcy9wb25nL3N5c3RlbXMvY29udHJvbHN5c3RlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLFFBQVEsTUFBTSx3Q0FBd0MsQ0FBQTtBQUM3RCxPQUFPLFNBQVMsTUFBTSx5Q0FBeUMsQ0FBQTtBQUMvRCxPQUFPLEtBQUssRUFBRSxFQUFDLFNBQVMsRUFBQyxNQUFNLDBCQUEwQixDQUFBO0FBQ3pELE9BQU8sRUFBVyxNQUFNLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQTtBQUNoRCxPQUFPLEVBQUMsSUFBSSxFQUFDLE1BQU0sdUJBQXVCLENBQUE7QUFDMUMsT0FBTyxLQUFLLE1BQU0seUJBQXlCLENBQUE7QUFDM0MsT0FBTyxZQUFZLE1BQU0sK0JBQStCLENBQUE7QUFDeEQsT0FBTyxJQUFJLE1BQU0sWUFBWSxDQUFBO0FBRzdCLElBQXFCLGFBQWEsR0FBbEMsTUFBcUIsYUFBYyxTQUFRLE1BQU07SUFDekMsTUFBTSxDQUFDLFFBQWtCO1FBQy9CLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzVCLElBQUksU0FBUyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUN0RSxJQUFJLEtBQUssR0FBRyxJQUFJLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQTtZQUV0QyxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUE7WUFFakYsQ0FBQyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLFNBQVMsR0FBRyxLQUFLLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQzdHLENBQUMsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLFlBQVksQ0FBQyxDQUFBO0lBQ3RDLENBQUM7Q0FDRCxDQUFBO0FBWG9CLGFBQWE7SUFEakMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0dBQzVDLGFBQWEsQ0FXakM7ZUFYb0IsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb2xsaWRlciBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL2NvbXBvbmVudHMvY29sbGlkZXIuanNcIlxyXG5pbXBvcnQgVHJhbnNmb3JtIGZyb20gXCIuLi8uLi8uLi9jb21tb24vY29tcG9uZW50cy90cmFuc2Zvcm0uanNcIlxyXG5pbXBvcnQgV29ybGQsIHtTaW11bGF0b3J9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vd29ybGQuanNcIlxyXG5pbXBvcnQge0VudGl0aWVzLCBTeXN0ZW19IGZyb20gXCIuLi8uLi8uLi9lY3MuanNcIlxyXG5pbXBvcnQge3ZlYzN9IGZyb20gXCIuLi8uLi8uLi9tYXRoL3ZlYzMuanNcIlxyXG5pbXBvcnQgSW5wdXQgZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2lucHV0LmpzXCJcclxuaW1wb3J0IENvbnRyb2xsYWJsZSBmcm9tIFwiLi4vY29tcG9uZW50cy9jb250cm9sbGFibGUuanNcIlxyXG5pbXBvcnQgUG9uZyBmcm9tIFwiLi4vbWFpbi5qc1wiXHJcblxyXG5AV29ybGQucmVnaXN0ZXIuc3lzdGVtKFNpbXVsYXRvci5waGFzZShTaW11bGF0b3IuQ2F0ZWdvcnkuSW5wdXQpKVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250cm9sU3lzdGVtIGV4dGVuZHMgU3lzdGVtIHtcclxuXHRwdWJsaWMgdXBkYXRlKGVudGl0aWVzOiBFbnRpdGllcyk6IHZvaWQge1xyXG5cdFx0ZW50aXRpZXMuZm9yRWFjaCgodCwgYywgXykgPT4ge1xyXG5cdFx0XHRsZXQgZGlyZWN0aW9uID0gKElucHV0LmhlbGQoXCJ3XCIpID8gMSA6IDApICsgKElucHV0LmhlbGQoXCJzXCIpID8gLTEgOiAwKVxyXG5cdFx0XHRsZXQgc3BlZWQgPSAxMi41ICogU2ltdWxhdG9yLmRlbHRhVGltZVxyXG5cclxuXHRcdFx0bGV0IG1heEhlaWdodCA9IFBvbmcuaGVpZ2h0IC8gMiAtIChjLmJvdW5kaW5nQm94Lm1heC55IC0gYy5ib3VuZGluZ0JveC5taW4ueSkgLyAyXHJcblxyXG5cdFx0XHR0LnBvc2l0aW9uID0gdmVjMyh0LnBvc2l0aW9uLngsIE1hdGgubWF4KC1tYXhIZWlnaHQsIE1hdGgubWluKHQucG9zaXRpb24ueSArIGRpcmVjdGlvbiAqIHNwZWVkLCBtYXhIZWlnaHQpKSlcclxuXHRcdH0sIFRyYW5zZm9ybSwgQ29sbGlkZXIsIENvbnRyb2xsYWJsZSlcclxuXHR9XHJcbn0iXX0=