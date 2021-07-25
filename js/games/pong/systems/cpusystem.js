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
import Pong from "../pong.js";
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
    World.register.system({ after: [Simulator.Category.Input] })
], CpuSystem);
export default CpuSystem;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3B1c3lzdGVtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2dhbWVzL3Bvbmcvc3lzdGVtcy9jcHVzeXN0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLHdCQUF3QixDQUFBO0FBQ2hELE9BQU8sS0FBSyxFQUFFLEVBQUMsU0FBUyxFQUFDLE1BQU0sMEJBQTBCLENBQUE7QUFDekQsT0FBTyxFQUFXLE1BQU0sRUFBQyxNQUFNLGlCQUFpQixDQUFBO0FBQ2hELE9BQU8sRUFBQyxJQUFJLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQTtBQUMxQyxPQUFPLElBQUksTUFBTSx1QkFBdUIsQ0FBQTtBQUN4QyxPQUFPLGFBQWEsTUFBTSxnQ0FBZ0MsQ0FBQTtBQUMxRCxPQUFPLElBQUksTUFBTSxZQUFZLENBQUE7QUFHN0IsSUFBcUIsU0FBUyxHQUE5QixNQUFxQixTQUFVLFNBQVEsTUFBTTtJQUNyQyxNQUFNLENBQUMsUUFBa0I7UUFDL0IsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUUsRUFBRTtZQUNuQyxJQUFJLEtBQUssR0FBRyxDQUFDLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO1lBRXBDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ25CLElBQUksUUFBUSxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsWUFBWSxDQUFBO2dCQUM3RSxJQUFJLFFBQVEsR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFlBQVksQ0FBQTtnQkFFN0UsT0FBTyxRQUFRLEdBQUcsUUFBUSxDQUFBO1lBQzNCLENBQUMsQ0FBQyxDQUFBO1lBRUYsSUFBRyxLQUFLLENBQUMsTUFBTSxJQUFJLENBQUM7Z0JBQ25CLE9BQU07WUFFUCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFBO1lBRWxCLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUE7WUFDdkMsSUFBSSxLQUFLLEdBQUcsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUE7WUFFM0QsSUFBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEdBQUc7Z0JBQzNDLE9BQU07WUFFUCxTQUFTLENBQUMsUUFBUSxHQUFHLElBQUksQ0FDeEIsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQ3BCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQ3JJLENBQUE7UUFDRixDQUFDLEVBQUUsYUFBYSxFQUFFLFNBQVMsQ0FBQyxDQUFBO0lBQzdCLENBQUM7Q0FDRCxDQUFBO0FBN0JvQixTQUFTO0lBRDdCLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUMsS0FBSyxFQUFFLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBQyxDQUFDO0dBQ3RDLFNBQVMsQ0E2QjdCO2VBN0JvQixTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtUcmFuc2Zvcm19IGZyb20gXCIuLi8uLi8uLi9jb21tb24vbGliLmpzXCJcclxuaW1wb3J0IFdvcmxkLCB7U2ltdWxhdG9yfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3dvcmxkLmpzXCJcclxuaW1wb3J0IHtFbnRpdGllcywgU3lzdGVtfSBmcm9tIFwiLi4vLi4vLi4vZWNzLmpzXCJcclxuaW1wb3J0IHt2ZWMzfSBmcm9tIFwiLi4vLi4vLi4vbWF0aC92ZWMzLmpzXCJcclxuaW1wb3J0IEJhbGwgZnJvbSBcIi4uL2NvbXBvbmVudHMvYmFsbC5qc1wiXHJcbmltcG9ydCBDcHVDb250cm9sbGVyIGZyb20gXCIuLi9jb21wb25lbnRzL2NwdUNvbnRyb2xsZXIuanNcIlxyXG5pbXBvcnQgUG9uZyBmcm9tIFwiLi4vcG9uZy5qc1wiXHJcblxyXG5AV29ybGQucmVnaXN0ZXIuc3lzdGVtKHthZnRlcjogW1NpbXVsYXRvci5DYXRlZ29yeS5JbnB1dF19KVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDcHVTeXN0ZW0gZXh0ZW5kcyBTeXN0ZW0ge1xyXG5cdHB1YmxpYyB1cGRhdGUoZW50aXRpZXM6IEVudGl0aWVzKTogdm9pZCB7XHJcblx0XHRlbnRpdGllcy5mb3JFYWNoKChjcHUsIHRyYW5zZm9ybSkgPT4ge1xyXG5cdFx0XHRsZXQgYmFsbHMgPSBbLi4uZW50aXRpZXMud2l0aChCYWxsKV1cclxuXHJcblx0XHRcdGJhbGxzLnNvcnQoKGEsIGIpID0+IHtcclxuXHRcdFx0XHRsZXQgc3FyRGlzdEEgPSB0cmFuc2Zvcm0ucG9zaXRpb24uc3ViKGEuZ2V0KFRyYW5zZm9ybSkucG9zaXRpb24pLnNxck1hZ25pdHVkZVxyXG5cdFx0XHRcdGxldCBzcXJEaXN0QiA9IHRyYW5zZm9ybS5wb3NpdGlvbi5zdWIoYi5nZXQoVHJhbnNmb3JtKS5wb3NpdGlvbikuc3FyTWFnbml0dWRlXHJcblxyXG5cdFx0XHRcdHJldHVybiBzcXJEaXN0QiAtIHNxckRpc3RBXHJcblx0XHRcdH0pXHJcblxyXG5cdFx0XHRpZihiYWxscy5sZW5ndGggPT0gMClcclxuXHRcdFx0XHRyZXR1cm5cclxuXHJcblx0XHRcdGxldCBbYmFsbF0gPSBiYWxsc1xyXG5cclxuXHRcdFx0bGV0IGJhbGxUcmFuc2Zvcm0gPSBiYWxsLmdldChUcmFuc2Zvcm0pXHJcblx0XHRcdGxldCBkZWx0YSA9IGJhbGxUcmFuc2Zvcm0ucG9zaXRpb24ueSAtIHRyYW5zZm9ybS5wb3NpdGlvbi55XHJcblxyXG5cdFx0XHRpZihNYXRoLmFicyhkZWx0YSkgPCB0cmFuc2Zvcm0uc2NhbGUueSAqIDAuOClcclxuXHRcdFx0XHRyZXR1cm5cclxuXHJcblx0XHRcdHRyYW5zZm9ybS5wb3NpdGlvbiA9IHZlYzMoXHJcblx0XHRcdFx0dHJhbnNmb3JtLnBvc2l0aW9uLngsXHJcblx0XHRcdFx0TWF0aC5tYXgoLVBvbmcuaGVpZ2h0IC8gMiwgTWF0aC5taW4odHJhbnNmb3JtLnBvc2l0aW9uLnkgKyBNYXRoLnNpZ24oZGVsdGEpICogTWF0aC5taW4oY3B1LnNwZWVkLCBNYXRoLmFicyhkZWx0YSkpLCBQb25nLmhlaWdodCAvIDIpKVxyXG5cdFx0XHQpXHJcblx0XHR9LCBDcHVDb250cm9sbGVyLCBUcmFuc2Zvcm0pXHJcblx0fVxyXG59Il19