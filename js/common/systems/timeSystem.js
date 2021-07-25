var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _TimeSystem_timescale, _TimeSystem_time, _TimeSystem_realtime, _TimeSystem_epoch, _TimeSystem_lastRealtime;
var TimeSystem_1;
import World, { Simulator } from "../world.js";
import { System } from "../../ecs.js";
/** Keeps track of simulated and real time while allowing adjustment of simulated time speed */
let TimeSystem = TimeSystem_1 = class TimeSystem extends System {
    constructor() {
        super();
        _TimeSystem_timescale.set(this, 1);
        _TimeSystem_time.set(this, 0);
        _TimeSystem_realtime.set(this, 0);
        _TimeSystem_epoch.set(this, void 0);
        _TimeSystem_lastRealtime.set(this, void 0);
        __classPrivateFieldSet(this, _TimeSystem_epoch, performance.now() / 1000, "f");
        __classPrivateFieldSet(this, _TimeSystem_lastRealtime, 0, "f");
    }
    /** Current time in seconds */
    get time() {
        return __classPrivateFieldGet(this, _TimeSystem_time, "f");
    }
    /** Current time in seconds disregarding timescale */
    get realtime() {
        return __classPrivateFieldGet(this, _TimeSystem_realtime, "f");
    }
    /** Rate at which simulated time progresses where 1 is normal speed and 0 is completely stopped */
    get timescale() {
        return __classPrivateFieldGet(this, _TimeSystem_timescale, "f");
    }
    set timescale(value) {
        let newValue = Math.max(0, Math.min(value, 1));
        Simulator.fixedDeltaTime = Simulator.fixedDeltaTime * __classPrivateFieldGet(this, _TimeSystem_timescale, "f") / newValue;
        __classPrivateFieldSet(this, _TimeSystem_timescale, newValue, "f");
    }
    update(_) {
        __classPrivateFieldSet(this, _TimeSystem_realtime, performance.now() / 1000 - __classPrivateFieldGet(this, _TimeSystem_epoch, "f"), "f");
        __classPrivateFieldSet(this, _TimeSystem_time, __classPrivateFieldGet(this, _TimeSystem_time, "f") + (__classPrivateFieldGet(this, _TimeSystem_realtime, "f") - __classPrivateFieldGet(this, _TimeSystem_lastRealtime, "f")) * __classPrivateFieldGet(this, _TimeSystem_timescale, "f"), "f");
        __classPrivateFieldSet(this, _TimeSystem_lastRealtime, __classPrivateFieldGet(this, _TimeSystem_realtime, "f"), "f");
    }
};
_TimeSystem_timescale = new WeakMap(), _TimeSystem_time = new WeakMap(), _TimeSystem_realtime = new WeakMap(), _TimeSystem_epoch = new WeakMap(), _TimeSystem_lastRealtime = new WeakMap();
TimeSystem = TimeSystem_1 = __decorate([
    World.register.system({ before: [Simulator.Category.Physics] }),
    __metadata("design:paramtypes", [])
], TimeSystem);
export default TimeSystem;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZVN5c3RlbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tb24vc3lzdGVtcy90aW1lU3lzdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEtBQUssRUFBRSxFQUFDLFNBQVMsRUFBQyxNQUFNLGFBQWEsQ0FBQTtBQUM1QyxPQUFPLEVBQVcsTUFBTSxFQUFDLE1BQU0sY0FBYyxDQUFBO0FBRTdDLCtGQUErRjtBQUUvRixJQUFxQixVQUFVLGtCQUEvQixNQUFxQixVQUFXLFNBQVEsTUFBTTtJQVE3QztRQUNDLEtBQUssRUFBRSxDQUFBO1FBUlIsZ0NBQXFCLENBQUMsRUFBQTtRQUN0QiwyQkFBZ0IsQ0FBQyxFQUFBO1FBQ2pCLCtCQUFvQixDQUFDLEVBQUE7UUFFckIsb0NBQWM7UUFDZCwyQ0FBcUI7UUFJcEIsdUJBQUEsSUFBSSxxQkFBVSxXQUFXLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxNQUFBLENBQUE7UUFDdEMsdUJBQUEsSUFBSSw0QkFBaUIsQ0FBQyxNQUFBLENBQUE7SUFDdkIsQ0FBQztJQUVELDhCQUE4QjtJQUM5QixJQUFXLElBQUk7UUFDZCxPQUFPLHVCQUFBLElBQUksd0JBQU0sQ0FBQTtJQUNsQixDQUFDO0lBRUQscURBQXFEO0lBQ3JELElBQVcsUUFBUTtRQUNsQixPQUFPLHVCQUFBLElBQUksNEJBQVUsQ0FBQTtJQUN0QixDQUFDO0lBRUQsa0dBQWtHO0lBQ2xHLElBQVcsU0FBUztRQUNuQixPQUFPLHVCQUFBLElBQUksNkJBQVcsQ0FBQTtJQUN2QixDQUFDO0lBRUQsSUFBVyxTQUFTLENBQUMsS0FBYTtRQUNqQyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBRTlDLFNBQVMsQ0FBQyxjQUFjLEdBQUcsU0FBUyxDQUFDLGNBQWMsR0FBRyx1QkFBQSxJQUFJLDZCQUFXLEdBQUcsUUFBUSxDQUFBO1FBQ2hGLHVCQUFBLElBQUkseUJBQWMsUUFBUSxNQUFBLENBQUE7SUFDM0IsQ0FBQztJQUVNLE1BQU0sQ0FBQyxDQUFXO1FBQ3hCLHVCQUFBLElBQUksd0JBQWEsV0FBVyxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksR0FBRyx1QkFBQSxJQUFJLHlCQUFPLE1BQUEsQ0FBQTtRQUN2RCxxR0FBYyxDQUFDLHVCQUFBLElBQUksNEJBQVUsR0FBRyx1QkFBQSxJQUFJLGdDQUFjLENBQUMsR0FBRyx1QkFBQSxJQUFJLDZCQUFXLE1BQUEsQ0FBQTtRQUNyRSx1QkFBQSxJQUFJLDRCQUFpQix1QkFBQSxJQUFJLDRCQUFVLE1BQUEsQ0FBQTtJQUNwQyxDQUFDO0NBQ0QsQ0FBQTs7QUF6Q29CLFVBQVU7SUFEOUIsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQW9CLEVBQUMsTUFBTSxFQUFFLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBQyxDQUFDOztHQUM1RCxVQUFVLENBeUM5QjtlQXpDb0IsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBXb3JsZCwge1NpbXVsYXRvcn0gZnJvbSBcIi4uL3dvcmxkLmpzXCJcclxuaW1wb3J0IHtFbnRpdGllcywgU3lzdGVtfSBmcm9tIFwiLi4vLi4vZWNzLmpzXCJcclxuXHJcbi8qKiBLZWVwcyB0cmFjayBvZiBzaW11bGF0ZWQgYW5kIHJlYWwgdGltZSB3aGlsZSBhbGxvd2luZyBhZGp1c3RtZW50IG9mIHNpbXVsYXRlZCB0aW1lIHNwZWVkICovXHJcbkBXb3JsZC5yZWdpc3Rlci5zeXN0ZW08dHlwZW9mIFRpbWVTeXN0ZW0+KHtiZWZvcmU6IFtTaW11bGF0b3IuQ2F0ZWdvcnkuUGh5c2ljc119KVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUaW1lU3lzdGVtIGV4dGVuZHMgU3lzdGVtIHtcclxuXHQjdGltZXNjYWxlOiBudW1iZXIgPSAxXHJcblx0I3RpbWU6IG51bWJlciA9IDBcclxuXHQjcmVhbHRpbWU6IG51bWJlciA9IDBcclxuXHJcblx0I2Vwb2NoOiBudW1iZXJcclxuXHQjbGFzdFJlYWx0aW1lOiBudW1iZXJcclxuXHJcblx0cHVibGljIGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0c3VwZXIoKVxyXG5cdFx0dGhpcy4jZXBvY2ggPSBwZXJmb3JtYW5jZS5ub3coKSAvIDEwMDBcclxuXHRcdHRoaXMuI2xhc3RSZWFsdGltZSA9IDBcclxuXHR9XHJcblxyXG5cdC8qKiBDdXJyZW50IHRpbWUgaW4gc2Vjb25kcyAqL1xyXG5cdHB1YmxpYyBnZXQgdGltZSgpOiBudW1iZXIge1xyXG5cdFx0cmV0dXJuIHRoaXMuI3RpbWVcclxuXHR9XHJcblxyXG5cdC8qKiBDdXJyZW50IHRpbWUgaW4gc2Vjb25kcyBkaXNyZWdhcmRpbmcgdGltZXNjYWxlICovXHJcblx0cHVibGljIGdldCByZWFsdGltZSgpOiBudW1iZXIge1xyXG5cdFx0cmV0dXJuIHRoaXMuI3JlYWx0aW1lXHJcblx0fVxyXG5cclxuXHQvKiogUmF0ZSBhdCB3aGljaCBzaW11bGF0ZWQgdGltZSBwcm9ncmVzc2VzIHdoZXJlIDEgaXMgbm9ybWFsIHNwZWVkIGFuZCAwIGlzIGNvbXBsZXRlbHkgc3RvcHBlZCAqL1xyXG5cdHB1YmxpYyBnZXQgdGltZXNjYWxlKCk6IG51bWJlciB7XHJcblx0XHRyZXR1cm4gdGhpcy4jdGltZXNjYWxlXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0IHRpbWVzY2FsZSh2YWx1ZTogbnVtYmVyKSB7XHJcblx0XHRsZXQgbmV3VmFsdWUgPSBNYXRoLm1heCgwLCBNYXRoLm1pbih2YWx1ZSwgMSkpXHJcblxyXG5cdFx0U2ltdWxhdG9yLmZpeGVkRGVsdGFUaW1lID0gU2ltdWxhdG9yLmZpeGVkRGVsdGFUaW1lICogdGhpcy4jdGltZXNjYWxlIC8gbmV3VmFsdWVcclxuXHRcdHRoaXMuI3RpbWVzY2FsZSA9IG5ld1ZhbHVlXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgdXBkYXRlKF86IEVudGl0aWVzKTogdm9pZCB7XHJcblx0XHR0aGlzLiNyZWFsdGltZSA9IHBlcmZvcm1hbmNlLm5vdygpIC8gMTAwMCAtIHRoaXMuI2Vwb2NoXHJcblx0XHR0aGlzLiN0aW1lICs9ICh0aGlzLiNyZWFsdGltZSAtIHRoaXMuI2xhc3RSZWFsdGltZSkgKiB0aGlzLiN0aW1lc2NhbGVcclxuXHRcdHRoaXMuI2xhc3RSZWFsdGltZSA9IHRoaXMuI3JlYWx0aW1lXHJcblx0fVxyXG59Il19