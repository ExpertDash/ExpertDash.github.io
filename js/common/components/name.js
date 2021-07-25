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
const world_js_1 = __importDefault(require("../world.js"));
const ecs_js_1 = require("../../ecs.js");
/**
 * Allows association by name
 */
let Name = class Name extends ecs_js_1.Component {
    constructor(value) {
        super();
        this.value = value;
    }
    valueOf() {
        return this.value;
    }
    toString() {
        return this.value;
    }
};
Name = __decorate([
    world_js_1.default.register.component(),
    __metadata("design:paramtypes", [String])
], Name);
exports.default = Name;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmFtZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tb24vY29tcG9uZW50cy9uYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkRBQStCO0FBQy9CLHlDQUFzQztBQUV0Qzs7R0FFRztBQUVILElBQXFCLElBQUksR0FBekIsTUFBcUIsSUFBSyxTQUFRLGtCQUFTO0lBRzFDLFlBQW1CLEtBQWE7UUFDL0IsS0FBSyxFQUFFLENBQUE7UUFDUCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQTtJQUNuQixDQUFDO0lBRWUsT0FBTztRQUN0QixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUE7SUFDbEIsQ0FBQztJQUVlLFFBQVE7UUFDdkIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFBO0lBQ2xCLENBQUM7Q0FDRCxDQUFBO0FBZm9CLElBQUk7SUFEeEIsa0JBQUssQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFOztHQUNOLElBQUksQ0FleEI7a0JBZm9CLElBQUkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgV29ybGQgZnJvbSBcIi4uL3dvcmxkLmpzXCJcclxuaW1wb3J0IHtDb21wb25lbnR9IGZyb20gXCIuLi8uLi9lY3MuanNcIlxyXG5cclxuLyoqXHJcbiAqIEFsbG93cyBhc3NvY2lhdGlvbiBieSBuYW1lXHJcbiAqL1xyXG5AV29ybGQucmVnaXN0ZXIuY29tcG9uZW50KClcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmFtZSBleHRlbmRzIENvbXBvbmVudCB7XHJcblx0cHVibGljIHZhbHVlOiBzdHJpbmdcclxuXHJcblx0cHVibGljIGNvbnN0cnVjdG9yKHZhbHVlOiBzdHJpbmcpIHtcclxuXHRcdHN1cGVyKClcclxuXHRcdHRoaXMudmFsdWUgPSB2YWx1ZVxyXG5cdH1cclxuXHJcblx0cHVibGljIG92ZXJyaWRlIHZhbHVlT2YoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy52YWx1ZVxyXG5cdH1cclxuXHJcblx0cHVibGljIG92ZXJyaWRlIHRvU3RyaW5nKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMudmFsdWVcclxuXHR9XHJcbn0iXX0=