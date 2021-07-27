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
        let logicCallback;
        let renderCallback;
        logicCallback = () => {
            for (let system of logicSystems)
                system.update(World.entities);
        };
        renderCallback = time => {
            __classPrivateFieldSet(Simulator, _a, (time - lastTime) / 1000, "f", _Simulator_deltaTime);
            lastTime = time;
            for (let system of graphicsSystems)
                system.update(World.entities);
            this.renderHandle = requestAnimationFrame(renderCallback);
        };
        this.logicHandle = setInterval(logicCallback, 1000 * Simulator.fixedDeltaTime);
        this.renderHandle = requestAnimationFrame(renderCallback);
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
    /**
     * @param category Category for the system to be placed in
     * @param param1 Additional systems describing update order
     * @returns Creates an order which updates the system within the specified category
     */
    static phase(category, { after, before } = {}) {
        after ?? (after = []);
        before ?? (before = []);
        after.push(category);
        switch (category) {
            case Simulator.Category.Physics:
                before.push(Simulator.Category.Input);
                break;
            case Simulator.Category.Input:
                before.push(Simulator.Category.Logic);
                break;
            case Simulator.Category.Logic:
                before.push(Simulator.Category.UI);
                break;
            case Simulator.Category.UI:
                before.push(Simulator.Category.Graphics);
                break;
            case Simulator.Category.Graphics:
                break;
            default:
                throw new Error(`Unknown phase: '${category.name}'`);
        }
        return {
            after: after,
            before: before
        };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ybGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbW9uL3dvcmxkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sR0FBRyxFQUFFLEVBQVcsTUFBTSxFQUFDLE1BQU0sV0FBVyxDQUFBO0FBQy9DLE9BQU8sVUFBVSxDQUFBO0FBR2pCLE1BQU0sS0FBSyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUE7QUFFdkIsTUFBTSxPQUFPLFNBQVM7SUFPckIsdURBQXVEO0lBQ2hELE1BQU0sS0FBSyxNQUFNO1FBQ3ZCLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQTtJQUM3RCxDQUFDO0lBRUQsMEJBQTBCO0lBQ25CLE1BQU0sS0FBSyxTQUFTO1FBQzFCLE9BQU8sdUJBQUEsSUFBSSxnQ0FBVyxDQUFBO0lBQ3ZCLENBQUM7SUFFRCxzQ0FBc0M7SUFDL0IsTUFBTSxLQUFLLGNBQWM7UUFDL0IsT0FBTyx1QkFBQSxJQUFJLHFDQUFnQixDQUFBO0lBQzVCLENBQUM7SUFFTSxNQUFNLEtBQUssY0FBYyxDQUFDLEtBQWE7UUFDN0MsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUE7UUFFM0IsSUFBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDNUIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFBO1lBQ2QsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFBO1NBQ2I7SUFDRixDQUFDO0lBRUQ7O09BRUc7SUFDSSxNQUFNLENBQUMsTUFBTTtRQUNuQixJQUFHLElBQUksQ0FBQyxNQUFNO1lBQ2IsT0FBTTtRQUVQLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQTtRQUNoQixJQUFJLE9BQU8sR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FB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RCxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFDLEtBQUssRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFDLENBQUM7V0FBYyxLQUFLLENBQTBCO1FBQS9CLGNBQUssUUFBMEIsQ0FBQTtRQUM1QyxJQUFhLEVBQUUsR0FBZixNQUFhLEVBQUcsU0FBUSxjQUFjO1NBQUcsQ0FBQTtRQUE1QixFQUFFO1lBQXZELEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUMsQ0FBQztXQUFjLEVBQUUsQ0FBMEI7UUFBNUIsV0FBRSxLQUEwQixDQUFBO1FBQzVDLElBQWEsUUFBUSxHQUFyQixNQUFhLFFBQVMsU0FBUSxjQUFjO1NBQUcsQ0FBQTtRQUFsQyxRQUFRO1lBQTFELEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQztXQUFjLFFBQVEsQ0FBMEI7UUFBbEMsaUJBQVEsV0FBMEIsQ0FBQTtJQUN0RixDQUFDLEVBTmdCLFFBQVEsR0FBUixrQkFBUSxLQUFSLGtCQUFRLFFBTXhCO0FBQ0YsQ0FBQyxFQVhnQixTQUFTLEtBQVQsU0FBUyxRQVd6QjtBQUVELGVBQWUsS0FBSyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEVDUywge0VudGl0aWVzLCBTeXN0ZW19IGZyb20gXCIuLi9lY3MuanNcIlxyXG5pbXBvcnQgXCIuL2xpYi5qc1wiXHJcbnR5cGUgQ29uc3RydWN0b3I8VD4gPSBuZXcoLi4uYXJnczogYW55W10pID0+IFRcclxuXHJcbmNvbnN0IFdvcmxkID0gbmV3IEVDUygpXHJcblxyXG5leHBvcnQgY2xhc3MgU2ltdWxhdG9yIHtcclxuXHRwcml2YXRlIHN0YXRpYyBsb2dpY0hhbmRsZTogbnVtYmVyID0gTmFOXHJcblx0cHJpdmF0ZSBzdGF0aWMgcmVuZGVySGFuZGxlOiBudW1iZXIgPSBOYU5cclxuXHJcblx0c3RhdGljICNkZWx0YVRpbWU6IG51bWJlciA9IDBcclxuXHRzdGF0aWMgI2ZpeGVkRGVsdGFUaW1lOiBudW1iZXIgPSAwLjAyXHJcblxyXG5cdC8qKiBXaGV0aGVyIHRoZSBzaW11bGF0aW9uIGlzIGFjdGl2ZWx5IGJlaW5nIHVwZGF0ZWQgKi9cclxuXHRwdWJsaWMgc3RhdGljIGdldCBhY3RpdmUoKTogYm9vbGVhbiB7XHJcblx0XHRyZXR1cm4gIWlzTmFOKHRoaXMubG9naWNIYW5kbGUpIHx8ICFpc05hTih0aGlzLnJlbmRlckhhbmRsZSlcclxuXHR9XHJcblxyXG5cdC8qKiBUaW1lIGJldHdlZW4gZnJhbWVzICovXHJcblx0cHVibGljIHN0YXRpYyBnZXQgZGVsdGFUaW1lKCk6IG51bWJlciB7XHJcblx0XHRyZXR1cm4gdGhpcy4jZGVsdGFUaW1lXHJcblx0fVxyXG5cclxuXHQvKiogVGltZSBiZXR3ZWVuIHBoeXNpY3MgaXRlcmF0aW9ucyAqL1xyXG5cdHB1YmxpYyBzdGF0aWMgZ2V0IGZpeGVkRGVsdGFUaW1lKCk6IG51bWJlciB7XHJcblx0XHRyZXR1cm4gdGhpcy4jZml4ZWREZWx0YVRpbWVcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzdGF0aWMgc2V0IGZpeGVkRGVsdGFUaW1lKHZhbHVlOiBudW1iZXIpIHtcclxuXHRcdHRoaXMuZml4ZWREZWx0YVRpbWUgPSB2YWx1ZVxyXG5cclxuXHRcdGlmKCFpc05hTih0aGlzLmxvZ2ljSGFuZGxlKSkge1xyXG5cdFx0XHR0aGlzLnN1c3BlbmQoKVxyXG5cdFx0XHR0aGlzLnJlc3VtZSgpXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXN1bWVzIHdvcmxkIHNpbXVsYXRpb25cclxuXHQgKi9cclxuXHRwdWJsaWMgc3RhdGljIHJlc3VtZSgpOiB2b2lkIHtcclxuXHRcdGlmKHRoaXMuYWN0aXZlKVxyXG5cdFx0XHRyZXR1cm5cclxuXHJcblx0XHRsZXQgbGFzdFRpbWUgPSAwXHJcblx0XHRsZXQgc3lzdGVtcyA9IFsuLi5Xb3JsZC5zeXN0ZW1zXVxyXG5cdFx0bGV0IGRpdmlkZXIgPSBzeXN0ZW1zLmZpbmRJbmRleCh2ID0+IHYuY29uc3RydWN0b3IgPSBTaW11bGF0b3IuQ2F0ZWdvcnkuVUkpXHJcblx0XHRsZXQgbG9naWNTeXN0ZW1zID0gc3lzdGVtcy5zbGljZSgwLCBkaXZpZGVyKS5maWx0ZXIocyA9PiAhKHMgaW5zdGFuY2VvZiBDYXRlZ29yeVN5c3RlbSkpXHJcblx0XHRsZXQgZ3JhcGhpY3NTeXN0ZW1zID0gc3lzdGVtcy5zbGljZShkaXZpZGVyKS5maWx0ZXIocyA9PiAhKHMgaW5zdGFuY2VvZiBDYXRlZ29yeVN5c3RlbSkpXHJcblxyXG5cdFx0bGV0IGxvZ2ljQ2FsbGJhY2s6ICgpID0+IHZvaWRcclxuXHRcdGxldCByZW5kZXJDYWxsYmFjazogKHRpbWU6IG51bWJlcikgPT4gdm9pZFxyXG5cclxuXHRcdGxvZ2ljQ2FsbGJhY2sgPSAoKSA9PiB7XHJcblx0XHRcdGZvcihsZXQgc3lzdGVtIG9mIGxvZ2ljU3lzdGVtcylcclxuXHRcdFx0XHRzeXN0ZW0udXBkYXRlKFdvcmxkLmVudGl0aWVzKVxyXG5cdFx0fVxyXG5cclxuXHRcdHJlbmRlckNhbGxiYWNrID0gdGltZSA9PiB7XHJcblx0XHRcdFNpbXVsYXRvci4jZGVsdGFUaW1lID0gKHRpbWUgLSBsYXN0VGltZSkgLyAxMDAwXHJcblx0XHRcdGxhc3RUaW1lID0gdGltZVxyXG5cclxuXHRcdFx0Zm9yKGxldCBzeXN0ZW0gb2YgZ3JhcGhpY3NTeXN0ZW1zKVxyXG5cdFx0XHRcdHN5c3RlbS51cGRhdGUoV29ybGQuZW50aXRpZXMpXHJcblxyXG5cdFx0XHR0aGlzLnJlbmRlckhhbmRsZSA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXJDYWxsYmFjaylcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmxvZ2ljSGFuZGxlID0gc2V0SW50ZXJ2YWwobG9naWNDYWxsYmFjaywgMTAwMCAqIFNpbXVsYXRvci5maXhlZERlbHRhVGltZSlcclxuXHRcdHRoaXMucmVuZGVySGFuZGxlID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlbmRlckNhbGxiYWNrKVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU3VzcGVuZHMgd29ybGQgc2ltdWxhdGlvblxyXG5cdCAqL1xyXG5cdHB1YmxpYyBzdGF0aWMgc3VzcGVuZCgpOiB2b2lkIHtcclxuXHRcdGlmKCF0aGlzLmFjdGl2ZSlcclxuXHRcdFx0cmV0dXJuXHJcblxyXG5cdFx0Y2xlYXJJbnRlcnZhbCh0aGlzLmxvZ2ljSGFuZGxlKVxyXG5cdFx0dGhpcy5sb2dpY0hhbmRsZSA9IE5hTlxyXG5cclxuXHRcdGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMucmVuZGVySGFuZGxlKVxyXG5cdFx0dGhpcy5yZW5kZXJIYW5kbGUgPSBOYU5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBwYXJhbSBjYXRlZ29yeSBDYXRlZ29yeSBmb3IgdGhlIHN5c3RlbSB0byBiZSBwbGFjZWQgaW5cclxuXHQgKiBAcGFyYW0gcGFyYW0xIEFkZGl0aW9uYWwgc3lzdGVtcyBkZXNjcmliaW5nIHVwZGF0ZSBvcmRlclxyXG5cdCAqIEByZXR1cm5zIENyZWF0ZXMgYW4gb3JkZXIgd2hpY2ggdXBkYXRlcyB0aGUgc3lzdGVtIHdpdGhpbiB0aGUgc3BlY2lmaWVkIGNhdGVnb3J5XHJcblx0ICovXHJcblx0cHVibGljIHN0YXRpYyBwaGFzZShjYXRlZ29yeTogQ29uc3RydWN0b3I8Q2F0ZWdvcnlTeXN0ZW0+LCB7YWZ0ZXIsIGJlZm9yZX06IFN5c3RlbS5PcmRlciA9IHt9KTogU3lzdGVtLk9yZGVyIHtcclxuXHRcdGFmdGVyID8/PSBbXVxyXG5cdFx0YmVmb3JlID8/PSBbXVxyXG5cclxuXHRcdGFmdGVyLnB1c2goY2F0ZWdvcnkpXHJcblxyXG5cdFx0c3dpdGNoKGNhdGVnb3J5KSB7XHJcblx0XHRcdGNhc2UgU2ltdWxhdG9yLkNhdGVnb3J5LlBoeXNpY3M6XHJcblx0XHRcdFx0YmVmb3JlLnB1c2goU2ltdWxhdG9yLkNhdGVnb3J5LklucHV0KVxyXG5cdFx0XHRcdGJyZWFrXHJcblx0XHRcdGNhc2UgU2ltdWxhdG9yLkNhdGVnb3J5LklucHV0OlxyXG5cdFx0XHRcdGJlZm9yZS5wdXNoKFNpbXVsYXRvci5DYXRlZ29yeS5Mb2dpYylcclxuXHRcdFx0XHRicmVha1xyXG5cdFx0XHRjYXNlIFNpbXVsYXRvci5DYXRlZ29yeS5Mb2dpYzpcclxuXHRcdFx0XHRiZWZvcmUucHVzaChTaW11bGF0b3IuQ2F0ZWdvcnkuVUkpXHJcblx0XHRcdFx0YnJlYWtcclxuXHRcdFx0Y2FzZSBTaW11bGF0b3IuQ2F0ZWdvcnkuVUk6XHJcblx0XHRcdFx0YmVmb3JlLnB1c2goU2ltdWxhdG9yLkNhdGVnb3J5LkdyYXBoaWNzKVxyXG5cdFx0XHRcdGJyZWFrXHJcblx0XHRcdGNhc2UgU2ltdWxhdG9yLkNhdGVnb3J5LkdyYXBoaWNzOlxyXG5cdFx0XHRcdGJyZWFrXHJcblx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGBVbmtub3duIHBoYXNlOiAnJHtjYXRlZ29yeS5uYW1lfSdgKVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiA8U3lzdGVtLk9yZGVyPntcclxuXHRcdFx0YWZ0ZXI6IGFmdGVyLFxyXG5cdFx0XHRiZWZvcmU6IGJlZm9yZVxyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuY2xhc3MgQ2F0ZWdvcnlTeXN0ZW0gZXh0ZW5kcyBTeXN0ZW0ge1xyXG5cdHB1YmxpYyB1cGRhdGUoXzogRW50aXRpZXMpOiB2b2lkIHtcclxuXHRcdHRocm93IG5ldyBFcnJvcihcIlVuZXhwZWN0ZWQgdXBkYXRlIGNhbGwgb24gY2F0ZWdvcmljYWwgc3lzdGVtP1wiKVxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IG5hbWVzcGFjZSBTaW11bGF0b3Ige1xyXG5cdC8qKlxyXG5cdCAqIFN5c3RlbSBjYXRlZ29yaWVzIGZvciBvcmdhbml6YXRpb25hbCBwdXJwb3Nlc1xyXG5cdCAqL1xyXG5cdGV4cG9ydCBuYW1lc3BhY2UgQ2F0ZWdvcnkge1xyXG5cdFx0QFdvcmxkLnJlZ2lzdGVyLnN5c3RlbSgpIGV4cG9ydCBjbGFzcyBQaHlzaWNzIGV4dGVuZHMgQ2F0ZWdvcnlTeXN0ZW0ge31cclxuXHRcdEBXb3JsZC5yZWdpc3Rlci5zeXN0ZW0oe2FmdGVyOiBbUGh5c2ljc119KSBleHBvcnQgY2xhc3MgSW5wdXQgZXh0ZW5kcyBDYXRlZ29yeVN5c3RlbSB7fVxyXG5cdFx0QFdvcmxkLnJlZ2lzdGVyLnN5c3RlbSh7YWZ0ZXI6IFtJbnB1dF19KSBleHBvcnQgY2xhc3MgTG9naWMgZXh0ZW5kcyBDYXRlZ29yeVN5c3RlbSB7fVxyXG5cdFx0QFdvcmxkLnJlZ2lzdGVyLnN5c3RlbSh7YWZ0ZXI6IFtMb2dpY119KSBleHBvcnQgY2xhc3MgVUkgZXh0ZW5kcyBDYXRlZ29yeVN5c3RlbSB7fVxyXG5cdFx0QFdvcmxkLnJlZ2lzdGVyLnN5c3RlbSh7YWZ0ZXI6IFtVSV19KSBleHBvcnQgY2xhc3MgR3JhcGhpY3MgZXh0ZW5kcyBDYXRlZ29yeVN5c3RlbSB7fVxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgV29ybGQiXX0=