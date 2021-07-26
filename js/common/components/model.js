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
var _Model_mesh, _Model_material, _Model_vertexBuffer;
import { Component } from "../../ecs.js";
import Material from "../../rendering/material.js";
import Mesh from "../../rendering/mesh.js";
import World from "../world.js";
let Model = class Model extends Component {
    constructor(mesh, material) {
        super();
        _Model_mesh.set(this, void 0);
        _Model_material.set(this, void 0);
        _Model_vertexBuffer.set(this, void 0);
        this.mesh = mesh;
        this.material = material;
    }
    get vertexBuffer() {
        return __classPrivateFieldGet(this, _Model_vertexBuffer, "f");
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
    added(_) {
        __classPrivateFieldSet(this, _Model_vertexBuffer, this.mesh.createVertexBuffer(), "f");
    }
};
_Model_mesh = new WeakMap(), _Model_material = new WeakMap(), _Model_vertexBuffer = new WeakMap();
Model = __decorate([
    World.register.component(),
    __metadata("design:paramtypes", [Mesh, Material])
], Model);
export default Model;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbW9uL2NvbXBvbmVudHMvbW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGNBQWMsQ0FBQTtBQUV0QyxPQUFPLFFBQVEsTUFBTSw2QkFBNkIsQ0FBQTtBQUNsRCxPQUFPLElBQUksTUFBTSx5QkFBeUIsQ0FBQTtBQUMxQyxPQUFPLEtBQUssTUFBTSxhQUFhLENBQUE7QUFHL0IsSUFBcUIsS0FBSyxHQUExQixNQUFxQixLQUFNLFNBQVEsU0FBUztJQUszQyxZQUFtQixJQUFVLEVBQUUsUUFBbUI7UUFDakQsS0FBSyxFQUFFLENBQUE7UUFMUiw4QkFBVztRQUNYLGtDQUFtQjtRQUNuQixzQ0FBMEI7UUFJekIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUE7UUFDaEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUE7SUFDekIsQ0FBQztJQUVELElBQVcsWUFBWTtRQUN0QixPQUFPLHVCQUFBLElBQUksMkJBQWMsQ0FBQTtJQUMxQixDQUFDO0lBRUQsSUFBVyxJQUFJO1FBQ2QsT0FBTyx1QkFBQSxJQUFJLG1CQUFNLENBQUE7SUFDbEIsQ0FBQztJQUVELElBQVcsSUFBSSxDQUFDLEtBQVc7UUFDMUIsdUJBQUEsSUFBSSxlQUFTLEtBQUssTUFBQSxDQUFBO0lBQ25CLENBQUM7SUFFRCxJQUFXLFFBQVE7UUFDbEIsT0FBTyx1QkFBQSxJQUFJLHVCQUFVLENBQUE7SUFDdEIsQ0FBQztJQUVELElBQVcsUUFBUSxDQUFDLEtBQWU7UUFDbEMsdUJBQUEsSUFBSSxtQkFBYSxLQUFLLE1BQUEsQ0FBQTtJQUN2QixDQUFDO0lBRWUsS0FBSyxDQUFDLENBQVM7UUFDOUIsdUJBQUEsSUFBSSx1QkFBaUIsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxNQUFBLENBQUE7SUFDcEQsQ0FBQztDQUNELENBQUE7O0FBbENvQixLQUFLO0lBRHpCLEtBQUssQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFO3FDQU1ELElBQUksRUFBYSxRQUFRO0dBTDlCLEtBQUssQ0FrQ3pCO2VBbENvQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gXCIuLi8uLi9lY3MuanNcIlxyXG5pbXBvcnQgRW50aXR5IGZyb20gXCIuLi8uLi9lY3MvZW50aXR5LmpzXCJcclxuaW1wb3J0IE1hdGVyaWFsIGZyb20gXCIuLi8uLi9yZW5kZXJpbmcvbWF0ZXJpYWwuanNcIlxyXG5pbXBvcnQgTWVzaCBmcm9tIFwiLi4vLi4vcmVuZGVyaW5nL21lc2guanNcIlxyXG5pbXBvcnQgV29ybGQgZnJvbSBcIi4uL3dvcmxkLmpzXCJcclxuXHJcbkBXb3JsZC5yZWdpc3Rlci5jb21wb25lbnQoKVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb2RlbCBleHRlbmRzIENvbXBvbmVudCB7XHJcblx0I21lc2g6IE1lc2hcclxuXHQjbWF0ZXJpYWw6IE1hdGVyaWFsXHJcblx0I3ZlcnRleEJ1ZmZlcjogV2ViR0xCdWZmZXJcclxuXHJcblx0cHVibGljIGNvbnN0cnVjdG9yKG1lc2g6IE1lc2gsIG1hdGVyaWFsPzogTWF0ZXJpYWwpIHtcclxuXHRcdHN1cGVyKClcclxuXHRcdHRoaXMubWVzaCA9IG1lc2hcclxuXHRcdHRoaXMubWF0ZXJpYWwgPSBtYXRlcmlhbFxyXG5cdH1cclxuXHJcblx0cHVibGljIGdldCB2ZXJ0ZXhCdWZmZXIoKTogV2ViR0xCdWZmZXIge1xyXG5cdFx0cmV0dXJuIHRoaXMuI3ZlcnRleEJ1ZmZlclxyXG5cdH1cclxuXHJcblx0cHVibGljIGdldCBtZXNoKCk6IE1lc2gge1xyXG5cdFx0cmV0dXJuIHRoaXMuI21lc2hcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgbWVzaCh2YWx1ZTogTWVzaCkge1xyXG5cdFx0dGhpcy4jbWVzaCA9IHZhbHVlXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0IG1hdGVyaWFsKCk6IE1hdGVyaWFsIHtcclxuXHRcdHJldHVybiB0aGlzLiNtYXRlcmlhbFxyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCBtYXRlcmlhbCh2YWx1ZTogTWF0ZXJpYWwpIHtcclxuXHRcdHRoaXMuI21hdGVyaWFsID0gdmFsdWVcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBvdmVycmlkZSBhZGRlZChfOiBFbnRpdHkpIHtcclxuXHRcdHRoaXMuI3ZlcnRleEJ1ZmZlciA9IHRoaXMubWVzaC5jcmVhdGVWZXJ0ZXhCdWZmZXIoKVxyXG5cdH1cclxufSJdfQ==