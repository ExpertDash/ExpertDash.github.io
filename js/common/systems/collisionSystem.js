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
Object.defineProperty(exports, "__esModule", { value: true });
const transform_js_1 = __importDefault(require("../components/transform.js"));
const collider_js_1 = __importDefault(require("../components/collider.js"));
const mesh_js_1 = __importDefault(require("../components/mesh.js"));
const collision_js_1 = __importDefault(require("../../physics/collision.js"));
const ecs_js_1 = require("../../ecs.js");
const world_js_1 = __importStar(require("../world.js"));
const motionSystem_js_1 = __importDefault(require("./motionSystem.js"));
/** Provides collision detection */
let CollisionSystem = class CollisionSystem extends ecs_js_1.System {
    update(entities) {
        let matching = [...entities.with(transform_js_1.default, mesh_js_1.default, collider_js_1.default)];
        //Calculate global bounding boxes
        for (let entity of matching) {
            let [transform, mesh, collider] = [entity.get(transform_js_1.default), entity.get(mesh_js_1.default), entity.get(collider_js_1.default)];
            collider.calculateBoundingBox(mesh, transform);
            collider.clearCollisions();
        }
        //Check collisions
        while (matching.length > 0) {
            let entity = matching.pop();
            let collider = entity.get(collider_js_1.default);
            for (let otherEntity of entities) {
                let otherCollider = otherEntity.get(collider_js_1.default);
                if (collider.boundingBox.collides(otherCollider.boundingBox)) {
                    collider.addCollision(new collision_js_1.default(otherEntity, []));
                    otherCollider.addCollision(new collision_js_1.default(entity, []));
                }
            }
        }
    }
};
CollisionSystem = __decorate([
    world_js_1.default.register.system({ after: [world_js_1.Simulator.Category.Physics, motionSystem_js_1.default] })
], CollisionSystem);
exports.default = CollisionSystem;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGlzaW9uU3lzdGVtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1vbi9zeXN0ZW1zL2NvbGxpc2lvblN5c3RlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4RUFBa0Q7QUFDbEQsNEVBQWdEO0FBQ2hELG9FQUF3QztBQUN4Qyw4RUFBa0Q7QUFDbEQseUNBQW1DO0FBRW5DLHdEQUE0QztBQUM1Qyx3RUFBNEM7QUFFNUMsbUNBQW1DO0FBRW5DLElBQXFCLGVBQWUsR0FBcEMsTUFBcUIsZUFBZ0IsU0FBUSxlQUFNO0lBQ2xDLE1BQU0sQ0FBQyxRQUFrQjtRQUN4QyxJQUFJLFFBQVEsR0FBRyxDQUFDLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxzQkFBUyxFQUFFLGlCQUFJLEVBQUUscUJBQVEsQ0FBQyxDQUFDLENBQUE7UUFFNUQsaUNBQWlDO1FBQ2pDLEtBQUksSUFBSSxNQUFNLElBQUksUUFBUSxFQUFFO1lBQzNCLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxzQkFBUyxDQUFDLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxpQkFBSSxDQUFDLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxxQkFBUSxDQUFDLENBQUMsQ0FBQTtZQUNqRyxRQUFRLENBQUMsb0JBQW9CLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFBO1lBQzlDLFFBQVEsQ0FBQyxlQUFlLEVBQUUsQ0FBQTtTQUMxQjtRQUVELGtCQUFrQjtRQUNsQixPQUFNLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQzFCLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQTtZQUMzQixJQUFJLFFBQVEsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLHFCQUFRLENBQUMsQ0FBQTtZQUVuQyxLQUFJLElBQUksV0FBVyxJQUFJLFFBQVEsRUFBRTtnQkFDaEMsSUFBSSxhQUFhLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQyxxQkFBUSxDQUFDLENBQUE7Z0JBRTdDLElBQUcsUUFBUSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxFQUFFO29CQUM1RCxRQUFRLENBQUMsWUFBWSxDQUFDLElBQUksc0JBQVMsQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQTtvQkFDckQsYUFBYSxDQUFDLFlBQVksQ0FBQyxJQUFJLHNCQUFTLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUE7aUJBQ3JEO2FBQ0Q7U0FDRDtJQUNGLENBQUM7Q0FDRCxDQUFBO0FBMUJvQixlQUFlO0lBRG5DLGtCQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFDLEtBQUssRUFBRSxDQUFDLG9CQUFTLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSx5QkFBWSxDQUFDLEVBQUMsQ0FBQztHQUN0RCxlQUFlLENBMEJuQztrQkExQm9CLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVHJhbnNmb3JtIGZyb20gXCIuLi9jb21wb25lbnRzL3RyYW5zZm9ybS5qc1wiXHJcbmltcG9ydCBDb2xsaWRlciBmcm9tIFwiLi4vY29tcG9uZW50cy9jb2xsaWRlci5qc1wiXHJcbmltcG9ydCBNZXNoIGZyb20gXCIuLi9jb21wb25lbnRzL21lc2guanNcIlxyXG5pbXBvcnQgQ29sbGlzaW9uIGZyb20gXCIuLi8uLi9waHlzaWNzL2NvbGxpc2lvbi5qc1wiXHJcbmltcG9ydCB7U3lzdGVtfSBmcm9tIFwiLi4vLi4vZWNzLmpzXCJcclxuaW1wb3J0IEVudGl0aWVzIGZyb20gXCIuLi8uLi9lY3MvZW50aXRpZXMuanNcIlxyXG5pbXBvcnQgV29ybGQsIHtTaW11bGF0b3J9IGZyb20gXCIuLi93b3JsZC5qc1wiXHJcbmltcG9ydCBNb3Rpb25TeXN0ZW0gZnJvbSBcIi4vbW90aW9uU3lzdGVtLmpzXCJcclxuXHJcbi8qKiBQcm92aWRlcyBjb2xsaXNpb24gZGV0ZWN0aW9uICovXHJcbkBXb3JsZC5yZWdpc3Rlci5zeXN0ZW0oe2FmdGVyOiBbU2ltdWxhdG9yLkNhdGVnb3J5LlBoeXNpY3MsIE1vdGlvblN5c3RlbV19KVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2xsaXNpb25TeXN0ZW0gZXh0ZW5kcyBTeXN0ZW0ge1xyXG5cdHB1YmxpYyBvdmVycmlkZSB1cGRhdGUoZW50aXRpZXM6IEVudGl0aWVzKTogdm9pZCB7XHJcblx0XHRsZXQgbWF0Y2hpbmcgPSBbLi4uZW50aXRpZXMud2l0aChUcmFuc2Zvcm0sIE1lc2gsIENvbGxpZGVyKV1cclxuXHJcblx0XHQvL0NhbGN1bGF0ZSBnbG9iYWwgYm91bmRpbmcgYm94ZXNcclxuXHRcdGZvcihsZXQgZW50aXR5IG9mIG1hdGNoaW5nKSB7XHJcblx0XHRcdGxldCBbdHJhbnNmb3JtLCBtZXNoLCBjb2xsaWRlcl0gPSBbZW50aXR5LmdldChUcmFuc2Zvcm0pLCBlbnRpdHkuZ2V0KE1lc2gpLCBlbnRpdHkuZ2V0KENvbGxpZGVyKV1cclxuXHRcdFx0Y29sbGlkZXIuY2FsY3VsYXRlQm91bmRpbmdCb3gobWVzaCwgdHJhbnNmb3JtKVxyXG5cdFx0XHRjb2xsaWRlci5jbGVhckNvbGxpc2lvbnMoKVxyXG5cdFx0fVxyXG5cclxuXHRcdC8vQ2hlY2sgY29sbGlzaW9uc1xyXG5cdFx0d2hpbGUobWF0Y2hpbmcubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRsZXQgZW50aXR5ID0gbWF0Y2hpbmcucG9wKClcclxuXHRcdFx0bGV0IGNvbGxpZGVyID0gZW50aXR5LmdldChDb2xsaWRlcilcclxuXHJcblx0XHRcdGZvcihsZXQgb3RoZXJFbnRpdHkgb2YgZW50aXRpZXMpIHtcclxuXHRcdFx0XHRsZXQgb3RoZXJDb2xsaWRlciA9IG90aGVyRW50aXR5LmdldChDb2xsaWRlcilcclxuXHJcblx0XHRcdFx0aWYoY29sbGlkZXIuYm91bmRpbmdCb3guY29sbGlkZXMob3RoZXJDb2xsaWRlci5ib3VuZGluZ0JveCkpIHtcclxuXHRcdFx0XHRcdGNvbGxpZGVyLmFkZENvbGxpc2lvbihuZXcgQ29sbGlzaW9uKG90aGVyRW50aXR5LCBbXSkpXHJcblx0XHRcdFx0XHRvdGhlckNvbGxpZGVyLmFkZENvbGxpc2lvbihuZXcgQ29sbGlzaW9uKGVudGl0eSwgW10pKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxufSJdfQ==