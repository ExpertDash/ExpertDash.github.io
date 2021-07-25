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
var _Shader_attributes, _Shader_uniforms;
import RenderSystem from "../common/systems/renderSystem.js";
import World from "../common/world.js";
import Retriever from "../utils/retriever.js";
export default class Shader {
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
     * @param path Path to GLSL shader
     * @returns Shader loaded from the path
     */
    static async load(path) {
        const context = World.systems.get(RenderSystem).context;
        const program = context.createProgram();
        let source = await Retriever.fetch(path);
        let { shader: vert, qualified: vQualified } = Shader.create(context, "vert", source);
        let { shader: frag, qualified: fQualified } = Shader.create(context, "frag", source);
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
_Shader_attributes = new WeakMap(), _Shader_uniforms = new WeakMap();
Shader.create = (context, target, source) => {
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
        shader: Shader.createType(context, type, source),
        qualified: Shader.extractQualifiers(source)
    };
};
Shader.createType = (context, type, source) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3JlbmRlcmluZy9zaGFkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxZQUFZLE1BQU0sbUNBQW1DLENBQUE7QUFDNUQsT0FBTyxLQUFLLE1BQU0sb0JBQW9CLENBQUE7QUFDdEMsT0FBTyxTQUFTLE1BQU0sdUJBQXVCLENBQUE7QUFTN0MsTUFBTSxDQUFDLE9BQU8sT0FBTyxNQUFNO0lBSzFCLFlBQW9CLE9BQXFCO1FBSHpDLHFDQUF1QztRQUN2QyxtQ0FBbUM7UUFHbEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUE7SUFDdkIsQ0FBQztJQUVELElBQVcsVUFBVTtRQUNwQixPQUFPLHVCQUFBLElBQUksMEJBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQTtJQUMvQixDQUFDO0lBRUQsSUFBVyxRQUFRO1FBQ2xCLE9BQU8sdUJBQUEsSUFBSSx3QkFBVSxDQUFDLElBQUksRUFBRSxDQUFBO0lBQzdCLENBQUM7SUFFTSxZQUFZLENBQUMsSUFBWTtRQUMvQixPQUFPLHVCQUFBLElBQUksMEJBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDbEMsQ0FBQztJQUVNLFVBQVUsQ0FBQyxJQUFZO1FBQzdCLE9BQU8sdUJBQUEsSUFBSSx3QkFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNoQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBWTtRQUNwQyxNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUE7UUFDdkQsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFBO1FBRXZDLElBQUksTUFBTSxHQUFHLE1BQU0sU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENB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QyxDQUFDLElBQUksRUFBRSxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlbmRlclN5c3RlbSBmcm9tIFwiLi4vY29tbW9uL3N5c3RlbXMvcmVuZGVyU3lzdGVtLmpzXCJcclxuaW1wb3J0IFdvcmxkIGZyb20gXCIuLi9jb21tb24vd29ybGQuanNcIlxyXG5pbXBvcnQgUmV0cmlldmVyIGZyb20gXCIuLi91dGlscy9yZXRyaWV2ZXIuanNcIlxyXG5cclxudHlwZSBTaGFkZXJBcmNoZXR5cGUgPSBcInZlcnRcIiB8IFwiZnJhZ1wiXHJcbnR5cGUgUXVhbGlmaWVyID0gXCJ1bmlmb3JtXCIgfCBcImF0dHJpYnV0ZVwiXHJcblxyXG50eXBlIEF0dHJpYnV0ZUluZm8gPSB7dHlwZTogc3RyaW5nLCBsb2NhdGlvbjogbnVtYmVyfVxyXG50eXBlIFVuaWZvcm1JbmZvID0ge3R5cGU6IHN0cmluZywgbG9jYXRpb246IFdlYkdMVW5pZm9ybUxvY2F0aW9ufVxyXG50eXBlIFF1YWxpZmllZCA9IHtxdWFsaWZpZXI6IFF1YWxpZmllciwgdHlwZTogc3RyaW5nLCBuYW1lOiBzdHJpbmd9XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaGFkZXIge1xyXG5cdHB1YmxpYyByZWFkb25seSBwcm9ncmFtOiBXZWJHTFByb2dyYW1cclxuXHQjYXR0cmlidXRlczogTWFwPHN0cmluZywgQXR0cmlidXRlSW5mbz5cclxuXHQjdW5pZm9ybXM6IE1hcDxzdHJpbmcsIFVuaWZvcm1JbmZvPlxyXG5cclxuXHRwcml2YXRlIGNvbnN0cnVjdG9yKHByb2dyYW06IFdlYkdMUHJvZ3JhbSkge1xyXG5cdFx0dGhpcy5wcm9ncmFtID0gcHJvZ3JhbVxyXG5cdH1cclxuXHJcblx0cHVibGljIGdldCBhdHRyaWJ1dGVzKCk6IEl0ZXJhYmxlSXRlcmF0b3I8c3RyaW5nPiB7XHJcblx0XHRyZXR1cm4gdGhpcy4jYXR0cmlidXRlcy5rZXlzKClcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXQgdW5pZm9ybXMoKTogSXRlcmFibGVJdGVyYXRvcjxzdHJpbmc+IHtcclxuXHRcdHJldHVybiB0aGlzLiN1bmlmb3Jtcy5rZXlzKClcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXRBdHRyaWJ1dGUobmFtZTogc3RyaW5nKTogQXR0cmlidXRlSW5mbyB7XHJcblx0XHRyZXR1cm4gdGhpcy4jYXR0cmlidXRlcy5nZXQobmFtZSlcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXRVbmlmb3JtKG5hbWU6IHN0cmluZyk6IFVuaWZvcm1JbmZvIHtcclxuXHRcdHJldHVybiB0aGlzLiN1bmlmb3Jtcy5nZXQobmFtZSlcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBwYXJhbSBwYXRoIFBhdGggdG8gR0xTTCBzaGFkZXJcclxuXHQgKiBAcmV0dXJucyBTaGFkZXIgbG9hZGVkIGZyb20gdGhlIHBhdGhcclxuXHQgKi9cclxuXHRwdWJsaWMgc3RhdGljIGFzeW5jIGxvYWQocGF0aDogc3RyaW5nKTogUHJvbWlzZTxTaGFkZXI+IHtcclxuXHRcdGNvbnN0IGNvbnRleHQgPSBXb3JsZC5zeXN0ZW1zLmdldChSZW5kZXJTeXN0ZW0pLmNvbnRleHRcclxuXHRcdGNvbnN0IHByb2dyYW0gPSBjb250ZXh0LmNyZWF0ZVByb2dyYW0oKVxyXG5cclxuXHRcdGxldCBzb3VyY2UgPSBhd2FpdCBSZXRyaWV2ZXIuZmV0Y2gocGF0aClcclxuXHJcblx0XHRsZXQge3NoYWRlcjogdmVydCwgcXVhbGlmaWVkOiB2UXVhbGlmaWVkfSA9IFNoYWRlci5jcmVhdGUoY29udGV4dCwgXCJ2ZXJ0XCIsIHNvdXJjZSlcclxuXHRcdGxldCB7c2hhZGVyOiBmcmFnLCBxdWFsaWZpZWQ6IGZRdWFsaWZpZWR9ID0gU2hhZGVyLmNyZWF0ZShjb250ZXh0LCBcImZyYWdcIiwgc291cmNlKVxyXG5cclxuXHRcdC8qKiBAdHlwZSB7UXVhbGlmaWVkW119ICovXHJcblx0XHRsZXQgcXVhbGlmaWVkID0gW10uY29uY2F0KHZRdWFsaWZpZWQsIGZRdWFsaWZpZWQpXHJcblxyXG5cdFx0aWYoIXZlcnQpXHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihgTWlzc2luZyB2ZXJ0ZXggc2hhZGVyIGF0OiAnJHtwYXRofSdgKVxyXG5cclxuXHRcdGlmKCFmcmFnKVxyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYE1pc3NpbmcgZnJhZ21lbnQgc2hhZGVyIGF0OiAnJHtwYXRofSdgKVxyXG5cclxuXHRcdGNvbnRleHQuYXR0YWNoU2hhZGVyKHByb2dyYW0sIHZlcnQpXHJcblx0XHRjb250ZXh0LmF0dGFjaFNoYWRlcihwcm9ncmFtLCBmcmFnKVxyXG5cdFx0Y29udGV4dC5saW5rUHJvZ3JhbShwcm9ncmFtKVxyXG5cclxuXHRcdGlmKCFjb250ZXh0LmdldFByb2dyYW1QYXJhbWV0ZXIocHJvZ3JhbSwgV2ViR0xSZW5kZXJpbmdDb250ZXh0LkxJTktfU1RBVFVTKSlcclxuXHRcdFx0dGhyb3cgY29udGV4dC5nZXRQcm9ncmFtSW5mb0xvZyhwcm9ncmFtKVxyXG5cclxuXHRcdGxldCBzaGFkZXIgPSBuZXcgU2hhZGVyKHByb2dyYW0pXHJcblxyXG5cdFx0c2hhZGVyLiNhdHRyaWJ1dGVzID0gbmV3IE1hcChxdWFsaWZpZWRcclxuXHRcdFx0LmZpbHRlcihxID0+IHEucXVhbGlmaWVyID09IFwiYXR0cmlidXRlXCIpXHJcblx0XHRcdC5tYXAocSA9PiBbcS5uYW1lLCB7XHJcblx0XHRcdFx0dHlwZTogcS50eXBlLFxyXG5cdFx0XHRcdHZhbHVlOiBudWxsLFxyXG5cdFx0XHRcdGxvY2F0aW9uOiBjb250ZXh0LmdldEF0dHJpYkxvY2F0aW9uKHByb2dyYW0sIHEubmFtZSlcclxuXHRcdFx0fV0pXHJcblx0XHQpXHJcblxyXG5cdFx0c2hhZGVyLiN1bmlmb3JtcyA9IG5ldyBNYXAocXVhbGlmaWVkXHJcblx0XHRcdC5maWx0ZXIocSA9PiBxLnF1YWxpZmllciA9PSBcInVuaWZvcm1cIilcclxuXHRcdFx0Lm1hcChxID0+IFtxLm5hbWUsIHtcclxuXHRcdFx0XHR0eXBlOiBxLnR5cGUsXHJcblx0XHRcdFx0dmFsdWU6IG51bGwsXHJcblx0XHRcdFx0bG9jYXRpb246IGNvbnRleHQuZ2V0VW5pZm9ybUxvY2F0aW9uKHByb2dyYW0sIHEubmFtZSlcclxuXHRcdFx0fV0pXHJcblx0XHQpXHJcblxyXG5cdFx0cmV0dXJuIHNoYWRlclxyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBzdGF0aWMgY3JlYXRlID0gKGNvbnRleHQ6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCwgdGFyZ2V0OiBTaGFkZXJBcmNoZXR5cGUsIHNvdXJjZTogc3RyaW5nKToge3NoYWRlcjogV2ViR0xTaGFkZXIsIHF1YWxpZmllZDogUXVhbGlmaWVkW119ID0+IHtcclxuXHRcdGxldCB0eXBlOiBHTGVudW1cclxuXHJcblx0XHRzd2l0Y2godGFyZ2V0KSB7XHJcblx0XHRcdGNhc2UgXCJ2ZXJ0XCI6XHJcblx0XHRcdFx0dHlwZSA9IFdlYkdMUmVuZGVyaW5nQ29udGV4dC5WRVJURVhfU0hBREVSXHJcblx0XHRcdFx0c291cmNlID0gYCNkZWZpbmUgVkVSVFxcbiR7c291cmNlfWBcclxuXHRcdFx0XHRicmVha1xyXG5cdFx0XHRjYXNlIFwiZnJhZ1wiOlxyXG5cdFx0XHRcdHR5cGUgPSBXZWJHTFJlbmRlcmluZ0NvbnRleHQuRlJBR01FTlRfU0hBREVSXHJcblx0XHRcdFx0c291cmNlID0gYCNkZWZpbmUgRlJBR1xcbiR7c291cmNlfWBcclxuXHRcdFx0XHRicmVha1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHNoYWRlcjogU2hhZGVyLmNyZWF0ZVR5cGUoY29udGV4dCwgdHlwZSwgc291cmNlKSxcclxuXHRcdFx0cXVhbGlmaWVkOiBTaGFkZXIuZXh0cmFjdFF1YWxpZmllcnMoc291cmNlKVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBzdGF0aWMgY3JlYXRlVHlwZSA9IChjb250ZXh0OiBXZWJHTFJlbmRlcmluZ0NvbnRleHQsIHR5cGU6IEdMZW51bSwgc291cmNlOiBzdHJpbmcpOiBXZWJHTFNoYWRlciA9PiB7XHJcblx0XHRjb25zdCBzaGFkZXIgPSBjb250ZXh0LmNyZWF0ZVNoYWRlcih0eXBlKVxyXG5cdFx0Y29udGV4dC5zaGFkZXJTb3VyY2Uoc2hhZGVyLCBzb3VyY2UpXHJcblx0XHRjb250ZXh0LmNvbXBpbGVTaGFkZXIoc2hhZGVyKVxyXG5cdFx0XHJcblx0XHRpZighY29udGV4dC5nZXRTaGFkZXJQYXJhbWV0ZXIoc2hhZGVyLCBXZWJHTFJlbmRlcmluZ0NvbnRleHQuQ09NUElMRV9TVEFUVVMpKSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoY29udGV4dC5nZXRTaGFkZXJJbmZvTG9nKHNoYWRlcikpXHJcblx0XHRcdGNvbnRleHQuZGVsZXRlU2hhZGVyKHNoYWRlcilcclxuXHJcblx0XHRcdHJldHVybiBudWxsXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHNoYWRlclxyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBzdGF0aWMgZXh0cmFjdFF1YWxpZmllcnMgPSAoc291cmNlOiBzdHJpbmcpOiBRdWFsaWZpZWRbXSA9PiBzb3VyY2VcclxuXHRcdD8ubWF0Y2goLyhhdHRyaWJ1dGV8dW5pZm9ybSlcXHMrW2EtekEtWjAtOV0rXFxzK1thLXpBLVowLTlcXFtcXF1dK1xccyo7L2cpXHJcblx0XHQ/Lm1hcChhID0+IHtcclxuXHRcdFx0bGV0IFtxdWFsaWZpZXIsIHR5cGUsIG5hbWVdID0gYS5yZXBsYWNlKC87L2csIFwiXCIpLnRyaW0oKS5zcGxpdCgvXFxzKy9nKVxyXG5cclxuXHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRxdWFsaWZpZXI6IHF1YWxpZmllciBhcyBRdWFsaWZpZXIsXHJcblx0XHRcdFx0dHlwZTogdHlwZSxcclxuXHRcdFx0XHRuYW1lOiBuYW1lXHJcblx0XHRcdH1cclxuXHRcdH0pID8/IFtdXHJcbn0iXX0=