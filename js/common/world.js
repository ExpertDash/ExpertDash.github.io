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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Simulator = void 0;
const ecs_js_1 = __importStar(require("../ecs.js"));
require("./common.js");
const World = new ecs_js_1.default();
class Simulator {
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
        clearInterval(this.logicHandle);
        this.logicHandle = NaN;
        cancelAnimationFrame(this.renderHandle);
        this.renderHandle = NaN;
    }
}
exports.Simulator = Simulator;
_a = Simulator;
Simulator.logicHandle = NaN;
Simulator.renderHandle = NaN;
_Simulator_deltaTime = { value: 0 };
_Simulator_fixedDeltaTime = { value: 0.02 };
class CategorySystem extends ecs_js_1.System {
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
})(Simulator = exports.Simulator || (exports.Simulator = {}));
exports.default = World;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ybGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbW9uL3dvcmxkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvREFBK0M7QUFDL0MsdUJBQW9CO0FBRXBCLE1BQU0sS0FBSyxHQUFHLElBQUksZ0JBQUcsRUFBRSxDQUFBO0FBRXZCLE1BQWEsU0FBUztJQU9yQiwwQkFBMEI7SUFDbkIsTUFBTSxLQUFLLFNBQVM7UUFDMUIsT0FBTyx1QkFBQSxJQUFJLGdDQUFXLENBQUE7SUFDdkIsQ0FBQztJQUVELHNDQUFzQztJQUMvQixNQUFNLEtBQUssY0FBYztRQUMvQixPQUFPLHVCQUFBLElBQUkscUNBQWdCLENBQUE7SUFDNUIsQ0FBQztJQUVNLE1BQU0sS0FBSyxjQUFjLENBQUMsS0FBYTtRQUM3QyxJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQTtRQUUzQixJQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUM1QixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUE7WUFDZCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUE7U0FDYjtJQUNGLENBQUM7SUFFRDs7T0FFRztJQUNJLE1BQU0sQ0FBQyxNQUFNO1FBQ25CLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQTtRQUNoQixJQUFJLE9BQU8sR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQ2hDLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDM0UsSUFBSSxZQUFZLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FB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QVMsU0FBUSxjQUFjO1NBQUcsQ0FBQTtRQUFsQyxRQUFRO1lBQTFELEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQztXQUFjLFFBQVEsQ0FBMEI7UUFBbEMsaUJBQVEsV0FBMEIsQ0FBQTtJQUN0RixDQUFDLEVBTmdCLFFBQVEsR0FBUixrQkFBUSxLQUFSLGtCQUFRLFFBTXhCO0FBQ0YsQ0FBQyxFQVhnQixTQUFTLEdBQVQsaUJBQVMsS0FBVCxpQkFBUyxRQVd6QjtBQUVELGtCQUFlLEtBQUssQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFQ1MsIHtFbnRpdGllcywgU3lzdGVtfSBmcm9tIFwiLi4vZWNzLmpzXCJcclxuaW1wb3J0IFwiLi9jb21tb24uanNcIlxyXG5cclxuY29uc3QgV29ybGQgPSBuZXcgRUNTKClcclxuXHJcbmV4cG9ydCBjbGFzcyBTaW11bGF0b3Ige1xyXG5cdHByaXZhdGUgc3RhdGljIGxvZ2ljSGFuZGxlOiBudW1iZXIgPSBOYU5cclxuXHRwcml2YXRlIHN0YXRpYyByZW5kZXJIYW5kbGU6IG51bWJlciA9IE5hTlxyXG5cclxuXHRzdGF0aWMgI2RlbHRhVGltZTogbnVtYmVyID0gMFxyXG5cdHN0YXRpYyAjZml4ZWREZWx0YVRpbWU6IG51bWJlciA9IDAuMDJcclxuXHJcblx0LyoqIFRpbWUgYmV0d2VlbiBmcmFtZXMgKi9cclxuXHRwdWJsaWMgc3RhdGljIGdldCBkZWx0YVRpbWUoKTogbnVtYmVyIHtcclxuXHRcdHJldHVybiB0aGlzLiNkZWx0YVRpbWVcclxuXHR9XHJcblxyXG5cdC8qKiBUaW1lIGJldHdlZW4gcGh5c2ljcyBpdGVyYXRpb25zICovXHJcblx0cHVibGljIHN0YXRpYyBnZXQgZml4ZWREZWx0YVRpbWUoKTogbnVtYmVyIHtcclxuXHRcdHJldHVybiB0aGlzLiNmaXhlZERlbHRhVGltZVxyXG5cdH1cclxuXHJcblx0cHVibGljIHN0YXRpYyBzZXQgZml4ZWREZWx0YVRpbWUodmFsdWU6IG51bWJlcikge1xyXG5cdFx0dGhpcy5maXhlZERlbHRhVGltZSA9IHZhbHVlXHJcblxyXG5cdFx0aWYoIWlzTmFOKHRoaXMubG9naWNIYW5kbGUpKSB7XHJcblx0XHRcdHRoaXMuc3VzcGVuZCgpXHJcblx0XHRcdHRoaXMucmVzdW1lKClcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlc3VtZXMgd29ybGQgc2ltdWxhdGlvblxyXG5cdCAqL1xyXG5cdHB1YmxpYyBzdGF0aWMgcmVzdW1lKCk6IHZvaWQge1xyXG5cdFx0bGV0IGxhc3RUaW1lID0gMFxyXG5cdFx0bGV0IHN5c3RlbXMgPSBbLi4uV29ybGQuc3lzdGVtc11cclxuXHRcdGxldCBkaXZpZGVyID0gc3lzdGVtcy5maW5kSW5kZXgodiA9PiB2LmNvbnN0cnVjdG9yID0gU2ltdWxhdG9yLkNhdGVnb3J5LlVJKVxyXG5cdFx0bGV0IGxvZ2ljU3lzdGVtcyA9IHN5c3RlbXMuc2xpY2UoMCwgZGl2aWRlcikuZmlsdGVyKHMgPT4gIShzIGluc3RhbmNlb2YgQ2F0ZWdvcnlTeXN0ZW0pKVxyXG5cdFx0bGV0IGdyYXBoaWNzU3lzdGVtcyA9IHN5c3RlbXMuc2xpY2UoZGl2aWRlcikuZmlsdGVyKHMgPT4gIShzIGluc3RhbmNlb2YgQ2F0ZWdvcnlTeXN0ZW0pKVxyXG5cclxuXHRcdHRoaXMubG9naWNIYW5kbGUgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcblx0XHRcdGZvcihsZXQgc3lzdGVtIG9mIGxvZ2ljU3lzdGVtcylcclxuXHRcdFx0XHRzeXN0ZW0udXBkYXRlKFdvcmxkLmVudGl0aWVzKVxyXG5cdFx0fSwgMTAwMCAqIFNpbXVsYXRvci5maXhlZERlbHRhVGltZSlcclxuXHJcblx0XHR0aGlzLnJlbmRlckhhbmRsZSA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aW1lID0+IHtcclxuXHRcdFx0U2ltdWxhdG9yLiNkZWx0YVRpbWUgPSAodGltZSAtIGxhc3RUaW1lKSAvIDEwMDBcclxuXHRcdFx0bGFzdFRpbWUgPSB0aW1lXHJcblxyXG5cdFx0XHRmb3IobGV0IHN5c3RlbSBvZiBncmFwaGljc1N5c3RlbXMpXHJcblx0XHRcdFx0c3lzdGVtLnVwZGF0ZShXb3JsZC5lbnRpdGllcylcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTdXNwZW5kcyB3b3JsZCBzaW11bGF0aW9uXHJcblx0ICovXHJcblx0cHVibGljIHN0YXRpYyBzdXNwZW5kKCk6IHZvaWQge1xyXG5cdFx0Y2xlYXJJbnRlcnZhbCh0aGlzLmxvZ2ljSGFuZGxlKVxyXG5cdFx0dGhpcy5sb2dpY0hhbmRsZSA9IE5hTlxyXG5cclxuXHRcdGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMucmVuZGVySGFuZGxlKVxyXG5cdFx0dGhpcy5yZW5kZXJIYW5kbGUgPSBOYU5cclxuXHR9XHJcbn1cclxuXHJcbmNsYXNzIENhdGVnb3J5U3lzdGVtIGV4dGVuZHMgU3lzdGVtIHtcclxuXHRwdWJsaWMgdXBkYXRlKF86IEVudGl0aWVzKTogdm9pZCB7XHJcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJVbmV4cGVjdGVkIHVwZGF0ZSBjYWxsIG9uIGNhdGVnb3JpY2FsIHN5c3RlbT9cIilcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBuYW1lc3BhY2UgU2ltdWxhdG9yIHtcclxuXHQvKipcclxuXHQgKiBTeXN0ZW0gY2F0ZWdvcmllcyBmb3Igb3JnYW5pemF0aW9uYWwgcHVycG9zZXNcclxuXHQgKi9cclxuXHRleHBvcnQgbmFtZXNwYWNlIENhdGVnb3J5IHtcclxuXHRcdEBXb3JsZC5yZWdpc3Rlci5zeXN0ZW0oKSBleHBvcnQgY2xhc3MgUGh5c2ljcyBleHRlbmRzIENhdGVnb3J5U3lzdGVtIHt9XHJcblx0XHRAV29ybGQucmVnaXN0ZXIuc3lzdGVtKHthZnRlcjogW1BoeXNpY3NdfSkgZXhwb3J0IGNsYXNzIElucHV0IGV4dGVuZHMgQ2F0ZWdvcnlTeXN0ZW0ge31cclxuXHRcdEBXb3JsZC5yZWdpc3Rlci5zeXN0ZW0oe2FmdGVyOiBbSW5wdXRdfSkgZXhwb3J0IGNsYXNzIExvZ2ljIGV4dGVuZHMgQ2F0ZWdvcnlTeXN0ZW0ge31cclxuXHRcdEBXb3JsZC5yZWdpc3Rlci5zeXN0ZW0oe2FmdGVyOiBbTG9naWNdfSkgZXhwb3J0IGNsYXNzIFVJIGV4dGVuZHMgQ2F0ZWdvcnlTeXN0ZW0ge31cclxuXHRcdEBXb3JsZC5yZWdpc3Rlci5zeXN0ZW0oe2FmdGVyOiBbVUldfSkgZXhwb3J0IGNsYXNzIEdyYXBoaWNzIGV4dGVuZHMgQ2F0ZWdvcnlTeXN0ZW0ge31cclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFdvcmxkIl19