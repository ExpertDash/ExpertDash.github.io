"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _Time_start;
Object.defineProperty(exports, "__esModule", { value: true });
const world_js_1 = __importDefault(require("../world.js"));
const ecs_js_1 = require("../../ecs.js");
const timeSystem_js_1 = __importDefault(require("../systems/timeSystem.js"));
/**
 * Keeps track of self lifetime
 */
let Time = class Time extends ecs_js_1.Component {
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
        return world_js_1.default.systems.get(timeSystem_js_1.default).time - __classPrivateFieldGet(this, _Time_start, "f");
    }
    added(entity) {
        __classPrivateFieldSet(this, _Time_start, world_js_1.default.systems.get(timeSystem_js_1.default).time, "f");
    }
};
_Time_start = new WeakMap();
Time = __decorate([
    world_js_1.default.register.component()
], Time);
exports.default = Time;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tb24vY29tcG9uZW50cy90aW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkRBQStCO0FBQy9CLHlDQUE4QztBQUM5Qyw2RUFBaUQ7QUFFakQ7O0dBRUc7QUFFSCxJQUFxQixJQUFJLEdBQXpCLE1BQXFCLElBQUssU0FBUSxrQkFBUztJQUEzQzs7UUFDQyw4QkFBYztJQWVmLENBQUM7SUFiQSxpQ0FBaUM7SUFDakMsSUFBVyxLQUFLO1FBQ2YsT0FBTyx1QkFBQSxJQUFJLG1CQUFPLENBQUE7SUFDbkIsQ0FBQztJQUVELHlDQUF5QztJQUN6QyxJQUFXLFFBQVE7UUFDbEIsT0FBTyxrQkFBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQVUsQ0FBQyxDQUFDLElBQUksR0FBRyx1QkFBQSxJQUFJLG1CQUFPLENBQUE7SUFDeEQsQ0FBQztJQUVrQixLQUFLLENBQUMsTUFBYztRQUN0Qyx1QkFBQSxJQUFJLGVBQVUsa0JBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUFVLENBQUMsQ0FBQyxJQUFJLE1BQUEsQ0FBQTtJQUNqRCxDQUFDO0NBQ0QsQ0FBQTs7QUFoQm9CLElBQUk7SUFEeEIsa0JBQUssQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFO0dBQ04sSUFBSSxDQWdCeEI7a0JBaEJvQixJQUFJIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFdvcmxkIGZyb20gXCIuLi93b3JsZC5qc1wiXHJcbmltcG9ydCB7RW50aXR5LCBDb21wb25lbnR9IGZyb20gXCIuLi8uLi9lY3MuanNcIlxyXG5pbXBvcnQgVGltZVN5c3RlbSBmcm9tIFwiLi4vc3lzdGVtcy90aW1lU3lzdGVtLmpzXCJcclxuXHJcbi8qKlxyXG4gKiBLZWVwcyB0cmFjayBvZiBzZWxmIGxpZmV0aW1lXHJcbiAqL1xyXG5AV29ybGQucmVnaXN0ZXIuY29tcG9uZW50KClcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGltZSBleHRlbmRzIENvbXBvbmVudCB7XHJcblx0I3N0YXJ0OiBudW1iZXJcclxuXHJcblx0LyoqIFRpbWUgaW4gc2Vjb25kcyB3aGVuIGFkZGVkICovXHJcblx0cHVibGljIGdldCBzdGFydCgpOiBudW1iZXIge1xyXG5cdFx0cmV0dXJuIHRoaXMuI3N0YXJ0XHJcblx0fVxyXG5cclxuXHQvKiogVGltZSBpbiBzZWNvbmRzIHNpbmNlIGludHJvZHVjdGlvbiAqL1xyXG5cdHB1YmxpYyBnZXQgZHVyYXRpb24oKTogbnVtYmVyIHtcclxuXHRcdHJldHVybiBXb3JsZC5zeXN0ZW1zLmdldChUaW1lU3lzdGVtKS50aW1lIC0gdGhpcy4jc3RhcnRcclxuXHR9XHJcblxyXG5cdHByb3RlY3RlZCBvdmVycmlkZSBhZGRlZChlbnRpdHk6IEVudGl0eSk6IHZvaWQge1xyXG5cdFx0dGhpcy4jc3RhcnQgPSBXb3JsZC5zeXN0ZW1zLmdldChUaW1lU3lzdGVtKS50aW1lXHJcblx0fVxyXG59Il19