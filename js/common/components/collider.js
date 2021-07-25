var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Collider_collisions, _Collider_boundingBox, _Collider_hull;
import { Component } from "../../ecs.js";
import BoundingBox from "../../physics/boundingBox.js";
import World from "../world.js";
let Collider = class Collider extends Component {
    constructor() {
        super();
        _Collider_collisions.set(this, void 0);
        _Collider_boundingBox.set(this, void 0);
        _Collider_hull.set(this, void 0);
        __classPrivateFieldSet(this, _Collider_collisions, [], "f");
        __classPrivateFieldSet(this, _Collider_boundingBox, null, "f");
    }
    /** Whether the entity is collided with anything */
    get collided() {
        return __classPrivateFieldGet(this, _Collider_collisions, "f").length > 0;
    }
    /** Ongoing collisions on the entity */
    get collisions() {
        return __classPrivateFieldGet(this, _Collider_collisions, "f");
    }
    /** Global bounding box */
    get boundingBox() {
        return __classPrivateFieldGet(this, _Collider_boundingBox, "f");
    }
    /** Global convex hull */
    get hull() {
        return __classPrivateFieldGet(this, _Collider_hull, "f");
    }
    /**
     * Add a new collision
     */
    addCollision(collision) {
        __classPrivateFieldGet(this, _Collider_collisions, "f").push(collision);
    }
    /**
     * Removes all collisions on the entity
     */
    clearCollisions() {
        __classPrivateFieldSet(this, _Collider_collisions, [], "f");
    }
    /**
     * Calculates the bounding box based on the entity's mesh and transform
     */
    calculateBoundingBox(mesh, transform) {
        __classPrivateFieldSet(this, _Collider_boundingBox, new BoundingBox([mesh.boundingBox.min, mesh.boundingBox.max], transform), "f");
    }
    /**
     * Calculates the convex hull based on the entity's mesh and transform
     */
    calculateConvexHull(mesh, transform) {
        __classPrivateFieldSet(this, _Collider_hull, mesh.hull, "f");
    }
};
_Collider_collisions = new WeakMap(), _Collider_boundingBox = new WeakMap(), _Collider_hull = new WeakMap();
Collider = __decorate([
    World.register.component(),
    __metadata("design:paramtypes", [])
], Collider);
export default Collider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbW9uL2NvbXBvbmVudHMvY29sbGlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGNBQWMsQ0FBQTtBQUV0QyxPQUFPLFdBQVcsTUFBTSw4QkFBOEIsQ0FBQTtBQUl0RCxPQUFPLEtBQUssTUFBTSxhQUFhLENBQUE7QUFHL0IsSUFBcUIsUUFBUSxHQUE3QixNQUFxQixRQUFTLFNBQVEsU0FBUztJQUs5QztRQUNDLEtBQUssRUFBRSxDQUFBO1FBTFIsdUNBQXdCO1FBQ3hCLHdDQUF5QjtRQUN6QixpQ0FBZ0I7UUFJZix1QkFBQSxJQUFJLHdCQUFlLEVBQUUsTUFBQSxDQUFBO1FBQ3JCLHVCQUFBLElBQUkseUJBQWdCLElBQUksTUFBQSxDQUFBO0lBQ3pCLENBQUM7SUFFRCxtREFBbUQ7SUFDbkQsSUFBVyxRQUFRO1FBQ2xCLE9BQU8sdUJBQUEsSUFBSSw0QkFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUE7SUFDbkMsQ0FBQztJQUVELHVDQUF1QztJQUN2QyxJQUFXLFVBQVU7UUFDcEIsT0FBTyx1QkFBQSxJQUFJLDRCQUFZLENBQUE7SUFDeEIsQ0FBQztJQUVELDBCQUEwQjtJQUMxQixJQUFXLFdBQVc7UUFDckIsT0FBTyx1QkFBQSxJQUFJLDZCQUFhLENBQUE7SUFDekIsQ0FBQztJQUVELHlCQUF5QjtJQUN6QixJQUFXLElBQUk7UUFDZCxPQUFPLHVCQUFBLElBQUksc0JBQU0sQ0FBQTtJQUNsQixDQUFDO0lBRUQ7O09BRUc7SUFDSSxZQUFZLENBQUMsU0FBb0I7UUFDdkMsdUJBQUEsSUFBSSw0QkFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUNqQyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxlQUFlO1FBQ3JCLHVCQUFBLElBQUksd0JBQWUsRUFBRSxNQUFBLENBQUE7SUFDdEIsQ0FBQztJQUVEOztPQUVHO0lBQ0ksb0JBQW9CLENBQUMsSUFBVSxFQUFFLFNBQW9CO1FBQzNELHVCQUFBLElBQUkseUJBQWdCLElBQUksV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsRUFBRSxTQUFTLENBQUMsTUFBQSxDQUFBO0lBQzdGLENBQUM7SUFFRDs7T0FFRztJQUNJLG1CQUFtQixDQUFDLElBQVUsRUFBRSxTQUFvQjtRQUMxRCx1QkFBQSxJQUFJLGtCQUFTLElBQUksQ0FBQyxJQUFJLE1BQUEsQ0FBQTtJQUN2QixDQUFDO0NBQ0QsQ0FBQTs7QUExRG9CLFFBQVE7SUFENUIsS0FBSyxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUU7O0dBQ04sUUFBUSxDQTBENUI7ZUExRG9CLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSBcIi4uLy4uL2Vjcy5qc1wiXHJcbmltcG9ydCBWZWN0b3IzIGZyb20gXCIuLi8uLi9tYXRoL3ZlYzMuanNcIlxyXG5pbXBvcnQgQm91bmRpbmdCb3ggZnJvbSBcIi4uLy4uL3BoeXNpY3MvYm91bmRpbmdCb3guanNcIlxyXG5pbXBvcnQgQ29sbGlzaW9uIGZyb20gXCIuLi8uLi9waHlzaWNzL2NvbGxpc2lvbi5qc1wiXHJcbmltcG9ydCBNZXNoIGZyb20gXCIuLi8uLi9yZW5kZXJpbmcvbWVzaC5qc1wiXHJcbmltcG9ydCB7VHJhbnNmb3JtfSBmcm9tIFwiLi4vbGliLmpzXCJcclxuaW1wb3J0IFdvcmxkIGZyb20gXCIuLi93b3JsZC5qc1wiXHJcblxyXG5AV29ybGQucmVnaXN0ZXIuY29tcG9uZW50KClcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29sbGlkZXIgZXh0ZW5kcyBDb21wb25lbnQge1xyXG5cdCNjb2xsaXNpb25zOiBDb2xsaXNpb25bXVxyXG5cdCNib3VuZGluZ0JveDogQm91bmRpbmdCb3hcclxuXHQjaHVsbDogVmVjdG9yM1tdXHJcblxyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0c3VwZXIoKVxyXG5cdFx0dGhpcy4jY29sbGlzaW9ucyA9IFtdXHJcblx0XHR0aGlzLiNib3VuZGluZ0JveCA9IG51bGxcclxuXHR9XHJcblxyXG5cdC8qKiBXaGV0aGVyIHRoZSBlbnRpdHkgaXMgY29sbGlkZWQgd2l0aCBhbnl0aGluZyAqL1xyXG5cdHB1YmxpYyBnZXQgY29sbGlkZWQoKTogYm9vbGVhbiB7XHJcblx0XHRyZXR1cm4gdGhpcy4jY29sbGlzaW9ucy5sZW5ndGggPiAwXHJcblx0fVxyXG5cclxuXHQvKiogT25nb2luZyBjb2xsaXNpb25zIG9uIHRoZSBlbnRpdHkgKi9cclxuXHRwdWJsaWMgZ2V0IGNvbGxpc2lvbnMoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy4jY29sbGlzaW9uc1xyXG5cdH1cclxuXHJcblx0LyoqIEdsb2JhbCBib3VuZGluZyBib3ggKi9cclxuXHRwdWJsaWMgZ2V0IGJvdW5kaW5nQm94KCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuI2JvdW5kaW5nQm94XHJcblx0fVxyXG5cclxuXHQvKiogR2xvYmFsIGNvbnZleCBodWxsICovXHJcblx0cHVibGljIGdldCBodWxsKCk6IFZlY3RvcjNbXSB7XHJcblx0XHRyZXR1cm4gdGhpcy4jaHVsbFxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkIGEgbmV3IGNvbGxpc2lvblxyXG5cdCAqL1xyXG5cdHB1YmxpYyBhZGRDb2xsaXNpb24oY29sbGlzaW9uOiBDb2xsaXNpb24pOiB2b2lkIHtcclxuXHRcdHRoaXMuI2NvbGxpc2lvbnMucHVzaChjb2xsaXNpb24pXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZW1vdmVzIGFsbCBjb2xsaXNpb25zIG9uIHRoZSBlbnRpdHlcclxuXHQgKi9cclxuXHRwdWJsaWMgY2xlYXJDb2xsaXNpb25zKCkge1xyXG5cdFx0dGhpcy4jY29sbGlzaW9ucyA9IFtdXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDYWxjdWxhdGVzIHRoZSBib3VuZGluZyBib3ggYmFzZWQgb24gdGhlIGVudGl0eSdzIG1lc2ggYW5kIHRyYW5zZm9ybVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBjYWxjdWxhdGVCb3VuZGluZ0JveChtZXNoOiBNZXNoLCB0cmFuc2Zvcm06IFRyYW5zZm9ybSkge1xyXG5cdFx0dGhpcy4jYm91bmRpbmdCb3ggPSBuZXcgQm91bmRpbmdCb3goW21lc2guYm91bmRpbmdCb3gubWluLCBtZXNoLmJvdW5kaW5nQm94Lm1heF0sIHRyYW5zZm9ybSlcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENhbGN1bGF0ZXMgdGhlIGNvbnZleCBodWxsIGJhc2VkIG9uIHRoZSBlbnRpdHkncyBtZXNoIGFuZCB0cmFuc2Zvcm1cclxuXHQgKi9cclxuXHRwdWJsaWMgY2FsY3VsYXRlQ29udmV4SHVsbChtZXNoOiBNZXNoLCB0cmFuc2Zvcm06IFRyYW5zZm9ybSkge1xyXG5cdFx0dGhpcy4jaHVsbCA9IG1lc2guaHVsbFxyXG5cdH1cclxufSJdfQ==