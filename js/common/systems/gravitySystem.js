var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var GravitySystem_1;
import { System } from "../../ecs.js";
import Vector3 from "../../math/vec3.js";
import Motion from "../components/motion.js";
import World, { Simulator } from "../world.js";
import MotionSystem from "./motionSystem.js";
/** Simulates 2d gravity for entities with a motion component */
let GravitySystem = GravitySystem_1 = class GravitySystem extends System {
    constructor(acceleration) {
        super();
        this.acceleration = acceleration;
    }
    update(entities) {
        entities.forEach(motion => {
            //Vector3.down * this.acceleration + motion.acceleration
            motion.acceleration = Vector3.down.mul(this.acceleration).add(motion.acceleration);
        }, Motion);
    }
};
GravitySystem = GravitySystem_1 = __decorate([
    World.register.system({ before: [MotionSystem], after: [Simulator.Category.Physics] }, 9.81),
    __metadata("design:paramtypes", [Number])
], GravitySystem);
export default GravitySystem;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3Jhdml0eVN5c3RlbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tb24vc3lzdGVtcy9ncmF2aXR5U3lzdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUMsTUFBTSxFQUFXLE1BQU0sY0FBYyxDQUFBO0FBQzdDLE9BQU8sT0FBTyxNQUFNLG9CQUFvQixDQUFBO0FBQ3hDLE9BQU8sTUFBTSxNQUFNLHlCQUF5QixDQUFBO0FBQzVDLE9BQU8sS0FBSyxFQUFFLEVBQUMsU0FBUyxFQUFDLE1BQU0sYUFBYSxDQUFBO0FBQzVDLE9BQU8sWUFBWSxNQUFNLG1CQUFtQixDQUFBO0FBRTVDLGdFQUFnRTtBQUVoRSxJQUFxQixhQUFhLHFCQUFsQyxNQUFxQixhQUFjLFNBQVEsTUFBTTtJQUdoRCxZQUFtQixZQUFvQjtRQUN0QyxLQUFLLEVBQUUsQ0FBQTtRQUNQLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFBO0lBQ2pDLENBQUM7SUFFTSxNQUFNLENBQUMsUUFBa0I7UUFDL0IsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUN6Qix3REFBd0Q7WUFDeEQsTUFBTSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQTtRQUNuRixDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUE7SUFDWCxDQUFDO0NBQ0QsQ0FBQTtBQWRvQixhQUFhO0lBRGpDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUF1QixFQUFDLE1BQU0sRUFBRSxDQUFDLFlBQVksQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUMsRUFBRSxJQUFJLENBQUM7O0dBQzVGLGFBQWEsQ0FjakM7ZUFkb0IsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7U3lzdGVtLCBFbnRpdGllc30gZnJvbSBcIi4uLy4uL2Vjcy5qc1wiXHJcbmltcG9ydCBWZWN0b3IzIGZyb20gXCIuLi8uLi9tYXRoL3ZlYzMuanNcIlxyXG5pbXBvcnQgTW90aW9uIGZyb20gXCIuLi9jb21wb25lbnRzL21vdGlvbi5qc1wiXHJcbmltcG9ydCBXb3JsZCwge1NpbXVsYXRvcn0gZnJvbSBcIi4uL3dvcmxkLmpzXCJcclxuaW1wb3J0IE1vdGlvblN5c3RlbSBmcm9tIFwiLi9tb3Rpb25TeXN0ZW0uanNcIlxyXG5cclxuLyoqIFNpbXVsYXRlcyAyZCBncmF2aXR5IGZvciBlbnRpdGllcyB3aXRoIGEgbW90aW9uIGNvbXBvbmVudCAqL1xyXG5AV29ybGQucmVnaXN0ZXIuc3lzdGVtPHR5cGVvZiBHcmF2aXR5U3lzdGVtPih7YmVmb3JlOiBbTW90aW9uU3lzdGVtXSwgYWZ0ZXI6IFtTaW11bGF0b3IuQ2F0ZWdvcnkuUGh5c2ljc119LCA5LjgxKVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcmF2aXR5U3lzdGVtIGV4dGVuZHMgU3lzdGVtIHtcclxuXHRwdWJsaWMgYWNjZWxlcmF0aW9uOiBudW1iZXJcclxuXHJcblx0cHVibGljIGNvbnN0cnVjdG9yKGFjY2VsZXJhdGlvbjogbnVtYmVyKSB7XHJcblx0XHRzdXBlcigpXHJcblx0XHR0aGlzLmFjY2VsZXJhdGlvbiA9IGFjY2VsZXJhdGlvblxyXG5cdH1cclxuXHJcblx0cHVibGljIHVwZGF0ZShlbnRpdGllczogRW50aXRpZXMpOiB2b2lkIHtcclxuXHRcdGVudGl0aWVzLmZvckVhY2gobW90aW9uID0+IHtcclxuXHRcdFx0Ly9WZWN0b3IzLmRvd24gKiB0aGlzLmFjY2VsZXJhdGlvbiArIG1vdGlvbi5hY2NlbGVyYXRpb25cclxuXHRcdFx0bW90aW9uLmFjY2VsZXJhdGlvbiA9IFZlY3RvcjMuZG93bi5tdWwodGhpcy5hY2NlbGVyYXRpb24pLmFkZChtb3Rpb24uYWNjZWxlcmF0aW9uKVxyXG5cdFx0fSwgTW90aW9uKVxyXG5cdH1cclxufSJdfQ==