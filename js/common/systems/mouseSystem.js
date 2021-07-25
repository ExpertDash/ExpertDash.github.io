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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _MouseSystem_position;
var MouseSystem_1;
Object.defineProperty(exports, "__esModule", { value: true });
const ecs_js_1 = require("../../ecs.js");
const vec3_js_1 = __importDefault(require("../../math/vec3.js"));
const world_js_1 = __importStar(require("../world.js"));
/** Keeps track of and allows per frame access to the mouse's position and button states */
let MouseSystem = MouseSystem_1 = class MouseSystem extends ecs_js_1.System {
    constructor(target) {
        super();
        _MouseSystem_position.set(this, vec3_js_1.default.zero);
        this.mouseMoveListener = (e) => __classPrivateFieldSet(this, _MouseSystem_position, new vec3_js_1.default(e.clientX, e.clientY), "f");
        this.mouseDownListener = (e) => {
            let button = `Mouse${e.button}`;
            if (this.heldButtons.has(button))
                return;
            this.downButtons.add(button);
            this.heldButtons.add(button);
        };
        this.mouseUpListener = (e) => {
            let button = `Mouse${e.button}`;
            this.upButtons.add(button);
            this.heldButtons.delete(button);
        };
        this.contextMenuListener = (e) => e.preventDefault();
        //Mouse button states for next frame
        this.downButtons = new Set();
        this.heldButtons = new Set();
        this.upButtons = new Set();
        //Mouse button states for current frame
        this.frameDownButtons = new Set();
        this.frameHeldButtons = new Set();
        this.frameUpButtons = new Set();
        //Remove previous mouse listeners
        target.removeEventListener("mousemove", this.mouseMoveListener);
        target.removeEventListener("mousedown", this.mouseDownListener);
        target.removeEventListener("mouseup", this.mouseUpListener);
        target.removeEventListener("contextmenu", this.contextMenuListener);
        //Add mouse listeners
        target.addEventListener("mousemove", this.mouseMoveListener);
        target.addEventListener("mousedown", this.mouseDownListener);
        target.addEventListener("mouseup", this.mouseUpListener);
        target.addEventListener("contextmenu", this.contextMenuListener);
    }
    update() {
        //Copy current frame mouse button states
        this.frameDownButtons = new Set(this.downButtons);
        this.frameHeldButtons = new Set(this.heldButtons);
        this.frameUpButtons = new Set(this.upButtons);
        //Clear mouse button states for next frame
        this.downButtons.clear();
        this.upButtons.clear();
    }
    /** Position of the mouse in the window */
    get position() {
        return __classPrivateFieldGet(this, _MouseSystem_position, "f");
    }
    /**
     * @param button Mouse button to detect state of
     * @returns Whether the mouse button is being pressed
     */
    held(button) {
        return this.frameHeldButtons.has(button);
    }
    /**
     * @param button Mouse button to detect state of
     * @returns Whether the mouse button was pressed on the current frame
     */
    down(button) {
        return this.frameDownButtons.has(button);
    }
    /**
     * @param button Mouse button to detect state of
     * @returns Whether the mouse button was released on the current frame
     */
    up(button) {
        return this.frameUpButtons.has(button);
    }
};
_MouseSystem_position = new WeakMap();
MouseSystem = MouseSystem_1 = __decorate([
    world_js_1.default.register.system({ after: [world_js_1.Simulator.Category.Input] }, document.querySelector("body")),
    __metadata("design:paramtypes", [HTMLElement])
], MouseSystem);
exports.default = MouseSystem;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW91c2VTeXN0ZW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbW9uL3N5c3RlbXMvbW91c2VTeXN0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlDQUFtQztBQUNuQyxpRUFBd0M7QUFDeEMsd0RBQTRDO0FBRTVDLDJGQUEyRjtBQUUzRixJQUFxQixXQUFXLG1CQUFoQyxNQUFxQixXQUFZLFNBQVEsZUFBTTtJQVM5QyxZQUFtQixNQUFtQjtRQUNyQyxLQUFLLEVBQUUsQ0FBQTtRQUhSLGdDQUFxQixpQkFBTyxDQUFDLElBQUksRUFBQTtRQW9FekIsc0JBQWlCLEdBQUcsQ0FBQyxDQUFhLEVBQUUsRUFBRSxDQUFDLHVCQUFBLElBQUkseUJBQWEsSUFBSSxpQkFBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFBLENBQUE7UUFFekYsc0JBQWlCLEdBQUcsQ0FBQyxDQUFhLEVBQUUsRUFBRTtZQUM3QyxJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQTtZQUUvQixJQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQztnQkFDOUIsT0FBTTtZQUVQLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQzVCLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQzdCLENBQUMsQ0FBQTtRQUVPLG9CQUFlLEdBQUcsQ0FBQyxDQUFhLEVBQUUsRUFBRTtZQUMzQyxJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQTtZQUUvQixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUMxQixJQUFJLENBQUMsV0FB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LFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7cUNBVW5GLFdBQVc7R0FUbEIsV0FBVyxDQStGL0I7a0JBL0ZvQixXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtTeXN0ZW19IGZyb20gXCIuLi8uLi9lY3MuanNcIlxyXG5pbXBvcnQgVmVjdG9yMyBmcm9tIFwiLi4vLi4vbWF0aC92ZWMzLmpzXCJcclxuaW1wb3J0IFdvcmxkLCB7U2ltdWxhdG9yfSBmcm9tIFwiLi4vd29ybGQuanNcIlxyXG5cclxuLyoqIEtlZXBzIHRyYWNrIG9mIGFuZCBhbGxvd3MgcGVyIGZyYW1lIGFjY2VzcyB0byB0aGUgbW91c2UncyBwb3NpdGlvbiBhbmQgYnV0dG9uIHN0YXRlcyAqL1xyXG5AV29ybGQucmVnaXN0ZXIuc3lzdGVtPHR5cGVvZiBNb3VzZVN5c3RlbT4oe2FmdGVyOiBbU2ltdWxhdG9yLkNhdGVnb3J5LklucHV0XX0sIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpKVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb3VzZVN5c3RlbSBleHRlbmRzIFN5c3RlbSB7XHJcblx0cHJpdmF0ZSBkb3duQnV0dG9uczogU2V0PHN0cmluZz5cclxuXHRwcml2YXRlIGhlbGRCdXR0b25zOiBTZXQ8c3RyaW5nPlxyXG5cdHByaXZhdGUgdXBCdXR0b25zOiBTZXQ8c3RyaW5nPlxyXG5cdHByaXZhdGUgZnJhbWVEb3duQnV0dG9uczogU2V0PHN0cmluZz5cclxuXHRwcml2YXRlIGZyYW1lSGVsZEJ1dHRvbnM6IFNldDxzdHJpbmc+XHJcblx0cHJpdmF0ZSBmcmFtZVVwQnV0dG9uczogU2V0PHN0cmluZz5cclxuXHQjcG9zaXRpb246IFZlY3RvcjMgPSBWZWN0b3IzLnplcm9cclxuXHJcblx0cHVibGljIGNvbnN0cnVjdG9yKHRhcmdldDogSFRNTEVsZW1lbnQpIHtcclxuXHRcdHN1cGVyKClcclxuXHJcblx0XHQvL01vdXNlIGJ1dHRvbiBzdGF0ZXMgZm9yIG5leHQgZnJhbWVcclxuXHRcdHRoaXMuZG93bkJ1dHRvbnMgPSBuZXcgU2V0KClcclxuXHRcdHRoaXMuaGVsZEJ1dHRvbnMgPSBuZXcgU2V0KClcclxuXHRcdHRoaXMudXBCdXR0b25zID0gbmV3IFNldCgpXHJcblxyXG5cdFx0Ly9Nb3VzZSBidXR0b24gc3RhdGVzIGZvciBjdXJyZW50IGZyYW1lXHJcblx0XHR0aGlzLmZyYW1lRG93bkJ1dHRvbnMgPSBuZXcgU2V0KClcclxuXHRcdHRoaXMuZnJhbWVIZWxkQnV0dG9ucyA9IG5ldyBTZXQoKVxyXG5cdFx0dGhpcy5mcmFtZVVwQnV0dG9ucyA9IG5ldyBTZXQoKVxyXG5cclxuXHRcdC8vUmVtb3ZlIHByZXZpb3VzIG1vdXNlIGxpc3RlbmVyc1xyXG5cdFx0dGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgdGhpcy5tb3VzZU1vdmVMaXN0ZW5lcilcclxuXHRcdHRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHRoaXMubW91c2VEb3duTGlzdGVuZXIpXHJcblx0XHR0YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgdGhpcy5tb3VzZVVwTGlzdGVuZXIpXHJcblx0XHR0YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNvbnRleHRtZW51XCIsIHRoaXMuY29udGV4dE1lbnVMaXN0ZW5lcilcclxuXHJcblx0XHQvL0FkZCBtb3VzZSBsaXN0ZW5lcnNcclxuXHRcdHRhcmdldC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIHRoaXMubW91c2VNb3ZlTGlzdGVuZXIpXHJcblx0XHR0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCB0aGlzLm1vdXNlRG93bkxpc3RlbmVyKVxyXG5cdFx0dGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHRoaXMubW91c2VVcExpc3RlbmVyKVxyXG5cdFx0dGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXCJjb250ZXh0bWVudVwiLCB0aGlzLmNvbnRleHRNZW51TGlzdGVuZXIpXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xyXG5cdFx0Ly9Db3B5IGN1cnJlbnQgZnJhbWUgbW91c2UgYnV0dG9uIHN0YXRlc1xyXG5cdFx0dGhpcy5mcmFtZURvd25CdXR0b25zID0gbmV3IFNldCh0aGlzLmRvd25CdXR0b25zKVxyXG5cdFx0dGhpcy5mcmFtZUhlbGRCdXR0b25zID0gbmV3IFNldCh0aGlzLmhlbGRCdXR0b25zKVxyXG5cdFx0dGhpcy5mcmFtZVVwQnV0dG9ucyA9IG5ldyBTZXQodGhpcy51cEJ1dHRvbnMpXHJcblxyXG5cdFx0Ly9DbGVhciBtb3VzZSBidXR0b24gc3RhdGVzIGZvciBuZXh0IGZyYW1lXHJcblx0XHR0aGlzLmRvd25CdXR0b25zLmNsZWFyKClcclxuXHRcdHRoaXMudXBCdXR0b25zLmNsZWFyKClcclxuXHR9XHJcblxyXG5cdC8qKiBQb3NpdGlvbiBvZiB0aGUgbW91c2UgaW4gdGhlIHdpbmRvdyAqL1xyXG5cdHB1YmxpYyBnZXQgcG9zaXRpb24oKTogVmVjdG9yMyB7XHJcblx0XHRyZXR1cm4gdGhpcy4jcG9zaXRpb25cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBwYXJhbSBidXR0b24gTW91c2UgYnV0dG9uIHRvIGRldGVjdCBzdGF0ZSBvZlxyXG5cdCAqIEByZXR1cm5zIFdoZXRoZXIgdGhlIG1vdXNlIGJ1dHRvbiBpcyBiZWluZyBwcmVzc2VkXHJcblx0ICovXHJcblx0cHVibGljIGhlbGQoYnV0dG9uOiBzdHJpbmcpOiBib29sZWFuIHtcclxuXHRcdHJldHVybiB0aGlzLmZyYW1lSGVsZEJ1dHRvbnMuaGFzKGJ1dHRvbilcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBwYXJhbSBidXR0b24gTW91c2UgYnV0dG9uIHRvIGRldGVjdCBzdGF0ZSBvZlxyXG5cdCAqIEByZXR1cm5zIFdoZXRoZXIgdGhlIG1vdXNlIGJ1dHRvbiB3YXMgcHJlc3NlZCBvbiB0aGUgY3VycmVudCBmcmFtZVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBkb3duKGJ1dHRvbjogc3RyaW5nKTogYm9vbGVhbiB7XHJcblx0XHRyZXR1cm4gdGhpcy5mcmFtZURvd25CdXR0b25zLmhhcyhidXR0b24pXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBAcGFyYW0gYnV0dG9uIE1vdXNlIGJ1dHRvbiB0byBkZXRlY3Qgc3RhdGUgb2ZcclxuXHQgKiBAcmV0dXJucyBXaGV0aGVyIHRoZSBtb3VzZSBidXR0b24gd2FzIHJlbGVhc2VkIG9uIHRoZSBjdXJyZW50IGZyYW1lXHJcblx0ICovXHJcblx0cHVibGljIHVwKGJ1dHRvbjogc3RyaW5nKTogYm9vbGVhbiB7XHJcblx0XHRyZXR1cm4gdGhpcy5mcmFtZVVwQnV0dG9ucy5oYXMoYnV0dG9uKVxyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBtb3VzZU1vdmVMaXN0ZW5lciA9IChlOiBNb3VzZUV2ZW50KSA9PiB0aGlzLiNwb3NpdGlvbiA9IG5ldyBWZWN0b3IzKGUuY2xpZW50WCwgZS5jbGllbnRZKVxyXG5cclxuXHRwcml2YXRlIG1vdXNlRG93bkxpc3RlbmVyID0gKGU6IE1vdXNlRXZlbnQpID0+IHtcclxuXHRcdGxldCBidXR0b24gPSBgTW91c2Uke2UuYnV0dG9ufWBcclxuXHJcblx0XHRpZih0aGlzLmhlbGRCdXR0b25zLmhhcyhidXR0b24pKVxyXG5cdFx0XHRyZXR1cm5cclxuXHJcblx0XHR0aGlzLmRvd25CdXR0b25zLmFkZChidXR0b24pXHJcblx0XHR0aGlzLmhlbGRCdXR0b25zLmFkZChidXR0b24pXHJcblx0fVxyXG5cclxuXHRwcml2YXRlIG1vdXNlVXBMaXN0ZW5lciA9IChlOiBNb3VzZUV2ZW50KSA9PiB7XHJcblx0XHRsZXQgYnV0dG9uID0gYE1vdXNlJHtlLmJ1dHRvbn1gXHJcblxyXG5cdFx0dGhpcy51cEJ1dHRvbnMuYWRkKGJ1dHRvbilcclxuXHRcdHRoaXMuaGVsZEJ1dHRvbnMuZGVsZXRlKGJ1dHRvbilcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgY29udGV4dE1lbnVMaXN0ZW5lciA9IChlOiBNb3VzZUV2ZW50KSA9PiBlLnByZXZlbnREZWZhdWx0KClcclxufSJdfQ==