var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import World from "../../../common/world.js";
import { Component } from "../../../ecs.js";
let CpuController = class CpuController extends Component {
    constructor(speed) {
        super();
        this.speed = speed;
    }
};
CpuController = __decorate([
    World.register.component(),
    __metadata("design:paramtypes", [Number])
], CpuController);
export default CpuController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3B1Q29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9nYW1lcy9wb25nL2NvbXBvbmVudHMvY3B1Q29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLEtBQUssTUFBTSwwQkFBMEIsQ0FBQTtBQUM1QyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0saUJBQWlCLENBQUE7QUFHekMsSUFBcUIsYUFBYSxHQUFsQyxNQUFxQixhQUFjLFNBQVEsU0FBUztJQUduRCxZQUFtQixLQUFhO1FBQy9CLEtBQUssRUFBRSxDQUFBO1FBQ1AsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUE7SUFDbkIsQ0FBQztDQUNELENBQUE7QUFQb0IsYUFBYTtJQURqQyxLQUFLLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRTs7R0FDTixhQUFhLENBT2pDO2VBUG9CLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgV29ybGQgZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi93b3JsZC5qc1wiXHJcbmltcG9ydCB7Q29tcG9uZW50fSBmcm9tIFwiLi4vLi4vLi4vZWNzLmpzXCJcclxuXHJcbkBXb3JsZC5yZWdpc3Rlci5jb21wb25lbnQoKVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDcHVDb250cm9sbGVyIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHRwdWJsaWMgc3BlZWQ6IG51bWJlclxyXG5cclxuXHRwdWJsaWMgY29uc3RydWN0b3Ioc3BlZWQ6IG51bWJlcikge1xyXG5cdFx0c3VwZXIoKVxyXG5cdFx0dGhpcy5zcGVlZCA9IHNwZWVkXHJcblx0fVxyXG59Il19