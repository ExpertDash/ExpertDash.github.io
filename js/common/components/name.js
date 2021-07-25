var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import World from "../world.js";
import { Component } from "../../ecs.js";
/**
 * Allows association by name
 */
let Name = class Name extends Component {
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
    World.register.component(),
    __metadata("design:paramtypes", [String])
], Name);
export default Name;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmFtZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tb24vY29tcG9uZW50cy9uYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sS0FBSyxNQUFNLGFBQWEsQ0FBQTtBQUMvQixPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sY0FBYyxDQUFBO0FBRXRDOztHQUVHO0FBRUgsSUFBcUIsSUFBSSxHQUF6QixNQUFxQixJQUFLLFNBQVEsU0FBUztJQUcxQyxZQUFtQixLQUFhO1FBQy9CLEtBQUssRUFBRSxDQUFBO1FBQ1AsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUE7SUFDbkIsQ0FBQztJQUVlLE9BQU87UUFDdEIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFBO0lBQ2xCLENBQUM7SUFFZSxRQUFRO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQTtJQUNsQixDQUFDO0NBQ0QsQ0FBQTtBQWZvQixJQUFJO0lBRHhCLEtBQUssQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFOztHQUNOLElBQUksQ0FleEI7ZUFmb0IsSUFBSSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBXb3JsZCBmcm9tIFwiLi4vd29ybGQuanNcIlxyXG5pbXBvcnQge0NvbXBvbmVudH0gZnJvbSBcIi4uLy4uL2Vjcy5qc1wiXHJcblxyXG4vKipcclxuICogQWxsb3dzIGFzc29jaWF0aW9uIGJ5IG5hbWVcclxuICovXHJcbkBXb3JsZC5yZWdpc3Rlci5jb21wb25lbnQoKVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOYW1lIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHRwdWJsaWMgdmFsdWU6IHN0cmluZ1xyXG5cclxuXHRwdWJsaWMgY29uc3RydWN0b3IodmFsdWU6IHN0cmluZykge1xyXG5cdFx0c3VwZXIoKVxyXG5cdFx0dGhpcy52YWx1ZSA9IHZhbHVlXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgb3ZlcnJpZGUgdmFsdWVPZigpIHtcclxuXHRcdHJldHVybiB0aGlzLnZhbHVlXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgb3ZlcnJpZGUgdG9TdHJpbmcoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy52YWx1ZVxyXG5cdH1cclxufSJdfQ==