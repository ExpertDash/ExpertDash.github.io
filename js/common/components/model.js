var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _Model_mesh, _Model_material;
import { Component } from "../../ecs.js";
import Material from "../../rendering/material.js";
import Mesh from "../../rendering/mesh.js";
import World from "../world.js";
let Model = class Model extends Component {
    constructor(mesh, material) {
        super();
        _Model_mesh.set(this, void 0);
        _Model_material.set(this, void 0);
        this.mesh = mesh;
        this.material = material;
    }
    get mesh() {
        return __classPrivateFieldGet(this, _Model_mesh, "f");
    }
    set mesh(value) {
        __classPrivateFieldSet(this, _Model_mesh, value, "f");
    }
    get material() {
        return __classPrivateFieldGet(this, _Model_material, "f");
    }
    set material(value) {
        __classPrivateFieldSet(this, _Model_material, value, "f");
    }
};
_Model_mesh = new WeakMap(), _Model_material = new WeakMap();
Model = __decorate([
    World.register.component(),
    __metadata("design:paramtypes", [Mesh, Material])
], Model);
export default Model;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbW9uL2NvbXBvbmVudHMvbW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGNBQWMsQ0FBQTtBQUN0QyxPQUFPLFFBQVEsTUFBTSw2QkFBNkIsQ0FBQTtBQUNsRCxPQUFPLElBQUksTUFBTSx5QkFBeUIsQ0FBQTtBQUMxQyxPQUFPLEtBQUssTUFBTSxhQUFhLENBQUE7QUFHL0IsSUFBcUIsS0FBSyxHQUExQixNQUFxQixLQUFNLFNBQVEsU0FBUztJQUkzQyxZQUFtQixJQUFVLEVBQUUsUUFBbUI7UUFDakQsS0FBSyxFQUFFLENBQUE7UUFKUiw4QkFBVztRQUNYLGtDQUFtQjtRQUlsQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQTtRQUNoQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQTtJQUN6QixDQUFDO0lBRUQsSUFBVyxJQUFJO1FBQ2QsT0FBTyx1QkFBQSxJQUFJLG1CQUFNLENBQUE7SUFDbEIsQ0FBQztJQUVELElBQVcsSUFBSSxDQUFDLEtBQVc7UUFDMUIsdUJBQUEsSUFBSSxlQUFTLEtBQUssTUFBQSxDQUFBO0lBQ25CLENBQUM7SUFFRCxJQUFXLFFBQVE7UUFDbEIsT0FBTyx1QkFBQSxJQUFJLHVCQUFVLENBQUE7SUFDdEIsQ0FBQztJQUVELElBQVcsUUFBUSxDQUFDLEtBQWU7UUFDbEMsdUJBQUEsSUFBSSxtQkFBYSxLQUFLLE1BQUEsQ0FBQTtJQUN2QixDQUFDO0NBQ0QsQ0FBQTs7QUF6Qm9CLEtBQUs7SUFEekIsS0FBSyxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUU7cUNBS0QsSUFBSSxFQUFhLFFBQVE7R0FKOUIsS0FBSyxDQXlCekI7ZUF6Qm9CLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSBcIi4uLy4uL2Vjcy5qc1wiXHJcbmltcG9ydCBNYXRlcmlhbCBmcm9tIFwiLi4vLi4vcmVuZGVyaW5nL21hdGVyaWFsLmpzXCJcclxuaW1wb3J0IE1lc2ggZnJvbSBcIi4uLy4uL3JlbmRlcmluZy9tZXNoLmpzXCJcclxuaW1wb3J0IFdvcmxkIGZyb20gXCIuLi93b3JsZC5qc1wiXHJcblxyXG5AV29ybGQucmVnaXN0ZXIuY29tcG9uZW50KClcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9kZWwgZXh0ZW5kcyBDb21wb25lbnQge1xyXG5cdCNtZXNoOiBNZXNoXHJcblx0I21hdGVyaWFsOiBNYXRlcmlhbFxyXG5cclxuXHRwdWJsaWMgY29uc3RydWN0b3IobWVzaDogTWVzaCwgbWF0ZXJpYWw/OiBNYXRlcmlhbCkge1xyXG5cdFx0c3VwZXIoKVxyXG5cdFx0dGhpcy5tZXNoID0gbWVzaFxyXG5cdFx0dGhpcy5tYXRlcmlhbCA9IG1hdGVyaWFsXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0IG1lc2goKTogTWVzaCB7XHJcblx0XHRyZXR1cm4gdGhpcy4jbWVzaFxyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCBtZXNoKHZhbHVlOiBNZXNoKSB7XHJcblx0XHR0aGlzLiNtZXNoID0gdmFsdWVcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXQgbWF0ZXJpYWwoKTogTWF0ZXJpYWwge1xyXG5cdFx0cmV0dXJuIHRoaXMuI21hdGVyaWFsXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IG1hdGVyaWFsKHZhbHVlOiBNYXRlcmlhbCkge1xyXG5cdFx0dGhpcy4jbWF0ZXJpYWwgPSB2YWx1ZVxyXG5cdH1cclxufSJdfQ==