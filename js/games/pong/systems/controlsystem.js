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
import Pong from "../pong.js";
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
    World.register.system({ after: [Simulator.Category.Input] })
], ControlSystem);
export default ControlSystem;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbHN5c3RlbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9nYW1lcy9wb25nL3N5c3RlbXMvY29udHJvbHN5c3RlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLFFBQVEsTUFBTSx3Q0FBd0MsQ0FBQTtBQUM3RCxPQUFPLFNBQVMsTUFBTSx5Q0FBeUMsQ0FBQTtBQUMvRCxPQUFPLEtBQUssRUFBRSxFQUFDLFNBQVMsRUFBQyxNQUFNLDBCQUEwQixDQUFBO0FBQ3pELE9BQU8sRUFBVyxNQUFNLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQTtBQUNoRCxPQUFPLEVBQUMsSUFBSSxFQUFDLE1BQU0sdUJBQXVCLENBQUE7QUFDMUMsT0FBTyxLQUFLLE1BQU0seUJBQXlCLENBQUE7QUFDM0MsT0FBTyxZQUFZLE1BQU0sK0JBQStCLENBQUE7QUFDeEQsT0FBTyxJQUFJLE1BQU0sWUFBWSxDQUFBO0FBRzdCLElBQXFCLGFBQWEsR0FBbEMsTUFBcUIsYUFBYyxTQUFRLE1BQU07SUFDekMsTUFBTSxDQUFDLFFBQWtCO1FBQy9CLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzVCLElBQUksU0FBUyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUN0RSxJQUFJLEtBQUssR0FBRyxJQUFJLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQTtZQUV0QyxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUE7WUFFakYsQ0FBQyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLFNBQVMsR0FBRyxLQUFLLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQzdHLENBQUMsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLFlBQVksQ0FBQyxDQUFBO0lBQ3RDLENBQUM7Q0FDRCxDQUFBO0FBWG9CLGFBQWE7SUFEakMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBQyxLQUFLLEVBQUUsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFDLENBQUM7R0FDdEMsYUFBYSxDQVdqQztlQVhvQixhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbGxpZGVyIGZyb20gXCIuLi8uLi8uLi9jb21tb24vY29tcG9uZW50cy9jb2xsaWRlci5qc1wiXHJcbmltcG9ydCBUcmFuc2Zvcm0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9jb21wb25lbnRzL3RyYW5zZm9ybS5qc1wiXHJcbmltcG9ydCBXb3JsZCwge1NpbXVsYXRvcn0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi93b3JsZC5qc1wiXHJcbmltcG9ydCB7RW50aXRpZXMsIFN5c3RlbX0gZnJvbSBcIi4uLy4uLy4uL2Vjcy5qc1wiXHJcbmltcG9ydCB7dmVjM30gZnJvbSBcIi4uLy4uLy4uL21hdGgvdmVjMy5qc1wiXHJcbmltcG9ydCBJbnB1dCBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5wdXQuanNcIlxyXG5pbXBvcnQgQ29udHJvbGxhYmxlIGZyb20gXCIuLi9jb21wb25lbnRzL2NvbnRyb2xsYWJsZS5qc1wiXHJcbmltcG9ydCBQb25nIGZyb20gXCIuLi9wb25nLmpzXCJcclxuXHJcbkBXb3JsZC5yZWdpc3Rlci5zeXN0ZW0oe2FmdGVyOiBbU2ltdWxhdG9yLkNhdGVnb3J5LklucHV0XX0pXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRyb2xTeXN0ZW0gZXh0ZW5kcyBTeXN0ZW0ge1xyXG5cdHB1YmxpYyB1cGRhdGUoZW50aXRpZXM6IEVudGl0aWVzKTogdm9pZCB7XHJcblx0XHRlbnRpdGllcy5mb3JFYWNoKCh0LCBjLCBfKSA9PiB7XHJcblx0XHRcdGxldCBkaXJlY3Rpb24gPSAoSW5wdXQuaGVsZChcIndcIikgPyAxIDogMCkgKyAoSW5wdXQuaGVsZChcInNcIikgPyAtMSA6IDApXHJcblx0XHRcdGxldCBzcGVlZCA9IDEyLjUgKiBTaW11bGF0b3IuZGVsdGFUaW1lXHJcblxyXG5cdFx0XHRsZXQgbWF4SGVpZ2h0ID0gUG9uZy5oZWlnaHQgLyAyIC0gKGMuYm91bmRpbmdCb3gubWF4LnkgLSBjLmJvdW5kaW5nQm94Lm1pbi55KSAvIDJcclxuXHJcblx0XHRcdHQucG9zaXRpb24gPSB2ZWMzKHQucG9zaXRpb24ueCwgTWF0aC5tYXgoLW1heEhlaWdodCwgTWF0aC5taW4odC5wb3NpdGlvbi55ICsgZGlyZWN0aW9uICogc3BlZWQsIG1heEhlaWdodCkpKVxyXG5cdFx0fSwgVHJhbnNmb3JtLCBDb2xsaWRlciwgQ29udHJvbGxhYmxlKVxyXG5cdH1cclxufSJdfQ==