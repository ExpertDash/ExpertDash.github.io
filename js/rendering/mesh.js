var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { RenderSystem } from "../common/lib.js";
import World from "../common/world.js";
import Geometry from "../math/geometry.js";
import { vec3 } from "../math/vec3.js";
import BoundingBox from "../physics/boundingBox.js";
const GL = WebGLRenderingContext;
export class Mesh {
    constructor(vertices, triangles, uvs) {
        this.vertices = vertices;
        this.triangles = triangles;
        this.uvs = uvs;
        this.boundingBox = new BoundingBox(vertices);
        this.hull = Mesh.createHull(vertices);
    }
    createVertexBuffer() {
        let gl = World.systems.get(RenderSystem).context;
        let vertexBuffer = gl.createBuffer();
        gl.bindBuffer(GL.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(GL.ARRAY_BUFFER, new Float32Array(this.vertices.map(v => [v.x, v.y]).flat()), GL.STATIC_DRAW);
        return vertexBuffer;
    }
    /**
     * Generates a convex hull from a set of vertices using "Jarvis March"
     * @returns The convex hull of the specified vertices
     */
    static createHull(vertices) {
        let hull = [];
        if (vertices.length < 3)
            throw new Error(`Hull generation requires 3 vertices, only ${vertices.length} given`);
        let l = 0;
        for (let i = 1; i < vertices.length; i++)
            if (vertices[i].x < vertices[l].x)
                l = i;
        let p = l;
        let q;
        do {
            hull.push(vertices[l]);
            q = (p + 1) % vertices.length;
            for (let i = 0; i < vertices.length; i++)
                if (Geometry.direction(vertices[p], vertices[i], vertices[q]) < 0)
                    q = i;
            p = q;
        } while (p != l);
        return hull;
    }
}
__decorate([
    restrict((vertices) => vertices.length >= 3),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Array)
], Mesh, "createHull", null);
function restrict(...parameters) {
    return function (target, propertyKey, descriptor) {
    };
}
(function (Mesh) {
    class Primitives {
    }
    Primitives.quad = Object.freeze(new Mesh([
        vec3(-1, 1),
        vec3(1, 1),
        vec3(-1, -1),
        vec3(1, -1)
    ]));
    Mesh.Primitives = Primitives;
})(Mesh || (Mesh = {}));
export default Mesh;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZW5kZXJpbmcvbWVzaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sa0JBQWtCLENBQUE7QUFDN0MsT0FBTyxLQUFLLE1BQU0sb0JBQW9CLENBQUE7QUFDdEMsT0FBTyxRQUFRLE1BQU0scUJBQXFCLENBQUE7QUFDMUMsT0FBZ0IsRUFBQyxJQUFJLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQTtBQUM3QyxPQUFPLFdBQVcsTUFBTSwyQkFBMkIsQ0FBQTtBQUVuRCxNQUFNLEVBQUUsR0FBRyxxQkFBcUIsQ0FBQTtBQUVoQyxNQUFNLE9BQU8sSUFBSTtJQVdoQixZQUFtQixRQUFtQixFQUFFLFNBQW9CLEVBQUUsR0FBYztRQUMzRSxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQTtRQUN4QixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQTtRQUMxQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQTtRQUNkLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDNUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQ3RDLENBQUM7SUFFTSxrQkFBa0I7UUFDeEIsSUFBSSxFQUFFLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsT0FBTyxDQUFBO1FBRWhELElBQUksWUFBWSxHQUFHLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQTtRQUNwQyxFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsWUFBWSxDQUFDLENBQUE7UUFDNUMsRUFBRSxDQUFDLFVBQVUsQ0FDWixFQUFFLENBQUMsWUFBWSxFQUNmLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQzNELEVBQUUsQ0FBQyxXQUFXLENBQ2QsQ0FBQTtRQUVELE9BQU8sWUFBWSxDQUFBO0lBQ3BCLENBQUM7SUFFRDs7O09BR0c7SUFFSSxNQUFNLENBQUMsVUFBVSxDQUFDLFFBQW1CO1FBQzNDLElBQUksSUFBSSxHQUFjLEVBQUUsQ0FBQTtRQUV4QixJQUFHLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQztZQUNyQixNQUFNLElBQUksS0FBSyxDQUFDLDZDQUE2QyxRQUFRLENBQUMsTUFBTSxRQUFRLENBQUMsQ0FBQTtRQUV0RixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7UUFFVCxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUU7WUFDdEMsSUFBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMvQixDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBRVAsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ1QsSUFBSSxDQUFTLENBQUE7UUFFYixHQUFHO1lBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUV0QixDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQTtZQUU3QixLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUU7Z0JBQ3RDLElBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7b0JBQy9ELENBQUMsR0FBRyxDQUFDLENBQUE7WUFFUCxDQUFDLEdBQUcsQ0FBQyxDQUFBO1NBQ0wsUUFBTyxDQUFDLElBQUksQ0FBQyxFQUFDO1FBRWYsT0FBTyxJQUFJLENBQUE7SUFDWixDQUFDO0NBQ0Q7QUE3QkE7SUFEQyxRQUFRLENBQUMsQ0FBQyxRQUFtQixFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQzs7Ozs0QkE2QnZEO0FBR0YsU0FBUyxRQUFRLENBQUMsR0FBRyxVQUEwQztJQUM5RCxPQUFPLFVBQVMsTUFBVyxFQUFFLFdBQW1CLEVBQUUsVUFBOEI7SUFFaEYsQ0FBQyxDQUFBO0FBQ0YsQ0FBQztBQUVELFdBQWlCLElBQUk7SUFDcEIsTUFBYSxVQUFVOztJQUNSLGVBQUksR0FBbUIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQztRQUMzRCxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ1gsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDVixJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDWixJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQ1gsQ0FBQyxDQUFDLENBQUE7SUFOUyxlQUFVLGFBT3RCLENBQUE7QUFDRixDQUFDLEVBVGdCLElBQUksS0FBSixJQUFJLFFBU3BCO0FBRUQsZUFBZSxJQUFJLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1JlbmRlclN5c3RlbX0gZnJvbSBcIi4uL2NvbW1vbi9saWIuanNcIlxyXG5pbXBvcnQgV29ybGQgZnJvbSBcIi4uL2NvbW1vbi93b3JsZC5qc1wiXHJcbmltcG9ydCBHZW9tZXRyeSBmcm9tIFwiLi4vbWF0aC9nZW9tZXRyeS5qc1wiXHJcbmltcG9ydCBWZWN0b3IzLCB7dmVjM30gZnJvbSBcIi4uL21hdGgvdmVjMy5qc1wiXHJcbmltcG9ydCBCb3VuZGluZ0JveCBmcm9tIFwiLi4vcGh5c2ljcy9ib3VuZGluZ0JveC5qc1wiXHJcblxyXG5jb25zdCBHTCA9IFdlYkdMUmVuZGVyaW5nQ29udGV4dFxyXG5cclxuZXhwb3J0IGNsYXNzIE1lc2gge1xyXG5cdHB1YmxpYyByZWFkb25seSB2ZXJ0aWNlczogVmVjdG9yM1tdXHJcblx0cHVibGljIHJlYWRvbmx5IHRyaWFuZ2xlczogbnVtYmVyW11cclxuXHRwdWJsaWMgcmVhZG9ubHkgdXZzOiBudW1iZXJbXVxyXG5cclxuXHQvKiogTG9jYWwgYm91bmRpbmcgYm94ICovXHJcblx0cHVibGljIHJlYWRvbmx5IGJvdW5kaW5nQm94OiBCb3VuZGluZ0JveFxyXG5cclxuXHQvKiogTG9jYWwgY29udmV4IGh1bGwgY29udGFpbmluZyBwb2ludHMgaW4gYSBjb3VudGVyLWNsb2Nrd2lzZSBmYXNoaW9uIGFyb3VuZCB0aGUgbWVzaCAqL1xyXG5cdHB1YmxpYyByZWFkb25seSBodWxsOiBWZWN0b3IzW11cclxuXHJcblx0cHVibGljIGNvbnN0cnVjdG9yKHZlcnRpY2VzOiBWZWN0b3IzW10sIHRyaWFuZ2xlcz86IG51bWJlcltdLCB1dnM/OiBudW1iZXJbXSkge1xyXG5cdFx0dGhpcy52ZXJ0aWNlcyA9IHZlcnRpY2VzXHJcblx0XHR0aGlzLnRyaWFuZ2xlcyA9IHRyaWFuZ2xlc1xyXG5cdFx0dGhpcy51dnMgPSB1dnNcclxuXHRcdHRoaXMuYm91bmRpbmdCb3ggPSBuZXcgQm91bmRpbmdCb3godmVydGljZXMpXHJcblx0XHR0aGlzLmh1bGwgPSBNZXNoLmNyZWF0ZUh1bGwodmVydGljZXMpXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgY3JlYXRlVmVydGV4QnVmZmVyKCk6IFdlYkdMQnVmZmVyIHtcclxuXHRcdGxldCBnbCA9IFdvcmxkLnN5c3RlbXMuZ2V0KFJlbmRlclN5c3RlbSkuY29udGV4dFxyXG5cclxuXHRcdGxldCB2ZXJ0ZXhCdWZmZXIgPSBnbC5jcmVhdGVCdWZmZXIoKVxyXG5cdFx0Z2wuYmluZEJ1ZmZlcihHTC5BUlJBWV9CVUZGRVIsIHZlcnRleEJ1ZmZlcilcclxuXHRcdGdsLmJ1ZmZlckRhdGEoXHJcblx0XHRcdEdMLkFSUkFZX0JVRkZFUixcclxuXHRcdFx0bmV3IEZsb2F0MzJBcnJheSh0aGlzLnZlcnRpY2VzLm1hcCh2ID0+IFt2LngsIHYueV0pLmZsYXQoKSksXHJcblx0XHRcdEdMLlNUQVRJQ19EUkFXXHJcblx0XHQpXHJcblxyXG5cdFx0cmV0dXJuIHZlcnRleEJ1ZmZlclxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogR2VuZXJhdGVzIGEgY29udmV4IGh1bGwgZnJvbSBhIHNldCBvZiB2ZXJ0aWNlcyB1c2luZyBcIkphcnZpcyBNYXJjaFwiXHJcblx0ICogQHJldHVybnMgVGhlIGNvbnZleCBodWxsIG9mIHRoZSBzcGVjaWZpZWQgdmVydGljZXNcclxuXHQgKi9cclxuXHRAcmVzdHJpY3QoKHZlcnRpY2VzOiBWZWN0b3IzW10pID0+IHZlcnRpY2VzLmxlbmd0aCA+PSAzKVxyXG5cdHB1YmxpYyBzdGF0aWMgY3JlYXRlSHVsbCh2ZXJ0aWNlczogVmVjdG9yM1tdKTogVmVjdG9yM1tdIHtcclxuXHRcdGxldCBodWxsOiBWZWN0b3IzW10gPSBbXVxyXG5cclxuXHRcdGlmKHZlcnRpY2VzLmxlbmd0aCA8IDMpXHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihgSHVsbCBnZW5lcmF0aW9uIHJlcXVpcmVzIDMgdmVydGljZXMsIG9ubHkgJHt2ZXJ0aWNlcy5sZW5ndGh9IGdpdmVuYClcclxuXHJcblx0XHRsZXQgbCA9IDBcclxuXHJcblx0XHRmb3IobGV0IGkgPSAxOyBpIDwgdmVydGljZXMubGVuZ3RoOyBpKyspXHJcblx0XHRcdGlmKHZlcnRpY2VzW2ldLnggPCB2ZXJ0aWNlc1tsXS54KVxyXG5cdFx0XHRcdGwgPSBpXHJcblxyXG5cdFx0bGV0IHAgPSBsXHJcblx0XHRsZXQgcTogbnVtYmVyXHJcblxyXG5cdFx0ZG8ge1xyXG5cdFx0XHRodWxsLnB1c2godmVydGljZXNbbF0pXHJcblxyXG5cdFx0XHRxID0gKHAgKyAxKSAlIHZlcnRpY2VzLmxlbmd0aFxyXG5cclxuXHRcdFx0Zm9yKGxldCBpID0gMDsgaSA8IHZlcnRpY2VzLmxlbmd0aDsgaSsrKVxyXG5cdFx0XHRcdGlmKEdlb21ldHJ5LmRpcmVjdGlvbih2ZXJ0aWNlc1twXSwgdmVydGljZXNbaV0sIHZlcnRpY2VzW3FdKSA8IDApXHJcblx0XHRcdFx0XHRxID0gaVxyXG5cclxuXHRcdFx0cCA9IHFcclxuXHRcdH0gd2hpbGUocCAhPSBsKVxyXG5cclxuXHRcdHJldHVybiBodWxsXHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiByZXN0cmljdCguLi5wYXJhbWV0ZXJzOiAoKGluc3RhbmNlOiBhbnkpID0+IGJvb2xlYW4pW10pIHtcclxuXHRyZXR1cm4gZnVuY3Rpb24odGFyZ2V0OiBhbnksIHByb3BlcnR5S2V5OiBzdHJpbmcsIGRlc2NyaXB0b3I6IFByb3BlcnR5RGVzY3JpcHRvcikge1xyXG5cdFx0XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgbmFtZXNwYWNlIE1lc2gge1xyXG5cdGV4cG9ydCBjbGFzcyBQcmltaXRpdmVzIHtcclxuXHRcdHB1YmxpYyBzdGF0aWMgcXVhZDogUmVhZG9ubHk8TWVzaD4gPSBPYmplY3QuZnJlZXplKG5ldyBNZXNoKFtcclxuXHRcdFx0dmVjMygtMSwgMSksXHJcblx0XHRcdHZlYzMoMSwgMSksXHJcblx0XHRcdHZlYzMoLTEsIC0xKSxcclxuXHRcdFx0dmVjMygxLCAtMSlcclxuXHRcdF0pKVxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTWVzaCJdfQ==