"use strict";
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
var _Shader_attributes, _Shader_uniforms;
Object.defineProperty(exports, "__esModule", { value: true });
const renderSystem_js_1 = __importDefault(require("../common/systems/renderSystem.js"));
const world_js_1 = __importDefault(require("../common/world.js"));
const retriever_js_1 = __importDefault(require("../utils/retriever.js"));
class Shader {
    constructor(program) {
        _Shader_attributes.set(this, void 0);
        _Shader_uniforms.set(this, void 0);
        this.program = program;
    }
    get attributes() {
        return __classPrivateFieldGet(this, _Shader_attributes, "f").keys();
    }
    get uniforms() {
        return __classPrivateFieldGet(this, _Shader_uniforms, "f").keys();
    }
    getAttribute(name) {
        return __classPrivateFieldGet(this, _Shader_attributes, "f").get(name);
    }
    getUniform(name) {
        return __classPrivateFieldGet(this, _Shader_uniforms, "f").get(name);
    }
    /**
     *
     * @param path Path to GLSL shader
     */
    static async create(path) {
        const context = world_js_1.default.systems.get(renderSystem_js_1.default).context;
        const program = context.createProgram();
        let source = await retriever_js_1.default.fetch(path);
        let { shader: vert, qualified: vQualified } = Shader.load(context, "vert", source);
        let { shader: frag, qualified: fQualified } = Shader.load(context, "frag", source);
        /** @type {Qualified[]} */
        let qualified = [].concat(vQualified, fQualified);
        if (!vert)
            throw new Error(`Missing vertex shader at: '${path}'`);
        if (!frag)
            throw new Error(`Missing fragment shader at: '${path}'`);
        context.attachShader(program, vert);
        context.attachShader(program, frag);
        context.linkProgram(program);
        if (!context.getProgramParameter(program, WebGLRenderingContext.LINK_STATUS))
            throw context.getProgramInfoLog(program);
        let shader = new Shader(program);
        __classPrivateFieldSet(shader, _Shader_attributes, new Map(qualified
            .filter(q => q.qualifier == "attribute")
            .map(q => [q.name, {
                type: q.type,
                value: null,
                location: context.getAttribLocation(program, q.name)
            }])), "f");
        __classPrivateFieldSet(shader, _Shader_uniforms, new Map(qualified
            .filter(q => q.qualifier == "uniform")
            .map(q => [q.name, {
                type: q.type,
                value: null,
                location: context.getUniformLocation(program, q.name)
            }])), "f");
        return shader;
    }
}
exports.default = Shader;
_Shader_attributes = new WeakMap(), _Shader_uniforms = new WeakMap();
Shader.load = (context, target, source) => {
    let type;
    switch (target) {
        case "vert":
            type = WebGLRenderingContext.VERTEX_SHADER;
            source = `#define VERT\n${source}`;
            break;
        case "frag":
            type = WebGLRenderingContext.FRAGMENT_SHADER;
            source = `#define FRAG\n${source}`;
            break;
    }
    return {
        shader: Shader.loadType(context, type, source),
        qualified: Shader.extractQualifiers(source)
    };
};
Shader.loadType = (context, type, source) => {
    const shader = context.createShader(type);
    context.shaderSource(shader, source);
    context.compileShader(shader);
    if (!context.getShaderParameter(shader, WebGLRenderingContext.COMPILE_STATUS)) {
        console.error(context.getShaderInfoLog(shader));
        context.deleteShader(shader);
        return null;
    }
    return shader;
};
Shader.extractQualifiers = (source) => source
    ?.match(/(attribute|uniform)\s+[a-zA-Z0-9]+\s+[a-zA-Z0-9\[\]]+\s*;/g)
    ?.map(a => {
    let [qualifier, type, name] = a.replace(/;/g, "").trim().split(/\s+/g);
    return {
        qualifier: qualifier,
        type: type,
        name: name
    };
}) ?? [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3JlbmRlcmluZy9zaGFkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx3RkFBNEQ7QUFDNUQsa0VBQXNDO0FBQ3RDLHlFQUE2QztBQVM3QyxNQUFxQixNQUFNO0lBSzFCLFlBQW9CLE9BQXFCO1FBSHpDLHFDQUF1QztRQUN2QyxtQ0FBbUM7UUFHbEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUE7SUFDdkIsQ0FBQztJQUVELElBQVcsVUFBVTtRQUNwQixPQUFPLHVCQUFBLElBQUksMEJBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQTtJQUMvQixDQUFDO0lBRUQsSUFBVyxRQUFRO1FBQ2xCLE9BQU8sdUJBQUEsSUFBSSx3QkFBVSxDQUFDLElBQUksRUFBRSxDQUFBO0lBQzdCLENBQUM7SUFFTSxZQUFZLENBQUMsSUFBWTtRQUMvQixPQUFPLHVCQUFBLElBQUksMEJBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDbEMsQ0FBQztJQUVNLFVBQVUsQ0FBQyxJQUFZO1FBQzdCLE9BQU8sdUJBQUEsSUFBSSx3QkFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNoQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBWTtRQUN0QyxNQUFNLE9BQU8sR0FBRyxrQkFBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMseUJBQVksQ0FBQyxDQUFDLE9BQU8sQ0FBQTtRQUN2RCxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUE7UUFFdkMsSUFBSSxNQUFNLEdBQUcsTUFBTSxzQkFBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUV4QyxJQUFJLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFDLEdB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ZXJTeXN0ZW0gZnJvbSBcIi4uL2NvbW1vbi9zeXN0ZW1zL3JlbmRlclN5c3RlbS5qc1wiXHJcbmltcG9ydCBXb3JsZCBmcm9tIFwiLi4vY29tbW9uL3dvcmxkLmpzXCJcclxuaW1wb3J0IFJldHJpZXZlciBmcm9tIFwiLi4vdXRpbHMvcmV0cmlldmVyLmpzXCJcclxuXHJcbnR5cGUgU2hhZGVyQXJjaGV0eXBlID0gXCJ2ZXJ0XCIgfCBcImZyYWdcIlxyXG50eXBlIFF1YWxpZmllciA9IFwidW5pZm9ybVwiIHwgXCJhdHRyaWJ1dGVcIlxyXG5cclxudHlwZSBBdHRyaWJ1dGVJbmZvID0ge3R5cGU6IHN0cmluZywgbG9jYXRpb246IG51bWJlcn1cclxudHlwZSBVbmlmb3JtSW5mbyA9IHt0eXBlOiBzdHJpbmcsIGxvY2F0aW9uOiBXZWJHTFVuaWZvcm1Mb2NhdGlvbn1cclxudHlwZSBRdWFsaWZpZWQgPSB7cXVhbGlmaWVyOiBRdWFsaWZpZXIsIHR5cGU6IHN0cmluZywgbmFtZTogc3RyaW5nfVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hhZGVyIHtcclxuXHRwdWJsaWMgcmVhZG9ubHkgcHJvZ3JhbTogV2ViR0xQcm9ncmFtXHJcblx0I2F0dHJpYnV0ZXM6IE1hcDxzdHJpbmcsIEF0dHJpYnV0ZUluZm8+XHJcblx0I3VuaWZvcm1zOiBNYXA8c3RyaW5nLCBVbmlmb3JtSW5mbz5cclxuXHJcblx0cHJpdmF0ZSBjb25zdHJ1Y3Rvcihwcm9ncmFtOiBXZWJHTFByb2dyYW0pIHtcclxuXHRcdHRoaXMucHJvZ3JhbSA9IHByb2dyYW1cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXQgYXR0cmlidXRlcygpOiBJdGVyYWJsZUl0ZXJhdG9yPHN0cmluZz4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuI2F0dHJpYnV0ZXMua2V5cygpXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0IHVuaWZvcm1zKCk6IEl0ZXJhYmxlSXRlcmF0b3I8c3RyaW5nPiB7XHJcblx0XHRyZXR1cm4gdGhpcy4jdW5pZm9ybXMua2V5cygpXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0QXR0cmlidXRlKG5hbWU6IHN0cmluZyk6IEF0dHJpYnV0ZUluZm8ge1xyXG5cdFx0cmV0dXJuIHRoaXMuI2F0dHJpYnV0ZXMuZ2V0KG5hbWUpXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0VW5pZm9ybShuYW1lOiBzdHJpbmcpOiBVbmlmb3JtSW5mbyB7XHJcblx0XHRyZXR1cm4gdGhpcy4jdW5pZm9ybXMuZ2V0KG5hbWUpXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gcGF0aCBQYXRoIHRvIEdMU0wgc2hhZGVyXHJcblx0ICovXHJcblx0cHVibGljIHN0YXRpYyBhc3luYyBjcmVhdGUocGF0aDogc3RyaW5nKTogUHJvbWlzZTxTaGFkZXI+IHtcclxuXHRcdGNvbnN0IGNvbnRleHQgPSBXb3JsZC5zeXN0ZW1zLmdldChSZW5kZXJTeXN0ZW0pLmNvbnRleHRcclxuXHRcdGNvbnN0IHByb2dyYW0gPSBjb250ZXh0LmNyZWF0ZVByb2dyYW0oKVxyXG5cclxuXHRcdGxldCBzb3VyY2UgPSBhd2FpdCBSZXRyaWV2ZXIuZmV0Y2gocGF0aClcclxuXHJcblx0XHRsZXQge3NoYWRlcjogdmVydCwgcXVhbGlmaWVkOiB2UXVhbGlmaWVkfSA9IFNoYWRlci5sb2FkKGNvbnRleHQsIFwidmVydFwiLCBzb3VyY2UpXHJcblx0XHRsZXQge3NoYWRlcjogZnJhZywgcXVhbGlmaWVkOiBmUXVhbGlmaWVkfSA9IFNoYWRlci5sb2FkKGNvbnRleHQsIFwiZnJhZ1wiLCBzb3VyY2UpXHJcblxyXG5cdFx0LyoqIEB0eXBlIHtRdWFsaWZpZWRbXX0gKi9cclxuXHRcdGxldCBxdWFsaWZpZWQgPSBbXS5jb25jYXQodlF1YWxpZmllZCwgZlF1YWxpZmllZClcclxuXHJcblx0XHRpZighdmVydClcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBNaXNzaW5nIHZlcnRleCBzaGFkZXIgYXQ6ICcke3BhdGh9J2ApXHJcblxyXG5cdFx0aWYoIWZyYWcpXHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihgTWlzc2luZyBmcmFnbWVudCBzaGFkZXIgYXQ6ICcke3BhdGh9J2ApXHJcblxyXG5cdFx0Y29udGV4dC5hdHRhY2hTaGFkZXIocHJvZ3JhbSwgdmVydClcclxuXHRcdGNvbnRleHQuYXR0YWNoU2hhZGVyKHByb2dyYW0sIGZyYWcpXHJcblx0XHRjb250ZXh0LmxpbmtQcm9ncmFtKHByb2dyYW0pXHJcblxyXG5cdFx0aWYoIWNvbnRleHQuZ2V0UHJvZ3JhbVBhcmFtZXRlcihwcm9ncmFtLCBXZWJHTFJlbmRlcmluZ0NvbnRleHQuTElOS19TVEFUVVMpKVxyXG5cdFx0XHR0aHJvdyBjb250ZXh0LmdldFByb2dyYW1JbmZvTG9nKHByb2dyYW0pXHJcblxyXG5cdFx0bGV0IHNoYWRlciA9IG5ldyBTaGFkZXIocHJvZ3JhbSlcclxuXHJcblx0XHRzaGFkZXIuI2F0dHJpYnV0ZXMgPSBuZXcgTWFwKHF1YWxpZmllZFxyXG5cdFx0XHQuZmlsdGVyKHEgPT4gcS5xdWFsaWZpZXIgPT0gXCJhdHRyaWJ1dGVcIilcclxuXHRcdFx0Lm1hcChxID0+IFtxLm5hbWUsIHtcclxuXHRcdFx0XHR0eXBlOiBxLnR5cGUsXHJcblx0XHRcdFx0dmFsdWU6IG51bGwsXHJcblx0XHRcdFx0bG9jYXRpb246IGNvbnRleHQuZ2V0QXR0cmliTG9jYXRpb24ocHJvZ3JhbSwgcS5uYW1lKVxyXG5cdFx0XHR9XSlcclxuXHRcdClcclxuXHJcblx0XHRzaGFkZXIuI3VuaWZvcm1zID0gbmV3IE1hcChxdWFsaWZpZWRcclxuXHRcdFx0LmZpbHRlcihxID0+IHEucXVhbGlmaWVyID09IFwidW5pZm9ybVwiKVxyXG5cdFx0XHQubWFwKHEgPT4gW3EubmFtZSwge1xyXG5cdFx0XHRcdHR5cGU6IHEudHlwZSxcclxuXHRcdFx0XHR2YWx1ZTogbnVsbCxcclxuXHRcdFx0XHRsb2NhdGlvbjogY29udGV4dC5nZXRVbmlmb3JtTG9jYXRpb24ocHJvZ3JhbSwgcS5uYW1lKVxyXG5cdFx0XHR9XSlcclxuXHRcdClcclxuXHJcblx0XHRyZXR1cm4gc2hhZGVyXHJcblx0fVxyXG5cclxuXHRwcml2YXRlIHN0YXRpYyBsb2FkID0gKGNvbnRleHQ6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCwgdGFyZ2V0OiBTaGFkZXJBcmNoZXR5cGUsIHNvdXJjZTogc3RyaW5nKToge3NoYWRlcjogV2ViR0xTaGFkZXIsIHF1YWxpZmllZDogUXVhbGlmaWVkW119ID0+IHtcclxuXHRcdGxldCB0eXBlOiBHTGVudW1cclxuXHJcblx0XHRzd2l0Y2godGFyZ2V0KSB7XHJcblx0XHRcdGNhc2UgXCJ2ZXJ0XCI6XHJcblx0XHRcdFx0dHlwZSA9IFdlYkdMUmVuZGVyaW5nQ29udGV4dC5WRVJURVhfU0hBREVSXHJcblx0XHRcdFx0c291cmNlID0gYCNkZWZpbmUgVkVSVFxcbiR7c291cmNlfWBcclxuXHRcdFx0XHRicmVha1xyXG5cdFx0XHRjYXNlIFwiZnJhZ1wiOlxyXG5cdFx0XHRcdHR5cGUgPSBXZWJHTFJlbmRlcmluZ0NvbnRleHQuRlJBR01FTlRfU0hBREVSXHJcblx0XHRcdFx0c291cmNlID0gYCNkZWZpbmUgRlJBR1xcbiR7c291cmNlfWBcclxuXHRcdFx0XHRicmVha1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHNoYWRlcjogU2hhZGVyLmxvYWRUeXBlKGNvbnRleHQsIHR5cGUsIHNvdXJjZSksXHJcblx0XHRcdHF1YWxpZmllZDogU2hhZGVyLmV4dHJhY3RRdWFsaWZpZXJzKHNvdXJjZSlcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHByaXZhdGUgc3RhdGljIGxvYWRUeXBlID0gKGNvbnRleHQ6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCwgdHlwZTogR0xlbnVtLCBzb3VyY2U6IHN0cmluZyk6IFdlYkdMU2hhZGVyID0+IHtcclxuXHRcdGNvbnN0IHNoYWRlciA9IGNvbnRleHQuY3JlYXRlU2hhZGVyKHR5cGUpXHJcblx0XHRjb250ZXh0LnNoYWRlclNvdXJjZShzaGFkZXIsIHNvdXJjZSlcclxuXHRcdGNvbnRleHQuY29tcGlsZVNoYWRlcihzaGFkZXIpXHJcblx0XHRcclxuXHRcdGlmKCFjb250ZXh0LmdldFNoYWRlclBhcmFtZXRlcihzaGFkZXIsIFdlYkdMUmVuZGVyaW5nQ29udGV4dC5DT01QSUxFX1NUQVRVUykpIHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcihjb250ZXh0LmdldFNoYWRlckluZm9Mb2coc2hhZGVyKSlcclxuXHRcdFx0Y29udGV4dC5kZWxldGVTaGFkZXIoc2hhZGVyKVxyXG5cclxuXHRcdFx0cmV0dXJuIG51bGxcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gc2hhZGVyXHJcblx0fVxyXG5cclxuXHRwcml2YXRlIHN0YXRpYyBleHRyYWN0UXVhbGlmaWVycyA9IChzb3VyY2U6IHN0cmluZyk6IFF1YWxpZmllZFtdID0+IHNvdXJjZVxyXG5cdFx0Py5tYXRjaCgvKGF0dHJpYnV0ZXx1bmlmb3JtKVxccytbYS16QS1aMC05XStcXHMrW2EtekEtWjAtOVxcW1xcXV0rXFxzKjsvZylcclxuXHRcdD8ubWFwKGEgPT4ge1xyXG5cdFx0XHRsZXQgW3F1YWxpZmllciwgdHlwZSwgbmFtZV0gPSBhLnJlcGxhY2UoLzsvZywgXCJcIikudHJpbSgpLnNwbGl0KC9cXHMrL2cpXHJcblxyXG5cdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdHF1YWxpZmllcjogcXVhbGlmaWVyIGFzIFF1YWxpZmllcixcclxuXHRcdFx0XHR0eXBlOiB0eXBlLFxyXG5cdFx0XHRcdG5hbWU6IG5hbWVcclxuXHRcdFx0fVxyXG5cdFx0fSkgPz8gW11cclxufSJdfQ==