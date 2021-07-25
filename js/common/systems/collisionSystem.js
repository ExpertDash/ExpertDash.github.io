var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import Collision from "../../physics/collision.js";
import { System } from "../../ecs.js";
import World, { Simulator } from "../world.js";
import { Collider, Model, MotionSystem, Transform } from "../lib.js";
/** Provides collision detection */
let CollisionSystem = class CollisionSystem extends System {
    update(entities) {
        let matching = [...entities.with(Transform, Model, Collider)];
        //Calculate global bounding boxes
        for (let entity of matching) {
            let [transform, model, collider] = [entity.get(Transform), entity.get(Model), entity.get(Collider)];
            collider.calculateBoundingBox(model.mesh, transform);
            collider.clearCollisions();
        }
        //Check collisions
        while (matching.length > 0) {
            let entity = matching.pop();
            let collider = entity.get(Collider);
            for (let otherEntity of entities) {
                let otherCollider = otherEntity.get(Collider);
                if (collider.boundingBox.collides(otherCollider.boundingBox)) {
                    collider.addCollision(new Collision(otherEntity, []));
                    otherCollider.addCollision(new Collision(entity, []));
                }
            }
        }
    }
};
CollisionSystem = __decorate([
    World.register.system({ after: [Simulator.Category.Physics, MotionSystem] })
], CollisionSystem);
export default CollisionSystem;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGlzaW9uU3lzdGVtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1vbi9zeXN0ZW1zL2NvbGxpc2lvblN5c3RlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLFNBQVMsTUFBTSw0QkFBNEIsQ0FBQTtBQUNsRCxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sY0FBYyxDQUFBO0FBRW5DLE9BQU8sS0FBSyxFQUFFLEVBQUMsU0FBUyxFQUFDLE1BQU0sYUFBYSxDQUFBO0FBQzVDLE9BQU8sRUFBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUMsTUFBTSxXQUFXLENBQUE7QUFFbEUsbUNBQW1DO0FBRW5DLElBQXFCLGVBQWUsR0FBcEMsTUFBcUIsZUFBZ0IsU0FBUSxNQUFNO0lBQ2xDLE1BQU0sQ0FBQyxRQUFrQjtRQUN4QyxJQUFJLFFBQVEsR0FBRyxDQUFDLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUE7UUFFN0QsaUNBQWlDO1FBQ2pDLEtBQUksSUFBSSxNQUFNLElBQUksUUFBUSxFQUFFO1lBQzNCLElBQUksQ0FBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQTtZQUNuRyxRQUFRLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQTtZQUNwRCxRQUFRLENBQUMsZUFBZSxFQUFFLENBQUE7U0FDMUI7UUFFRCxrQkFBa0I7UUFDbEIsT0FBTSxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUMxQixJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUE7WUFDM0IsSUFBSSxRQUFRLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQTtZQUVuQyxLQUFJLElBQUksV0FBVyxJQUFJLFFBQVEsRUFBRTtnQkFDaEMsSUFBSSxhQUFhLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQTtnQkFFN0MsSUFBRyxRQUFRLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLEVBQUU7b0JBQzVELFFBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxTQUFTLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUE7b0JBQ3JELGFBQWEsQ0FBQyxZQUFZLENBQUMsSUFBSSxTQUFTLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUE7aUJBQ3JEO2FBQ0Q7U0FDRDtJQUNGLENBQUM7Q0FDRCxDQUFBO0FBMUJvQixlQUFlO0lBRG5DLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUMsS0FBSyxFQUFFLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDLEVBQUMsQ0FBQztHQUN0RCxlQUFlLENBMEJuQztlQTFCb0IsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb2xsaXNpb24gZnJvbSBcIi4uLy4uL3BoeXNpY3MvY29sbGlzaW9uLmpzXCJcclxuaW1wb3J0IHtTeXN0ZW19IGZyb20gXCIuLi8uLi9lY3MuanNcIlxyXG5pbXBvcnQgRW50aXRpZXMgZnJvbSBcIi4uLy4uL2Vjcy9lbnRpdGllcy5qc1wiXHJcbmltcG9ydCBXb3JsZCwge1NpbXVsYXRvcn0gZnJvbSBcIi4uL3dvcmxkLmpzXCJcclxuaW1wb3J0IHtDb2xsaWRlciwgTW9kZWwsIE1vdGlvblN5c3RlbSwgVHJhbnNmb3JtfSBmcm9tIFwiLi4vbGliLmpzXCJcclxuXHJcbi8qKiBQcm92aWRlcyBjb2xsaXNpb24gZGV0ZWN0aW9uICovXHJcbkBXb3JsZC5yZWdpc3Rlci5zeXN0ZW0oe2FmdGVyOiBbU2ltdWxhdG9yLkNhdGVnb3J5LlBoeXNpY3MsIE1vdGlvblN5c3RlbV19KVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2xsaXNpb25TeXN0ZW0gZXh0ZW5kcyBTeXN0ZW0ge1xyXG5cdHB1YmxpYyBvdmVycmlkZSB1cGRhdGUoZW50aXRpZXM6IEVudGl0aWVzKTogdm9pZCB7XHJcblx0XHRsZXQgbWF0Y2hpbmcgPSBbLi4uZW50aXRpZXMud2l0aChUcmFuc2Zvcm0sIE1vZGVsLCBDb2xsaWRlcildXHJcblxyXG5cdFx0Ly9DYWxjdWxhdGUgZ2xvYmFsIGJvdW5kaW5nIGJveGVzXHJcblx0XHRmb3IobGV0IGVudGl0eSBvZiBtYXRjaGluZykge1xyXG5cdFx0XHRsZXQgW3RyYW5zZm9ybSwgbW9kZWwsIGNvbGxpZGVyXSA9IFtlbnRpdHkuZ2V0KFRyYW5zZm9ybSksIGVudGl0eS5nZXQoTW9kZWwpLCBlbnRpdHkuZ2V0KENvbGxpZGVyKV1cclxuXHRcdFx0Y29sbGlkZXIuY2FsY3VsYXRlQm91bmRpbmdCb3gobW9kZWwubWVzaCwgdHJhbnNmb3JtKVxyXG5cdFx0XHRjb2xsaWRlci5jbGVhckNvbGxpc2lvbnMoKVxyXG5cdFx0fVxyXG5cclxuXHRcdC8vQ2hlY2sgY29sbGlzaW9uc1xyXG5cdFx0d2hpbGUobWF0Y2hpbmcubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRsZXQgZW50aXR5ID0gbWF0Y2hpbmcucG9wKClcclxuXHRcdFx0bGV0IGNvbGxpZGVyID0gZW50aXR5LmdldChDb2xsaWRlcilcclxuXHJcblx0XHRcdGZvcihsZXQgb3RoZXJFbnRpdHkgb2YgZW50aXRpZXMpIHtcclxuXHRcdFx0XHRsZXQgb3RoZXJDb2xsaWRlciA9IG90aGVyRW50aXR5LmdldChDb2xsaWRlcilcclxuXHJcblx0XHRcdFx0aWYoY29sbGlkZXIuYm91bmRpbmdCb3guY29sbGlkZXMob3RoZXJDb2xsaWRlci5ib3VuZGluZ0JveCkpIHtcclxuXHRcdFx0XHRcdGNvbGxpZGVyLmFkZENvbGxpc2lvbihuZXcgQ29sbGlzaW9uKG90aGVyRW50aXR5LCBbXSkpXHJcblx0XHRcdFx0XHRvdGhlckNvbGxpZGVyLmFkZENvbGxpc2lvbihuZXcgQ29sbGlzaW9uKGVudGl0eSwgW10pKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxufSJdfQ==