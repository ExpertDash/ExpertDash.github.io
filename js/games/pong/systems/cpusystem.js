var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Transform } from "../../../common/lib.js";
import World, { Simulator } from "../../../common/world.js";
import { System } from "../../../ecs.js";
import { vec3 } from "../../../math/vec3.js";
import Ball from "../components/ball.js";
import CpuController from "../components/cpuController.js";
import Pong from "../main.js";
let CpuSystem = class CpuSystem extends System {
    update(entities) {
        entities.forEach((cpu, transform) => {
            let balls = [...entities.with(Ball)];
            balls.sort((a, b) => {
                let sqrDistA = transform.position.sub(a.get(Transform).position).sqrMagnitude;
                let sqrDistB = transform.position.sub(b.get(Transform).position).sqrMagnitude;
                return sqrDistB - sqrDistA;
            });
            if (balls.length == 0)
                return;
            let [ball] = balls;
            let ballTransform = ball.get(Transform);
            let delta = ballTransform.position.y - transform.position.y;
            if (Math.abs(delta) < transform.scale.y * 0.8)
                return;
            transform.position = vec3(transform.position.x, Math.max(-Pong.height / 2, Math.min(transform.position.y + Math.sign(delta) * Math.min(cpu.speed, Math.abs(delta)), Pong.height / 2)));
        }, CpuController, Transform);
    }
};
CpuSystem = __decorate([
    World.register.system(Simulator.phase(Simulator.Category.Input))
], CpuSystem);
export default CpuSystem;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3B1c3lzdGVtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2dhbWVzL3Bvbmcvc3lzdGVtcy9jcHVzeXN0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLHdCQUF3QixDQUFBO0FBQ2hELE9BQU8sS0FBSyxFQUFFLEVBQUMsU0FBUyxFQUFDLE1BQU0sMEJBQTBCLENBQUE7QUFDekQsT0FBTyxFQUFXLE1BQU0sRUFBQyxNQUFNLGlCQUFpQixDQUFBO0FBQ2hELE9BQU8sRUFBQyxJQUFJLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQTtBQUMxQyxPQUFPLElBQUksTUFBTSx1QkFBdUIsQ0FBQTtBQUN4QyxPQUFPLGFBQWEsTUFBTSxnQ0FBZ0MsQ0FBQTtBQUMxRCxPQUFPLElBQUksTUFBTSxZQUFZLENBQUE7QUFHN0IsSUFBcUIsU0FBUyxHQUE5QixNQUFxQixTQUFVLFNBQVEsTUFBTTtJQUNyQyxNQUFNLENBQUMsUUFBa0I7UUFDL0IsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUUsRUFBRTtZQUNuQyxJQUFJLEtBQUssR0FBRyxDQUFDLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO1lBRXBDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ25CLElBQUksUUFBUSxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsWUFBWSxDQUFBO2dCQUM3RSxJQUFJLFFBQVEsR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFlBQVksQ0FBQTtnQkFFN0UsT0FBTyxRQUFRLEdBQUcsUUFBUSxDQUFBO1lBQzNCLENBQUMsQ0FBQyxDQUFBO1lBRUYsSUFBRyxLQUFLLENBQUMsTUFBTSxJQUFJLENBQUM7Z0JBQ25CLE9BQU07WUFFUCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFBO1lBRWxCLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUE7WUFDdkMsSUFBSSxLQUFLLEdBQUcsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUE7WUFFM0QsSUFBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEdBQUc7Z0JBQzNDLE9BQU07WUFFUCxTQUFTLENBQUMsUUFBUSxHQUFHLElBQUksQ0FDeEIsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQ3BCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQ3JJLENBQUE7UUFDRixDQUFDLEVBQUUsYUFBYSxFQUFFLFNBQVMsQ0FBQyxDQUFBO0lBQzdCLENBQUM7Q0FDRCxDQUFBO0FBN0JvQixTQUFTO0lBRDdCLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztHQUM1QyxTQUFTLENBNkI3QjtlQTdCb0IsU0FBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7VHJhbnNmb3JtfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL2xpYi5qc1wiXHJcbmltcG9ydCBXb3JsZCwge1NpbXVsYXRvcn0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi93b3JsZC5qc1wiXHJcbmltcG9ydCB7RW50aXRpZXMsIFN5c3RlbX0gZnJvbSBcIi4uLy4uLy4uL2Vjcy5qc1wiXHJcbmltcG9ydCB7dmVjM30gZnJvbSBcIi4uLy4uLy4uL21hdGgvdmVjMy5qc1wiXHJcbmltcG9ydCBCYWxsIGZyb20gXCIuLi9jb21wb25lbnRzL2JhbGwuanNcIlxyXG5pbXBvcnQgQ3B1Q29udHJvbGxlciBmcm9tIFwiLi4vY29tcG9uZW50cy9jcHVDb250cm9sbGVyLmpzXCJcclxuaW1wb3J0IFBvbmcgZnJvbSBcIi4uL21haW4uanNcIlxyXG5cclxuQFdvcmxkLnJlZ2lzdGVyLnN5c3RlbShTaW11bGF0b3IucGhhc2UoU2ltdWxhdG9yLkNhdGVnb3J5LklucHV0KSlcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ3B1U3lzdGVtIGV4dGVuZHMgU3lzdGVtIHtcclxuXHRwdWJsaWMgdXBkYXRlKGVudGl0aWVzOiBFbnRpdGllcyk6IHZvaWQge1xyXG5cdFx0ZW50aXRpZXMuZm9yRWFjaCgoY3B1LCB0cmFuc2Zvcm0pID0+IHtcclxuXHRcdFx0bGV0IGJhbGxzID0gWy4uLmVudGl0aWVzLndpdGgoQmFsbCldXHJcblxyXG5cdFx0XHRiYWxscy5zb3J0KChhLCBiKSA9PiB7XHJcblx0XHRcdFx0bGV0IHNxckRpc3RBID0gdHJhbnNmb3JtLnBvc2l0aW9uLnN1YihhLmdldChUcmFuc2Zvcm0pLnBvc2l0aW9uKS5zcXJNYWduaXR1ZGVcclxuXHRcdFx0XHRsZXQgc3FyRGlzdEIgPSB0cmFuc2Zvcm0ucG9zaXRpb24uc3ViKGIuZ2V0KFRyYW5zZm9ybSkucG9zaXRpb24pLnNxck1hZ25pdHVkZVxyXG5cclxuXHRcdFx0XHRyZXR1cm4gc3FyRGlzdEIgLSBzcXJEaXN0QVxyXG5cdFx0XHR9KVxyXG5cclxuXHRcdFx0aWYoYmFsbHMubGVuZ3RoID09IDApXHJcblx0XHRcdFx0cmV0dXJuXHJcblxyXG5cdFx0XHRsZXQgW2JhbGxdID0gYmFsbHNcclxuXHJcblx0XHRcdGxldCBiYWxsVHJhbnNmb3JtID0gYmFsbC5nZXQoVHJhbnNmb3JtKVxyXG5cdFx0XHRsZXQgZGVsdGEgPSBiYWxsVHJhbnNmb3JtLnBvc2l0aW9uLnkgLSB0cmFuc2Zvcm0ucG9zaXRpb24ueVxyXG5cclxuXHRcdFx0aWYoTWF0aC5hYnMoZGVsdGEpIDwgdHJhbnNmb3JtLnNjYWxlLnkgKiAwLjgpXHJcblx0XHRcdFx0cmV0dXJuXHJcblxyXG5cdFx0XHR0cmFuc2Zvcm0ucG9zaXRpb24gPSB2ZWMzKFxyXG5cdFx0XHRcdHRyYW5zZm9ybS5wb3NpdGlvbi54LFxyXG5cdFx0XHRcdE1hdGgubWF4KC1Qb25nLmhlaWdodCAvIDIsIE1hdGgubWluKHRyYW5zZm9ybS5wb3NpdGlvbi55ICsgTWF0aC5zaWduKGRlbHRhKSAqIE1hdGgubWluKGNwdS5zcGVlZCwgTWF0aC5hYnMoZGVsdGEpKSwgUG9uZy5oZWlnaHQgLyAyKSlcclxuXHRcdFx0KVxyXG5cdFx0fSwgQ3B1Q29udHJvbGxlciwgVHJhbnNmb3JtKVxyXG5cdH1cclxufSJdfQ==