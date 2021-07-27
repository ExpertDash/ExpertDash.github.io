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
var _MouseSystem_position;
var MouseSystem_1;
import { System } from "../../ecs.js";
import Vector3 from "../../math/vec3.js";
import World, { Simulator } from "../world.js";
/** Keeps track of and allows per frame access to the mouse's position and button states */
let MouseSystem = MouseSystem_1 = class MouseSystem extends System {
    constructor(target) {
        super();
        _MouseSystem_position.set(this, Vector3.zero);
        this.mouseMoveListener = (e) => __classPrivateFieldSet(this, _MouseSystem_position, new Vector3(e.clientX, e.clientY), "f");
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
    World.register.system(Simulator.phase(Simulator.Category.Input), document.querySelector("body")),
    __metadata("design:paramtypes", [HTMLElement])
], MouseSystem);
export default MouseSystem;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW91c2VTeXN0ZW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbW9uL3N5c3RlbXMvbW91c2VTeXN0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxjQUFjLENBQUE7QUFDbkMsT0FBTyxPQUFPLE1BQU0sb0JBQW9CLENBQUE7QUFDeEMsT0FBTyxLQUFLLEVBQUUsRUFBQyxTQUFTLEVBQUMsTUFBTSxhQUFhLENBQUE7QUFFNUMsMkZBQTJGO0FBRTNGLElBQXFCLFdBQVcsbUJBQWhDLE1BQXFCLFdBQVksU0FBUSxNQUFNO0lBUzlDLFlBQW1CLE1BQW1CO1FBQ3JDLEtBQUssRUFBRSxDQUFBO1FBSFIsZ0NBQXFCLE9BQU8sQ0FBQyxJQUFJLEVBQUE7UUFvRXpCLHNCQUFpQixHQUFHLENBQUMsQ0FBYSxFQUFFLEVBQUUsQ0FBQyx1QkFBQSxJQUFJLHlCQUFhLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFBLENBQUE7UUFFekYsc0JBQWlCLEdBQUcsQ0FBQyxDQUFhLEVBQUUsRUFBRTtZQUM3QyxJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQTtZQUUvQixJQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQztnQkFDOUIsT0FBTTtZQUVQLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQzVCLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQzdCLENBQUMsQ0FBQTtRQUVPLG9CQUFlLEdBQUcsQ0FBQyxDQUFhLEVBQUUsRUFBRTtZQUMzQyxJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQTtZQUUvQixJQUFJ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QUFTLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUUsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztxQ0FVekYsV0FBVztHQVRsQixXQUFXLENBK0YvQjtlQS9Gb0IsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7U3lzdGVtfSBmcm9tIFwiLi4vLi4vZWNzLmpzXCJcclxuaW1wb3J0IFZlY3RvcjMgZnJvbSBcIi4uLy4uL21hdGgvdmVjMy5qc1wiXHJcbmltcG9ydCBXb3JsZCwge1NpbXVsYXRvcn0gZnJvbSBcIi4uL3dvcmxkLmpzXCJcclxuXHJcbi8qKiBLZWVwcyB0cmFjayBvZiBhbmQgYWxsb3dzIHBlciBmcmFtZSBhY2Nlc3MgdG8gdGhlIG1vdXNlJ3MgcG9zaXRpb24gYW5kIGJ1dHRvbiBzdGF0ZXMgKi9cclxuQFdvcmxkLnJlZ2lzdGVyLnN5c3RlbTx0eXBlb2YgTW91c2VTeXN0ZW0+KFNpbXVsYXRvci5waGFzZShTaW11bGF0b3IuQ2F0ZWdvcnkuSW5wdXQpLCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKSlcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW91c2VTeXN0ZW0gZXh0ZW5kcyBTeXN0ZW0ge1xyXG5cdHByaXZhdGUgZG93bkJ1dHRvbnM6IFNldDxzdHJpbmc+XHJcblx0cHJpdmF0ZSBoZWxkQnV0dG9uczogU2V0PHN0cmluZz5cclxuXHRwcml2YXRlIHVwQnV0dG9uczogU2V0PHN0cmluZz5cclxuXHRwcml2YXRlIGZyYW1lRG93bkJ1dHRvbnM6IFNldDxzdHJpbmc+XHJcblx0cHJpdmF0ZSBmcmFtZUhlbGRCdXR0b25zOiBTZXQ8c3RyaW5nPlxyXG5cdHByaXZhdGUgZnJhbWVVcEJ1dHRvbnM6IFNldDxzdHJpbmc+XHJcblx0I3Bvc2l0aW9uOiBWZWN0b3IzID0gVmVjdG9yMy56ZXJvXHJcblxyXG5cdHB1YmxpYyBjb25zdHJ1Y3Rvcih0YXJnZXQ6IEhUTUxFbGVtZW50KSB7XHJcblx0XHRzdXBlcigpXHJcblxyXG5cdFx0Ly9Nb3VzZSBidXR0b24gc3RhdGVzIGZvciBuZXh0IGZyYW1lXHJcblx0XHR0aGlzLmRvd25CdXR0b25zID0gbmV3IFNldCgpXHJcblx0XHR0aGlzLmhlbGRCdXR0b25zID0gbmV3IFNldCgpXHJcblx0XHR0aGlzLnVwQnV0dG9ucyA9IG5ldyBTZXQoKVxyXG5cclxuXHRcdC8vTW91c2UgYnV0dG9uIHN0YXRlcyBmb3IgY3VycmVudCBmcmFtZVxyXG5cdFx0dGhpcy5mcmFtZURvd25CdXR0b25zID0gbmV3IFNldCgpXHJcblx0XHR0aGlzLmZyYW1lSGVsZEJ1dHRvbnMgPSBuZXcgU2V0KClcclxuXHRcdHRoaXMuZnJhbWVVcEJ1dHRvbnMgPSBuZXcgU2V0KClcclxuXHJcblx0XHQvL1JlbW92ZSBwcmV2aW91cyBtb3VzZSBsaXN0ZW5lcnNcclxuXHRcdHRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIHRoaXMubW91c2VNb3ZlTGlzdGVuZXIpXHJcblx0XHR0YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCB0aGlzLm1vdXNlRG93bkxpc3RlbmVyKVxyXG5cdFx0dGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHRoaXMubW91c2VVcExpc3RlbmVyKVxyXG5cdFx0dGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjb250ZXh0bWVudVwiLCB0aGlzLmNvbnRleHRNZW51TGlzdGVuZXIpXHJcblxyXG5cdFx0Ly9BZGQgbW91c2UgbGlzdGVuZXJzXHJcblx0XHR0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCB0aGlzLm1vdXNlTW92ZUxpc3RlbmVyKVxyXG5cdFx0dGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgdGhpcy5tb3VzZURvd25MaXN0ZW5lcilcclxuXHRcdHRhcmdldC5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCB0aGlzLm1vdXNlVXBMaXN0ZW5lcilcclxuXHRcdHRhcmdldC5hZGRFdmVudExpc3RlbmVyKFwiY29udGV4dG1lbnVcIiwgdGhpcy5jb250ZXh0TWVudUxpc3RlbmVyKVxyXG5cdH1cclxuXHJcblx0cHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcclxuXHRcdC8vQ29weSBjdXJyZW50IGZyYW1lIG1vdXNlIGJ1dHRvbiBzdGF0ZXNcclxuXHRcdHRoaXMuZnJhbWVEb3duQnV0dG9ucyA9IG5ldyBTZXQodGhpcy5kb3duQnV0dG9ucylcclxuXHRcdHRoaXMuZnJhbWVIZWxkQnV0dG9ucyA9IG5ldyBTZXQodGhpcy5oZWxkQnV0dG9ucylcclxuXHRcdHRoaXMuZnJhbWVVcEJ1dHRvbnMgPSBuZXcgU2V0KHRoaXMudXBCdXR0b25zKVxyXG5cclxuXHRcdC8vQ2xlYXIgbW91c2UgYnV0dG9uIHN0YXRlcyBmb3IgbmV4dCBmcmFtZVxyXG5cdFx0dGhpcy5kb3duQnV0dG9ucy5jbGVhcigpXHJcblx0XHR0aGlzLnVwQnV0dG9ucy5jbGVhcigpXHJcblx0fVxyXG5cclxuXHQvKiogUG9zaXRpb24gb2YgdGhlIG1vdXNlIGluIHRoZSB3aW5kb3cgKi9cclxuXHRwdWJsaWMgZ2V0IHBvc2l0aW9uKCk6IFZlY3RvcjMge1xyXG5cdFx0cmV0dXJuIHRoaXMuI3Bvc2l0aW9uXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBAcGFyYW0gYnV0dG9uIE1vdXNlIGJ1dHRvbiB0byBkZXRlY3Qgc3RhdGUgb2ZcclxuXHQgKiBAcmV0dXJucyBXaGV0aGVyIHRoZSBtb3VzZSBidXR0b24gaXMgYmVpbmcgcHJlc3NlZFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBoZWxkKGJ1dHRvbjogc3RyaW5nKTogYm9vbGVhbiB7XHJcblx0XHRyZXR1cm4gdGhpcy5mcmFtZUhlbGRCdXR0b25zLmhhcyhidXR0b24pXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBAcGFyYW0gYnV0dG9uIE1vdXNlIGJ1dHRvbiB0byBkZXRlY3Qgc3RhdGUgb2ZcclxuXHQgKiBAcmV0dXJucyBXaGV0aGVyIHRoZSBtb3VzZSBidXR0b24gd2FzIHByZXNzZWQgb24gdGhlIGN1cnJlbnQgZnJhbWVcclxuXHQgKi9cclxuXHRwdWJsaWMgZG93bihidXR0b246IHN0cmluZyk6IGJvb2xlYW4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuZnJhbWVEb3duQnV0dG9ucy5oYXMoYnV0dG9uKVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQHBhcmFtIGJ1dHRvbiBNb3VzZSBidXR0b24gdG8gZGV0ZWN0IHN0YXRlIG9mXHJcblx0ICogQHJldHVybnMgV2hldGhlciB0aGUgbW91c2UgYnV0dG9uIHdhcyByZWxlYXNlZCBvbiB0aGUgY3VycmVudCBmcmFtZVxyXG5cdCAqL1xyXG5cdHB1YmxpYyB1cChidXR0b246IHN0cmluZyk6IGJvb2xlYW4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuZnJhbWVVcEJ1dHRvbnMuaGFzKGJ1dHRvbilcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgbW91c2VNb3ZlTGlzdGVuZXIgPSAoZTogTW91c2VFdmVudCkgPT4gdGhpcy4jcG9zaXRpb24gPSBuZXcgVmVjdG9yMyhlLmNsaWVudFgsIGUuY2xpZW50WSlcclxuXHJcblx0cHJpdmF0ZSBtb3VzZURvd25MaXN0ZW5lciA9IChlOiBNb3VzZUV2ZW50KSA9PiB7XHJcblx0XHRsZXQgYnV0dG9uID0gYE1vdXNlJHtlLmJ1dHRvbn1gXHJcblxyXG5cdFx0aWYodGhpcy5oZWxkQnV0dG9ucy5oYXMoYnV0dG9uKSlcclxuXHRcdFx0cmV0dXJuXHJcblxyXG5cdFx0dGhpcy5kb3duQnV0dG9ucy5hZGQoYnV0dG9uKVxyXG5cdFx0dGhpcy5oZWxkQnV0dG9ucy5hZGQoYnV0dG9uKVxyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBtb3VzZVVwTGlzdGVuZXIgPSAoZTogTW91c2VFdmVudCkgPT4ge1xyXG5cdFx0bGV0IGJ1dHRvbiA9IGBNb3VzZSR7ZS5idXR0b259YFxyXG5cclxuXHRcdHRoaXMudXBCdXR0b25zLmFkZChidXR0b24pXHJcblx0XHR0aGlzLmhlbGRCdXR0b25zLmRlbGV0ZShidXR0b24pXHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGNvbnRleHRNZW51TGlzdGVuZXIgPSAoZTogTW91c2VFdmVudCkgPT4gZS5wcmV2ZW50RGVmYXVsdCgpXHJcbn0iXX0=