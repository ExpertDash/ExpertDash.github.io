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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var MotionSystem_1;
Object.defineProperty(exports, "__esModule", { value: true });
const ecs_js_1 = require("../../ecs.js");
const vec3_js_1 = __importDefault(require("../../math/vec3.js"));
const motion_js_1 = __importDefault(require("../components/motion.js"));
const transform_js_1 = __importDefault(require("../components/transform.js"));
const world_js_1 = __importStar(require("../world.js"));
/** Simulates physical motion for entities with a motion component */
let MotionSystem = MotionSystem_1 = class MotionSystem extends ecs_js_1.System {
    update(entities) {
        entities.forEach((transform, motion) => {
            //motion.acceleration * Simulator.fixedDeltaTime * Simulator.fixedDeltaTime + motion.velocity
            motion.velocity = motion.acceleration.mul(world_js_1.Simulator.fixedDeltaTime * world_js_1.Simulator.fixedDeltaTime).add(motion.velocity);
            motion.acceleration = vec3_js_1.default.zero;
            //transform.position + motion.velocity
            transform.position = transform.position.add(motion.velocity);
        }, transform_js_1.default, motion_js_1.default);
    }
};
MotionSystem = MotionSystem_1 = __decorate([
    world_js_1.default.register.system({ after: [world_js_1.Simulator.Category.Physics] })
], MotionSystem);
exports.default = MotionSystem;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW90aW9uU3lzdGVtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1vbi9zeXN0ZW1zL21vdGlvblN5c3RlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseUNBQW1DO0FBRW5DLGlFQUF3QztBQUN4Qyx3RUFBNEM7QUFDNUMsOEVBQWtEO0FBQ2xELHdEQUE0QztBQUU1QyxxRUFBcUU7QUFFckUsSUFBcUIsWUFBWSxvQkFBakMsTUFBcUIsWUFBYSxTQUFRLGVBQU07SUFDeEMsTUFBTSxDQUFDLFFBQWtCO1FBQy9CLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDdEMsNkZBQTZGO1lBQzdGLE1BQU0sQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsb0JBQVMsQ0FBQyxjQUFjLEdBQUcsb0JBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1lBRW5ILE1BQU0sQ0FBQyxZQUFZLEdBQUcsaUJBQU8sQ0FBQyxJQUFJLENBQUE7WUFFbEMsc0NBQXNDO1lBQ3RDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQzdELENBQUMsRUFBRSxzQkFBUyxFQUFFLG1CQUFNLENBQUMsQ0FBQTtJQUN0QixDQUFDO0NBQ0QsQ0FBQTtBQVpvQixZQUFZO0lBRGhDLGtCQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBc0IsRUFBQyxLQUFLLEVBQUUsQ0FBQyxvQkFBUyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBQyxDQUFDO0dBQzdELFlBQVksQ0FZaEM7a0JBWm9CLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1N5c3RlbX0gZnJvbSBcIi4uLy4uL2Vjcy5qc1wiXHJcbmltcG9ydCBFbnRpdGllcyBmcm9tIFwiLi4vLi4vZWNzL2VudGl0aWVzLmpzXCJcclxuaW1wb3J0IFZlY3RvcjMgZnJvbSBcIi4uLy4uL21hdGgvdmVjMy5qc1wiXHJcbmltcG9ydCBNb3Rpb24gZnJvbSBcIi4uL2NvbXBvbmVudHMvbW90aW9uLmpzXCJcclxuaW1wb3J0IFRyYW5zZm9ybSBmcm9tIFwiLi4vY29tcG9uZW50cy90cmFuc2Zvcm0uanNcIlxyXG5pbXBvcnQgV29ybGQsIHtTaW11bGF0b3J9IGZyb20gXCIuLi93b3JsZC5qc1wiXHJcblxyXG4vKiogU2ltdWxhdGVzIHBoeXNpY2FsIG1vdGlvbiBmb3IgZW50aXRpZXMgd2l0aCBhIG1vdGlvbiBjb21wb25lbnQgKi9cclxuQFdvcmxkLnJlZ2lzdGVyLnN5c3RlbTx0eXBlb2YgTW90aW9uU3lzdGVtPih7YWZ0ZXI6IFtTaW11bGF0b3IuQ2F0ZWdvcnkuUGh5c2ljc119KVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb3Rpb25TeXN0ZW0gZXh0ZW5kcyBTeXN0ZW0ge1xyXG5cdHB1YmxpYyB1cGRhdGUoZW50aXRpZXM6IEVudGl0aWVzKTogdm9pZCB7XHJcblx0XHRlbnRpdGllcy5mb3JFYWNoKCh0cmFuc2Zvcm0sIG1vdGlvbikgPT4ge1xyXG5cdFx0XHQvL21vdGlvbi5hY2NlbGVyYXRpb24gKiBTaW11bGF0b3IuZml4ZWREZWx0YVRpbWUgKiBTaW11bGF0b3IuZml4ZWREZWx0YVRpbWUgKyBtb3Rpb24udmVsb2NpdHlcclxuXHRcdFx0bW90aW9uLnZlbG9jaXR5ID0gbW90aW9uLmFjY2VsZXJhdGlvbi5tdWwoU2ltdWxhdG9yLmZpeGVkRGVsdGFUaW1lICogU2ltdWxhdG9yLmZpeGVkRGVsdGFUaW1lKS5hZGQobW90aW9uLnZlbG9jaXR5KVxyXG5cclxuXHRcdFx0bW90aW9uLmFjY2VsZXJhdGlvbiA9IFZlY3RvcjMuemVyb1xyXG5cclxuXHRcdFx0Ly90cmFuc2Zvcm0ucG9zaXRpb24gKyBtb3Rpb24udmVsb2NpdHlcclxuXHRcdFx0dHJhbnNmb3JtLnBvc2l0aW9uID0gdHJhbnNmb3JtLnBvc2l0aW9uLmFkZChtb3Rpb24udmVsb2NpdHkpXHJcblx0XHR9LCBUcmFuc2Zvcm0sIE1vdGlvbilcclxuXHR9XHJcbn0iXX0=