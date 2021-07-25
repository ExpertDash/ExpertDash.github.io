"use strict";
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
var _Material_values;
Object.defineProperty(exports, "__esModule", { value: true });
class Material {
    constructor(shader) {
        _Material_values.set(this, void 0);
        this.shader = shader;
        __classPrivateFieldSet(this, _Material_values, new Map(), "f");
    }
    getValue(name) {
        return __classPrivateFieldGet(this, _Material_values, "f").get(name);
    }
    setValue(name, value) {
        __classPrivateFieldGet(this, _Material_values, "f").set(name, value);
        return this;
    }
    /**
     * Applies the material to the render flow
     */
    apply(context) {
        for (let name of this.shader.attributes) {
            let attribute = this.shader.getAttribute(name);
            if (!__classPrivateFieldGet(this, _Material_values, "f").has(name))
                continue;
            let value = __classPrivateFieldGet(this, _Material_values, "f").get(name);
            switch (attribute.type) {
                case "bool":
                case "int":
                case "uint":
                case "float":
                case "double":
                    context.vertexAttrib1f(attribute.location, value);
                    break;
                case "vec2":
                    context.vertexAttrib2fv(attribute.location, value);
                    break;
                case "vec3":
                    context.vertexAttrib3fv(attribute.location, value);
                    break;
                case "vec4":
                    context.vertexAttrib4fv(attribute.location, value);
                    break;
                default:
                    console.error(`Unsupported shader attribute ${name}`);
                    break;
            }
        }
        for (let name of this.shader.uniforms) {
            let uniform = this.shader.getUniform(name);
            if (!__classPrivateFieldGet(this, _Material_values, "f").has(name))
                continue;
            let value = __classPrivateFieldGet(this, _Material_values, "f").get(name);
            switch (uniform.type) {
                case "bool":
                case "int":
                case "uint":
                    context.uniform1i(uniform.location, value);
                    break;
                case "float":
                case "double":
                    context.uniform1f(uniform.location, value);
                    break;
                case "vec2":
                    context.uniform2fv(uniform.location, value);
                    break;
                case "vec3":
                    context.uniform3fv(uniform.location, value);
                    break;
                case "vec4":
                    context.uniform4fv(uniform.location, value);
                    break;
                case "mat2":
                    context.uniformMatrix2fv(uniform.location, false, value);
                    break;
                case "mat3":
                    context.uniformMatrix3fv(uniform.location, false, value);
                    break;
                case "mat4":
                    context.uniformMatrix4fv(uniform.location, false, value);
                    break;
                default:
                    console.error(`Unsupported shader uniform ${name}`);
                    break;
            }
        }
    }
}
exports.default = Material;
_Material_values = new WeakMap();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcmVuZGVyaW5nL21hdGVyaWFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBRUEsTUFBcUIsUUFBUTtJQUk1QixZQUFtQixNQUFjO1FBRmpDLG1DQUF5QjtRQUd4QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQTtRQUNwQix1QkFBQSxJQUFJLG9CQUFXLElBQUksR0FBRyxFQUFFLE1BQUEsQ0FBQTtJQUN6QixDQUFDO0lBRU0sUUFBUSxDQUFJLElBQVk7UUFDOUIsT0FBTyx1QkFBQSxJQUFJLHdCQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBTSxDQUFBO0lBQ25DLENBQUM7SUFFTSxRQUFRLENBQUksSUFBWSxFQUFFLEtBQVE7UUFDeEMsdUJBQUEsSUFBSSx3QkFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUE7UUFDN0IsT0FBTyxJQUFJLENBQUE7SUFDWixDQUFDO0lBRUQ7O09BRUc7SUFDSSxLQUFLLENBQUMsT0FBOEI7UUFDMUMsS0FBSSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRTtZQUN2QyxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUU5QyxJQUFHLENBQUMsdUJBQUEsSUFBSSx3QkFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7Z0JBQ3pCLFNBQVE7WUFFVCxJQUFJLEtBQUssR0FBRyx1QkFBQSxJQUFJLHdCQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO1lBRWxDLFFBQU8sU0FBUyxDQUFDLElBQUksRUFBRTtnQkFDdEIsS0FBSyxNQUFNLENBQUM7Z0JBQ1osS0FBSyxLQUFLLENBQUM7Z0JBQ1gsS0FBSyxNQUFNLENBQUM7Z0JBQ1osS0FBSyxPQUFPLENBQUM7Z0JBQ2IsS0FBSyxRQUFRO29CQUNaLE9BQU8sQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQTtvQkFDakQsTUFBSztnQkFDTixLQUFLLE1BQU07b0JBQ1YsT0FBTyxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFBO29CQUNsRCxNQUFLO2dCQUNOLEtBQUssTUFBTTtvQkFDVixPQUFPLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUE7b0JBQ2xELE1BQUs7Z0JBQ04sS0FBSyxNQUFNO29CQUNWLE9BQU8sQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQTtvQkFDbEQsTUFBSztnQkFDTjtvQkFDQyxPQUFPLENBQUMsS0FBSyxDQUFDLGdDQUFnQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO29CQUNyRCxNQUFLO2FBQ047U0FDRDtRQUVELEtBQUksSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUU7WUFDckMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUE7WUFFMUMsSUFBRyxDQUFDLHVCQUFBLElBQUksd0JBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO2dCQUN6QixTQUFRO1lBRVQsSUFBSSxLQUFLLEdBQUcsdUJBQUEsSUFBSSx3QkFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUVsQyxRQUFPLE9BQU8sQ0FBQyxJQUFJLEVBQUU7Z0JBQ3BCLEtBQUssTUFBTSxDQUFDO2dCQUNaLEtBQUssS0FBSyxDQUFDO2dCQUNYLEtBQUssTUFBTTtvQkFDVixPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUE7b0JBQzFDLE1BQUs7Z0JBQ04sS0FBSyxPQUFPLENBQUM7Z0JBQ2IsS0FBSyxRQUFRO29CQUNaLE9BQU8sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQTtvQkFDMUMsTUFBSztnQkFDTixLQUFLLE1BQU07b0JBQ1YsT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFBO29CQUMzQyxNQUFLO2dCQUNOLEtBQUssTUFBTTtvQkFDVixPQUFPLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUE7b0JBQzNDLE1BQUs7Z0JBQ04sS0FBSyxNQUFNO29CQUNWLE9BQU8sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQTtvQkFDM0MsTUFBSztnQkFDTixLQUFLLE1BQU07b0JBQ1YsT0FBTyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFBO29CQUN4RCxNQUFLO2dCQUNOLEtBQUssTUFBTTtvQkFDVixPQUFPLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUE7b0JBQ3hELE1BQUs7Z0JBQ04sS0FBSyxNQUFNO29CQUNWLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQTtvQkFDeEQsTUFBSztnQkFDTjtvQkFDQyxPQUFPLENBQUMsS0FBSyxDQUFDLDhCQUE4QixJQUFJLEVBQUUsQ0FBQyxDQUFBO29CQUNuRCxNQUFLO2FBQ047U0FDRDtJQUNGLENBQUM7Q0FDRDtBQS9GRCwyQkErRkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU2hhZGVyIGZyb20gXCIuL3NoYWRlci5qc1wiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYXRlcmlhbCB7XHJcblx0cHVibGljIHJlYWRvbmx5IHNoYWRlcjogU2hhZGVyXHJcblx0I3ZhbHVlczogTWFwPHN0cmluZywgYW55PlxyXG5cclxuXHRwdWJsaWMgY29uc3RydWN0b3Ioc2hhZGVyOiBTaGFkZXIpIHtcclxuXHRcdHRoaXMuc2hhZGVyID0gc2hhZGVyXHJcblx0XHR0aGlzLiN2YWx1ZXMgPSBuZXcgTWFwKClcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXRWYWx1ZTxUPihuYW1lOiBzdHJpbmcpOiBUIHtcclxuXHRcdHJldHVybiB0aGlzLiN2YWx1ZXMuZ2V0KG5hbWUpIGFzIFRcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXRWYWx1ZTxUPihuYW1lOiBzdHJpbmcsIHZhbHVlOiBUKTogTWF0ZXJpYWwge1xyXG5cdFx0dGhpcy4jdmFsdWVzLnNldChuYW1lLCB2YWx1ZSlcclxuXHRcdHJldHVybiB0aGlzXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBcHBsaWVzIHRoZSBtYXRlcmlhbCB0byB0aGUgcmVuZGVyIGZsb3dcclxuXHQgKi9cclxuXHRwdWJsaWMgYXBwbHkoY29udGV4dDogV2ViR0xSZW5kZXJpbmdDb250ZXh0KSB7XHJcblx0XHRmb3IobGV0IG5hbWUgb2YgdGhpcy5zaGFkZXIuYXR0cmlidXRlcykge1xyXG5cdFx0XHRsZXQgYXR0cmlidXRlID0gdGhpcy5zaGFkZXIuZ2V0QXR0cmlidXRlKG5hbWUpXHJcblxyXG5cdFx0XHRpZighdGhpcy4jdmFsdWVzLmhhcyhuYW1lKSlcclxuXHRcdFx0XHRjb250aW51ZVxyXG5cclxuXHRcdFx0bGV0IHZhbHVlID0gdGhpcy4jdmFsdWVzLmdldChuYW1lKVxyXG5cclxuXHRcdFx0c3dpdGNoKGF0dHJpYnV0ZS50eXBlKSB7XHJcblx0XHRcdFx0Y2FzZSBcImJvb2xcIjpcclxuXHRcdFx0XHRjYXNlIFwiaW50XCI6XHJcblx0XHRcdFx0Y2FzZSBcInVpbnRcIjpcclxuXHRcdFx0XHRjYXNlIFwiZmxvYXRcIjpcclxuXHRcdFx0XHRjYXNlIFwiZG91YmxlXCI6XHJcblx0XHRcdFx0XHRjb250ZXh0LnZlcnRleEF0dHJpYjFmKGF0dHJpYnV0ZS5sb2NhdGlvbiwgdmFsdWUpXHJcblx0XHRcdFx0XHRicmVha1xyXG5cdFx0XHRcdGNhc2UgXCJ2ZWMyXCI6XHJcblx0XHRcdFx0XHRjb250ZXh0LnZlcnRleEF0dHJpYjJmdihhdHRyaWJ1dGUubG9jYXRpb24sIHZhbHVlKVxyXG5cdFx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHRjYXNlIFwidmVjM1wiOlxyXG5cdFx0XHRcdFx0Y29udGV4dC52ZXJ0ZXhBdHRyaWIzZnYoYXR0cmlidXRlLmxvY2F0aW9uLCB2YWx1ZSlcclxuXHRcdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0Y2FzZSBcInZlYzRcIjpcclxuXHRcdFx0XHRcdGNvbnRleHQudmVydGV4QXR0cmliNGZ2KGF0dHJpYnV0ZS5sb2NhdGlvbiwgdmFsdWUpXHJcblx0XHRcdFx0XHRicmVha1xyXG5cdFx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0XHRjb25zb2xlLmVycm9yKGBVbnN1cHBvcnRlZCBzaGFkZXIgYXR0cmlidXRlICR7bmFtZX1gKVxyXG5cdFx0XHRcdFx0YnJlYWtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGZvcihsZXQgbmFtZSBvZiB0aGlzLnNoYWRlci51bmlmb3Jtcykge1xyXG5cdFx0XHRsZXQgdW5pZm9ybSA9IHRoaXMuc2hhZGVyLmdldFVuaWZvcm0obmFtZSlcclxuXHJcblx0XHRcdGlmKCF0aGlzLiN2YWx1ZXMuaGFzKG5hbWUpKVxyXG5cdFx0XHRcdGNvbnRpbnVlXHJcblxyXG5cdFx0XHRsZXQgdmFsdWUgPSB0aGlzLiN2YWx1ZXMuZ2V0KG5hbWUpXHJcblxyXG5cdFx0XHRzd2l0Y2godW5pZm9ybS50eXBlKSB7XHJcblx0XHRcdFx0Y2FzZSBcImJvb2xcIjpcclxuXHRcdFx0XHRjYXNlIFwiaW50XCI6XHJcblx0XHRcdFx0Y2FzZSBcInVpbnRcIjpcclxuXHRcdFx0XHRcdGNvbnRleHQudW5pZm9ybTFpKHVuaWZvcm0ubG9jYXRpb24sIHZhbHVlKVxyXG5cdFx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHRjYXNlIFwiZmxvYXRcIjpcclxuXHRcdFx0XHRjYXNlIFwiZG91YmxlXCI6XHJcblx0XHRcdFx0XHRjb250ZXh0LnVuaWZvcm0xZih1bmlmb3JtLmxvY2F0aW9uLCB2YWx1ZSlcclxuXHRcdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0Y2FzZSBcInZlYzJcIjpcclxuXHRcdFx0XHRcdGNvbnRleHQudW5pZm9ybTJmdih1bmlmb3JtLmxvY2F0aW9uLCB2YWx1ZSlcclxuXHRcdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0Y2FzZSBcInZlYzNcIjpcclxuXHRcdFx0XHRcdGNvbnRleHQudW5pZm9ybTNmdih1bmlmb3JtLmxvY2F0aW9uLCB2YWx1ZSlcclxuXHRcdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0Y2FzZSBcInZlYzRcIjpcclxuXHRcdFx0XHRcdGNvbnRleHQudW5pZm9ybTRmdih1bmlmb3JtLmxvY2F0aW9uLCB2YWx1ZSlcclxuXHRcdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0Y2FzZSBcIm1hdDJcIjpcclxuXHRcdFx0XHRcdGNvbnRleHQudW5pZm9ybU1hdHJpeDJmdih1bmlmb3JtLmxvY2F0aW9uLCBmYWxzZSwgdmFsdWUpXHJcblx0XHRcdFx0XHRicmVha1xyXG5cdFx0XHRcdGNhc2UgXCJtYXQzXCI6XHJcblx0XHRcdFx0XHRjb250ZXh0LnVuaWZvcm1NYXRyaXgzZnYodW5pZm9ybS5sb2NhdGlvbiwgZmFsc2UsIHZhbHVlKVxyXG5cdFx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHRjYXNlIFwibWF0NFwiOlxyXG5cdFx0XHRcdFx0Y29udGV4dC51bmlmb3JtTWF0cml4NGZ2KHVuaWZvcm0ubG9jYXRpb24sIGZhbHNlLCB2YWx1ZSlcclxuXHRcdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoYFVuc3VwcG9ydGVkIHNoYWRlciB1bmlmb3JtICR7bmFtZX1gKVxyXG5cdFx0XHRcdFx0YnJlYWtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxufSJdfQ==