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
Object.defineProperty(exports, "__esModule", { value: true });
const world_js_1 = __importStar(require("../world.js"));
const ecs_js_1 = require("../../ecs.js");
/** Keeps track of simulated and real time while allowing adjustment of simulated time speed */
let TimeSystem = TimeSystem_1 = class TimeSystem extends ecs_js_1.System {
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
        world_js_1.Simulator.fixedDeltaTime = world_js_1.Simulator.fixedDeltaTime * __classPrivateFieldGet(this, _TimeSystem_timescale, "f") / newValue;
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
    world_js_1.default.register.system({ before: [world_js_1.Simulator.Category.Physics] }),
    __metadata("design:paramtypes", [])
], TimeSystem);
exports.default = TimeSystem;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZVN5c3RlbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tb24vc3lzdGVtcy90aW1lU3lzdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx3REFBNEM7QUFDNUMseUNBQTZDO0FBRTdDLCtGQUErRjtBQUUvRixJQUFxQixVQUFVLGtCQUEvQixNQUFxQixVQUFXLFNBQVEsZUFBTTtJQVE3QztRQUNDLEtBQUssRUFBRSxDQUFBO1FBUlIsZ0NBQXFCLENBQUMsRUFBQTtRQUN0QiwyQkFBZ0IsQ0FBQyxFQUFBO1FBQ2pCLCtCQUFvQixDQUFDLEVBQUE7UUFFckIsb0NBQWM7UUFDZCwyQ0FBcUI7UUFJcEIsdUJBQUEsSUFBSSxxQkFBVSxXQUFXLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxNQUFBLENBQUE7UUFDdEMsdUJBQUEsSUFBSSw0QkFBaUIsQ0FBQyxNQUFBLENBQUE7SUFDdkIsQ0FBQztJQUVELDhCQUE4QjtJQUM5QixJQUFXLElBQUk7UUFDZCxPQUFPLHVCQUFBLElBQUksd0JBQU0sQ0FBQTtJQUNsQixDQUFDO0lBRUQscURBQXFEO0lBQ3JELElBQVcsUUFBUTtRQUNsQixPQUFPLHVCQUFBLElBQUksNEJBQVUsQ0FBQTtJQUN0QixDQUFDO0lBRUQsa0dBQWtHO0lBQ2xHLElBQVcsU0FBUztRQUNuQixPQUFPLHVCQUFBLElBQUksNkJBQVcsQ0FBQTtJQUN2QixDQUFDO0lBRUQsSUFBVyxTQUFTLENBQUMsS0FBYTtRQUNqQyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBRTlDLG9CQUFTLENBQUMsY0FBYyxHQUFHLG9CQUFTLENBQUMsY0FBYyxHQUFHLHVCQUFBLElBQUksNkJBQVcsR0FBRyxRQUFRLENBQUE7UUFDaEYsdUJBQUEsSUFBSSx5QkFBYyxRQUFRLE1BQUEsQ0FBQTtJQUMzQixDQUFDO0lBRU0sTUFBTSxDQUFDLENBQVc7UUFDeEIsdUJBQUEsSUFBSSx3QkFBYSxXQUFXLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxHQUFHLHVCQUFBLElBQUkseUJBQU8sTUFBQSxDQUFBO1FBQ3ZELHFHQUFjLENBQUMsdUJBQUEsSUFBSSw0QkFBVSxHQUFHLHVCQUFBLElBQUksZ0NBQWMsQ0FBQyxHQUFHLHVCQUFBLElBQUksNkJBQVcsTUFBQSxDQUFBO1FBQ3JFLHVCQUFBLElBQUksNEJBQWlCLHVCQUFBLElBQUksNEJBQVUsTUFBQSxDQUFBO0lBQ3BDLENBQUM7Q0FDRCxDQUFBOztBQXpDb0IsVUFBVTtJQUQ5QixrQkFBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQW9CLEVBQUMsTUFBTSxFQUFFLENBQUMsb0JBQVMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUMsQ0FBQzs7R0FDNUQsVUFBVSxDQXlDOUI7a0JBekNvQixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFdvcmxkLCB7U2ltdWxhdG9yfSBmcm9tIFwiLi4vd29ybGQuanNcIlxyXG5pbXBvcnQge0VudGl0aWVzLCBTeXN0ZW19IGZyb20gXCIuLi8uLi9lY3MuanNcIlxyXG5cclxuLyoqIEtlZXBzIHRyYWNrIG9mIHNpbXVsYXRlZCBhbmQgcmVhbCB0aW1lIHdoaWxlIGFsbG93aW5nIGFkanVzdG1lbnQgb2Ygc2ltdWxhdGVkIHRpbWUgc3BlZWQgKi9cclxuQFdvcmxkLnJlZ2lzdGVyLnN5c3RlbTx0eXBlb2YgVGltZVN5c3RlbT4oe2JlZm9yZTogW1NpbXVsYXRvci5DYXRlZ29yeS5QaHlzaWNzXX0pXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRpbWVTeXN0ZW0gZXh0ZW5kcyBTeXN0ZW0ge1xyXG5cdCN0aW1lc2NhbGU6IG51bWJlciA9IDFcclxuXHQjdGltZTogbnVtYmVyID0gMFxyXG5cdCNyZWFsdGltZTogbnVtYmVyID0gMFxyXG5cclxuXHQjZXBvY2g6IG51bWJlclxyXG5cdCNsYXN0UmVhbHRpbWU6IG51bWJlclxyXG5cclxuXHRwdWJsaWMgY29uc3RydWN0b3IoKSB7XHJcblx0XHRzdXBlcigpXHJcblx0XHR0aGlzLiNlcG9jaCA9IHBlcmZvcm1hbmNlLm5vdygpIC8gMTAwMFxyXG5cdFx0dGhpcy4jbGFzdFJlYWx0aW1lID0gMFxyXG5cdH1cclxuXHJcblx0LyoqIEN1cnJlbnQgdGltZSBpbiBzZWNvbmRzICovXHJcblx0cHVibGljIGdldCB0aW1lKCk6IG51bWJlciB7XHJcblx0XHRyZXR1cm4gdGhpcy4jdGltZVxyXG5cdH1cclxuXHJcblx0LyoqIEN1cnJlbnQgdGltZSBpbiBzZWNvbmRzIGRpc3JlZ2FyZGluZyB0aW1lc2NhbGUgKi9cclxuXHRwdWJsaWMgZ2V0IHJlYWx0aW1lKCk6IG51bWJlciB7XHJcblx0XHRyZXR1cm4gdGhpcy4jcmVhbHRpbWVcclxuXHR9XHJcblxyXG5cdC8qKiBSYXRlIGF0IHdoaWNoIHNpbXVsYXRlZCB0aW1lIHByb2dyZXNzZXMgd2hlcmUgMSBpcyBub3JtYWwgc3BlZWQgYW5kIDAgaXMgY29tcGxldGVseSBzdG9wcGVkICovXHJcblx0cHVibGljIGdldCB0aW1lc2NhbGUoKTogbnVtYmVyIHtcclxuXHRcdHJldHVybiB0aGlzLiN0aW1lc2NhbGVcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQgdGltZXNjYWxlKHZhbHVlOiBudW1iZXIpIHtcclxuXHRcdGxldCBuZXdWYWx1ZSA9IE1hdGgubWF4KDAsIE1hdGgubWluKHZhbHVlLCAxKSlcclxuXHJcblx0XHRTaW11bGF0b3IuZml4ZWREZWx0YVRpbWUgPSBTaW11bGF0b3IuZml4ZWREZWx0YVRpbWUgKiB0aGlzLiN0aW1lc2NhbGUgLyBuZXdWYWx1ZVxyXG5cdFx0dGhpcy4jdGltZXNjYWxlID0gbmV3VmFsdWVcclxuXHR9XHJcblxyXG5cdHB1YmxpYyB1cGRhdGUoXzogRW50aXRpZXMpOiB2b2lkIHtcclxuXHRcdHRoaXMuI3JlYWx0aW1lID0gcGVyZm9ybWFuY2Uubm93KCkgLyAxMDAwIC0gdGhpcy4jZXBvY2hcclxuXHRcdHRoaXMuI3RpbWUgKz0gKHRoaXMuI3JlYWx0aW1lIC0gdGhpcy4jbGFzdFJlYWx0aW1lKSAqIHRoaXMuI3RpbWVzY2FsZVxyXG5cdFx0dGhpcy4jbGFzdFJlYWx0aW1lID0gdGhpcy4jcmVhbHRpbWVcclxuXHR9XHJcbn0iXX0=