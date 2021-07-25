"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const world_js_1 = __importDefault(require("../../../common/world.js"));
const ecs_js_1 = require("../../../ecs.js");
let Ownership = class Ownership extends ecs_js_1.Component {
};
Ownership = __decorate([
    world_js_1.default.register.component()
], Ownership);
exports.default = Ownership;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3duZXJzaGlwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2dhbWVzL3BvbmcvY29tcG9uZW50cy9vd25lcnNoaXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSx3RUFBNEM7QUFDNUMsNENBQXlDO0FBR3pDLElBQXFCLFNBQVMsR0FBOUIsTUFBcUIsU0FBVSxTQUFRLGtCQUFTO0NBQUcsQ0FBQTtBQUE5QixTQUFTO0lBRDdCLGtCQUFLLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRTtHQUNOLFNBQVMsQ0FBcUI7a0JBQTlCLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgV29ybGQgZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi93b3JsZC5qc1wiXHJcbmltcG9ydCB7Q29tcG9uZW50fSBmcm9tIFwiLi4vLi4vLi4vZWNzLmpzXCJcclxuXHJcbkBXb3JsZC5yZWdpc3Rlci5jb21wb25lbnQoKVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPd25lcnNoaXAgZXh0ZW5kcyBDb21wb25lbnQge30iXX0=