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
    World.register.system({
        after: [Simulator.Category.Physics, MotionSystem],
        before: [Simulator.Category.Input]
    })
], CollisionSystem);
export default CollisionSystem;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGlzaW9uU3lzdGVtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1vbi9zeXN0ZW1zL2NvbGxpc2lvblN5c3RlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLFNBQVMsTUFBTSw0QkFBNEIsQ0FBQTtBQUNsRCxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sY0FBYyxDQUFBO0FBRW5DLE9BQU8sS0FBSyxFQUFFLEVBQUMsU0FBUyxFQUFDLE1BQU0sYUFBYSxDQUFBO0FBQzVDLE9BQU8sWUFBWSxNQUFNLG1CQUFtQixDQUFBO0FBQzVDLE9BQU8sU0FBUyxNQUFNLDRCQUE0QixDQUFBO0FBQ2xELE9BQU8sS0FBSyxNQUFNLHdCQUF3QixDQUFBO0FBQzFDLE9BQU8sUUFBUSxNQUFNLDJCQUEyQixDQUFBO0FBRWhELG1DQUFtQztBQUtuQyxJQUFxQixlQUFlLEdBQXBDLE1BQXFCLGVBQWdCLFNBQVEsTUFBTTtJQUNsQyxNQUFNLENBQUMsUUFBa0I7UUFDeEMsSUFBSSxRQUFRLEdBQUcsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFBO1FBRTdELGlDQUFpQztRQUNqQyxLQUFJLElBQUksTUFBTSxJQUFJLFFBQVEsRUFBRTtZQUMzQixJQUFJLENBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUE7WUFDbkcsUUFBUSxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUE7WUFDcEQsUUFBUSxDQUFDLGVBQWUsRUFBRSxDQUFBO1NBQzFCO1FBRUQsa0JBQWtCO1FBQ2xCLE9BQU0sUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDMUIsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFBO1lBQzNCLElBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUE7WUFFbkMsS0FBSSxJQUFJLFdBQVcsSUFBSSxRQUFRLEVBQUU7Z0JBQ2hDLElBQUksYUFBYSxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUE7Z0JBRTdDLElBQUcsUUFBUSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxFQUFFO29CQUM1RCxRQUFRLENBQUMsWUFBWSxDQUFDLElBQUksU0FBUyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFBO29CQUNyRCxhQUFhLENBQUMsWUFBWSxDQUFDLElBQUksU0FBUyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFBO2lCQUNyRDthQUNEO1NBQ0Q7SUFDRixDQUFDO0NBQ0QsQ0FBQTtBQTFCb0IsZUFBZTtJQUpuQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztRQUN0QixLQUFLLEVBQUUsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUM7UUFDakQsTUFBTSxFQUFFLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUM7S0FDbEMsQ0FBQztHQUNtQixlQUFlLENBMEJuQztlQTFCb0IsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb2xsaXNpb24gZnJvbSBcIi4uLy4uL3BoeXNpY3MvY29sbGlzaW9uLmpzXCJcclxuaW1wb3J0IHtTeXN0ZW19IGZyb20gXCIuLi8uLi9lY3MuanNcIlxyXG5pbXBvcnQgRW50aXRpZXMgZnJvbSBcIi4uLy4uL2Vjcy9lbnRpdGllcy5qc1wiXHJcbmltcG9ydCBXb3JsZCwge1NpbXVsYXRvcn0gZnJvbSBcIi4uL3dvcmxkLmpzXCJcclxuaW1wb3J0IE1vdGlvblN5c3RlbSBmcm9tIFwiLi9tb3Rpb25TeXN0ZW0uanNcIlxyXG5pbXBvcnQgVHJhbnNmb3JtIGZyb20gXCIuLi9jb21wb25lbnRzL3RyYW5zZm9ybS5qc1wiXHJcbmltcG9ydCBNb2RlbCBmcm9tIFwiLi4vY29tcG9uZW50cy9tb2RlbC5qc1wiXHJcbmltcG9ydCBDb2xsaWRlciBmcm9tIFwiLi4vY29tcG9uZW50cy9jb2xsaWRlci5qc1wiXHJcblxyXG4vKiogUHJvdmlkZXMgY29sbGlzaW9uIGRldGVjdGlvbiAqL1xyXG5AV29ybGQucmVnaXN0ZXIuc3lzdGVtKHtcclxuXHRhZnRlcjogW1NpbXVsYXRvci5DYXRlZ29yeS5QaHlzaWNzLCBNb3Rpb25TeXN0ZW1dLFxyXG5cdGJlZm9yZTogW1NpbXVsYXRvci5DYXRlZ29yeS5JbnB1dF1cclxufSlcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29sbGlzaW9uU3lzdGVtIGV4dGVuZHMgU3lzdGVtIHtcclxuXHRwdWJsaWMgb3ZlcnJpZGUgdXBkYXRlKGVudGl0aWVzOiBFbnRpdGllcyk6IHZvaWQge1xyXG5cdFx0bGV0IG1hdGNoaW5nID0gWy4uLmVudGl0aWVzLndpdGgoVHJhbnNmb3JtLCBNb2RlbCwgQ29sbGlkZXIpXVxyXG5cclxuXHRcdC8vQ2FsY3VsYXRlIGdsb2JhbCBib3VuZGluZyBib3hlc1xyXG5cdFx0Zm9yKGxldCBlbnRpdHkgb2YgbWF0Y2hpbmcpIHtcclxuXHRcdFx0bGV0IFt0cmFuc2Zvcm0sIG1vZGVsLCBjb2xsaWRlcl0gPSBbZW50aXR5LmdldChUcmFuc2Zvcm0pLCBlbnRpdHkuZ2V0KE1vZGVsKSwgZW50aXR5LmdldChDb2xsaWRlcildXHJcblx0XHRcdGNvbGxpZGVyLmNhbGN1bGF0ZUJvdW5kaW5nQm94KG1vZGVsLm1lc2gsIHRyYW5zZm9ybSlcclxuXHRcdFx0Y29sbGlkZXIuY2xlYXJDb2xsaXNpb25zKClcclxuXHRcdH1cclxuXHJcblx0XHQvL0NoZWNrIGNvbGxpc2lvbnNcclxuXHRcdHdoaWxlKG1hdGNoaW5nLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0bGV0IGVudGl0eSA9IG1hdGNoaW5nLnBvcCgpXHJcblx0XHRcdGxldCBjb2xsaWRlciA9IGVudGl0eS5nZXQoQ29sbGlkZXIpXHJcblxyXG5cdFx0XHRmb3IobGV0IG90aGVyRW50aXR5IG9mIGVudGl0aWVzKSB7XHJcblx0XHRcdFx0bGV0IG90aGVyQ29sbGlkZXIgPSBvdGhlckVudGl0eS5nZXQoQ29sbGlkZXIpXHJcblxyXG5cdFx0XHRcdGlmKGNvbGxpZGVyLmJvdW5kaW5nQm94LmNvbGxpZGVzKG90aGVyQ29sbGlkZXIuYm91bmRpbmdCb3gpKSB7XHJcblx0XHRcdFx0XHRjb2xsaWRlci5hZGRDb2xsaXNpb24obmV3IENvbGxpc2lvbihvdGhlckVudGl0eSwgW10pKVxyXG5cdFx0XHRcdFx0b3RoZXJDb2xsaWRlci5hZGRDb2xsaXNpb24obmV3IENvbGxpc2lvbihlbnRpdHksIFtdKSlcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcbn0iXX0=