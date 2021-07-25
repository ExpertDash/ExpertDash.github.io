var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
var _a, _Simulator_deltaTime, _Simulator_fixedDeltaTime;
import ECS, { System } from "../ecs.js";
import "./lib.js";
const World = new ECS();
export class Simulator {
    /** Whether the simulation is actively being updated */
    static get active() {
        return !isNaN(this.logicHandle) || !isNaN(this.renderHandle);
    }
    /** Time between frames */
    static get deltaTime() {
        return __classPrivateFieldGet(this, _a, "f", _Simulator_deltaTime);
    }
    /** Time between physics iterations */
    static get fixedDeltaTime() {
        return __classPrivateFieldGet(this, _a, "f", _Simulator_fixedDeltaTime);
    }
    static set fixedDeltaTime(value) {
        this.fixedDeltaTime = value;
        if (!isNaN(this.logicHandle)) {
            this.suspend();
            this.resume();
        }
    }
    /**
     * Resumes world simulation
     */
    static resume() {
        if (this.active)
            return;
        let lastTime = 0;
        let systems = [...World.systems];
        let divider = systems.findIndex(v => v.constructor = Simulator.Category.UI);
        let logicSystems = systems.slice(0, divider).filter(s => !(s instanceof CategorySystem));
        let graphicsSystems = systems.slice(divider).filter(s => !(s instanceof CategorySystem));
        this.logicHandle = setInterval(() => {
            for (let system of logicSystems)
                system.update(World.entities);
        }, 1000 * Simulator.fixedDeltaTime);
        this.renderHandle = requestAnimationFrame(time => {
            __classPrivateFieldSet(Simulator, _a, (time - lastTime) / 1000, "f", _Simulator_deltaTime);
            lastTime = time;
            for (let system of graphicsSystems)
                system.update(World.entities);
        });
    }
    /**
     * Suspends world simulation
     */
    static suspend() {
        if (!this.active)
            return;
        clearInterval(this.logicHandle);
        this.logicHandle = NaN;
        cancelAnimationFrame(this.renderHandle);
        this.renderHandle = NaN;
    }
}
_a = Simulator;
Simulator.logicHandle = NaN;
Simulator.renderHandle = NaN;
_Simulator_deltaTime = { value: 0 };
_Simulator_fixedDeltaTime = { value: 0.02 };
class CategorySystem extends System {
    update(_) {
        throw new Error("Unexpected update call on categorical system?");
    }
}
(function (Simulator) {
    /**
     * System categories for organizational purposes
     */
    let Category;
    (function (Category) {
        let Physics = class Physics extends CategorySystem {
        };
        Physics = __decorate([
            World.register.system()
        ], Physics);
        Category.Physics = Physics;
        let Input = class Input extends CategorySystem {
        };
        Input = __decorate([
            World.register.system({ after: [Physics] })
        ], Input);
        Category.Input = Input;
        let Logic = class Logic extends CategorySystem {
        };
        Logic = __decorate([
            World.register.system({ after: [Input] })
        ], Logic);
        Category.Logic = Logic;
        let UI = class UI extends CategorySystem {
        };
        UI = __decorate([
            World.register.system({ after: [Logic] })
        ], UI);
        Category.UI = UI;
        let Graphics = class Graphics extends CategorySystem {
        };
        Graphics = __decorate([
            World.register.system({ after: [UI] })
        ], Graphics);
        Category.Graphics = Graphics;
    })(Category = Simulator.Category || (Simulator.Category = {}));
})(Simulator || (Simulator = {}));
export default World;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ybGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbW9uL3dvcmxkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sR0FBRyxFQUFFLEVBQVcsTUFBTSxFQUFDLE1BQU0sV0FBVyxDQUFBO0FBQy9DLE9BQU8sVUFBVSxDQUFBO0FBRWpCLE1BQU0sS0FBSyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUE7QUFFdkIsTUFBTSxPQUFPLFNBQVM7SUFPckIsdURBQXVEO0lBQ2hELE1BQU0sS0FBSyxNQUFNO1FBQ3ZCLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQTtJQUM3RCxDQUFDO0lBRUQsMEJBQTBCO0lBQ25CLE1BQU0sS0FBSyxTQUFTO1FBQzFCLE9BQU8sdUJBQUEsSUFBSSxnQ0FBVyxDQUFBO0lBQ3ZCLENBQUM7SUFFRCxzQ0FBc0M7SUFDL0IsTUFBTSxLQUFLLGNBQWM7UUFDL0IsT0FBTyx1QkFBQSxJQUFJLHFDQUFnQixDQUFBO0lBQzVCLENBQUM7SUFFTSxNQUFNLEtBQUssY0FBYyxDQUFDLEtBQWE7UUFDN0MsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUE7UUFFM0IsSUFBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDNUIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFBO1lBQ2QsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFBO1NBQ2I7SUFDRixDQUFDO0lBRUQ7O09BRUc7SUFDSSxNQUFNLENBQUMsTUFBTTtRQUNuQixJQUFHLElBQUksQ0FBQyxNQUFNO1lBQ2IsT0FBTTtRQUVQLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQTtRQUNoQixJQUFJLE9BQU8sR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FB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QS9CLGNBQUssUUFBMEIsQ0FBQTtRQUM1QyxJQUFhLEVBQUUsR0FBZixNQUFhLEVBQUcsU0FBUSxjQUFjO1NBQUcsQ0FBQTtRQUE1QixFQUFFO1lBQXZELEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUMsQ0FBQztXQUFjLEVBQUUsQ0FBMEI7UUFBNUIsV0FBRSxLQUEwQixDQUFBO1FBQzVDLElBQWEsUUFBUSxHQUFyQixNQUFhLFFBQVMsU0FBUSxjQUFjO1NBQUcsQ0FBQTtRQUFsQyxRQUFRO1lBQTFELEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQztXQUFjLFFBQVEsQ0FBMEI7UUFBbEMsaUJBQVEsV0FBMEIsQ0FBQTtJQUN0RixDQUFDLEVBTmdCLFFBQVEsR0FBUixrQkFBUSxLQUFSLGtCQUFRLFFBTXhCO0FBQ0YsQ0FBQyxFQVhnQixTQUFTLEtBQVQsU0FBUyxRQVd6QjtBQUVELGVBQWUsS0FBSyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEVDUywge0VudGl0aWVzLCBTeXN0ZW19IGZyb20gXCIuLi9lY3MuanNcIlxyXG5pbXBvcnQgXCIuL2xpYi5qc1wiXHJcblxyXG5jb25zdCBXb3JsZCA9IG5ldyBFQ1MoKVxyXG5cclxuZXhwb3J0IGNsYXNzIFNpbXVsYXRvciB7XHJcblx0cHJpdmF0ZSBzdGF0aWMgbG9naWNIYW5kbGU6IG51bWJlciA9IE5hTlxyXG5cdHByaXZhdGUgc3RhdGljIHJlbmRlckhhbmRsZTogbnVtYmVyID0gTmFOXHJcblxyXG5cdHN0YXRpYyAjZGVsdGFUaW1lOiBudW1iZXIgPSAwXHJcblx0c3RhdGljICNmaXhlZERlbHRhVGltZTogbnVtYmVyID0gMC4wMlxyXG5cclxuXHQvKiogV2hldGhlciB0aGUgc2ltdWxhdGlvbiBpcyBhY3RpdmVseSBiZWluZyB1cGRhdGVkICovXHJcblx0cHVibGljIHN0YXRpYyBnZXQgYWN0aXZlKCk6IGJvb2xlYW4ge1xyXG5cdFx0cmV0dXJuICFpc05hTih0aGlzLmxvZ2ljSGFuZGxlKSB8fCAhaXNOYU4odGhpcy5yZW5kZXJIYW5kbGUpXHJcblx0fVxyXG5cclxuXHQvKiogVGltZSBiZXR3ZWVuIGZyYW1lcyAqL1xyXG5cdHB1YmxpYyBzdGF0aWMgZ2V0IGRlbHRhVGltZSgpOiBudW1iZXIge1xyXG5cdFx0cmV0dXJuIHRoaXMuI2RlbHRhVGltZVxyXG5cdH1cclxuXHJcblx0LyoqIFRpbWUgYmV0d2VlbiBwaHlzaWNzIGl0ZXJhdGlvbnMgKi9cclxuXHRwdWJsaWMgc3RhdGljIGdldCBmaXhlZERlbHRhVGltZSgpOiBudW1iZXIge1xyXG5cdFx0cmV0dXJuIHRoaXMuI2ZpeGVkRGVsdGFUaW1lXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc3RhdGljIHNldCBmaXhlZERlbHRhVGltZSh2YWx1ZTogbnVtYmVyKSB7XHJcblx0XHR0aGlzLmZpeGVkRGVsdGFUaW1lID0gdmFsdWVcclxuXHJcblx0XHRpZighaXNOYU4odGhpcy5sb2dpY0hhbmRsZSkpIHtcclxuXHRcdFx0dGhpcy5zdXNwZW5kKClcclxuXHRcdFx0dGhpcy5yZXN1bWUoKVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVzdW1lcyB3b3JsZCBzaW11bGF0aW9uXHJcblx0ICovXHJcblx0cHVibGljIHN0YXRpYyByZXN1bWUoKTogdm9pZCB7XHJcblx0XHRpZih0aGlzLmFjdGl2ZSlcclxuXHRcdFx0cmV0dXJuXHJcblxyXG5cdFx0bGV0IGxhc3RUaW1lID0gMFxyXG5cdFx0bGV0IHN5c3RlbXMgPSBbLi4uV29ybGQuc3lzdGVtc11cclxuXHRcdGxldCBkaXZpZGVyID0gc3lzdGVtcy5maW5kSW5kZXgodiA9PiB2LmNvbnN0cnVjdG9yID0gU2ltdWxhdG9yLkNhdGVnb3J5LlVJKVxyXG5cdFx0bGV0IGxvZ2ljU3lzdGVtcyA9IHN5c3RlbXMuc2xpY2UoMCwgZGl2aWRlcikuZmlsdGVyKHMgPT4gIShzIGluc3RhbmNlb2YgQ2F0ZWdvcnlTeXN0ZW0pKVxyXG5cdFx0bGV0IGdyYXBoaWNzU3lzdGVtcyA9IHN5c3RlbXMuc2xpY2UoZGl2aWRlcikuZmlsdGVyKHMgPT4gIShzIGluc3RhbmNlb2YgQ2F0ZWdvcnlTeXN0ZW0pKVxyXG5cclxuXHRcdHRoaXMubG9naWNIYW5kbGUgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcblx0XHRcdGZvcihsZXQgc3lzdGVtIG9mIGxvZ2ljU3lzdGVtcylcclxuXHRcdFx0XHRzeXN0ZW0udXBkYXRlKFdvcmxkLmVudGl0aWVzKVxyXG5cdFx0fSwgMTAwMCAqIFNpbXVsYXRvci5maXhlZERlbHRhVGltZSlcclxuXHJcblx0XHR0aGlzLnJlbmRlckhhbmRsZSA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aW1lID0+IHtcclxuXHRcdFx0U2ltdWxhdG9yLiNkZWx0YVRpbWUgPSAodGltZSAtIGxhc3RUaW1lKSAvIDEwMDBcclxuXHRcdFx0bGFzdFRpbWUgPSB0aW1lXHJcblxyXG5cdFx0XHRmb3IobGV0IHN5c3RlbSBvZiBncmFwaGljc1N5c3RlbXMpXHJcblx0XHRcdFx0c3lzdGVtLnVwZGF0ZShXb3JsZC5lbnRpdGllcylcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTdXNwZW5kcyB3b3JsZCBzaW11bGF0aW9uXHJcblx0ICovXHJcblx0cHVibGljIHN0YXRpYyBzdXNwZW5kKCk6IHZvaWQge1xyXG5cdFx0aWYoIXRoaXMuYWN0aXZlKVxyXG5cdFx0XHRyZXR1cm5cclxuXHJcblx0XHRjbGVhckludGVydmFsKHRoaXMubG9naWNIYW5kbGUpXHJcblx0XHR0aGlzLmxvZ2ljSGFuZGxlID0gTmFOXHJcblxyXG5cdFx0Y2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5yZW5kZXJIYW5kbGUpXHJcblx0XHR0aGlzLnJlbmRlckhhbmRsZSA9IE5hTlxyXG5cdH1cclxufVxyXG5cclxuY2xhc3MgQ2F0ZWdvcnlTeXN0ZW0gZXh0ZW5kcyBTeXN0ZW0ge1xyXG5cdHB1YmxpYyB1cGRhdGUoXzogRW50aXRpZXMpOiB2b2lkIHtcclxuXHRcdHRocm93IG5ldyBFcnJvcihcIlVuZXhwZWN0ZWQgdXBkYXRlIGNhbGwgb24gY2F0ZWdvcmljYWwgc3lzdGVtP1wiKVxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IG5hbWVzcGFjZSBTaW11bGF0b3Ige1xyXG5cdC8qKlxyXG5cdCAqIFN5c3RlbSBjYXRlZ29yaWVzIGZvciBvcmdhbml6YXRpb25hbCBwdXJwb3Nlc1xyXG5cdCAqL1xyXG5cdGV4cG9ydCBuYW1lc3BhY2UgQ2F0ZWdvcnkge1xyXG5cdFx0QFdvcmxkLnJlZ2lzdGVyLnN5c3RlbSgpIGV4cG9ydCBjbGFzcyBQaHlzaWNzIGV4dGVuZHMgQ2F0ZWdvcnlTeXN0ZW0ge31cclxuXHRcdEBXb3JsZC5yZWdpc3Rlci5zeXN0ZW0oe2FmdGVyOiBbUGh5c2ljc119KSBleHBvcnQgY2xhc3MgSW5wdXQgZXh0ZW5kcyBDYXRlZ29yeVN5c3RlbSB7fVxyXG5cdFx0QFdvcmxkLnJlZ2lzdGVyLnN5c3RlbSh7YWZ0ZXI6IFtJbnB1dF19KSBleHBvcnQgY2xhc3MgTG9naWMgZXh0ZW5kcyBDYXRlZ29yeVN5c3RlbSB7fVxyXG5cdFx0QFdvcmxkLnJlZ2lzdGVyLnN5c3RlbSh7YWZ0ZXI6IFtMb2dpY119KSBleHBvcnQgY2xhc3MgVUkgZXh0ZW5kcyBDYXRlZ29yeVN5c3RlbSB7fVxyXG5cdFx0QFdvcmxkLnJlZ2lzdGVyLnN5c3RlbSh7YWZ0ZXI6IFtVSV19KSBleHBvcnQgY2xhc3MgR3JhcGhpY3MgZXh0ZW5kcyBDYXRlZ29yeVN5c3RlbSB7fVxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgV29ybGQiXX0=