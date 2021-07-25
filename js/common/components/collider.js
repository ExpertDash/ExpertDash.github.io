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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _Collider_collisions, _Collider_boundingBox, _Collider_hull;
Object.defineProperty(exports, "__esModule", { value: true });
const ecs_js_1 = require("../../ecs.js");
const boundingBox_js_1 = __importDefault(require("../../physics/boundingBox.js"));
const world_js_1 = __importDefault(require("../world.js"));
let Collider = class Collider extends ecs_js_1.Component {
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
        __classPrivateFieldSet(this, _Collider_boundingBox, new boundingBox_js_1.default([mesh.boundingBox.min, mesh.boundingBox.max], transform), "f");
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
    world_js_1.default.register.component(),
    __metadata("design:paramtypes", [])
], Collider);
exports.default = Collider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbW9uL2NvbXBvbmVudHMvY29sbGlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBc0M7QUFFdEMsa0ZBQXNEO0FBRXRELDJEQUErQjtBQUsvQixJQUFxQixRQUFRLEdBQTdCLE1BQXFCLFFBQVMsU0FBUSxrQkFBUztJQUs5QztRQUNDLEtBQUssRUFBRSxDQUFBO1FBTFIsdUNBQXdCO1FBQ3hCLHdDQUF5QjtRQUN6QixpQ0FBZ0I7UUFJZix1QkFBQSxJQUFJLHdCQUFlLEVBQUUsTUFBQSxDQUFBO1FBQ3JCLHVCQUFBLElBQUkseUJBQWdCLElBQUksTUFBQSxDQUFBO0lBQ3pCLENBQUM7SUFFRCxtREFBbUQ7SUFDbkQsSUFBVyxRQUFRO1FBQ2xCLE9BQU8sdUJBQUEsSUFBSSw0QkFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUE7SUFDbkMsQ0FBQztJQUVELHVDQUF1QztJQUN2QyxJQUFXLFVBQVU7UUFDcEIsT0FBTyx1QkFBQSxJQUFJLDRCQUFZLENBQUE7SUFDeEIsQ0FBQztJQUVELDBCQUEwQjtJQUMxQixJQUFXLFdBQVc7UUFDckIsT0FBTyx1QkFBQSxJQUFJLDZCQUFhLENBQUE7SUFDekIsQ0FBQztJQUVELHlCQUF5QjtJQUN6QixJQUFXLElBQUk7UUFDZCxPQUFPLHVCQUFBLElBQUksc0JBQU0sQ0FBQTtJQUNsQixDQUFDO0lBRUQ7O09BRUc7SUFDSSxZQUFZLENBQUMsU0FBb0I7UUFDdkMsdUJBQUEsSUFBSSw0QkFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUNqQyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxlQUFlO1FBQ3JCLHVCQUFBLElBQUksd0JBQWUsRUFBRSxNQUFBLENBQUE7SUFDdEIsQ0FBQztJQUVEOztPQUVHO0lBQ0ksb0JBQW9CLENBQUMsSUFBVSxFQUFFLFNBQW9CO1FBQzNELHVCQUFBLElBQUkseUJBQWdCLElBQUksd0JBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEVBQUUsU0FBUyxDQUFDLE1BQUEsQ0FBQTtJQUM3RixDQUFDO0lBRUQ7O09BRUc7SUFDSSxtQkFBbUIsQ0FBQyxJQUFVLEVBQUUsU0FBb0I7UUFDMUQsdUJBQUEsSUFBSSxrQkFBUyxJQUFJLENBQUMsSUFBSSxNQUFBLENBQUE7SUFDdkIsQ0FBQztDQUNELENBQUE7O0FBMURvQixRQUFRO0lBRDVCLGtCQUFLLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRTs7R0FDTixRQUFRLENBMEQ1QjtrQkExRG9CLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSBcIi4uLy4uL2Vjcy5qc1wiXHJcbmltcG9ydCBWZWN0b3IzIGZyb20gXCIuLi8uLi9tYXRoL3ZlYzMuanNcIlxyXG5pbXBvcnQgQm91bmRpbmdCb3ggZnJvbSBcIi4uLy4uL3BoeXNpY3MvYm91bmRpbmdCb3guanNcIlxyXG5pbXBvcnQgQ29sbGlzaW9uIGZyb20gXCIuLi8uLi9waHlzaWNzL2NvbGxpc2lvbi5qc1wiXHJcbmltcG9ydCBXb3JsZCBmcm9tIFwiLi4vd29ybGQuanNcIlxyXG5pbXBvcnQgVHJhbnNmb3JtIGZyb20gXCIuL3RyYW5zZm9ybS5qc1wiXHJcbmltcG9ydCBNZXNoIGZyb20gXCIuL21lc2guanNcIlxyXG5cclxuQFdvcmxkLnJlZ2lzdGVyLmNvbXBvbmVudCgpXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbGxpZGVyIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHQjY29sbGlzaW9uczogQ29sbGlzaW9uW11cclxuXHQjYm91bmRpbmdCb3g6IEJvdW5kaW5nQm94XHJcblx0I2h1bGw6IFZlY3RvcjNbXVxyXG5cclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdHN1cGVyKClcclxuXHRcdHRoaXMuI2NvbGxpc2lvbnMgPSBbXVxyXG5cdFx0dGhpcy4jYm91bmRpbmdCb3ggPSBudWxsXHJcblx0fVxyXG5cclxuXHQvKiogV2hldGhlciB0aGUgZW50aXR5IGlzIGNvbGxpZGVkIHdpdGggYW55dGhpbmcgKi9cclxuXHRwdWJsaWMgZ2V0IGNvbGxpZGVkKCk6IGJvb2xlYW4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuI2NvbGxpc2lvbnMubGVuZ3RoID4gMFxyXG5cdH1cclxuXHJcblx0LyoqIE9uZ29pbmcgY29sbGlzaW9ucyBvbiB0aGUgZW50aXR5ICovXHJcblx0cHVibGljIGdldCBjb2xsaXNpb25zKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuI2NvbGxpc2lvbnNcclxuXHR9XHJcblxyXG5cdC8qKiBHbG9iYWwgYm91bmRpbmcgYm94ICovXHJcblx0cHVibGljIGdldCBib3VuZGluZ0JveCgpIHtcclxuXHRcdHJldHVybiB0aGlzLiNib3VuZGluZ0JveFxyXG5cdH1cclxuXHJcblx0LyoqIEdsb2JhbCBjb252ZXggaHVsbCAqL1xyXG5cdHB1YmxpYyBnZXQgaHVsbCgpOiBWZWN0b3IzW10ge1xyXG5cdFx0cmV0dXJuIHRoaXMuI2h1bGxcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZCBhIG5ldyBjb2xsaXNpb25cclxuXHQgKi9cclxuXHRwdWJsaWMgYWRkQ29sbGlzaW9uKGNvbGxpc2lvbjogQ29sbGlzaW9uKTogdm9pZCB7XHJcblx0XHR0aGlzLiNjb2xsaXNpb25zLnB1c2goY29sbGlzaW9uKVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVtb3ZlcyBhbGwgY29sbGlzaW9ucyBvbiB0aGUgZW50aXR5XHJcblx0ICovXHJcblx0cHVibGljIGNsZWFyQ29sbGlzaW9ucygpIHtcclxuXHRcdHRoaXMuI2NvbGxpc2lvbnMgPSBbXVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2FsY3VsYXRlcyB0aGUgYm91bmRpbmcgYm94IGJhc2VkIG9uIHRoZSBlbnRpdHkncyBtZXNoIGFuZCB0cmFuc2Zvcm1cclxuXHQgKi9cclxuXHRwdWJsaWMgY2FsY3VsYXRlQm91bmRpbmdCb3gobWVzaDogTWVzaCwgdHJhbnNmb3JtOiBUcmFuc2Zvcm0pIHtcclxuXHRcdHRoaXMuI2JvdW5kaW5nQm94ID0gbmV3IEJvdW5kaW5nQm94KFttZXNoLmJvdW5kaW5nQm94Lm1pbiwgbWVzaC5ib3VuZGluZ0JveC5tYXhdLCB0cmFuc2Zvcm0pXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDYWxjdWxhdGVzIHRoZSBjb252ZXggaHVsbCBiYXNlZCBvbiB0aGUgZW50aXR5J3MgbWVzaCBhbmQgdHJhbnNmb3JtXHJcblx0ICovXHJcblx0cHVibGljIGNhbGN1bGF0ZUNvbnZleEh1bGwobWVzaDogTWVzaCwgdHJhbnNmb3JtOiBUcmFuc2Zvcm0pIHtcclxuXHRcdHRoaXMuI2h1bGwgPSBtZXNoLmh1bGxcclxuXHR9XHJcbn0iXX0=