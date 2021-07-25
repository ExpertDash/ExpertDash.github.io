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
const ecs_js_1 = require("../../ecs.js");
const vec3_js_1 = __importDefault(require("../../math/vec3.js"));
const world_js_1 = __importDefault(require("../world.js"));
let Motion = class Motion extends ecs_js_1.Component {
    /**
     * @param velocity Initial velocity
     */
    constructor(velocity) {
        super();
        this.mass = 1;
        this.acceleration = vec3_js_1.default.zero;
        this.velocity = velocity ?? vec3_js_1.default.zero;
    }
};
Motion = __decorate([
    world_js_1.default.register.component(),
    __metadata("design:paramtypes", [vec3_js_1.default])
], Motion);
exports.default = Motion;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW90aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1vbi9jb21wb25lbnRzL21vdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLHlDQUFzQztBQUN0QyxpRUFBd0M7QUFDeEMsMkRBQStCO0FBRy9CLElBQXFCLE1BQU0sR0FBM0IsTUFBcUIsTUFBTyxTQUFRLGtCQUFTO0lBSzVDOztPQUVHO0lBQ0gsWUFBWSxRQUFrQjtRQUM3QixLQUFLLEVBQUUsQ0FBQTtRQUNQLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFBO1FBQ2IsSUFBSSxDQUFDLFlBQVksR0FBRyxpQkFBTyxDQUFDLElBQUksQ0FBQTtRQUNoQyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsSUFBSSxpQkFBTyxDQUFDLElBQUksQ0FBQTtJQUN6QyxDQUFDO0NBQ0QsQ0FBQTtBQWRvQixNQUFNO0lBRDFCLGtCQUFLLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRTtxQ0FTSCxpQkFBTztHQVJWLE1BQU0sQ0FjMUI7a0JBZG9CLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSBcIi4uLy4uL2Vjcy5qc1wiXHJcbmltcG9ydCBWZWN0b3IzIGZyb20gXCIuLi8uLi9tYXRoL3ZlYzMuanNcIlxyXG5pbXBvcnQgV29ybGQgZnJvbSBcIi4uL3dvcmxkLmpzXCJcclxuXHJcbkBXb3JsZC5yZWdpc3Rlci5jb21wb25lbnQoKVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb3Rpb24gZXh0ZW5kcyBDb21wb25lbnQge1xyXG5cdG1hc3M6IG51bWJlclxyXG5cdGFjY2VsZXJhdGlvbjogVmVjdG9yM1xyXG5cdHZlbG9jaXR5OiBWZWN0b3IzXHJcblxyXG5cdC8qKlxyXG5cdCAqIEBwYXJhbSB2ZWxvY2l0eSBJbml0aWFsIHZlbG9jaXR5XHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IodmVsb2NpdHk/OiBWZWN0b3IzKSB7XHJcblx0XHRzdXBlcigpXHJcblx0XHR0aGlzLm1hc3MgPSAxXHJcblx0XHR0aGlzLmFjY2VsZXJhdGlvbiA9IFZlY3RvcjMuemVyb1xyXG5cdFx0dGhpcy52ZWxvY2l0eSA9IHZlbG9jaXR5ID8/IFZlY3RvcjMuemVyb1xyXG5cdH1cclxufSJdfQ==