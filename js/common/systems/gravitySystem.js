"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var GravitySystem_1;
Object.defineProperty(exports, "__esModule", { value: true });
const ecs_js_1 = require("../../ecs.js");
const vec3_js_1 = __importDefault(require("../../math/vec3.js"));
const motion_js_1 = __importDefault(require("../components/motion.js"));
const world_js_1 = __importStar(require("../world.js"));
const motionSystem_js_1 = __importDefault(require("./motionSystem.js"));
/** Simulates 2d gravity for entities with a motion component */
let GravitySystem = GravitySystem_1 = class GravitySystem extends ecs_js_1.System {
    constructor(acceleration) {
        super();
        this.acceleration = acceleration;
    }
    update(entities) {
        entities.forEach(motion => {
            //Vector3.down * this.acceleration + motion.acceleration
            motion.acceleration = vec3_js_1.default.down.mul(this.acceleration).add(motion.acceleration);
        }, motion_js_1.default);
    }
};
GravitySystem = GravitySystem_1 = __decorate([
    world_js_1.default.register.system({ before: [motionSystem_js_1.default], after: [world_js_1.Simulator.Category.Physics] }, 9.81),
    __metadata("design:paramtypes", [Number])
], GravitySystem);
exports.default = GravitySystem;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3Jhdml0eVN5c3RlbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tb24vc3lzdGVtcy9ncmF2aXR5U3lzdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBNkM7QUFDN0MsaUVBQXdDO0FBQ3hDLHdFQUE0QztBQUM1Qyx3REFBNEM7QUFDNUMsd0VBQTRDO0FBRTVDLGdFQUFnRTtBQUVoRSxJQUFxQixhQUFhLHFCQUFsQyxNQUFxQixhQUFjLFNBQVEsZUFBTTtJQUdoRCxZQUFtQixZQUFvQjtRQUN0QyxLQUFLLEVBQUUsQ0FBQTtRQUNQLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFBO0lBQ2pDLENBQUM7SUFFTSxNQUFNLENBQUMsUUFBa0I7UUFDL0IsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUN6Qix3REFBd0Q7WUFDeEQsTUFBTSxDQUFDLFlBQVksR0FBRyxpQkFBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUE7UUFDbkYsQ0FBQyxFQUFFLG1CQUFNLENBQUMsQ0FBQTtJQUNYLENBQUM7Q0FDRCxDQUFBO0FBZG9CLGFBQWE7SUFEakMsa0JBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUF1QixFQUFDLE1BQU0sRUFBRSxDQUFDLHlCQUFZLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxvQkFBUyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBQyxFQUFFLElBQUksQ0FBQzs7R0FDNUYsYUFBYSxDQWNqQztrQkFkb0IsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7U3lzdGVtLCBFbnRpdGllc30gZnJvbSBcIi4uLy4uL2Vjcy5qc1wiXHJcbmltcG9ydCBWZWN0b3IzIGZyb20gXCIuLi8uLi9tYXRoL3ZlYzMuanNcIlxyXG5pbXBvcnQgTW90aW9uIGZyb20gXCIuLi9jb21wb25lbnRzL21vdGlvbi5qc1wiXHJcbmltcG9ydCBXb3JsZCwge1NpbXVsYXRvcn0gZnJvbSBcIi4uL3dvcmxkLmpzXCJcclxuaW1wb3J0IE1vdGlvblN5c3RlbSBmcm9tIFwiLi9tb3Rpb25TeXN0ZW0uanNcIlxyXG5cclxuLyoqIFNpbXVsYXRlcyAyZCBncmF2aXR5IGZvciBlbnRpdGllcyB3aXRoIGEgbW90aW9uIGNvbXBvbmVudCAqL1xyXG5AV29ybGQucmVnaXN0ZXIuc3lzdGVtPHR5cGVvZiBHcmF2aXR5U3lzdGVtPih7YmVmb3JlOiBbTW90aW9uU3lzdGVtXSwgYWZ0ZXI6IFtTaW11bGF0b3IuQ2F0ZWdvcnkuUGh5c2ljc119LCA5LjgxKVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcmF2aXR5U3lzdGVtIGV4dGVuZHMgU3lzdGVtIHtcclxuXHRwdWJsaWMgYWNjZWxlcmF0aW9uOiBudW1iZXJcclxuXHJcblx0cHVibGljIGNvbnN0cnVjdG9yKGFjY2VsZXJhdGlvbjogbnVtYmVyKSB7XHJcblx0XHRzdXBlcigpXHJcblx0XHR0aGlzLmFjY2VsZXJhdGlvbiA9IGFjY2VsZXJhdGlvblxyXG5cdH1cclxuXHJcblx0cHVibGljIHVwZGF0ZShlbnRpdGllczogRW50aXRpZXMpOiB2b2lkIHtcclxuXHRcdGVudGl0aWVzLmZvckVhY2gobW90aW9uID0+IHtcclxuXHRcdFx0Ly9WZWN0b3IzLmRvd24gKiB0aGlzLmFjY2VsZXJhdGlvbiArIG1vdGlvbi5hY2NlbGVyYXRpb25cclxuXHRcdFx0bW90aW9uLmFjY2VsZXJhdGlvbiA9IFZlY3RvcjMuZG93bi5tdWwodGhpcy5hY2NlbGVyYXRpb24pLmFkZChtb3Rpb24uYWNjZWxlcmF0aW9uKVxyXG5cdFx0fSwgTW90aW9uKVxyXG5cdH1cclxufSJdfQ==