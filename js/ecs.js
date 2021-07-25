"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.System = exports.Systems = exports.Component = exports.Entity = exports.Entities = exports.ECS = void 0;
const component_js_1 = __importDefault(require("./ecs/component.js"));
exports.Component = component_js_1.default;
const entities_js_1 = __importDefault(require("./ecs/entities.js"));
exports.Entities = entities_js_1.default;
const entity_js_1 = __importDefault(require("./ecs/entity.js"));
exports.Entity = entity_js_1.default;
const system_js_1 = __importDefault(require("./ecs/system.js"));
exports.System = system_js_1.default;
const systems_js_1 = __importDefault(require("./ecs/systems.js"));
exports.Systems = systems_js_1.default;
/**
 * Defines a world containing a set of entities operating under a set of systems
 */
class ECS {
    constructor() {
        /** Collection of objects with bound components  */
        this.entities = new entities_js_1.default();
        /** Collection of systems governing entity behavior */
        this.systems = new systems_js_1.default();
        /** Enables components and systems to be registered under this world instance */
        this.register = new ECS.Register(this);
    }
    /**
     * Perform one iteration of updates on all systems in the appropriate order
     */
    step() {
        for (let system of this.systems)
            system.update(this.entities);
    }
}
exports.ECS = ECS;
(function (ECS) {
    class Register {
        constructor(ecs) {
            this.ecs = ecs;
        }
        /**
         * Registers a component type that may be associated with entities
         * @template T Component type
         */
        component() {
            return (ctor) => {
                this.ecs.entities["registry"].set(ctor, new Map());
                return ctor;
            };
        }
        system(...par1) {
            return (ctor) => {
                let order;
                let args;
                if (par1.length == 0)
                    args = [];
                else {
                    let first = par1[0];
                    if (first.constructor == Object) {
                        order = first;
                        args = par1.slice(1);
                    }
                    else
                        args = par1;
                }
                this.ecs.systems.add(new ctor(...args), order);
                return ctor;
            };
        }
    }
    ECS.Register = Register;
})(ECS = exports.ECS || (exports.ECS = {}));
exports.default = ECS;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2Vjcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxzRUFBMEM7QUF3RmhCLG9CQXhGbkIsc0JBQVMsQ0F3Rm1CO0FBdkZuQyxvRUFBd0M7QUF1RmhDLG1CQXZGRCxxQkFBUSxDQXVGQztBQXRGaEIsZ0VBQW9DO0FBc0ZsQixpQkF0RlgsbUJBQU0sQ0FzRlc7QUFyRnhCLGdFQUFvQztBQXFGVSxpQkFyRnZDLG1CQUFNLENBcUZ1QztBQXBGcEQsa0VBQXNDO0FBb0ZELGtCQXBGOUIsb0JBQU8sQ0FvRjhCO0FBL0U1Qzs7R0FFRztBQUNILE1BQWEsR0FBRztJQUFoQjtRQUNDLG1EQUFtRDtRQUNuQyxhQUFRLEdBQWEsSUFBSSxxQkFBUSxFQUFFLENBQUE7UUFFbkQsc0RBQXNEO1FBQ3RDLFlBQU8sR0FBWSxJQUFJLG9CQUFPLEVBQUUsQ0FBQTtRQUVoRCxnRkFBZ0Y7UUFDaEUsYUFBUSxHQUFpQixJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUE7SUFTaEUsQ0FBQztJQVBBOztPQUVHO0lBQ0ksSUFBSTtRQUNWLEtBQUksSUFBSSxNQUFNLElBQUksSUFBSSxDQUFDLE9BQU87WUFDN0IsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDOUIsQ0FBQztDQUNEO0FBakJELGtCQWlCQztBQUVELFdBQWlCLEdBQUc7SUFDbkIsTUFBYSxRQUFRO1FBR3BCLFlBQW1CLEdBQVE7WUFDMUIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUE7UUFDZixDQUFDO1FBRUQ7OztXQUdHO1FBQ0ksU0FBUztZQUNmLE9BQU8sQ0FBMkIsSUFBTyxFQUFFLEVBQUU7Z0JBQzVDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxHQUFHLEVBQUUsQ0FBQyxDQUFBO2dCQUNsRCxPQUFPLElBQUksQ0FBQTtZQUNaLENBQUMsQ0FBQTtRQUNGLENBQUM7UUFjTSxNQUFNLENBQWdDLEdBQUcsSUFBNEU7WUFDM0gsT0FBTyxDQUFDLElBQTRCLEVBQUUsRUFBRTtnQkFDdkMsSUFBSSxLQUFtQixDQUFBO2dCQUN2QixJQUFJLElBQThCLENBQUE7Z0JBRWxDLElBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDO29CQUNsQixJQUFJLEdBQUcsRUFBUyxDQUFBO3FCQUNaO29CQUNKLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtvQkFFbkIsSUFBRyxLQUFLLENBQUMsV0FBVyxJQUFJLE1BQU0sRUFBRTt3QkFDL0IsS0FBSyxHQUFHLEtBQXFCLENBQUE7d0JBQzdCLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBNkIsQ0FBQTtxQkFDaEQ7O3dCQUNBLElBQUksR0FBRyxJQUFnQyxDQUFBO2lCQUN4QztnQkFFRCxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQTtnQkFFOUMsT0FBTyxJQUFJLENBQUE7WUFDWixDQUFDLENBQUE7UUFDRixDQUFDO0tBQ0Q7SUFwRFksWUFBUSxXQW9EcEIsQ0FBQTtBQUNGLENBQUMsRUF0RGdCLEdBQUcsR0FBSCxXQUFHLEtBQUgsV0FBRyxRQXNEbkI7QUFFRCxrQkFBZSxHQUFHLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tcG9uZW50IGZyb20gXCIuL2Vjcy9jb21wb25lbnQuanNcIlxyXG5pbXBvcnQgRW50aXRpZXMgZnJvbSBcIi4vZWNzL2VudGl0aWVzLmpzXCJcclxuaW1wb3J0IEVudGl0eSBmcm9tIFwiLi9lY3MvZW50aXR5LmpzXCJcclxuaW1wb3J0IFN5c3RlbSBmcm9tIFwiLi9lY3Mvc3lzdGVtLmpzXCJcclxuaW1wb3J0IFN5c3RlbXMgZnJvbSBcIi4vZWNzL3N5c3RlbXMuanNcIlxyXG5cclxudHlwZSBDb25zdHJ1Y3RvcjxUPiA9IG5ldyguLi5hcmdzOiBhbnlbXSkgPT4gVFxyXG50eXBlIENvbnN0cnVjdG9ySW5zdGFuY2U8VCBleHRlbmRzIENvbnN0cnVjdG9yPGFueT4+ID0gbmV3KC4uLmFyZ3M6IENvbnN0cnVjdG9yUGFyYW1ldGVyczxUPikgPT4gSW5zdGFuY2VUeXBlPFQ+XHJcblxyXG4vKipcclxuICogRGVmaW5lcyBhIHdvcmxkIGNvbnRhaW5pbmcgYSBzZXQgb2YgZW50aXRpZXMgb3BlcmF0aW5nIHVuZGVyIGEgc2V0IG9mIHN5c3RlbXNcclxuICovXHJcbmV4cG9ydCBjbGFzcyBFQ1Mge1xyXG5cdC8qKiBDb2xsZWN0aW9uIG9mIG9iamVjdHMgd2l0aCBib3VuZCBjb21wb25lbnRzICAqL1xyXG5cdHB1YmxpYyByZWFkb25seSBlbnRpdGllczogRW50aXRpZXMgPSBuZXcgRW50aXRpZXMoKVxyXG5cclxuXHQvKiogQ29sbGVjdGlvbiBvZiBzeXN0ZW1zIGdvdmVybmluZyBlbnRpdHkgYmVoYXZpb3IgKi9cclxuXHRwdWJsaWMgcmVhZG9ubHkgc3lzdGVtczogU3lzdGVtcyA9IG5ldyBTeXN0ZW1zKClcclxuXHJcblx0LyoqIEVuYWJsZXMgY29tcG9uZW50cyBhbmQgc3lzdGVtcyB0byBiZSByZWdpc3RlcmVkIHVuZGVyIHRoaXMgd29ybGQgaW5zdGFuY2UgKi9cclxuXHRwdWJsaWMgcmVhZG9ubHkgcmVnaXN0ZXI6IEVDUy5SZWdpc3RlciA9IG5ldyBFQ1MuUmVnaXN0ZXIodGhpcylcclxuXHJcblx0LyoqXHJcblx0ICogUGVyZm9ybSBvbmUgaXRlcmF0aW9uIG9mIHVwZGF0ZXMgb24gYWxsIHN5c3RlbXMgaW4gdGhlIGFwcHJvcHJpYXRlIG9yZGVyXHJcblx0ICovXHJcblx0cHVibGljIHN0ZXAoKTogdm9pZCB7XHJcblx0XHRmb3IobGV0IHN5c3RlbSBvZiB0aGlzLnN5c3RlbXMpXHJcblx0XHRcdHN5c3RlbS51cGRhdGUodGhpcy5lbnRpdGllcylcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBuYW1lc3BhY2UgRUNTIHtcclxuXHRleHBvcnQgY2xhc3MgUmVnaXN0ZXIge1xyXG5cdFx0cHJpdmF0ZSByZWFkb25seSBlY3M6IEVDU1xyXG5cclxuXHRcdHB1YmxpYyBjb25zdHJ1Y3RvcihlY3M6IEVDUykge1xyXG5cdFx0XHR0aGlzLmVjcyA9IGVjc1xyXG5cdFx0fVxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogUmVnaXN0ZXJzIGEgY29tcG9uZW50IHR5cGUgdGhhdCBtYXkgYmUgYXNzb2NpYXRlZCB3aXRoIGVudGl0aWVzXHJcblx0XHQgKiBAdGVtcGxhdGUgVCBDb21wb25lbnQgdHlwZVxyXG5cdFx0ICovXHJcblx0XHRwdWJsaWMgY29tcG9uZW50PFQgZXh0ZW5kcyBDb21wb25lbnQ+KCkge1xyXG5cdFx0XHRyZXR1cm4gPFUgZXh0ZW5kcyBDb25zdHJ1Y3RvcjxUPj4oY3RvcjogVSkgPT4ge1xyXG5cdFx0XHRcdHRoaXMuZWNzLmVudGl0aWVzW1wicmVnaXN0cnlcIl0uc2V0KGN0b3IsIG5ldyBNYXAoKSlcdFxyXG5cdFx0XHRcdHJldHVybiBjdG9yXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFxyXG5cdFx0ICogQHBhcmFtIHBhcmFtMCBEZWZpbmVzIG9yZGVyIG9mIHRoZSBzeXN0ZW0gcmVsYXRpdmUgdG8gb3RoZXJzXHJcblx0XHQgKiBAcGFyYW0gYXJncyBQYXJhbWV0ZXJzIHRvIGNvbnN0cnVjdCB0aGUgc3lzdGVtIGluc3RhbmNlIHdpdGhcclxuXHRcdCAqL1xyXG5cdFx0cHVibGljIHN5c3RlbTxUIGV4dGVuZHMgQ29uc3RydWN0b3I8U3lzdGVtPj4oe2JlZm9yZSwgYWZ0ZXJ9OiBTeXN0ZW0uT3JkZXIsIC4uLmFyZ3M6IENvbnN0cnVjdG9yUGFyYW1ldGVyczxUPik6IChjdG9yOiBDb25zdHJ1Y3Rvckluc3RhbmNlPFQ+KSA9PiBUXHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBAcGFyYW0gYXJncyBQYXJhbWV0ZXJzIHRvIGNvbnN0cnVjdCB0aGUgc3lzdGVtIGluc3RhbmNlIHdpdGhcclxuXHRcdCAqL1xyXG5cdFx0cHVibGljIHN5c3RlbTxUIGV4dGVuZHMgQ29uc3RydWN0b3I8U3lzdGVtPj4oLi4uYXJnczogQ29uc3RydWN0b3JQYXJhbWV0ZXJzPFQ+KTogKGN0b3I6IENvbnN0cnVjdG9ySW5zdGFuY2U8VD4pID0+IFRcclxuXHJcblx0XHRwdWJsaWMgc3lzdGVtPFQgZXh0ZW5kcyBDb25zdHJ1Y3RvcjxTeXN0ZW0+PiguLi5wYXIxOiBbU3lzdGVtLk9yZGVyLCAuLi5Db25zdHJ1Y3RvclBhcmFtZXRlcnM8VD5dIHwgQ29uc3RydWN0b3JQYXJhbWV0ZXJzPFQ+KSB7XHJcblx0XHRcdHJldHVybiAoY3RvcjogQ29uc3RydWN0b3JJbnN0YW5jZTxUPikgPT4ge1xyXG5cdFx0XHRcdGxldCBvcmRlcjogU3lzdGVtLk9yZGVyXHJcblx0XHRcdFx0bGV0IGFyZ3M6IENvbnN0cnVjdG9yUGFyYW1ldGVyczxUPlxyXG5cdFxyXG5cdFx0XHRcdGlmKHBhcjEubGVuZ3RoID09IDApXHJcblx0XHRcdFx0XHRhcmdzID0gW10gYXMgYW55XHJcblx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHRsZXQgZmlyc3QgPSBwYXIxWzBdXHJcblx0XHJcblx0XHRcdFx0XHRpZihmaXJzdC5jb25zdHJ1Y3RvciA9PSBPYmplY3QpIHtcclxuXHRcdFx0XHRcdFx0b3JkZXIgPSBmaXJzdCBhcyBTeXN0ZW0uT3JkZXJcclxuXHRcdFx0XHRcdFx0YXJncyA9IHBhcjEuc2xpY2UoMSkgYXMgQ29uc3RydWN0b3JQYXJhbWV0ZXJzPFQ+XHJcblx0XHRcdFx0XHR9IGVsc2VcclxuXHRcdFx0XHRcdFx0YXJncyA9IHBhcjEgYXMgQ29uc3RydWN0b3JQYXJhbWV0ZXJzPFQ+XHJcblx0XHRcdFx0fVxyXG5cdFxyXG5cdFx0XHRcdHRoaXMuZWNzLnN5c3RlbXMuYWRkKG5ldyBjdG9yKC4uLmFyZ3MpLCBvcmRlcilcclxuXHRcclxuXHRcdFx0XHRyZXR1cm4gY3RvclxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFQ1NcclxuZXhwb3J0IHtFbnRpdGllcywgRW50aXR5LCBDb21wb25lbnQsIFN5c3RlbXMsIFN5c3RlbX0iXX0=