var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MotionSystem_1;
import { System } from "../../ecs.js";
import Vector3 from "../../math/vec3.js";
import Motion from "../components/motion.js";
import Transform from "../components/transform.js";
import World, { Simulator } from "../world.js";
/** Simulates physical motion for entities with a motion component */
let MotionSystem = MotionSystem_1 = class MotionSystem extends System {
    update(entities) {
        entities.forEach((transform, motion) => {
            //motion.acceleration * Simulator.fixedDeltaTime * Simulator.fixedDeltaTime + motion.velocity
            motion.velocity = motion.acceleration.mul(Simulator.fixedDeltaTime * Simulator.fixedDeltaTime).add(motion.velocity);
            motion.acceleration = Vector3.zero;
            //transform.position + motion.velocity
            transform.position = transform.position.add(motion.velocity);
        }, Transform, Motion);
    }
};
MotionSystem = MotionSystem_1 = __decorate([
    World.register.system({ after: [Simulator.Category.Physics] })
], MotionSystem);
export default MotionSystem;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW90aW9uU3lzdGVtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1vbi9zeXN0ZW1zL21vdGlvblN5c3RlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLGNBQWMsQ0FBQTtBQUVuQyxPQUFPLE9BQU8sTUFBTSxvQkFBb0IsQ0FBQTtBQUN4QyxPQUFPLE1BQU0sTUFBTSx5QkFBeUIsQ0FBQTtBQUM1QyxPQUFPLFNBQVMsTUFBTSw0QkFBNEIsQ0FBQTtBQUNsRCxPQUFPLEtBQUssRUFBRSxFQUFDLFNBQVMsRUFBQyxNQUFNLGFBQWEsQ0FBQTtBQUU1QyxxRUFBcUU7QUFFckUsSUFBcUIsWUFBWSxvQkFBakMsTUFBcUIsWUFBYSxTQUFRLE1BQU07SUFDeEMsTUFBTSxDQUFDLFFBQWtCO1FBQy9CLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDdEMsNkZBQTZGO1lBQzdGLE1BQU0sQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLGNBQWMsR0FBRyxTQUFTLENBQUMsY0FBYyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQTtZQUVuSCxNQUFNLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUE7WUFFbEMsc0NBQXNDO1lBQ3RDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQzdELENBQUMsRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUE7SUFDdEIsQ0FBQztDQUNELENBQUE7QUFab0IsWUFBWTtJQURoQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBc0IsRUFBQyxLQUFLLEVBQUUsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFDLENBQUM7R0FDN0QsWUFBWSxDQVloQztlQVpvQixZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtTeXN0ZW19IGZyb20gXCIuLi8uLi9lY3MuanNcIlxyXG5pbXBvcnQgRW50aXRpZXMgZnJvbSBcIi4uLy4uL2Vjcy9lbnRpdGllcy5qc1wiXHJcbmltcG9ydCBWZWN0b3IzIGZyb20gXCIuLi8uLi9tYXRoL3ZlYzMuanNcIlxyXG5pbXBvcnQgTW90aW9uIGZyb20gXCIuLi9jb21wb25lbnRzL21vdGlvbi5qc1wiXHJcbmltcG9ydCBUcmFuc2Zvcm0gZnJvbSBcIi4uL2NvbXBvbmVudHMvdHJhbnNmb3JtLmpzXCJcclxuaW1wb3J0IFdvcmxkLCB7U2ltdWxhdG9yfSBmcm9tIFwiLi4vd29ybGQuanNcIlxyXG5cclxuLyoqIFNpbXVsYXRlcyBwaHlzaWNhbCBtb3Rpb24gZm9yIGVudGl0aWVzIHdpdGggYSBtb3Rpb24gY29tcG9uZW50ICovXHJcbkBXb3JsZC5yZWdpc3Rlci5zeXN0ZW08dHlwZW9mIE1vdGlvblN5c3RlbT4oe2FmdGVyOiBbU2ltdWxhdG9yLkNhdGVnb3J5LlBoeXNpY3NdfSlcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW90aW9uU3lzdGVtIGV4dGVuZHMgU3lzdGVtIHtcclxuXHRwdWJsaWMgdXBkYXRlKGVudGl0aWVzOiBFbnRpdGllcyk6IHZvaWQge1xyXG5cdFx0ZW50aXRpZXMuZm9yRWFjaCgodHJhbnNmb3JtLCBtb3Rpb24pID0+IHtcclxuXHRcdFx0Ly9tb3Rpb24uYWNjZWxlcmF0aW9uICogU2ltdWxhdG9yLmZpeGVkRGVsdGFUaW1lICogU2ltdWxhdG9yLmZpeGVkRGVsdGFUaW1lICsgbW90aW9uLnZlbG9jaXR5XHJcblx0XHRcdG1vdGlvbi52ZWxvY2l0eSA9IG1vdGlvbi5hY2NlbGVyYXRpb24ubXVsKFNpbXVsYXRvci5maXhlZERlbHRhVGltZSAqIFNpbXVsYXRvci5maXhlZERlbHRhVGltZSkuYWRkKG1vdGlvbi52ZWxvY2l0eSlcclxuXHJcblx0XHRcdG1vdGlvbi5hY2NlbGVyYXRpb24gPSBWZWN0b3IzLnplcm9cclxuXHJcblx0XHRcdC8vdHJhbnNmb3JtLnBvc2l0aW9uICsgbW90aW9uLnZlbG9jaXR5XHJcblx0XHRcdHRyYW5zZm9ybS5wb3NpdGlvbiA9IHRyYW5zZm9ybS5wb3NpdGlvbi5hZGQobW90aW9uLnZlbG9jaXR5KVxyXG5cdFx0fSwgVHJhbnNmb3JtLCBNb3Rpb24pXHJcblx0fVxyXG59Il19