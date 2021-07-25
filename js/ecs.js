import Component from "./ecs/component.js";
import Entities from "./ecs/entities.js";
import Entity from "./ecs/entity.js";
import System from "./ecs/system.js";
import Systems from "./ecs/systems.js";
/**
 * Defines a world containing a set of entities operating under a set of systems
 */
export class ECS {
    constructor() {
        /** Collection of objects with bound components  */
        this.entities = new Entities();
        /** Collection of systems governing entity behavior */
        this.systems = new Systems();
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
})(ECS || (ECS = {}));
export default ECS;
export { Entities, Entity, Component, Systems, System };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2Vjcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsTUFBTSxvQkFBb0IsQ0FBQTtBQUMxQyxPQUFPLFFBQVEsTUFBTSxtQkFBbUIsQ0FBQTtBQUN4QyxPQUFPLE1BQU0sTUFBTSxpQkFBaUIsQ0FBQTtBQUNwQyxPQUFPLE1BQU0sTUFBTSxpQkFBaUIsQ0FBQTtBQUNwQyxPQUFPLE9BQU8sTUFBTSxrQkFBa0IsQ0FBQTtBQUt0Qzs7R0FFRztBQUNILE1BQU0sT0FBTyxHQUFHO0lBQWhCO1FBQ0MsbURBQW1EO1FBQ25DLGFBQVEsR0FBYSxJQUFJLFFBQVEsRUFBRSxDQUFBO1FBRW5ELHNEQUFzRDtRQUN0QyxZQUFPLEdBQVksSUFBSSxPQUFPLEVBQUUsQ0FBQTtRQUVoRCxnRkFBZ0Y7UUFDaEUsYUFBUSxHQUFpQixJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUE7SUFTaEUsQ0FBQztJQVBBOztPQUVHO0lBQ0ksSUFBSTtRQUNWLEtBQUksSUFBSSxNQUFNLElBQUksSUFBSSxDQUFDLE9BQU87WUFDN0IsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDOUIsQ0FBQztDQUNEO0FBRUQsV0FBaUIsR0FBRztJQUNuQixNQUFhLFFBQVE7UUFHcEIsWUFBbUIsR0FBUTtZQUMxQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQTtRQUNmLENBQUM7UUFFRDs7O1dBR0c7UUFDSSxTQUFTO1lBQ2YsT0FBTyxDQUEyQixJQUFPLEVBQUUsRUFBRTtnQkFDNUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUE7Z0JBQ2xELE9BQU8sSUFBSSxDQUFBO1lBQ1osQ0FBQyxDQUFBO1FBQ0YsQ0FBQztRQWNNLE1BQU0sQ0FBZ0MsR0FBRyxJQUE0RTtZQUMzSCxPQUFPLENBQUMsSUFBNEIsRUFBRSxFQUFFO2dCQUN2QyxJQUFJLEtBQW1CLENBQUE7Z0JBQ3ZCLElBQUksSUFBOEIsQ0FBQTtnQkFFbEMsSUFBRyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUM7b0JBQ2xCLElBQUksR0FBRyxFQUFTLENBQUE7cUJBQ1o7b0JBQ0osSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO29CQUVuQixJQUFHLEtBQUssQ0FBQyxXQUFXLElBQUksTUFBTSxFQUFFO3dCQUMvQixLQUFLLEdBQUcsS0FBcUIsQ0FBQTt3QkFDN0IsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUE2QixDQUFBO3FCQUNoRDs7d0JBQ0EsSUFBSSxHQUFHLElBQWdDLENBQUE7aUJBQ3hDO2dCQUVELElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFBO2dCQUU5QyxPQUFPLElBQUksQ0FBQTtZQUNaLENBQUMsQ0FBQTtRQUNGLENBQUM7S0FDRDtJQXBEWSxZQUFRLFdBb0RwQixDQUFBO0FBQ0YsQ0FBQyxFQXREZ0IsR0FBRyxLQUFILEdBQUcsUUFzRG5CO0FBRUQsZUFBZSxHQUFHLENBQUE7QUFDbEIsT0FBTyxFQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb21wb25lbnQgZnJvbSBcIi4vZWNzL2NvbXBvbmVudC5qc1wiXHJcbmltcG9ydCBFbnRpdGllcyBmcm9tIFwiLi9lY3MvZW50aXRpZXMuanNcIlxyXG5pbXBvcnQgRW50aXR5IGZyb20gXCIuL2Vjcy9lbnRpdHkuanNcIlxyXG5pbXBvcnQgU3lzdGVtIGZyb20gXCIuL2Vjcy9zeXN0ZW0uanNcIlxyXG5pbXBvcnQgU3lzdGVtcyBmcm9tIFwiLi9lY3Mvc3lzdGVtcy5qc1wiXHJcblxyXG50eXBlIENvbnN0cnVjdG9yPFQ+ID0gbmV3KC4uLmFyZ3M6IGFueVtdKSA9PiBUXHJcbnR5cGUgQ29uc3RydWN0b3JJbnN0YW5jZTxUIGV4dGVuZHMgQ29uc3RydWN0b3I8YW55Pj4gPSBuZXcoLi4uYXJnczogQ29uc3RydWN0b3JQYXJhbWV0ZXJzPFQ+KSA9PiBJbnN0YW5jZVR5cGU8VD5cclxuXHJcbi8qKlxyXG4gKiBEZWZpbmVzIGEgd29ybGQgY29udGFpbmluZyBhIHNldCBvZiBlbnRpdGllcyBvcGVyYXRpbmcgdW5kZXIgYSBzZXQgb2Ygc3lzdGVtc1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEVDUyB7XHJcblx0LyoqIENvbGxlY3Rpb24gb2Ygb2JqZWN0cyB3aXRoIGJvdW5kIGNvbXBvbmVudHMgICovXHJcblx0cHVibGljIHJlYWRvbmx5IGVudGl0aWVzOiBFbnRpdGllcyA9IG5ldyBFbnRpdGllcygpXHJcblxyXG5cdC8qKiBDb2xsZWN0aW9uIG9mIHN5c3RlbXMgZ292ZXJuaW5nIGVudGl0eSBiZWhhdmlvciAqL1xyXG5cdHB1YmxpYyByZWFkb25seSBzeXN0ZW1zOiBTeXN0ZW1zID0gbmV3IFN5c3RlbXMoKVxyXG5cclxuXHQvKiogRW5hYmxlcyBjb21wb25lbnRzIGFuZCBzeXN0ZW1zIHRvIGJlIHJlZ2lzdGVyZWQgdW5kZXIgdGhpcyB3b3JsZCBpbnN0YW5jZSAqL1xyXG5cdHB1YmxpYyByZWFkb25seSByZWdpc3RlcjogRUNTLlJlZ2lzdGVyID0gbmV3IEVDUy5SZWdpc3Rlcih0aGlzKVxyXG5cclxuXHQvKipcclxuXHQgKiBQZXJmb3JtIG9uZSBpdGVyYXRpb24gb2YgdXBkYXRlcyBvbiBhbGwgc3lzdGVtcyBpbiB0aGUgYXBwcm9wcmlhdGUgb3JkZXJcclxuXHQgKi9cclxuXHRwdWJsaWMgc3RlcCgpOiB2b2lkIHtcclxuXHRcdGZvcihsZXQgc3lzdGVtIG9mIHRoaXMuc3lzdGVtcylcclxuXHRcdFx0c3lzdGVtLnVwZGF0ZSh0aGlzLmVudGl0aWVzKVxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IG5hbWVzcGFjZSBFQ1Mge1xyXG5cdGV4cG9ydCBjbGFzcyBSZWdpc3RlciB7XHJcblx0XHRwcml2YXRlIHJlYWRvbmx5IGVjczogRUNTXHJcblxyXG5cdFx0cHVibGljIGNvbnN0cnVjdG9yKGVjczogRUNTKSB7XHJcblx0XHRcdHRoaXMuZWNzID0gZWNzXHJcblx0XHR9XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBSZWdpc3RlcnMgYSBjb21wb25lbnQgdHlwZSB0aGF0IG1heSBiZSBhc3NvY2lhdGVkIHdpdGggZW50aXRpZXNcclxuXHRcdCAqIEB0ZW1wbGF0ZSBUIENvbXBvbmVudCB0eXBlXHJcblx0XHQgKi9cclxuXHRcdHB1YmxpYyBjb21wb25lbnQ8VCBleHRlbmRzIENvbXBvbmVudD4oKSB7XHJcblx0XHRcdHJldHVybiA8VSBleHRlbmRzIENvbnN0cnVjdG9yPFQ+PihjdG9yOiBVKSA9PiB7XHJcblx0XHRcdFx0dGhpcy5lY3MuZW50aXRpZXNbXCJyZWdpc3RyeVwiXS5zZXQoY3RvciwgbmV3IE1hcCgpKVx0XHJcblx0XHRcdFx0cmV0dXJuIGN0b3JcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogXHJcblx0XHQgKiBAcGFyYW0gcGFyYW0wIERlZmluZXMgb3JkZXIgb2YgdGhlIHN5c3RlbSByZWxhdGl2ZSB0byBvdGhlcnNcclxuXHRcdCAqIEBwYXJhbSBhcmdzIFBhcmFtZXRlcnMgdG8gY29uc3RydWN0IHRoZSBzeXN0ZW0gaW5zdGFuY2Ugd2l0aFxyXG5cdFx0ICovXHJcblx0XHRwdWJsaWMgc3lzdGVtPFQgZXh0ZW5kcyBDb25zdHJ1Y3RvcjxTeXN0ZW0+Pih7YmVmb3JlLCBhZnRlcn06IFN5c3RlbS5PcmRlciwgLi4uYXJnczogQ29uc3RydWN0b3JQYXJhbWV0ZXJzPFQ+KTogKGN0b3I6IENvbnN0cnVjdG9ySW5zdGFuY2U8VD4pID0+IFRcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEBwYXJhbSBhcmdzIFBhcmFtZXRlcnMgdG8gY29uc3RydWN0IHRoZSBzeXN0ZW0gaW5zdGFuY2Ugd2l0aFxyXG5cdFx0ICovXHJcblx0XHRwdWJsaWMgc3lzdGVtPFQgZXh0ZW5kcyBDb25zdHJ1Y3RvcjxTeXN0ZW0+PiguLi5hcmdzOiBDb25zdHJ1Y3RvclBhcmFtZXRlcnM8VD4pOiAoY3RvcjogQ29uc3RydWN0b3JJbnN0YW5jZTxUPikgPT4gVFxyXG5cclxuXHRcdHB1YmxpYyBzeXN0ZW08VCBleHRlbmRzIENvbnN0cnVjdG9yPFN5c3RlbT4+KC4uLnBhcjE6IFtTeXN0ZW0uT3JkZXIsIC4uLkNvbnN0cnVjdG9yUGFyYW1ldGVyczxUPl0gfCBDb25zdHJ1Y3RvclBhcmFtZXRlcnM8VD4pIHtcclxuXHRcdFx0cmV0dXJuIChjdG9yOiBDb25zdHJ1Y3Rvckluc3RhbmNlPFQ+KSA9PiB7XHJcblx0XHRcdFx0bGV0IG9yZGVyOiBTeXN0ZW0uT3JkZXJcclxuXHRcdFx0XHRsZXQgYXJnczogQ29uc3RydWN0b3JQYXJhbWV0ZXJzPFQ+XHJcblx0XHJcblx0XHRcdFx0aWYocGFyMS5sZW5ndGggPT0gMClcclxuXHRcdFx0XHRcdGFyZ3MgPSBbXSBhcyBhbnlcclxuXHRcdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRcdGxldCBmaXJzdCA9IHBhcjFbMF1cclxuXHRcclxuXHRcdFx0XHRcdGlmKGZpcnN0LmNvbnN0cnVjdG9yID09IE9iamVjdCkge1xyXG5cdFx0XHRcdFx0XHRvcmRlciA9IGZpcnN0IGFzIFN5c3RlbS5PcmRlclxyXG5cdFx0XHRcdFx0XHRhcmdzID0gcGFyMS5zbGljZSgxKSBhcyBDb25zdHJ1Y3RvclBhcmFtZXRlcnM8VD5cclxuXHRcdFx0XHRcdH0gZWxzZVxyXG5cdFx0XHRcdFx0XHRhcmdzID0gcGFyMSBhcyBDb25zdHJ1Y3RvclBhcmFtZXRlcnM8VD5cclxuXHRcdFx0XHR9XHJcblx0XHJcblx0XHRcdFx0dGhpcy5lY3Muc3lzdGVtcy5hZGQobmV3IGN0b3IoLi4uYXJncyksIG9yZGVyKVxyXG5cdFxyXG5cdFx0XHRcdHJldHVybiBjdG9yXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEVDU1xyXG5leHBvcnQge0VudGl0aWVzLCBFbnRpdHksIENvbXBvbmVudCwgU3lzdGVtcywgU3lzdGVtfSJdfQ==