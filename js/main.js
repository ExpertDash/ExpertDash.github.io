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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Gravity_1, Thermodynamics_1;
Object.defineProperty(exports, "__esModule", { value: true });
const ecs_js_1 = __importStar(require("./ecs.js"));
const World = new ecs_js_1.default();
let Transform = class Transform extends ecs_js_1.Component {
    constructor(x, y) {
        super();
        this.position = [0, 0];
        this.rotation = 0;
        this.scale = 1;
        this.position = [x, y];
    }
};
Transform = __decorate([
    World.register.component(),
    __metadata("design:paramtypes", [Number, Number])
], Transform);
let Motion = class Motion extends ecs_js_1.Component {
    constructor(mass) {
        super();
        this.velocity = [0, 0];
        this.acceleration = [0, 0];
        this.mass = mass;
    }
};
Motion = __decorate([
    World.register.component(),
    __metadata("design:paramtypes", [Number])
], Motion);
let Temperature = class Temperature extends ecs_js_1.Component {
    constructor(value) {
        super();
        this.value = value;
    }
};
Temperature = __decorate([
    World.register.component(),
    __metadata("design:paramtypes", [Number])
], Temperature);
let Movement = class Movement extends ecs_js_1.System {
    update(entities) {
        entities.forEach((transform, motion) => {
            let [x, y] = transform.position;
            let [vx, vy] = motion.velocity;
            let [ax, ay] = motion.acceleration;
            motion.velocity = [vx + ax, vy + ay];
            motion.acceleration = [0, 0];
            transform.position = [x + vx, y + vy];
        }, Transform, Motion);
    }
};
Movement = __decorate([
    World.register.system()
], Movement);
let Gravity = Gravity_1 = class Gravity extends ecs_js_1.System {
    constructor(acceleration) {
        super();
        this.acceleration = acceleration;
    }
    update(entities) {
        entities.forEach(motion => {
            let [x, y] = motion.acceleration;
            motion.acceleration = [x, y - this.acceleration];
        }, Motion);
    }
};
Gravity = Gravity_1 = __decorate([
    World.register.system({ before: [Movement] }, 9.8),
    __metadata("design:paramtypes", [Number])
], Gravity);
let Thermodynamics = Thermodynamics_1 = class Thermodynamics extends ecs_js_1.System {
    update(entities) {
        let es = [...entities.with(Motion, Transform, Temperature)];
        for (let i = es.length - 1; i >= 0; i--) {
            let [transform1, temperature1] = [es[i].get(Transform), es[i].get(Temperature)];
            for (let j = i - 1; j >= 0; j--) {
                let [transform2, temperature2] = [es[j].get(Transform), es[j].get(Temperature)];
                let [dx, dy] = [transform2.position[0] - transform1.position[0], transform2.position[1] - transform1.position[1]];
                let d2 = dx * dx + dy * dy;
                let f = 1 / d2;
                temperature1.value += (temperature2.value - temperature1.value) * f;
                temperature2.value += (temperature1.value - temperature2.value) * f;
            }
        }
    }
};
Thermodynamics = Thermodynamics_1 = __decorate([
    World.register.system({ after: [Movement] })
], Thermodynamics);
World.entities.create(new Transform(0, 0), new Motion(60), new Temperature(90));
World.entities.create(new Transform(10, 0), new Motion(60), new Temperature(40));
console.log(...World.systems);
console.log();
for (let i = 0; i < 5; i++) {
    if (i != 0)
        World.step();
    console.log([...World.entities.with(Temperature)].map(e => `${e.get(Temperature).value}`));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtREFBeUQ7QUFFekQsTUFBTSxLQUFLLEdBQVEsSUFBSSxnQkFBRyxFQUFFLENBQUE7QUFHNUIsSUFBTSxTQUFTLEdBQWYsTUFBTSxTQUFVLFNBQVEsa0JBQVM7SUFLaEMsWUFBbUIsQ0FBUyxFQUFFLENBQVM7UUFDdEMsS0FBSyxFQUFFLENBQUE7UUFMRCxhQUFRLEdBQXFCLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQ25DLGFBQVEsR0FBVyxDQUFDLENBQUE7UUFDcEIsVUFBSyxHQUFXLENBQUMsQ0FBQTtRQUl2QixJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO0lBQ3ZCLENBQUM7Q0FDRCxDQUFBO0FBVEssU0FBUztJQURkLEtBQUssQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFOztHQUNyQixTQUFTLENBU2Q7QUFHRCxJQUFNLE1BQU0sR0FBWixNQUFNLE1BQU8sU0FBUSxrQkFBUztJQUs3QixZQUFtQixJQUFZO1FBQzlCLEtBQUssRUFBRSxDQUFBO1FBSkQsYUFBUSxHQUFxQixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUNuQyxpQkFBWSxHQUFxQixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUk3QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQTtJQUNqQixDQUFDO0NBQ0QsQ0FBQTtBQVRLLE1BQU07SUFEWCxLQUFLLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRTs7R0FDckIsTUFBTSxDQVNYO0FBR0QsSUFBTSxXQUFXLEdBQWpCLE1BQU0sV0FBWSxTQUFRLGtCQUFTO0lBR2xDLFlBQW1CLEtBQWE7UUFDL0IsS0FBSyxFQUFFLENBQUE7UUFDUCxJQUFJLENBQUMsS0FB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QUUsSUFBSSxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtBQUVoRixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0FBQzdCLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQTtBQUViLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDMUIsSUFBRyxDQUFDLElBQUksQ0FBQztRQUNSLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQTtJQUViLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQTtDQUMxRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFQ1MsIHtFbnRpdGllcywgQ29tcG9uZW50LCBTeXN0ZW19IGZyb20gXCIuL2Vjcy5qc1wiXHJcblxyXG5jb25zdCBXb3JsZDogRUNTID0gbmV3IEVDUygpXHJcblxyXG5AV29ybGQucmVnaXN0ZXIuY29tcG9uZW50KClcclxuY2xhc3MgVHJhbnNmb3JtIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHRwdWJsaWMgcG9zaXRpb246IFtudW1iZXIsIG51bWJlcl0gPSBbMCwgMF1cclxuXHRwdWJsaWMgcm90YXRpb246IG51bWJlciA9IDBcclxuXHRwdWJsaWMgc2NhbGU6IG51bWJlciA9IDFcclxuXHJcblx0cHVibGljIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XHJcblx0XHRzdXBlcigpXHJcblx0XHR0aGlzLnBvc2l0aW9uID0gW3gsIHldXHJcblx0fVxyXG59XHJcblxyXG5AV29ybGQucmVnaXN0ZXIuY29tcG9uZW50KClcclxuY2xhc3MgTW90aW9uIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHRwdWJsaWMgbWFzczogbnVtYmVyXHJcblx0cHVibGljIHZlbG9jaXR5OiBbbnVtYmVyLCBudW1iZXJdID0gWzAsIDBdXHJcblx0cHVibGljIGFjY2VsZXJhdGlvbjogW251bWJlciwgbnVtYmVyXSA9IFswLCAwXVxyXG5cclxuXHRwdWJsaWMgY29uc3RydWN0b3IobWFzczogbnVtYmVyKSB7XHJcblx0XHRzdXBlcigpXHJcblx0XHR0aGlzLm1hc3MgPSBtYXNzXHJcblx0fVxyXG59XHJcblxyXG5AV29ybGQucmVnaXN0ZXIuY29tcG9uZW50KClcclxuY2xhc3MgVGVtcGVyYXR1cmUgZXh0ZW5kcyBDb21wb25lbnQge1xyXG5cdHB1YmxpYyB2YWx1ZTogbnVtYmVyXHJcblxyXG5cdHB1YmxpYyBjb25zdHJ1Y3Rvcih2YWx1ZTogbnVtYmVyKSB7XHJcblx0XHRzdXBlcigpXHJcblx0XHR0aGlzLnZhbHVlID0gdmFsdWVcclxuXHR9XHJcbn1cclxuXHJcbkBXb3JsZC5yZWdpc3Rlci5zeXN0ZW0oKVxyXG5jbGFzcyBNb3ZlbWVudCBleHRlbmRzIFN5c3RlbSB7XHJcblx0cHVibGljIG92ZXJyaWRlIHVwZGF0ZShlbnRpdGllczogRW50aXRpZXMpOiB2b2lkIHtcclxuXHRcdGVudGl0aWVzLmZvckVhY2goKHRyYW5zZm9ybSwgbW90aW9uKSA9PiB7XHJcblx0XHRcdGxldCBbeCwgeV0gPSB0cmFuc2Zvcm0ucG9zaXRpb25cclxuXHRcdFx0bGV0IFt2eCwgdnldID0gbW90aW9uLnZlbG9jaXR5XHJcblx0XHRcdGxldCBbYXgsIGF5XSA9IG1vdGlvbi5hY2NlbGVyYXRpb25cclxuXHJcblx0XHRcdG1vdGlvbi52ZWxvY2l0eSA9IFt2eCArIGF4LCB2eSArIGF5XVxyXG5cdFx0XHRtb3Rpb24uYWNjZWxlcmF0aW9uID0gWzAsIDBdXHJcblx0XHRcdHRyYW5zZm9ybS5wb3NpdGlvbiA9IFt4ICsgdngsIHkgKyB2eV1cclxuXHRcdH0sIFRyYW5zZm9ybSwgTW90aW9uKVxyXG5cdH1cclxufVxyXG5cclxuQFdvcmxkLnJlZ2lzdGVyLnN5c3RlbTx0eXBlb2YgR3Jhdml0eT4oe2JlZm9yZTogW01vdmVtZW50XX0sIDkuOClcclxuY2xhc3MgR3Jhdml0eSBleHRlbmRzIFN5c3RlbSB7XHJcblx0cHVibGljIGFjY2VsZXJhdGlvbjogbnVtYmVyXHJcblxyXG5cdHB1YmxpYyBjb25zdHJ1Y3RvcihhY2NlbGVyYXRpb246IG51bWJlcikge1xyXG5cdFx0c3VwZXIoKVxyXG5cdFx0dGhpcy5hY2NlbGVyYXRpb24gPSBhY2NlbGVyYXRpb25cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBvdmVycmlkZSB1cGRhdGUoZW50aXRpZXM6IEVudGl0aWVzKTogdm9pZCB7XHJcblx0XHRlbnRpdGllcy5mb3JFYWNoKG1vdGlvbiA9PiB7XHJcblx0XHRcdGxldCBbeCwgeV0gPSBtb3Rpb24uYWNjZWxlcmF0aW9uXHJcblx0XHRcdG1vdGlvbi5hY2NlbGVyYXRpb24gPSBbeCwgeSAtIHRoaXMuYWNjZWxlcmF0aW9uXVxyXG5cdFx0fSwgTW90aW9uKVxyXG5cdH1cclxufVxyXG5cclxuQFdvcmxkLnJlZ2lzdGVyLnN5c3RlbTx0eXBlb2YgVGhlcm1vZHluYW1pY3M+KHthZnRlcjogW01vdmVtZW50XX0pXHJcbmNsYXNzIFRoZXJtb2R5bmFtaWNzIGV4dGVuZHMgU3lzdGVtIHtcclxuXHRwdWJsaWMgdXBkYXRlKGVudGl0aWVzOiBFbnRpdGllcyk6IHZvaWQge1xyXG5cdFx0bGV0IGVzID0gWy4uLmVudGl0aWVzLndpdGgoTW90aW9uLCBUcmFuc2Zvcm0sIFRlbXBlcmF0dXJlKV1cclxuXHJcblx0XHRmb3IobGV0IGkgPSBlcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG5cdFx0XHRsZXQgW3RyYW5zZm9ybTEsIHRlbXBlcmF0dXJlMV0gPSBbZXNbaV0uZ2V0KFRyYW5zZm9ybSksIGVzW2ldLmdldChUZW1wZXJhdHVyZSldXHJcblxyXG5cdFx0XHRmb3IobGV0IGogPSBpIC0gMTsgaiA+PSAwOyBqLS0pIHtcclxuXHRcdFx0XHRsZXQgW3RyYW5zZm9ybTIsIHRlbXBlcmF0dXJlMl0gPSBbZXNbal0uZ2V0KFRyYW5zZm9ybSksIGVzW2pdLmdldChUZW1wZXJhdHVyZSldXHJcblxyXG5cdFx0XHRcdGxldCBbZHgsIGR5XSA9IFt0cmFuc2Zvcm0yLnBvc2l0aW9uWzBdIC0gdHJhbnNmb3JtMS5wb3NpdGlvblswXSwgdHJhbnNmb3JtMi5wb3NpdGlvblsxXSAtIHRyYW5zZm9ybTEucG9zaXRpb25bMV1dXHJcblx0XHRcdFx0bGV0IGQyID0gZHggKiBkeCArIGR5ICogZHlcclxuXHRcdFx0XHRsZXQgZiA9IDEgLyBkMlxyXG5cclxuXHRcdFx0XHR0ZW1wZXJhdHVyZTEudmFsdWUgKz0gKHRlbXBlcmF0dXJlMi52YWx1ZSAtIHRlbXBlcmF0dXJlMS52YWx1ZSkgKiBmXHJcblx0XHRcdFx0dGVtcGVyYXR1cmUyLnZhbHVlICs9ICh0ZW1wZXJhdHVyZTEudmFsdWUgLSB0ZW1wZXJhdHVyZTIudmFsdWUpICogZlxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5Xb3JsZC5lbnRpdGllcy5jcmVhdGUobmV3IFRyYW5zZm9ybSgwLCAwKSwgbmV3IE1vdGlvbig2MCksIG5ldyBUZW1wZXJhdHVyZSg5MCkpXHJcbldvcmxkLmVudGl0aWVzLmNyZWF0ZShuZXcgVHJhbnNmb3JtKDEwLCAwKSwgbmV3IE1vdGlvbig2MCksIG5ldyBUZW1wZXJhdHVyZSg0MCkpXHJcblxyXG5jb25zb2xlLmxvZyguLi5Xb3JsZC5zeXN0ZW1zKVxyXG5jb25zb2xlLmxvZygpXHJcblxyXG5mb3IobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XHJcblx0aWYoaSAhPSAwKVxyXG5cdFx0V29ybGQuc3RlcCgpXHJcblxyXG5cdGNvbnNvbGUubG9nKFsuLi5Xb3JsZC5lbnRpdGllcy53aXRoKFRlbXBlcmF0dXJlKV0ubWFwKGUgPT4gYCR7ZS5nZXQoVGVtcGVyYXR1cmUpLnZhbHVlfWApKVxyXG59Il19