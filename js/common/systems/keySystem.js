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
    World.register.system(Simulator.phase(Simulator.Category.Input), document.querySelector("body")),
    __metadata("design:paramtypes", [HTMLElement])
], KeySystem);
export default KeySystem;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5U3lzdGVtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1vbi9zeXN0ZW1zL2tleVN5c3RlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLGNBQWMsQ0FBQTtBQUVuQyxPQUFPLEtBQUssRUFBRSxFQUFDLFNBQVMsRUFBQyxNQUFNLGFBQWEsQ0FBQTtBQUU1QywrREFBK0Q7QUFFL0QsSUFBcUIsU0FBUyxpQkFBOUIsTUFBcUIsU0FBVSxTQUFRLE1BQU07SUFRNUM7O09BRUc7SUFDSCxZQUFtQixNQUFtQjtRQUNyQyxLQUFLLEVBQUUsQ0FBQTtRQXdEQSxvQkFBZSxHQUFHLENBQUMsQ0FBZ0IsRUFBRSxFQUFFO1lBQzlDLElBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztnQkFDMUIsT0FBTTtZQUVQLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUN4QixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDekIsQ0FBQyxDQUFBO1FBRU8sa0JBQWEsR0FBRyxDQUFDLENBQWdCLEVBQUUsRUFBRTtZQUM1QyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDdEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQzVCLENBQUMsQ0FBQTtRQWpFQSwyQkFBMkI7UUFDM0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFBO1FBQ3pCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQTtRQUN6QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUE7UUFFdkIsOEJBQThCO1FBQzlCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQTtRQUM5QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUE7UUFDOUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFBO1FBRTVCLCtCQUErQjtRQUMvQixNQUFNLENBQUMsbUJBQW1CLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQTtRQUMzRCxNQUFNLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQTtRQUV2RCxtQkFBbUI7UUFDbkIsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUE7UUFDeEQsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUE7SUFDckQsQ0FBQztJQUVNLE1BQU0sQ0FBQyxDQUFXO1FBQ3hCLCtCQUErQjtRQUMvQixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUMzQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUMzQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUV2QyxpQ0FBaUM7UUFDakMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtRQUNyQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFBO0lBQ3BCLENBQUM7SUFFRDs7O09BR0c7SUFDSSxJQUFJLENBQUMsR0FBVztRQUN0QixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ25DLENBQUM7SUFFRDs7O09BR0c7SUFDSSxJQUFJLENBQUMsR0FBVztRQUN0QixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ25DLENBQUM7SUFFRDs7O09BR0c7SUFDSSxFQUFFLENBQUMsR0FBVztRQUNwQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ2pDLENBQUM7Q0FjRCxDQUFBO0FBaEZvQixTQUFTO0lBRDdCLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFtQixTQUFTLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUUsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztxQ0FZdkYsV0FBVztHQVhsQixTQUFTLENBZ0Y3QjtlQWhGb0IsU0FBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7U3lzdGVtfSBmcm9tIFwiLi4vLi4vZWNzLmpzXCJcclxuaW1wb3J0IEVudGl0aWVzIGZyb20gXCIuLi8uLi9lY3MvZW50aXRpZXMuanNcIlxyXG5pbXBvcnQgV29ybGQsIHtTaW11bGF0b3J9IGZyb20gXCIuLi93b3JsZC5qc1wiXHJcblxyXG4vKiogS2VlcHMgdHJhY2sgb2YgYW5kIGFsbG93cyBwZXIgZnJhbWUgYWNjZXNzIHRvIGtleSBzdGF0ZXMgKi9cclxuQFdvcmxkLnJlZ2lzdGVyLnN5c3RlbTx0eXBlb2YgS2V5U3lzdGVtPihTaW11bGF0b3IucGhhc2UoU2ltdWxhdG9yLkNhdGVnb3J5LklucHV0KSwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIikpXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEtleVN5c3RlbSBleHRlbmRzIFN5c3RlbSB7XHJcblx0cHJpdmF0ZSBkb3duS2V5czogU2V0PHN0cmluZz5cclxuXHRwcml2YXRlIGhlbGRLZXlzOiBTZXQ8c3RyaW5nPlxyXG5cdHByaXZhdGUgdXBLZXlzOiBTZXQ8c3RyaW5nPlxyXG5cdHByaXZhdGUgZnJhbWVEb3duS2V5czogU2V0PHN0cmluZz5cclxuXHRwcml2YXRlIGZyYW1lSGVsZEtleXM6IFNldDxzdHJpbmc+XHJcblx0cHJpdmF0ZSBmcmFtZVVwS2V5czogU2V0PHN0cmluZz5cclxuXHRcclxuXHQvKipcclxuXHQgKiBAcGFyYW0gdGFyZ2V0IEVsZW1lbnQgdG8gZGV0ZWN0IGtleSBwcmVzc2VzIGZyb21cclxuXHQgKi9cclxuXHRwdWJsaWMgY29uc3RydWN0b3IodGFyZ2V0OiBIVE1MRWxlbWVudCkge1xyXG5cdFx0c3VwZXIoKVxyXG5cclxuXHRcdC8vS2V5IHN0YXRlcyBmb3IgbmV4dCBmcmFtZVxyXG5cdFx0dGhpcy5kb3duS2V5cyA9IG5ldyBTZXQoKVxyXG5cdFx0dGhpcy5oZWxkS2V5cyA9IG5ldyBTZXQoKVxyXG5cdFx0dGhpcy51cEtleXMgPSBuZXcgU2V0KClcclxuXHJcblx0XHQvL0tleSBzdGF0ZXMgZm9yIGN1cnJlbnQgZnJhbWVcclxuXHRcdHRoaXMuZnJhbWVEb3duS2V5cyA9IG5ldyBTZXQoKVxyXG5cdFx0dGhpcy5mcmFtZUhlbGRLZXlzID0gbmV3IFNldCgpXHJcblx0XHR0aGlzLmZyYW1lVXBLZXlzID0gbmV3IFNldCgpXHJcblxyXG5cdFx0Ly9SZW1vdmUgcHJldmlvdXMga2V5IGxpc3RlbmVyc1xyXG5cdFx0dGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIHRoaXMua2V5RG93bkxpc3RlbmVyKVxyXG5cdFx0dGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCB0aGlzLmtleVVwTGlzdGVuZXIpXHJcblxyXG5cdFx0Ly9BZGQga2V5IGxpc3RlbmVyc1xyXG5cdFx0dGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIHRoaXMua2V5RG93bkxpc3RlbmVyKVxyXG5cdFx0dGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCB0aGlzLmtleVVwTGlzdGVuZXIpXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgdXBkYXRlKF86IEVudGl0aWVzKTogdm9pZCB7XHJcblx0XHQvL0NvcHkgY3VycmVudCBmcmFtZSBrZXkgc3RhdGVzXHJcblx0XHR0aGlzLmZyYW1lRG93bktleXMgPSBuZXcgU2V0KHRoaXMuZG93bktleXMpXHJcblx0XHR0aGlzLmZyYW1lSGVsZEtleXMgPSBuZXcgU2V0KHRoaXMuaGVsZEtleXMpXHJcblx0XHR0aGlzLmZyYW1lVXBLZXlzID0gbmV3IFNldCh0aGlzLnVwS2V5cylcclxuXHJcblx0XHQvL0NsZWFyIGtleSBzdGF0ZXMgZm9yIG5leHQgZnJhbWVcclxuXHRcdHRoaXMuZG93bktleXMuY2xlYXIoKVxyXG5cdFx0dGhpcy51cEtleXMuY2xlYXIoKVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQHBhcmFtIGtleSBLZXkgdG8gZGV0ZWN0IHN0YXRlIG9mXHJcblx0ICogQHJldHVybnMgV2hldGhlciB0aGUga2V5IGlzIGJlaW5nIHByZXNzZWRcclxuXHQgKi9cclxuXHRwdWJsaWMgaGVsZChrZXk6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuZnJhbWVIZWxkS2V5cy5oYXMoa2V5KVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQHBhcmFtIGtleSBLZXkgdG8gZGV0ZWN0IHN0YXRlIG9mXHJcblx0ICogQHJldHVybnMgV2hldGhlciB0aGUga2V5IHdhcyBwcmVzc2VkIG9uIHRoZSBjdXJyZW50IGZyYW1lXHJcblx0ICovXHJcblx0cHVibGljIGRvd24oa2V5OiBzdHJpbmcpOiBib29sZWFuIHtcclxuXHRcdHJldHVybiB0aGlzLmZyYW1lRG93bktleXMuaGFzKGtleSlcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBwYXJhbSBrZXkgS2V5IHRvIGRldGVjdCBzdGF0ZSBvZlxyXG5cdCAqIEByZXR1cm5zIFdoZXRoZXIgdGhlIGtleSB3YXMgcmVsZWFzZWQgb24gdGhlIGN1cnJlbnQgZnJhbWVcclxuXHQgKi9cclxuXHRwdWJsaWMgdXAoa2V5OiBzdHJpbmcpOiBib29sZWFuIHtcclxuXHRcdHJldHVybiB0aGlzLmZyYW1lVXBLZXlzLmhhcyhrZXkpXHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGtleURvd25MaXN0ZW5lciA9IChlOiBLZXlib2FyZEV2ZW50KSA9PiB7XHJcblx0XHRpZih0aGlzLmhlbGRLZXlzLmhhcyhlLmtleSkpXHJcblx0XHRcdHJldHVyblxyXG5cclxuXHRcdHRoaXMuZG93bktleXMuYWRkKGUua2V5KVxyXG5cdFx0dGhpcy5oZWxkS2V5cy5hZGQoZS5rZXkpXHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGtleVVwTGlzdGVuZXIgPSAoZTogS2V5Ym9hcmRFdmVudCkgPT4ge1xyXG5cdFx0dGhpcy51cEtleXMuYWRkKGUua2V5KVxyXG5cdFx0dGhpcy5oZWxkS2V5cy5kZWxldGUoZS5rZXkpXHJcblx0fVxyXG59Il19