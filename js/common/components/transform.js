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
const mat4_js_1 = __importDefault(require("../../math/mat4.js"));
const vec3_js_1 = __importDefault(require("../../math/vec3.js"));
const ecs_js_1 = require("../../ecs.js");
const world_js_1 = __importDefault(require("../world.js"));
let Transform = class Transform extends ecs_js_1.Component {
    constructor({ position, rotation, scale } = {}) {
        super();
        this.position = position ?? vec3_js_1.default.zero;
        this.rotation = rotation ?? 0;
        this.scale = scale ?? vec3_js_1.default.one;
    }
    /** Global transformation matrix */
    get matrix() {
        return mat4_js_1.default.trs(this.position, this.rotation * Math.PI / 180, this.scale);
    }
};
Transform = __decorate([
    world_js_1.default.register.component(),
    __metadata("design:paramtypes", [Object])
], Transform);
exports.default = Transform;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNmb3JtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1vbi9jb21wb25lbnRzL3RyYW5zZm9ybS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLGlFQUEwQztBQUMxQyxpRUFBd0M7QUFDeEMseUNBQXNDO0FBQ3RDLDJEQUErQjtBQUcvQixJQUFxQixTQUFTLEdBQTlCLE1BQXFCLFNBQVUsU0FBUSxrQkFBUztJQUsvQyxZQUFZLEVBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxLQUFLLEtBQWdCLEVBQUU7UUFDdkQsS0FBSyxFQUFFLENBQUE7UUFDUCxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsSUFBSSxpQkFBTyxDQUFDLElBQUksQ0FBQTtRQUN4QyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsSUFBSSxDQUFDLENBQUE7UUFDN0IsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLElBQUksaUJBQU8sQ0FBQyxHQUFHLENBQUE7SUFDbEMsQ0FBQztJQUVELG1DQUFtQztJQUNuQyxJQUFXLE1BQU07UUFDaEIsT0FBTyxpQkFBUyxDQUFDLEdBQUcsQ0FDbkIsSUFBSSxDQUFDLFFBQVEsRUFDYixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsR0FBRyxFQUM3QixJQUFJLENBQUMsS0FBSyxDQUNWLENBQUE7SUFDRixDQUFDO0NBQ0QsQ0FBQTtBQXBCb0IsU0FBUztJQUQ3QixrQkFBSyxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUU7O0dBQ04sU0FBUyxDQW9CN0I7a0JBcEJvQixTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE1hdHJpeDR4NCBmcm9tIFwiLi4vLi4vbWF0aC9tYXQ0LmpzXCJcclxuaW1wb3J0IFZlY3RvcjMgZnJvbSBcIi4uLy4uL21hdGgvdmVjMy5qc1wiXHJcbmltcG9ydCB7Q29tcG9uZW50fSBmcm9tIFwiLi4vLi4vZWNzLmpzXCJcclxuaW1wb3J0IFdvcmxkIGZyb20gXCIuLi93b3JsZC5qc1wiXHJcblxyXG5AV29ybGQucmVnaXN0ZXIuY29tcG9uZW50KClcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVHJhbnNmb3JtIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHRwdWJsaWMgcG9zaXRpb246IFZlY3RvcjNcclxuXHRwdWJsaWMgcm90YXRpb246IG51bWJlclxyXG5cdHB1YmxpYyBzY2FsZTogVmVjdG9yM1xyXG5cclxuXHRjb25zdHJ1Y3Rvcih7cG9zaXRpb24sIHJvdGF0aW9uLCBzY2FsZX06IFBhcmFtZXRlcnMgPSB7fSkge1xyXG5cdFx0c3VwZXIoKVxyXG5cdFx0dGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uID8/IFZlY3RvcjMuemVyb1xyXG5cdFx0dGhpcy5yb3RhdGlvbiA9IHJvdGF0aW9uID8/IDBcclxuXHRcdHRoaXMuc2NhbGUgPSBzY2FsZSA/PyBWZWN0b3IzLm9uZVxyXG5cdH1cclxuXHJcblx0LyoqIEdsb2JhbCB0cmFuc2Zvcm1hdGlvbiBtYXRyaXggKi9cclxuXHRwdWJsaWMgZ2V0IG1hdHJpeCgpOiBNYXRyaXg0eDQge1xyXG5cdFx0cmV0dXJuIE1hdHJpeDR4NC50cnMoXHJcblx0XHRcdHRoaXMucG9zaXRpb24sXHJcblx0XHRcdHRoaXMucm90YXRpb24gKiBNYXRoLlBJIC8gMTgwLFxyXG5cdFx0XHR0aGlzLnNjYWxlXHJcblx0XHQpXHJcblx0fVxyXG59XHJcblxyXG5pbnRlcmZhY2UgUGFyYW1ldGVycyB7XHJcblx0cG9zaXRpb24/OiBWZWN0b3IzXHJcblx0cm90YXRpb24/OiBudW1iZXJcclxuXHRzY2FsZT86IFZlY3RvcjNcclxufSJdfQ==