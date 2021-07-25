var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from "../../ecs.js";
import Vector3 from "../../math/vec3.js";
import World from "../world.js";
let Motion = class Motion extends Component {
    /**
     * @param velocity Initial velocity
     */
    constructor(velocity) {
        super();
        this.mass = 1;
        this.acceleration = Vector3.zero;
        this.velocity = velocity ?? Vector3.zero;
    }
};
Motion = __decorate([
    World.register.component(),
    __metadata("design:paramtypes", [Vector3])
], Motion);
export default Motion;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW90aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1vbi9jb21wb25lbnRzL21vdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sY0FBYyxDQUFBO0FBQ3RDLE9BQU8sT0FBTyxNQUFNLG9CQUFvQixDQUFBO0FBQ3hDLE9BQU8sS0FBSyxNQUFNLGFBQWEsQ0FBQTtBQUcvQixJQUFxQixNQUFNLEdBQTNCLE1BQXFCLE1BQU8sU0FBUSxTQUFTO0lBSzVDOztPQUVHO0lBQ0gsWUFBWSxRQUFrQjtRQUM3QixLQUFLLEVBQUUsQ0FBQTtRQUNQLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFBO1FBQ2IsSUFBSSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFBO1FBQ2hDLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUE7SUFDekMsQ0FBQztDQUNELENBQUE7QUFkb0IsTUFBTTtJQUQxQixLQUFLLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRTtxQ0FTSCxPQUFPO0dBUlYsTUFBTSxDQWMxQjtlQWRvQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gXCIuLi8uLi9lY3MuanNcIlxyXG5pbXBvcnQgVmVjdG9yMyBmcm9tIFwiLi4vLi4vbWF0aC92ZWMzLmpzXCJcclxuaW1wb3J0IFdvcmxkIGZyb20gXCIuLi93b3JsZC5qc1wiXHJcblxyXG5AV29ybGQucmVnaXN0ZXIuY29tcG9uZW50KClcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW90aW9uIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHRtYXNzOiBudW1iZXJcclxuXHRhY2NlbGVyYXRpb246IFZlY3RvcjNcclxuXHR2ZWxvY2l0eTogVmVjdG9yM1xyXG5cclxuXHQvKipcclxuXHQgKiBAcGFyYW0gdmVsb2NpdHkgSW5pdGlhbCB2ZWxvY2l0eVxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKHZlbG9jaXR5PzogVmVjdG9yMykge1xyXG5cdFx0c3VwZXIoKVxyXG5cdFx0dGhpcy5tYXNzID0gMVxyXG5cdFx0dGhpcy5hY2NlbGVyYXRpb24gPSBWZWN0b3IzLnplcm9cclxuXHRcdHRoaXMudmVsb2NpdHkgPSB2ZWxvY2l0eSA/PyBWZWN0b3IzLnplcm9cclxuXHR9XHJcbn0iXX0=