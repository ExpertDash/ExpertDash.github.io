"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const world_js_1 = __importDefault(require("../../../common/world.js"));
const ecs_js_1 = require("../../../ecs.js");
let CpuController = class CpuController extends ecs_js_1.Component {
    constructor(speed) {
        super();
        this.speed = speed;
    }
};
CpuController = __decorate([
    world_js_1.default.register.component(),
    __metadata("design:paramtypes", [Number])
], CpuController);
exports.default = CpuController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3B1Q29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9nYW1lcy9wb25nL2NvbXBvbmVudHMvY3B1Q29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLHdFQUE0QztBQUM1Qyw0Q0FBeUM7QUFHekMsSUFBcUIsYUFBYSxHQUFsQyxNQUFxQixhQUFjLFNBQVEsa0JBQVM7SUFHbkQsWUFBbUIsS0FBYTtRQUMvQixLQUFLLEVBQUUsQ0FBQTtRQUNQLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFBO0lBQ25CLENBQUM7Q0FDRCxDQUFBO0FBUG9CLGFBQWE7SUFEakMsa0JBQUssQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFOztHQUNOLGFBQWEsQ0FPakM7a0JBUG9CLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgV29ybGQgZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi93b3JsZC5qc1wiXHJcbmltcG9ydCB7Q29tcG9uZW50fSBmcm9tIFwiLi4vLi4vLi4vZWNzLmpzXCJcclxuXHJcbkBXb3JsZC5yZWdpc3Rlci5jb21wb25lbnQoKVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDcHVDb250cm9sbGVyIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHRwdWJsaWMgc3BlZWQ6IG51bWJlclxyXG5cclxuXHRwdWJsaWMgY29uc3RydWN0b3Ioc3BlZWQ6IG51bWJlcikge1xyXG5cdFx0c3VwZXIoKVxyXG5cdFx0dGhpcy5zcGVlZCA9IHNwZWVkXHJcblx0fVxyXG59Il19