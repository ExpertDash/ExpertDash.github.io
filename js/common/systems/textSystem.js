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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var TextSystem_1;
Object.defineProperty(exports, "__esModule", { value: true });
const ecs_js_1 = require("../../ecs.js");
const world_js_1 = __importStar(require("../world.js"));
const renderSystem_js_1 = __importDefault(require("./renderSystem.js"));
let TextSystem = TextSystem_1 = class TextSystem extends ecs_js_1.System {
    constructor() {
        super(...arguments);
        this.requested = [];
        this.created = [];
    }
    update(_) {
        const renderSystem = world_js_1.default.systems.get(renderSystem_js_1.default);
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
    world_js_1.default.register.system({ after: [world_js_1.Simulator.Category.UI] })
], TextSystem);
exports.default = TextSystem;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dFN5c3RlbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tb24vc3lzdGVtcy90ZXh0U3lzdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBbUM7QUFHbkMsd0RBQTRDO0FBQzVDLHdFQUE0QztBQUs1QyxJQUFxQixVQUFVLGtCQUEvQixNQUFxQixVQUFXLFNBQVEsZUFBTTtJQUE5Qzs7UUFDUyxjQUFTLEdBQXFDLEVBQUUsQ0FBQTtRQUNoRCxZQUFPLEdBQXFCLEVBQUUsQ0FBQTtJQTRCdkMsQ0FBQztJQTFCTyxNQUFNLENBQUMsQ0FBVztRQUN4QixNQUFNLFlBQVksR0FBRyxrQkFBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMseUJBQVksQ0FBQyxDQUFBO1FBRXBELE9BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQztZQUM1QixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFBO1FBRTVCLE9BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ2hDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUE7WUFDMUMsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQTtZQUN4QyxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQTtZQUNwQixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFBO1lBQ2hDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQTtZQUNoQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUE7WUFFOUIsSUFBSSxDQUFDLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFBO1lBQ3BELElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQTtZQUN6RSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUE7WUFFNUUsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDaEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7U0FDdkI7SUFDRixDQUFDO0lBRU0sSUFBSSxDQUFDLFFBQWlCLEVBQUUsS0FBYSxFQUFFLFVBQXVCLEVBQUMsS0FBSyxFQUFFLE9BQU8sRUFBQztRQUNwRixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQTtJQUNoRCxDQUFDO0NBQ0QsQ0FBQTtBQTlCb0IsVUFBVTtJQUQ5QixrQkFBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQW9CLEVBQUMsS0FBSyxFQUFFLENBQUMsb0JBQVMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQztHQUN0RCxVQUFVLENBOEI5QjtrQkE5Qm9CLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1N5c3RlbX0gZnJvbSBcIi4uLy4uL2Vjcy5qc1wiXHJcbmltcG9ydCBFbnRpdGllcyBmcm9tIFwiLi4vLi4vZWNzL2VudGl0aWVzLmpzXCJcclxuaW1wb3J0IFZlY3RvcjMgZnJvbSBcIi4uLy4uL21hdGgvdmVjMy5qc1wiXHJcbmltcG9ydCBXb3JsZCwge1NpbXVsYXRvcn0gZnJvbSBcIi4uL3dvcmxkLmpzXCJcclxuaW1wb3J0IFJlbmRlclN5c3RlbSBmcm9tIFwiLi9yZW5kZXJTeXN0ZW0uanNcIlxyXG5cclxudHlwZSBUZXh0T3B0aW9ucyA9IHtjb2xvcjogc3RyaW5nfVxyXG5cclxuQFdvcmxkLnJlZ2lzdGVyLnN5c3RlbTx0eXBlb2YgVGV4dFN5c3RlbT4oe2FmdGVyOiBbU2ltdWxhdG9yLkNhdGVnb3J5LlVJXX0pXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRleHRTeXN0ZW0gZXh0ZW5kcyBTeXN0ZW0ge1xyXG5cdHByaXZhdGUgcmVxdWVzdGVkOiBbVmVjdG9yMywgc3RyaW5nLCBUZXh0T3B0aW9uc11bXSA9IFtdXHJcblx0cHJpdmF0ZSBjcmVhdGVkOiBIVE1MRGl2RWxlbWVudFtdID0gW11cclxuXHJcblx0cHVibGljIHVwZGF0ZShfOiBFbnRpdGllcykge1xyXG5cdFx0Y29uc3QgcmVuZGVyU3lzdGVtID0gV29ybGQuc3lzdGVtcy5nZXQoUmVuZGVyU3lzdGVtKVxyXG5cclxuXHRcdHdoaWxlKHRoaXMuY3JlYXRlZC5sZW5ndGggPiAwKVxyXG5cdFx0XHR0aGlzLmNyZWF0ZWQucG9wKCkucmVtb3ZlKClcclxuXHJcblx0XHR3aGlsZSh0aGlzLnJlcXVlc3RlZC5sZW5ndGggPiAwKSB7XHJcblx0XHRcdGxldCBbcCwgcywgb3B0aW9uc10gPSB0aGlzLnJlcXVlc3RlZC5wb3AoKVxyXG5cdFx0XHRsZXQgdGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcclxuXHRcdFx0dGV4dC50ZXh0Q29udGVudCA9IHNcclxuXHRcdFx0dGV4dC5zdHlsZS5jb2xvciA9IG9wdGlvbnMuY29sb3JcclxuXHRcdFx0dGV4dC5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIlxyXG5cdFx0XHR0ZXh0LnN0eWxlLnVzZXJTZWxlY3QgPSBcIm5vbmVcIlxyXG5cclxuXHRcdFx0bGV0IHIgPSByZW5kZXJTeXN0ZW0ub3J0aG8gPyByZW5kZXJTeXN0ZW0uc2l6ZSA6IE5hTlxyXG5cdFx0XHR0ZXh0LnN0eWxlLmxlZnQgPSBNYXRoLnJvdW5kKHJlbmRlclN5c3RlbS53aWR0aCAvIDIgKyBwLnggLyByKS50b1N0cmluZygpXHJcblx0XHRcdHRleHQuc3R5bGUuYm90dG9tID0gTWF0aC5yb3VuZChyZW5kZXJTeXN0ZW0uaGVpZ2h0IC8gMiArIHAueSAvIHIpLnRvU3RyaW5nKClcclxuXHJcblx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpLmFwcGVuZENoaWxkKHRleHQpXHJcblx0XHRcdHRoaXMuY3JlYXRlZC5wdXNoKHRleHQpXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgdGV4dChwb3NpdGlvbjogVmVjdG9yMywgdmFsdWU6IHN0cmluZywgb3B0aW9uczogVGV4dE9wdGlvbnMgPSB7Y29sb3I6IFwid2hpdGVcIn0pOiB2b2lkIHtcclxuXHRcdHRoaXMucmVxdWVzdGVkLnB1c2goW3Bvc2l0aW9uLCB2YWx1ZSwgb3B0aW9uc10pXHJcblx0fVxyXG59Il19