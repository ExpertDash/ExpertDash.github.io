var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var KeySystem_1;
import { System } from "../../ecs.js";
import World, { Simulator } from "../world.js";
/** Keeps track of and allows per frame access to key states */
let KeySystem = KeySystem_1 = class KeySystem extends System {
    /**
     * @param target Element to detect key presses from
     */
    constructor(target) {
        super();
        this.keyDownListener = (e) => {
            if (this.heldKeys.has(e.key))
                return;
            this.downKeys.add(e.key);
            this.heldKeys.add(e.key);
        };
        this.keyUpListener = (e) => {
            this.upKeys.add(e.key);
            this.heldKeys.delete(e.key);
        };
        //Key states for next frame
        this.downKeys = new Set();
        this.heldKeys = new Set();
        this.upKeys = new Set();
        //Key states for current frame
        this.frameDownKeys = new Set();
        this.frameHeldKeys = new Set();
        this.frameUpKeys = new Set();
        //Remove previous key listeners
        target.removeEventListener("keydown", this.keyDownListener);
        target.removeEventListener("keyup", this.keyUpListener);
        //Add key listeners
        target.addEventListener("keydown", this.keyDownListener);
        target.addEventListener("keyup", this.keyUpListener);
    }
    update(_) {
        //Copy current frame key states
        this.frameDownKeys = new Set(this.downKeys);
        this.frameHeldKeys = new Set(this.heldKeys);
        this.frameUpKeys = new Set(this.upKeys);
        //Clear key states for next frame
        this.downKeys.clear();
        this.upKeys.clear();
    }
    /**
     * @param key Key to detect state of
     * @returns Whether the key is being pressed
     */
    held(key) {
        return this.frameHeldKeys.has(key);
    }
    /**
     * @param key Key to detect state of
     * @returns Whether the key was pressed on the current frame
     */
    down(key) {
        return this.frameDownKeys.has(key);
    }
    /**
     * @param key Key to detect state of
     * @returns Whether the key was released on the current frame
     */
    up(key) {
        return this.frameUpKeys.has(key);
    }
};
KeySystem = KeySystem_1 = __decorate([
    World.register.system({ after: [Simulator.Category.Input] }, document.querySelector("body")),
    __metadata("design:paramtypes", [HTMLElement])
], KeySystem);
export default KeySystem;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5U3lzdGVtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1vbi9zeXN0ZW1zL2tleVN5c3RlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLGNBQWMsQ0FBQTtBQUVuQyxPQUFPLEtBQUssRUFBRSxFQUFDLFNBQVMsRUFBQyxNQUFNLGFBQWEsQ0FBQTtBQUU1QywrREFBK0Q7QUFFL0QsSUFBcUIsU0FBUyxpQkFBOUIsTUFBcUIsU0FBVSxTQUFRLE1BQU07SUFRNUM7O09BRUc7SUFDSCxZQUFtQixNQUFtQjtRQUNyQyxLQUFLLEVBQUUsQ0FBQTtRQXdEQSxvQkFBZSxHQUFHLENBQUMsQ0FBZ0IsRUFBRSxFQUFFO1lBQzlDLElBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztnQkFDMUIsT0FBTTtZQUVQLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUN4QixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDekIsQ0FBQyxDQUFBO1FBRU8sa0JBQWEsR0FBRyxDQUFDLENBQWdCLEVBQUUsRUFBRTtZQUM1QyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDdEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQzVCLENBQUMsQ0FBQTtRQWpFQSwyQkFBMkI7UUFDM0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFBO1FBQ3pCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQTtRQUN6QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUE7UUFFdkIsOEJBQThCO1FBQzlCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQTtRQUM5QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUE7UUFDOUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFBO1FBRTVCLCtCQUErQjtRQUMvQixNQUFNLENBQUMsbUJBQW1CLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQTtRQUMzRCxNQUFNLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQTtRQUV2RCxtQkFBbUI7UUFDbkIsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUE7UUFDeEQsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUE7SUFDckQsQ0FBQztJQUVNLE1BQU0sQ0FBQyxDQUFXO1FBQ3hCLCtCQUErQjtRQUMvQixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUMzQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUMzQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUV2QyxpQ0FBaUM7UUFDakMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtRQUNyQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFBO0lBQ3BCLENBQUM7SUFFRDs7O09BR0c7SUFDSSxJQUFJLENBQUMsR0FBVztRQUN0QixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ25DLENBQUM7SUFFRDs7O09BR0c7SUFDSSxJQUFJLENBQUMsR0FBVztRQUN0QixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ25DLENBQUM7SUFFRDs7O09BR0c7SUFDSSxFQUFFLENBQUMsR0FBVztRQUNwQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ2pDLENBQUM7Q0FjRCxDQUFBO0FBaEZvQixTQUFTO0lBRDdCLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFtQixFQUFDLEtBQUssRUFBRSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUMsRUFBRSxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO3FDQVlqRixXQUFXO0dBWGxCLFNBQVMsQ0FnRjdCO2VBaEZvQixTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtTeXN0ZW19IGZyb20gXCIuLi8uLi9lY3MuanNcIlxyXG5pbXBvcnQgRW50aXRpZXMgZnJvbSBcIi4uLy4uL2Vjcy9lbnRpdGllcy5qc1wiXHJcbmltcG9ydCBXb3JsZCwge1NpbXVsYXRvcn0gZnJvbSBcIi4uL3dvcmxkLmpzXCJcclxuXHJcbi8qKiBLZWVwcyB0cmFjayBvZiBhbmQgYWxsb3dzIHBlciBmcmFtZSBhY2Nlc3MgdG8ga2V5IHN0YXRlcyAqL1xyXG5AV29ybGQucmVnaXN0ZXIuc3lzdGVtPHR5cGVvZiBLZXlTeXN0ZW0+KHthZnRlcjogW1NpbXVsYXRvci5DYXRlZ29yeS5JbnB1dF19LCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKSlcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgS2V5U3lzdGVtIGV4dGVuZHMgU3lzdGVtIHtcclxuXHRwcml2YXRlIGRvd25LZXlzOiBTZXQ8c3RyaW5nPlxyXG5cdHByaXZhdGUgaGVsZEtleXM6IFNldDxzdHJpbmc+XHJcblx0cHJpdmF0ZSB1cEtleXM6IFNldDxzdHJpbmc+XHJcblx0cHJpdmF0ZSBmcmFtZURvd25LZXlzOiBTZXQ8c3RyaW5nPlxyXG5cdHByaXZhdGUgZnJhbWVIZWxkS2V5czogU2V0PHN0cmluZz5cclxuXHRwcml2YXRlIGZyYW1lVXBLZXlzOiBTZXQ8c3RyaW5nPlxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIEBwYXJhbSB0YXJnZXQgRWxlbWVudCB0byBkZXRlY3Qga2V5IHByZXNzZXMgZnJvbVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBjb25zdHJ1Y3Rvcih0YXJnZXQ6IEhUTUxFbGVtZW50KSB7XHJcblx0XHRzdXBlcigpXHJcblxyXG5cdFx0Ly9LZXkgc3RhdGVzIGZvciBuZXh0IGZyYW1lXHJcblx0XHR0aGlzLmRvd25LZXlzID0gbmV3IFNldCgpXHJcblx0XHR0aGlzLmhlbGRLZXlzID0gbmV3IFNldCgpXHJcblx0XHR0aGlzLnVwS2V5cyA9IG5ldyBTZXQoKVxyXG5cclxuXHRcdC8vS2V5IHN0YXRlcyBmb3IgY3VycmVudCBmcmFtZVxyXG5cdFx0dGhpcy5mcmFtZURvd25LZXlzID0gbmV3IFNldCgpXHJcblx0XHR0aGlzLmZyYW1lSGVsZEtleXMgPSBuZXcgU2V0KClcclxuXHRcdHRoaXMuZnJhbWVVcEtleXMgPSBuZXcgU2V0KClcclxuXHJcblx0XHQvL1JlbW92ZSBwcmV2aW91cyBrZXkgbGlzdGVuZXJzXHJcblx0XHR0YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgdGhpcy5rZXlEb3duTGlzdGVuZXIpXHJcblx0XHR0YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIHRoaXMua2V5VXBMaXN0ZW5lcilcclxuXHJcblx0XHQvL0FkZCBrZXkgbGlzdGVuZXJzXHJcblx0XHR0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgdGhpcy5rZXlEb3duTGlzdGVuZXIpXHJcblx0XHR0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIHRoaXMua2V5VXBMaXN0ZW5lcilcclxuXHR9XHJcblxyXG5cdHB1YmxpYyB1cGRhdGUoXzogRW50aXRpZXMpOiB2b2lkIHtcclxuXHRcdC8vQ29weSBjdXJyZW50IGZyYW1lIGtleSBzdGF0ZXNcclxuXHRcdHRoaXMuZnJhbWVEb3duS2V5cyA9IG5ldyBTZXQodGhpcy5kb3duS2V5cylcclxuXHRcdHRoaXMuZnJhbWVIZWxkS2V5cyA9IG5ldyBTZXQodGhpcy5oZWxkS2V5cylcclxuXHRcdHRoaXMuZnJhbWVVcEtleXMgPSBuZXcgU2V0KHRoaXMudXBLZXlzKVxyXG5cclxuXHRcdC8vQ2xlYXIga2V5IHN0YXRlcyBmb3IgbmV4dCBmcmFtZVxyXG5cdFx0dGhpcy5kb3duS2V5cy5jbGVhcigpXHJcblx0XHR0aGlzLnVwS2V5cy5jbGVhcigpXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBAcGFyYW0ga2V5IEtleSB0byBkZXRlY3Qgc3RhdGUgb2ZcclxuXHQgKiBAcmV0dXJucyBXaGV0aGVyIHRoZSBrZXkgaXMgYmVpbmcgcHJlc3NlZFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBoZWxkKGtleTogc3RyaW5nKTogYm9vbGVhbiB7XHJcblx0XHRyZXR1cm4gdGhpcy5mcmFtZUhlbGRLZXlzLmhhcyhrZXkpXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBAcGFyYW0ga2V5IEtleSB0byBkZXRlY3Qgc3RhdGUgb2ZcclxuXHQgKiBAcmV0dXJucyBXaGV0aGVyIHRoZSBrZXkgd2FzIHByZXNzZWQgb24gdGhlIGN1cnJlbnQgZnJhbWVcclxuXHQgKi9cclxuXHRwdWJsaWMgZG93bihrZXk6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuZnJhbWVEb3duS2V5cy5oYXMoa2V5KVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQHBhcmFtIGtleSBLZXkgdG8gZGV0ZWN0IHN0YXRlIG9mXHJcblx0ICogQHJldHVybnMgV2hldGhlciB0aGUga2V5IHdhcyByZWxlYXNlZCBvbiB0aGUgY3VycmVudCBmcmFtZVxyXG5cdCAqL1xyXG5cdHB1YmxpYyB1cChrZXk6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuZnJhbWVVcEtleXMuaGFzKGtleSlcclxuXHR9XHJcblxyXG5cdHByaXZhdGUga2V5RG93bkxpc3RlbmVyID0gKGU6IEtleWJvYXJkRXZlbnQpID0+IHtcclxuXHRcdGlmKHRoaXMuaGVsZEtleXMuaGFzKGUua2V5KSlcclxuXHRcdFx0cmV0dXJuXHJcblxyXG5cdFx0dGhpcy5kb3duS2V5cy5hZGQoZS5rZXkpXHJcblx0XHR0aGlzLmhlbGRLZXlzLmFkZChlLmtleSlcclxuXHR9XHJcblxyXG5cdHByaXZhdGUga2V5VXBMaXN0ZW5lciA9IChlOiBLZXlib2FyZEV2ZW50KSA9PiB7XHJcblx0XHR0aGlzLnVwS2V5cy5hZGQoZS5rZXkpXHJcblx0XHR0aGlzLmhlbGRLZXlzLmRlbGV0ZShlLmtleSlcclxuXHR9XHJcbn0iXX0=