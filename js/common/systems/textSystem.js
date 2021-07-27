var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TextSystem_1;
import { System } from "../../ecs.js";
import World, { Simulator } from "../world.js";
import RenderSystem from "./renderSystem.js";
let TextSystem = TextSystem_1 = class TextSystem extends System {
    constructor() {
        super(...arguments);
        this.requested = [];
        this.created = [];
    }
    update(_) {
        const renderSystem = World.systems.get(RenderSystem);
        while (this.created.length > 0)
            this.created.pop().remove();
        while (this.requested.length > 0) {
            let [p, s, options] = this.requested.pop();
            let text = document.createElement("div");
            text.textContent = s;
            text.style.color = options.color;
            text.style.position = "absolute";
            text.style.userSelect = "none";
            let r = renderSystem.ortho ? renderSystem.size : NaN;
            text.style.left = Math.round(renderSystem.width / 2 + p.x / r).toString();
            text.style.bottom = Math.round(renderSystem.height / 2 + p.y / r).toString();
            document.querySelector("body").appendChild(text);
            this.created.push(text);
        }
    }
    text(position, value, options = { color: "white" }) {
        this.requested.push([position, value, options]);
    }
};
TextSystem = TextSystem_1 = __decorate([
    World.register.system(Simulator.phase(Simulator.Category.UI))
], TextSystem);
export default TextSystem;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dFN5c3RlbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tb24vc3lzdGVtcy90ZXh0U3lzdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sY0FBYyxDQUFBO0FBR25DLE9BQU8sS0FBSyxFQUFFLEVBQUMsU0FBUyxFQUFDLE1BQU0sYUFBYSxDQUFBO0FBQzVDLE9BQU8sWUFBWSxNQUFNLG1CQUFtQixDQUFBO0FBSzVDLElBQXFCLFVBQVUsa0JBQS9CLE1BQXFCLFVBQVcsU0FBUSxNQUFNO0lBQTlDOztRQUNTLGNBQVMsR0FBcUMsRUFBRSxDQUFBO1FBQ2hELFlBQU8sR0FBcUIsRUFBRSxDQUFBO0lBNEJ2QyxDQUFDO0lBMUJPLE1BQU0sQ0FBQyxDQUFXO1FBQ3hCLE1BQU0sWUFBWSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFBO1FBRXBELE9BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQztZQUM1QixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFBO1FBRTVCLE9BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ2hDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUE7WUFDMUMsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQTtZQUN4QyxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQTtZQUNwQixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFBO1lBQ2hDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQTtZQUNoQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUE7WUFFOUIsSUFBSSxDQUFDLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFBO1lBQ3BELElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQTtZQUN6RSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUE7WUFFNUUsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDaEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7U0FDdkI7SUFDRixDQUFDO0lBRU0sSUFBSSxDQUFDLFFBQWlCLEVBQUUsS0FBYSxFQUFFLFVBQXVCLEVBQUMsS0FBSyxFQUFFLE9BQU8sRUFBQztRQUNwRixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQTtJQUNoRCxDQUFDO0NBQ0QsQ0FBQTtBQTlCb0IsVUFBVTtJQUQ5QixLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBb0IsU0FBUyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0dBQzVELFVBQVUsQ0E4QjlCO2VBOUJvQixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtTeXN0ZW19IGZyb20gXCIuLi8uLi9lY3MuanNcIlxyXG5pbXBvcnQgRW50aXRpZXMgZnJvbSBcIi4uLy4uL2Vjcy9lbnRpdGllcy5qc1wiXHJcbmltcG9ydCBWZWN0b3IzIGZyb20gXCIuLi8uLi9tYXRoL3ZlYzMuanNcIlxyXG5pbXBvcnQgV29ybGQsIHtTaW11bGF0b3J9IGZyb20gXCIuLi93b3JsZC5qc1wiXHJcbmltcG9ydCBSZW5kZXJTeXN0ZW0gZnJvbSBcIi4vcmVuZGVyU3lzdGVtLmpzXCJcclxuXHJcbnR5cGUgVGV4dE9wdGlvbnMgPSB7Y29sb3I6IHN0cmluZ31cclxuXHJcbkBXb3JsZC5yZWdpc3Rlci5zeXN0ZW08dHlwZW9mIFRleHRTeXN0ZW0+KFNpbXVsYXRvci5waGFzZShTaW11bGF0b3IuQ2F0ZWdvcnkuVUkpKVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXh0U3lzdGVtIGV4dGVuZHMgU3lzdGVtIHtcclxuXHRwcml2YXRlIHJlcXVlc3RlZDogW1ZlY3RvcjMsIHN0cmluZywgVGV4dE9wdGlvbnNdW10gPSBbXVxyXG5cdHByaXZhdGUgY3JlYXRlZDogSFRNTERpdkVsZW1lbnRbXSA9IFtdXHJcblxyXG5cdHB1YmxpYyB1cGRhdGUoXzogRW50aXRpZXMpIHtcclxuXHRcdGNvbnN0IHJlbmRlclN5c3RlbSA9IFdvcmxkLnN5c3RlbXMuZ2V0KFJlbmRlclN5c3RlbSlcclxuXHJcblx0XHR3aGlsZSh0aGlzLmNyZWF0ZWQubGVuZ3RoID4gMClcclxuXHRcdFx0dGhpcy5jcmVhdGVkLnBvcCgpLnJlbW92ZSgpXHJcblxyXG5cdFx0d2hpbGUodGhpcy5yZXF1ZXN0ZWQubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRsZXQgW3AsIHMsIG9wdGlvbnNdID0gdGhpcy5yZXF1ZXN0ZWQucG9wKClcclxuXHRcdFx0bGV0IHRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXHJcblx0XHRcdHRleHQudGV4dENvbnRlbnQgPSBzXHJcblx0XHRcdHRleHQuc3R5bGUuY29sb3IgPSBvcHRpb25zLmNvbG9yXHJcblx0XHRcdHRleHQuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCJcclxuXHRcdFx0dGV4dC5zdHlsZS51c2VyU2VsZWN0ID0gXCJub25lXCJcclxuXHJcblx0XHRcdGxldCByID0gcmVuZGVyU3lzdGVtLm9ydGhvID8gcmVuZGVyU3lzdGVtLnNpemUgOiBOYU5cclxuXHRcdFx0dGV4dC5zdHlsZS5sZWZ0ID0gTWF0aC5yb3VuZChyZW5kZXJTeXN0ZW0ud2lkdGggLyAyICsgcC54IC8gcikudG9TdHJpbmcoKVxyXG5cdFx0XHR0ZXh0LnN0eWxlLmJvdHRvbSA9IE1hdGgucm91bmQocmVuZGVyU3lzdGVtLmhlaWdodCAvIDIgKyBwLnkgLyByKS50b1N0cmluZygpXHJcblxyXG5cdFx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKS5hcHBlbmRDaGlsZCh0ZXh0KVxyXG5cdFx0XHR0aGlzLmNyZWF0ZWQucHVzaCh0ZXh0KVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cHVibGljIHRleHQocG9zaXRpb246IFZlY3RvcjMsIHZhbHVlOiBzdHJpbmcsIG9wdGlvbnM6IFRleHRPcHRpb25zID0ge2NvbG9yOiBcIndoaXRlXCJ9KTogdm9pZCB7XHJcblx0XHR0aGlzLnJlcXVlc3RlZC5wdXNoKFtwb3NpdGlvbiwgdmFsdWUsIG9wdGlvbnNdKVxyXG5cdH1cclxufSJdfQ==