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
    World.register.system(Simulator.phase(Simulator.Category.Physics, { before: [MotionSystem] }), 9.81),
    __metadata("design:paramtypes", [Number])
], GravitySystem);
export default GravitySystem;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3Jhdml0eVN5c3RlbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tb24vc3lzdGVtcy9ncmF2aXR5U3lzdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUMsTUFBTSxFQUFXLE1BQU0sY0FBYyxDQUFBO0FBQzdDLE9BQU8sT0FBTyxNQUFNLG9CQUFvQixDQUFBO0FBQ3hDLE9BQU8sTUFBTSxNQUFNLHlCQUF5QixDQUFBO0FBQzVDLE9BQU8sS0FBSyxFQUFFLEVBQUMsU0FBUyxFQUFDLE1BQU0sYUFBYSxDQUFBO0FBQzVDLE9BQU8sWUFBWSxNQUFNLG1CQUFtQixDQUFBO0FBRTVDLGdFQUFnRTtBQUVoRSxJQUFxQixhQUFhLHFCQUFsQyxNQUFxQixhQUFjLFNBQVEsTUFBTTtJQUdoRCxZQUFtQixZQUFvQjtRQUN0QyxLQUFLLEVBQUUsQ0FBQTtRQUNQLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFBO0lBQ2pDLENBQUM7SUFFTSxNQUFNLENBQUMsUUFBa0I7UUFDL0IsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUN6Qix3REFBd0Q7WUFDeEQsTUFBTSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQTtRQUNuRixDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUE7SUFDWCxDQUFDO0NBQ0QsQ0FBQTtBQWRvQixhQUFhO0lBRGpDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUF1QixTQUFTLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLEVBQUMsTUFBTSxFQUFFLENBQUMsWUFBWSxDQUFDLEVBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQzs7R0FDcEcsYUFBYSxDQWNqQztlQWRvQixhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtTeXN0ZW0sIEVudGl0aWVzfSBmcm9tIFwiLi4vLi4vZWNzLmpzXCJcclxuaW1wb3J0IFZlY3RvcjMgZnJvbSBcIi4uLy4uL21hdGgvdmVjMy5qc1wiXHJcbmltcG9ydCBNb3Rpb24gZnJvbSBcIi4uL2NvbXBvbmVudHMvbW90aW9uLmpzXCJcclxuaW1wb3J0IFdvcmxkLCB7U2ltdWxhdG9yfSBmcm9tIFwiLi4vd29ybGQuanNcIlxyXG5pbXBvcnQgTW90aW9uU3lzdGVtIGZyb20gXCIuL21vdGlvblN5c3RlbS5qc1wiXHJcblxyXG4vKiogU2ltdWxhdGVzIDJkIGdyYXZpdHkgZm9yIGVudGl0aWVzIHdpdGggYSBtb3Rpb24gY29tcG9uZW50ICovXHJcbkBXb3JsZC5yZWdpc3Rlci5zeXN0ZW08dHlwZW9mIEdyYXZpdHlTeXN0ZW0+KFNpbXVsYXRvci5waGFzZShTaW11bGF0b3IuQ2F0ZWdvcnkuUGh5c2ljcywge2JlZm9yZTogW01vdGlvblN5c3RlbV19KSwgOS44MSlcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3Jhdml0eVN5c3RlbSBleHRlbmRzIFN5c3RlbSB7XHJcblx0cHVibGljIGFjY2VsZXJhdGlvbjogbnVtYmVyXHJcblxyXG5cdHB1YmxpYyBjb25zdHJ1Y3RvcihhY2NlbGVyYXRpb246IG51bWJlcikge1xyXG5cdFx0c3VwZXIoKVxyXG5cdFx0dGhpcy5hY2NlbGVyYXRpb24gPSBhY2NlbGVyYXRpb25cclxuXHR9XHJcblxyXG5cdHB1YmxpYyB1cGRhdGUoZW50aXRpZXM6IEVudGl0aWVzKTogdm9pZCB7XHJcblx0XHRlbnRpdGllcy5mb3JFYWNoKG1vdGlvbiA9PiB7XHJcblx0XHRcdC8vVmVjdG9yMy5kb3duICogdGhpcy5hY2NlbGVyYXRpb24gKyBtb3Rpb24uYWNjZWxlcmF0aW9uXHJcblx0XHRcdG1vdGlvbi5hY2NlbGVyYXRpb24gPSBWZWN0b3IzLmRvd24ubXVsKHRoaXMuYWNjZWxlcmF0aW9uKS5hZGQobW90aW9uLmFjY2VsZXJhdGlvbilcclxuXHRcdH0sIE1vdGlvbilcclxuXHR9XHJcbn0iXX0=