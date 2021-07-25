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
var _Time_start;
import World from "../world.js";
import { Component } from "../../ecs.js";
import TimeSystem from "../systems/timeSystem.js";
/**
 * Keeps track of self lifetime
 */
let Time = class Time extends Component {
    constructor() {
        super(...arguments);
        _Time_start.set(this, void 0);
    }
    /** Time in seconds when added */
    get start() {
        return __classPrivateFieldGet(this, _Time_start, "f");
    }
    /** Time in seconds since introduction */
    get duration() {
        return World.systems.get(TimeSystem).time - __classPrivateFieldGet(this, _Time_start, "f");
    }
    added(entity) {
        __classPrivateFieldSet(this, _Time_start, World.systems.get(TimeSystem).time, "f");
    }
};
_Time_start = new WeakMap();
Time = __decorate([
    World.register.component()
], Time);
export default Time;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tb24vY29tcG9uZW50cy90aW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sS0FBSyxNQUFNLGFBQWEsQ0FBQTtBQUMvQixPQUFPLEVBQVMsU0FBUyxFQUFDLE1BQU0sY0FBYyxDQUFBO0FBQzlDLE9BQU8sVUFBVSxNQUFNLDBCQUEwQixDQUFBO0FBRWpEOztHQUVHO0FBRUgsSUFBcUIsSUFBSSxHQUF6QixNQUFxQixJQUFLLFNBQVEsU0FBUztJQUEzQzs7UUFDQyw4QkFBYztJQWVmLENBQUM7SUFiQSxpQ0FBaUM7SUFDakMsSUFBVyxLQUFLO1FBQ2YsT0FBTyx1QkFBQSxJQUFJLG1CQUFPLENBQUE7SUFDbkIsQ0FBQztJQUVELHlDQUF5QztJQUN6QyxJQUFXLFFBQVE7UUFDbEIsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLEdBQUcsdUJBQUEsSUFBSSxtQkFBTyxDQUFBO0lBQ3hELENBQUM7SUFFa0IsS0FBSyxDQUFDLE1BQWM7UUFDdEMsdUJBQUEsSUFBSSxlQUFVLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksTUFBQSxDQUFBO0lBQ2pELENBQUM7Q0FDRCxDQUFBOztBQWhCb0IsSUFBSTtJQUR4QixLQUFLLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRTtHQUNOLElBQUksQ0FnQnhCO2VBaEJvQixJQUFJIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFdvcmxkIGZyb20gXCIuLi93b3JsZC5qc1wiXHJcbmltcG9ydCB7RW50aXR5LCBDb21wb25lbnR9IGZyb20gXCIuLi8uLi9lY3MuanNcIlxyXG5pbXBvcnQgVGltZVN5c3RlbSBmcm9tIFwiLi4vc3lzdGVtcy90aW1lU3lzdGVtLmpzXCJcclxuXHJcbi8qKlxyXG4gKiBLZWVwcyB0cmFjayBvZiBzZWxmIGxpZmV0aW1lXHJcbiAqL1xyXG5AV29ybGQucmVnaXN0ZXIuY29tcG9uZW50KClcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGltZSBleHRlbmRzIENvbXBvbmVudCB7XHJcblx0I3N0YXJ0OiBudW1iZXJcclxuXHJcblx0LyoqIFRpbWUgaW4gc2Vjb25kcyB3aGVuIGFkZGVkICovXHJcblx0cHVibGljIGdldCBzdGFydCgpOiBudW1iZXIge1xyXG5cdFx0cmV0dXJuIHRoaXMuI3N0YXJ0XHJcblx0fVxyXG5cclxuXHQvKiogVGltZSBpbiBzZWNvbmRzIHNpbmNlIGludHJvZHVjdGlvbiAqL1xyXG5cdHB1YmxpYyBnZXQgZHVyYXRpb24oKTogbnVtYmVyIHtcclxuXHRcdHJldHVybiBXb3JsZC5zeXN0ZW1zLmdldChUaW1lU3lzdGVtKS50aW1lIC0gdGhpcy4jc3RhcnRcclxuXHR9XHJcblxyXG5cdHByb3RlY3RlZCBvdmVycmlkZSBhZGRlZChlbnRpdHk6IEVudGl0eSk6IHZvaWQge1xyXG5cdFx0dGhpcy4jc3RhcnQgPSBXb3JsZC5zeXN0ZW1zLmdldChUaW1lU3lzdGVtKS50aW1lXHJcblx0fVxyXG59Il19