var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import Collision from "../../physics/collision.js";
import { System } from "../../ecs.js";
import World, { Simulator } from "../world.js";
import MotionSystem from "./motionSystem.js";
import Transform from "../components/transform.js";
import Model from "../components/model.js";
import Collider from "../components/collider.js";
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
            for (let otherEntity of matching) {
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
    World.register.system(Simulator.phase(Simulator.Category.Physics, { after: [MotionSystem] }))
], CollisionSystem);
export default CollisionSystem;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGlzaW9uU3lzdGVtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1vbi9zeXN0ZW1zL2NvbGxpc2lvblN5c3RlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLFNBQVMsTUFBTSw0QkFBNEIsQ0FBQTtBQUNsRCxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sY0FBYyxDQUFBO0FBRW5DLE9BQU8sS0FBSyxFQUFFLEVBQUMsU0FBUyxFQUFDLE1BQU0sYUFBYSxDQUFBO0FBQzVDLE9BQU8sWUFBWSxNQUFNLG1CQUFtQixDQUFBO0FBQzVDLE9BQU8sU0FBUyxNQUFNLDRCQUE0QixDQUFBO0FBQ2xELE9BQU8sS0FBSyxNQUFNLHdCQUF3QixDQUFBO0FBQzFDLE9BQU8sUUFBUSxNQUFNLDJCQUEyQixDQUFBO0FBR2hELG1DQUFtQztBQUVuQyxJQUFxQixlQUFlLEdBQXBDLE1BQXFCLGVBQWdCLFNBQVEsTUFBTTtJQUNsQyxNQUFNLENBQUMsUUFBa0I7UUFDeEMsSUFBSSxRQUFRLEdBQUcsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFBO1FBRTdELGlDQUFpQztRQUNqQyxLQUFJLElBQUksTUFBTSxJQUFJLFFBQVEsRUFBRTtZQUMzQixJQUFJLENBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUE7WUFDbkcsUUFBUSxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUE7WUFDcEQsUUFBUSxDQUFDLGVBQWUsRUFBRSxDQUFBO1NBQzFCO1FBRUQsa0JBQWtCO1FBQ2xCLE9BQU0sUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDMUIsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFBO1lBQzNCLElBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUE7WUFFbkMsS0FBSSxJQUFJLFdBQVcsSUFBSSxRQUFRLEVBQUU7Z0JBQ2hDLElBQUksYUFBYSxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUE7Z0JBRTdDLElBQUcsUUFBUSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxFQUFFO29CQUM1RCxRQUFRLENBQUMsWUFBWSxDQUFDLElBQUksU0FBUyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFBO29CQUNyRCxhQUFhLENBQUMsWUFBWSxDQUFDLElBQUksU0FBUyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFBO2lCQUNyRDthQUNEO1NBQ0Q7SUFDRixDQUFDO0NBQ0QsQ0FBQTtBQTFCb0IsZUFBZTtJQURuQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLEVBQUMsS0FBSyxFQUFFLENBQUMsWUFBWSxDQUFDLEVBQUMsQ0FBQyxDQUFDO0dBQ3ZFLGVBQWUsQ0EwQm5DO2VBMUJvQixlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbGxpc2lvbiBmcm9tIFwiLi4vLi4vcGh5c2ljcy9jb2xsaXNpb24uanNcIlxyXG5pbXBvcnQge1N5c3RlbX0gZnJvbSBcIi4uLy4uL2Vjcy5qc1wiXHJcbmltcG9ydCBFbnRpdGllcyBmcm9tIFwiLi4vLi4vZWNzL2VudGl0aWVzLmpzXCJcclxuaW1wb3J0IFdvcmxkLCB7U2ltdWxhdG9yfSBmcm9tIFwiLi4vd29ybGQuanNcIlxyXG5pbXBvcnQgTW90aW9uU3lzdGVtIGZyb20gXCIuL21vdGlvblN5c3RlbS5qc1wiXHJcbmltcG9ydCBUcmFuc2Zvcm0gZnJvbSBcIi4uL2NvbXBvbmVudHMvdHJhbnNmb3JtLmpzXCJcclxuaW1wb3J0IE1vZGVsIGZyb20gXCIuLi9jb21wb25lbnRzL21vZGVsLmpzXCJcclxuaW1wb3J0IENvbGxpZGVyIGZyb20gXCIuLi9jb21wb25lbnRzL2NvbGxpZGVyLmpzXCJcclxuaW1wb3J0IE5hbWUgZnJvbSBcIi4uL2NvbXBvbmVudHMvbmFtZS5qc1wiXHJcblxyXG4vKiogUHJvdmlkZXMgY29sbGlzaW9uIGRldGVjdGlvbiAqL1xyXG5AV29ybGQucmVnaXN0ZXIuc3lzdGVtKFNpbXVsYXRvci5waGFzZShTaW11bGF0b3IuQ2F0ZWdvcnkuUGh5c2ljcywge2FmdGVyOiBbTW90aW9uU3lzdGVtXX0pKVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2xsaXNpb25TeXN0ZW0gZXh0ZW5kcyBTeXN0ZW0ge1xyXG5cdHB1YmxpYyBvdmVycmlkZSB1cGRhdGUoZW50aXRpZXM6IEVudGl0aWVzKTogdm9pZCB7XHJcblx0XHRsZXQgbWF0Y2hpbmcgPSBbLi4uZW50aXRpZXMud2l0aChUcmFuc2Zvcm0sIE1vZGVsLCBDb2xsaWRlcildXHJcblxyXG5cdFx0Ly9DYWxjdWxhdGUgZ2xvYmFsIGJvdW5kaW5nIGJveGVzXHJcblx0XHRmb3IobGV0IGVudGl0eSBvZiBtYXRjaGluZykge1xyXG5cdFx0XHRsZXQgW3RyYW5zZm9ybSwgbW9kZWwsIGNvbGxpZGVyXSA9IFtlbnRpdHkuZ2V0KFRyYW5zZm9ybSksIGVudGl0eS5nZXQoTW9kZWwpLCBlbnRpdHkuZ2V0KENvbGxpZGVyKV1cclxuXHRcdFx0Y29sbGlkZXIuY2FsY3VsYXRlQm91bmRpbmdCb3gobW9kZWwubWVzaCwgdHJhbnNmb3JtKVxyXG5cdFx0XHRjb2xsaWRlci5jbGVhckNvbGxpc2lvbnMoKVxyXG5cdFx0fVxyXG5cclxuXHRcdC8vQ2hlY2sgY29sbGlzaW9uc1xyXG5cdFx0d2hpbGUobWF0Y2hpbmcubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRsZXQgZW50aXR5ID0gbWF0Y2hpbmcucG9wKClcclxuXHRcdFx0bGV0IGNvbGxpZGVyID0gZW50aXR5LmdldChDb2xsaWRlcilcclxuXHJcblx0XHRcdGZvcihsZXQgb3RoZXJFbnRpdHkgb2YgbWF0Y2hpbmcpIHtcclxuXHRcdFx0XHRsZXQgb3RoZXJDb2xsaWRlciA9IG90aGVyRW50aXR5LmdldChDb2xsaWRlcilcclxuXHJcblx0XHRcdFx0aWYoY29sbGlkZXIuYm91bmRpbmdCb3guY29sbGlkZXMob3RoZXJDb2xsaWRlci5ib3VuZGluZ0JveCkpIHtcclxuXHRcdFx0XHRcdGNvbGxpZGVyLmFkZENvbGxpc2lvbihuZXcgQ29sbGlzaW9uKG90aGVyRW50aXR5LCBbXSkpXHJcblx0XHRcdFx0XHRvdGhlckNvbGxpZGVyLmFkZENvbGxpc2lvbihuZXcgQ29sbGlzaW9uKGVudGl0eSwgW10pKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxufSJdfQ==