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
export default class Material {
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
_Material_values = new WeakMap();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcmVuZGVyaW5nL21hdGVyaWFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUVBLE1BQU0sQ0FBQyxPQUFPLE9BQU8sUUFBUTtJQUk1QixZQUFtQixNQUFjO1FBRmpDLG1DQUF5QjtRQUd4QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQTtRQUNwQix1QkFBQSxJQUFJLG9CQUFXLElBQUksR0FBRyxFQUFFLE1BQUEsQ0FBQTtJQUN6QixDQUFDO0lBRU0sUUFBUSxDQUFJLElBQVk7UUFDOUIsT0FBTyx1QkFBQSxJQUFJLHdCQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBTSxDQUFBO0lBQ25DLENBQUM7SUFFTSxRQUFRLENBQUksSUFBWSxFQUFFLEtBQVE7UUFDeEMsdUJBQUEsSUFBSSx3QkFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUE7UUFDN0IsT0FBTyxJQUFJLENBQUE7SUFDWixDQUFDO0lBRUQ7O09BRUc7SUFDSSxLQUFLLENBQUMsT0FBOEI7UUFDMUMsS0FBSSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRTtZQUN2QyxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUU5QyxJQUFHLENBQUMsdUJBQUEsSUFBSSx3QkFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7Z0JBQ3pCLFNBQVE7WUFFVCxJQUFJLEtBQUssR0FBRyx1QkFBQSxJQUFJLHdCQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO1lBRWxDLFFBQU8sU0FBUyxDQUFDLElBQUksRUFBRTtnQkFDdEIsS0FBSyxNQUFNLENBQUM7Z0JBQ1osS0FBSyxLQUFLLENBQUM7Z0JBQ1gsS0FBSyxNQUFNLENBQUM7Z0JBQ1osS0FBSyxPQUFPLENBQUM7Z0JBQ2IsS0FBSyxRQUFRO29CQUNaLE9BQU8sQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQTtvQkFDakQsTUFBSztnQkFDTixLQUFLLE1BQU07b0JBQ1YsT0FBTyxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFBO29CQUNsRCxNQUFLO2dCQUNOLEtBQUssTUFBTTtvQkFDVixPQUFPLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUE7b0JBQ2xELE1BQUs7Z0JBQ04sS0FBSyxNQUFNO29CQUNWLE9BQU8sQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQTtvQkFDbEQsTUFBSztnQkFDTjtvQkFDQyxPQUFPLENBQUMsS0FBSyxDQUFDLGdDQUFnQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO29CQUNyRCxNQUFLO2FBQ047U0FDRDtRQUVELEtBQUksSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUU7WUFDckMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUE7WUFFMUMsSUFBRyxDQUFDLHVCQUFBLElBQUksd0JBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO2dCQUN6QixTQUFRO1lBRVQsSUFBSSxLQUFLLEdBQUcsdUJBQUEsSUFBSSx3QkFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUVsQyxRQUFPLE9BQU8sQ0FBQyxJQUFJLEVBQUU7Z0JBQ3BCLEtBQUssTUFBTSxDQUFDO2dCQUNaLEtBQUssS0FBSyxDQUFDO2dCQUNYLEtBQUssTUFBTTtvQkFDVixPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUE7b0JBQzFDLE1BQUs7Z0JBQ04sS0FBSyxPQUFPLENBQUM7Z0JBQ2IsS0FBSyxRQUFRO29CQUNaLE9BQU8sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQTtvQkFDMUMsTUFBSztnQkFDTixLQUFLLE1BQU07b0JBQ1YsT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFBO29CQUMzQyxNQUFLO2dCQUNOLEtBQUssTUFBTTtvQkFDVixPQUFPLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUE7b0JBQzNDLE1BQUs7Z0JBQ04sS0FBSyxNQUFNO29CQUNWLE9BQU8sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQTtvQkFDM0MsTUFBSztnQkFDTixLQUFLLE1BQU07b0JBQ1YsT0FBTyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFBO29CQUN4RCxNQUFLO2dCQUNOLEtBQUssTUFBTTtvQkFDVixPQUFPLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUE7b0JBQ3hELE1BQUs7Z0JBQ04sS0FBSyxNQUFNO29CQUNWLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQTtvQkFDeEQsTUFBSztnQkFDTjtvQkFDQyxPQUFPLENBQUMsS0FBSyxDQUFDLDhCQUE4QixJQUFJLEVBQUUsQ0FBQyxDQUFBO29CQUNuRCxNQUFLO2FBQ047U0FDRDtJQUNGLENBQUM7Q0FDRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTaGFkZXIgZnJvbSBcIi4vc2hhZGVyLmpzXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hdGVyaWFsIHtcclxuXHRwdWJsaWMgcmVhZG9ubHkgc2hhZGVyOiBTaGFkZXJcclxuXHQjdmFsdWVzOiBNYXA8c3RyaW5nLCBhbnk+XHJcblxyXG5cdHB1YmxpYyBjb25zdHJ1Y3RvcihzaGFkZXI6IFNoYWRlcikge1xyXG5cdFx0dGhpcy5zaGFkZXIgPSBzaGFkZXJcclxuXHRcdHRoaXMuI3ZhbHVlcyA9IG5ldyBNYXAoKVxyXG5cdH1cclxuXHJcblx0cHVibGljIGdldFZhbHVlPFQ+KG5hbWU6IHN0cmluZyk6IFQge1xyXG5cdFx0cmV0dXJuIHRoaXMuI3ZhbHVlcy5nZXQobmFtZSkgYXMgVFxyXG5cdH1cclxuXHJcblx0cHVibGljIHNldFZhbHVlPFQ+KG5hbWU6IHN0cmluZywgdmFsdWU6IFQpOiBNYXRlcmlhbCB7XHJcblx0XHR0aGlzLiN2YWx1ZXMuc2V0KG5hbWUsIHZhbHVlKVxyXG5cdFx0cmV0dXJuIHRoaXNcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFwcGxpZXMgdGhlIG1hdGVyaWFsIHRvIHRoZSByZW5kZXIgZmxvd1xyXG5cdCAqL1xyXG5cdHB1YmxpYyBhcHBseShjb250ZXh0OiBXZWJHTFJlbmRlcmluZ0NvbnRleHQpIHtcclxuXHRcdGZvcihsZXQgbmFtZSBvZiB0aGlzLnNoYWRlci5hdHRyaWJ1dGVzKSB7XHJcblx0XHRcdGxldCBhdHRyaWJ1dGUgPSB0aGlzLnNoYWRlci5nZXRBdHRyaWJ1dGUobmFtZSlcclxuXHJcblx0XHRcdGlmKCF0aGlzLiN2YWx1ZXMuaGFzKG5hbWUpKVxyXG5cdFx0XHRcdGNvbnRpbnVlXHJcblxyXG5cdFx0XHRsZXQgdmFsdWUgPSB0aGlzLiN2YWx1ZXMuZ2V0KG5hbWUpXHJcblxyXG5cdFx0XHRzd2l0Y2goYXR0cmlidXRlLnR5cGUpIHtcclxuXHRcdFx0XHRjYXNlIFwiYm9vbFwiOlxyXG5cdFx0XHRcdGNhc2UgXCJpbnRcIjpcclxuXHRcdFx0XHRjYXNlIFwidWludFwiOlxyXG5cdFx0XHRcdGNhc2UgXCJmbG9hdFwiOlxyXG5cdFx0XHRcdGNhc2UgXCJkb3VibGVcIjpcclxuXHRcdFx0XHRcdGNvbnRleHQudmVydGV4QXR0cmliMWYoYXR0cmlidXRlLmxvY2F0aW9uLCB2YWx1ZSlcclxuXHRcdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0Y2FzZSBcInZlYzJcIjpcclxuXHRcdFx0XHRcdGNvbnRleHQudmVydGV4QXR0cmliMmZ2KGF0dHJpYnV0ZS5sb2NhdGlvbiwgdmFsdWUpXHJcblx0XHRcdFx0XHRicmVha1xyXG5cdFx0XHRcdGNhc2UgXCJ2ZWMzXCI6XHJcblx0XHRcdFx0XHRjb250ZXh0LnZlcnRleEF0dHJpYjNmdihhdHRyaWJ1dGUubG9jYXRpb24sIHZhbHVlKVxyXG5cdFx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHRjYXNlIFwidmVjNFwiOlxyXG5cdFx0XHRcdFx0Y29udGV4dC52ZXJ0ZXhBdHRyaWI0ZnYoYXR0cmlidXRlLmxvY2F0aW9uLCB2YWx1ZSlcclxuXHRcdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoYFVuc3VwcG9ydGVkIHNoYWRlciBhdHRyaWJ1dGUgJHtuYW1lfWApXHJcblx0XHRcdFx0XHRicmVha1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Zm9yKGxldCBuYW1lIG9mIHRoaXMuc2hhZGVyLnVuaWZvcm1zKSB7XHJcblx0XHRcdGxldCB1bmlmb3JtID0gdGhpcy5zaGFkZXIuZ2V0VW5pZm9ybShuYW1lKVxyXG5cclxuXHRcdFx0aWYoIXRoaXMuI3ZhbHVlcy5oYXMobmFtZSkpXHJcblx0XHRcdFx0Y29udGludWVcclxuXHJcblx0XHRcdGxldCB2YWx1ZSA9IHRoaXMuI3ZhbHVlcy5nZXQobmFtZSlcclxuXHJcblx0XHRcdHN3aXRjaCh1bmlmb3JtLnR5cGUpIHtcclxuXHRcdFx0XHRjYXNlIFwiYm9vbFwiOlxyXG5cdFx0XHRcdGNhc2UgXCJpbnRcIjpcclxuXHRcdFx0XHRjYXNlIFwidWludFwiOlxyXG5cdFx0XHRcdFx0Y29udGV4dC51bmlmb3JtMWkodW5pZm9ybS5sb2NhdGlvbiwgdmFsdWUpXHJcblx0XHRcdFx0XHRicmVha1xyXG5cdFx0XHRcdGNhc2UgXCJmbG9hdFwiOlxyXG5cdFx0XHRcdGNhc2UgXCJkb3VibGVcIjpcclxuXHRcdFx0XHRcdGNvbnRleHQudW5pZm9ybTFmKHVuaWZvcm0ubG9jYXRpb24sIHZhbHVlKVxyXG5cdFx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHRjYXNlIFwidmVjMlwiOlxyXG5cdFx0XHRcdFx0Y29udGV4dC51bmlmb3JtMmZ2KHVuaWZvcm0ubG9jYXRpb24sIHZhbHVlKVxyXG5cdFx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHRjYXNlIFwidmVjM1wiOlxyXG5cdFx0XHRcdFx0Y29udGV4dC51bmlmb3JtM2Z2KHVuaWZvcm0ubG9jYXRpb24sIHZhbHVlKVxyXG5cdFx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHRjYXNlIFwidmVjNFwiOlxyXG5cdFx0XHRcdFx0Y29udGV4dC51bmlmb3JtNGZ2KHVuaWZvcm0ubG9jYXRpb24sIHZhbHVlKVxyXG5cdFx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHRjYXNlIFwibWF0MlwiOlxyXG5cdFx0XHRcdFx0Y29udGV4dC51bmlmb3JtTWF0cml4MmZ2KHVuaWZvcm0ubG9jYXRpb24sIGZhbHNlLCB2YWx1ZSlcclxuXHRcdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0Y2FzZSBcIm1hdDNcIjpcclxuXHRcdFx0XHRcdGNvbnRleHQudW5pZm9ybU1hdHJpeDNmdih1bmlmb3JtLmxvY2F0aW9uLCBmYWxzZSwgdmFsdWUpXHJcblx0XHRcdFx0XHRicmVha1xyXG5cdFx0XHRcdGNhc2UgXCJtYXQ0XCI6XHJcblx0XHRcdFx0XHRjb250ZXh0LnVuaWZvcm1NYXRyaXg0ZnYodW5pZm9ybS5sb2NhdGlvbiwgZmFsc2UsIHZhbHVlKVxyXG5cdFx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdFx0Y29uc29sZS5lcnJvcihgVW5zdXBwb3J0ZWQgc2hhZGVyIHVuaWZvcm0gJHtuYW1lfWApXHJcblx0XHRcdFx0XHRicmVha1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG59Il19