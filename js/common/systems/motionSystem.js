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
    World.register.system(Simulator.phase(Simulator.Category.Physics))
], MotionSystem);
export default MotionSystem;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW90aW9uU3lzdGVtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1vbi9zeXN0ZW1zL21vdGlvblN5c3RlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLGNBQWMsQ0FBQTtBQUVuQyxPQUFPLE9BQU8sTUFBTSxvQkFBb0IsQ0FBQTtBQUN4QyxPQUFPLE1BQU0sTUFBTSx5QkFBeUIsQ0FBQTtBQUM1QyxPQUFPLFNBQVMsTUFBTSw0QkFBNEIsQ0FBQTtBQUNsRCxPQUFPLEtBQUssRUFBRSxFQUFDLFNBQVMsRUFBQyxNQUFNLGFBQWEsQ0FBQTtBQUU1QyxxRUFBcUU7QUFFckUsSUFBcUIsWUFBWSxvQkFBakMsTUFBcUIsWUFBYSxTQUFRLE1BQU07SUFDeEMsTUFBTSxDQUFDLFFBQWtCO1FBQy9CLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDdEMsNkZBQTZGO1lBQzdGLE1BQU0sQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLGNBQWMsR0FBRyxTQUFTLENBQUMsY0FBYyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQTtZQUVuSCxNQUFNLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUE7WUFFbEMsc0NBQXNDO1lBQ3RDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQzdELENBQUMsRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUE7SUFDdEIsQ0FBQztDQUNELENBQUE7QUFab0IsWUFBWTtJQURoQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBc0IsU0FBUyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0dBQ25FLFlBQVksQ0FZaEM7ZUFab0IsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7U3lzdGVtfSBmcm9tIFwiLi4vLi4vZWNzLmpzXCJcclxuaW1wb3J0IEVudGl0aWVzIGZyb20gXCIuLi8uLi9lY3MvZW50aXRpZXMuanNcIlxyXG5pbXBvcnQgVmVjdG9yMyBmcm9tIFwiLi4vLi4vbWF0aC92ZWMzLmpzXCJcclxuaW1wb3J0IE1vdGlvbiBmcm9tIFwiLi4vY29tcG9uZW50cy9tb3Rpb24uanNcIlxyXG5pbXBvcnQgVHJhbnNmb3JtIGZyb20gXCIuLi9jb21wb25lbnRzL3RyYW5zZm9ybS5qc1wiXHJcbmltcG9ydCBXb3JsZCwge1NpbXVsYXRvcn0gZnJvbSBcIi4uL3dvcmxkLmpzXCJcclxuXHJcbi8qKiBTaW11bGF0ZXMgcGh5c2ljYWwgbW90aW9uIGZvciBlbnRpdGllcyB3aXRoIGEgbW90aW9uIGNvbXBvbmVudCAqL1xyXG5AV29ybGQucmVnaXN0ZXIuc3lzdGVtPHR5cGVvZiBNb3Rpb25TeXN0ZW0+KFNpbXVsYXRvci5waGFzZShTaW11bGF0b3IuQ2F0ZWdvcnkuUGh5c2ljcykpXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vdGlvblN5c3RlbSBleHRlbmRzIFN5c3RlbSB7XHJcblx0cHVibGljIHVwZGF0ZShlbnRpdGllczogRW50aXRpZXMpOiB2b2lkIHtcclxuXHRcdGVudGl0aWVzLmZvckVhY2goKHRyYW5zZm9ybSwgbW90aW9uKSA9PiB7XHJcblx0XHRcdC8vbW90aW9uLmFjY2VsZXJhdGlvbiAqIFNpbXVsYXRvci5maXhlZERlbHRhVGltZSAqIFNpbXVsYXRvci5maXhlZERlbHRhVGltZSArIG1vdGlvbi52ZWxvY2l0eVxyXG5cdFx0XHRtb3Rpb24udmVsb2NpdHkgPSBtb3Rpb24uYWNjZWxlcmF0aW9uLm11bChTaW11bGF0b3IuZml4ZWREZWx0YVRpbWUgKiBTaW11bGF0b3IuZml4ZWREZWx0YVRpbWUpLmFkZChtb3Rpb24udmVsb2NpdHkpXHJcblxyXG5cdFx0XHRtb3Rpb24uYWNjZWxlcmF0aW9uID0gVmVjdG9yMy56ZXJvXHJcblxyXG5cdFx0XHQvL3RyYW5zZm9ybS5wb3NpdGlvbiArIG1vdGlvbi52ZWxvY2l0eVxyXG5cdFx0XHR0cmFuc2Zvcm0ucG9zaXRpb24gPSB0cmFuc2Zvcm0ucG9zaXRpb24uYWRkKG1vdGlvbi52ZWxvY2l0eSlcclxuXHRcdH0sIFRyYW5zZm9ybSwgTW90aW9uKVxyXG5cdH1cclxufSJdfQ==