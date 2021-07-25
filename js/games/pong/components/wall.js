"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const world_js_1 = __importDefault(require("../../../common/world.js"));
const ecs_js_1 = require("../../../ecs.js");
let Wall = class Wall extends ecs_js_1.Component {
};
Wall = __decorate([
    world_js_1.default.register.component()
], Wall);
exports.default = Wall;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FsbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9nYW1lcy9wb25nL2NvbXBvbmVudHMvd2FsbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHdFQUE0QztBQUM1Qyw0Q0FBeUM7QUFHekMsSUFBcUIsSUFBSSxHQUF6QixNQUFxQixJQUFLLFNBQVEsa0JBQVM7Q0FBRyxDQUFBO0FBQXpCLElBQUk7SUFEeEIsa0JBQUssQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFO0dBQ04sSUFBSSxDQUFxQjtrQkFBekIsSUFBSSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBXb3JsZCBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3dvcmxkLmpzXCJcclxuaW1wb3J0IHtDb21wb25lbnR9IGZyb20gXCIuLi8uLi8uLi9lY3MuanNcIlxyXG5cclxuQFdvcmxkLnJlZ2lzdGVyLmNvbXBvbmVudCgpXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdhbGwgZXh0ZW5kcyBDb21wb25lbnQge30iXX0=