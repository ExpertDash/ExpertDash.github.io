"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A unique object with components bound to it
 */
class Entity {
    constructor(entities, id) {
        this.entities = entities;
        this.id = id;
    }
    /**
     * Destroys this entity along with its components
     */
    destroy() {
        let componentRegistry = this.entities["registry"];
        let entityRegistries = [...componentRegistry.values()];
        for (let entityRegistry of entityRegistries) {
            entityRegistry.get(this.id)["removed"](this);
            entityRegistry.delete(this.id);
        }
    }
    /**
     * Add a component
     * @param components Components to add
     */
    add(...components) {
        let componentRegistry = this.entities["registry"];
        for (let par1 of components) {
            let ctor;
            let component;
            switch (typeof par1) {
                case "function":
                    ctor = par1;
                    component = new ctor();
                    break;
                case "object":
                    component = par1;
                    ctor = component.constructor;
                    break;
            }
            let entityRegistry = componentRegistry.get(ctor);
            if (entityRegistry.has(this.id))
                throw new Error(`'${ctor.name}' already present on entity ${this.id}`);
            entityRegistry.set(this.id, component);
            component["removed"](this);
        }
    }
    /**
     * @param ctor Component class
     * @returns Component instance bound to this entity
     */
    get(ctor) {
        return this.entities["registry"].get(ctor).get(this.id);
    }
    /**
     * Remove the component
     * @param ctors Component classes
     */
    remove(...ctors) {
        for (let ctor of ctors) {
            let componentRegistry = this.entities["registry"];
            let entityRegistry = componentRegistry.get(ctor);
            let component = entityRegistry.get(this.id);
            component["removed"](this);
        }
    }
    /**
     * Check whether this entity has a component of identical type
     * @param ctor Component class
     */
    has(ctor) {
        return this.entities["registry"].get(ctor).has(this.id);
    }
    *[Symbol.iterator]() {
        for (let entityRegistry of this.entities["registry"].values())
            if (entityRegistry.has(this.id))
                yield entityRegistry.get(this.id);
    }
    toString() {
        let s = `Entity[${this.id}]`;
        // for(let entityRegistry of this.entities["registry"].values())
        // 	if(entityRegistry.has(this.id))
        // 		s += `${entityRegistry.get(this.id).constructor.name}`.split(/(\n|\n\r|\r\n|\r)/g).map(s => `\n\t${s}`)
        return s;
    }
}
exports.default = Entity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50aXR5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2Vjcy9lbnRpdHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFNQTs7R0FFRztBQUNILE1BQXFCLE1BQU07SUFLMUIsWUFBbUIsUUFBa0IsRUFBRSxFQUFVO1FBQ2hELElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFBO1FBQ3hCLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFBO0lBQ2IsQ0FBQztJQUVEOztPQUVHO0lBQ0ksT0FBTztRQUNiLElBQUksaUJBQWlCLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUNqRCxJQUFJLGdCQUFnQixHQUFHLENBQUMsR0FBRyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFBO1FBRXRELEtBQUksSUFBSSxjQUFjLElBQUksZ0JBQWdCLEVBQUU7WUFDM0MsY0FBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDNUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7U0FDOUI7SUFDRixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksR0FBRyxDQUFDLEdBQUcsVUFBeUQ7UUFDdEUsSUFBSSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBRWpELEtBQUksSUFBSSxJQUFJLElBQUksVUFBVSxFQUFFO1lBQzNCLElBQUksSUFBNEIsQ0FBQTtZQUNoQyxJQUFJLFNBQW9CLENBQUE7WUFFeEIsUUFBTyxPQUFPLElBQUksRUFBRTtnQkFDbkIsS0FBSyxVQUFVO29CQUNkLElBQUksR0FBRyxJQUFxQyxDQUFBO29CQUM1QyxTQUFTLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQTtvQkFDdEIsTUFBSztnQkFDTixLQUFLLFFBQVE7b0JBQ1osU0FBUyxHQUFHLElBQWlCLENBQUE7b0JBQzdCLElBQUksR0FBRyxTQUFTLENBQUMsV0FBcUMsQ0FBQTtvQkFDdEQsTUFBSzthQUNOO1lBRUQsSUFBSSxjQUFjLEdBQUcsaUJBQWlCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO1lBRWhELElBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO2dCQUM3QixNQUFNLElBQUksS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksK0JBQStCLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFBO1lBRXZFLGNBQWMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxTQUFTLENBQUMsQ0FBQTtZQUN0QyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUE7U0FDMUI7SUFDRixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksR0FBRyxDQUFzQixJQUFvQjtRQUNuRCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFNLENBQUE7SUFDN0QsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxHQUFHLEtBQStCO1FBQy9DLEtBQUksSUFBSSxJQUFJLElBQUksS0FBSyxFQUFFO1lBQ3RCLElBQUksaUJBQWlCLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQTtZQUNqRCxJQUFJLGNBQWMsR0FBRyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDaEQsSUFBSSxTQUFTLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7WUFDM0MsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFBO1NBQzFCO0lBQ0YsQ0FBQztJQUVEOzs7T0FHRztJQUNJLEdBQUcsQ0FBQyxJQUE0QjtRQUN0QyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7SUFDeEQsQ0FBQztJQUVNLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQ3hCLEtBQUksSUFBSSxjQUFjLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxNQUFNLEVBQUU7WUFDM0QsSUFBRyxjQUFjLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7Z0JBQzdCLE1BQU0sY0FBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7SUFDcEMsQ0FBQztJQUVNLFFBQVE7UUFDZCxJQUFJLENBQUMsR0FBRyxVQUFVLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQTtRQUU1QixnRUFBZ0U7UUFDaEUsbUNBQW1DO1FBQ25DLDRHQUE0RztRQUU1RyxPQUFPLENBQUMsQ0FBQTtJQUNULENBQUM7Q0FDRDtBQW5HRCx5QkFtR0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tcG9uZW50IGZyb20gXCIuL2NvbXBvbmVudC5qc1wiXHJcbmltcG9ydCBFbnRpdGllcyBmcm9tIFwiLi9lbnRpdGllcy5qc1wiXHJcblxyXG50eXBlIENvbnN0cnVjdG9yPFQ+ID0gbmV3KC4uLmFyZ3M6IGFueVtdKSA9PiBUXHJcbnR5cGUgRGVmYXVsdENvbnN0cnVjdG9yPFQ+ID0gbmV3KCkgPT4gVFxyXG5cclxuLyoqXHJcbiAqIEEgdW5pcXVlIG9iamVjdCB3aXRoIGNvbXBvbmVudHMgYm91bmQgdG8gaXRcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVudGl0eSB7XHJcblx0LyoqIFVuaXF1ZSBpZGVudGlmaWVyIG9mIHRoaXMgZW50aXR5ICovXHJcblx0cHVibGljIHJlYWRvbmx5IGlkOiBudW1iZXJcclxuXHRwcml2YXRlIHJlYWRvbmx5IGVudGl0aWVzOiBFbnRpdGllc1xyXG5cclxuXHRwdWJsaWMgY29uc3RydWN0b3IoZW50aXRpZXM6IEVudGl0aWVzLCBpZDogbnVtYmVyKSB7XHJcblx0XHR0aGlzLmVudGl0aWVzID0gZW50aXRpZXNcclxuXHRcdHRoaXMuaWQgPSBpZFxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogRGVzdHJveXMgdGhpcyBlbnRpdHkgYWxvbmcgd2l0aCBpdHMgY29tcG9uZW50c1xyXG5cdCAqL1xyXG5cdHB1YmxpYyBkZXN0cm95KCk6IHZvaWQge1xyXG5cdFx0bGV0IGNvbXBvbmVudFJlZ2lzdHJ5ID0gdGhpcy5lbnRpdGllc1tcInJlZ2lzdHJ5XCJdXHJcblx0XHRsZXQgZW50aXR5UmVnaXN0cmllcyA9IFsuLi5jb21wb25lbnRSZWdpc3RyeS52YWx1ZXMoKV1cclxuXHJcblx0XHRmb3IobGV0IGVudGl0eVJlZ2lzdHJ5IG9mIGVudGl0eVJlZ2lzdHJpZXMpIHtcclxuXHRcdFx0ZW50aXR5UmVnaXN0cnkuZ2V0KHRoaXMuaWQpW1wicmVtb3ZlZFwiXSh0aGlzKVxyXG5cdFx0XHRlbnRpdHlSZWdpc3RyeS5kZWxldGUodGhpcy5pZClcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZCBhIGNvbXBvbmVudFxyXG5cdCAqIEBwYXJhbSBjb21wb25lbnRzIENvbXBvbmVudHMgdG8gYWRkXHJcblx0ICovXHJcblx0cHVibGljIGFkZCguLi5jb21wb25lbnRzOiAoQ29tcG9uZW50IHwgRGVmYXVsdENvbnN0cnVjdG9yPENvbXBvbmVudD4pW10pOiB2b2lkIHtcclxuXHRcdGxldCBjb21wb25lbnRSZWdpc3RyeSA9IHRoaXMuZW50aXRpZXNbXCJyZWdpc3RyeVwiXVxyXG5cclxuXHRcdGZvcihsZXQgcGFyMSBvZiBjb21wb25lbnRzKSB7XHJcblx0XHRcdGxldCBjdG9yOiBDb25zdHJ1Y3RvcjxDb21wb25lbnQ+XHJcblx0XHRcdGxldCBjb21wb25lbnQ6IENvbXBvbmVudFxyXG5cclxuXHRcdFx0c3dpdGNoKHR5cGVvZiBwYXIxKSB7XHJcblx0XHRcdFx0Y2FzZSBcImZ1bmN0aW9uXCI6XHJcblx0XHRcdFx0XHRjdG9yID0gcGFyMSBhcyBEZWZhdWx0Q29uc3RydWN0b3I8Q29tcG9uZW50PlxyXG5cdFx0XHRcdFx0Y29tcG9uZW50ID0gbmV3IGN0b3IoKVxyXG5cdFx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHRjYXNlIFwib2JqZWN0XCI6XHJcblx0XHRcdFx0XHRjb21wb25lbnQgPSBwYXIxIGFzIENvbXBvbmVudFxyXG5cdFx0XHRcdFx0Y3RvciA9IGNvbXBvbmVudC5jb25zdHJ1Y3RvciBhcyBDb25zdHJ1Y3RvcjxDb21wb25lbnQ+XHJcblx0XHRcdFx0XHRicmVha1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRsZXQgZW50aXR5UmVnaXN0cnkgPSBjb21wb25lbnRSZWdpc3RyeS5nZXQoY3RvcilcclxuXHJcblx0XHRcdGlmKGVudGl0eVJlZ2lzdHJ5Lmhhcyh0aGlzLmlkKSlcclxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoYCcke2N0b3IubmFtZX0nIGFscmVhZHkgcHJlc2VudCBvbiBlbnRpdHkgJHt0aGlzLmlkfWApXHJcblxyXG5cdFx0XHRlbnRpdHlSZWdpc3RyeS5zZXQodGhpcy5pZCwgY29tcG9uZW50KVxyXG5cdFx0XHRjb21wb25lbnRbXCJyZW1vdmVkXCJdKHRoaXMpXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBAcGFyYW0gY3RvciBDb21wb25lbnQgY2xhc3NcclxuXHQgKiBAcmV0dXJucyBDb21wb25lbnQgaW5zdGFuY2UgYm91bmQgdG8gdGhpcyBlbnRpdHlcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0PFQgZXh0ZW5kcyBDb21wb25lbnQ+KGN0b3I6IENvbnN0cnVjdG9yPFQ+KTogVCB7XHJcblx0XHRyZXR1cm4gdGhpcy5lbnRpdGllc1tcInJlZ2lzdHJ5XCJdLmdldChjdG9yKS5nZXQodGhpcy5pZCkgYXMgVFxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVtb3ZlIHRoZSBjb21wb25lbnRcclxuXHQgKiBAcGFyYW0gY3RvcnMgQ29tcG9uZW50IGNsYXNzZXNcclxuXHQgKi9cclxuXHRwdWJsaWMgcmVtb3ZlKC4uLmN0b3JzOiBDb25zdHJ1Y3RvcjxDb21wb25lbnQ+W10pOiB2b2lkIHtcclxuXHRcdGZvcihsZXQgY3RvciBvZiBjdG9ycykge1xyXG5cdFx0XHRsZXQgY29tcG9uZW50UmVnaXN0cnkgPSB0aGlzLmVudGl0aWVzW1wicmVnaXN0cnlcIl1cclxuXHRcdFx0bGV0IGVudGl0eVJlZ2lzdHJ5ID0gY29tcG9uZW50UmVnaXN0cnkuZ2V0KGN0b3IpXHJcblx0XHRcdGxldCBjb21wb25lbnQgPSBlbnRpdHlSZWdpc3RyeS5nZXQodGhpcy5pZClcclxuXHRcdFx0Y29tcG9uZW50W1wicmVtb3ZlZFwiXSh0aGlzKVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2sgd2hldGhlciB0aGlzIGVudGl0eSBoYXMgYSBjb21wb25lbnQgb2YgaWRlbnRpY2FsIHR5cGVcclxuXHQgKiBAcGFyYW0gY3RvciBDb21wb25lbnQgY2xhc3NcclxuXHQgKi9cclxuXHRwdWJsaWMgaGFzKGN0b3I6IENvbnN0cnVjdG9yPENvbXBvbmVudD4pOiBib29sZWFuIHtcclxuXHRcdHJldHVybiB0aGlzLmVudGl0aWVzW1wicmVnaXN0cnlcIl0uZ2V0KGN0b3IpLmhhcyh0aGlzLmlkKVxyXG5cdH1cclxuXHJcblx0cHVibGljICpbU3ltYm9sLml0ZXJhdG9yXSgpOiBJdGVyYWJsZUl0ZXJhdG9yPENvbXBvbmVudD4ge1xyXG5cdFx0Zm9yKGxldCBlbnRpdHlSZWdpc3RyeSBvZiB0aGlzLmVudGl0aWVzW1wicmVnaXN0cnlcIl0udmFsdWVzKCkpXHJcblx0XHRcdGlmKGVudGl0eVJlZ2lzdHJ5Lmhhcyh0aGlzLmlkKSlcclxuXHRcdFx0XHR5aWVsZCBlbnRpdHlSZWdpc3RyeS5nZXQodGhpcy5pZClcclxuXHR9XHJcblxyXG5cdHB1YmxpYyB0b1N0cmluZygpOiBzdHJpbmcge1xyXG5cdFx0bGV0IHMgPSBgRW50aXR5WyR7dGhpcy5pZH1dYFxyXG5cclxuXHRcdC8vIGZvcihsZXQgZW50aXR5UmVnaXN0cnkgb2YgdGhpcy5lbnRpdGllc1tcInJlZ2lzdHJ5XCJdLnZhbHVlcygpKVxyXG5cdFx0Ly8gXHRpZihlbnRpdHlSZWdpc3RyeS5oYXModGhpcy5pZCkpXHJcblx0XHQvLyBcdFx0cyArPSBgJHtlbnRpdHlSZWdpc3RyeS5nZXQodGhpcy5pZCkuY29uc3RydWN0b3IubmFtZX1gLnNwbGl0KC8oXFxufFxcblxccnxcXHJcXG58XFxyKS9nKS5tYXAocyA9PiBgXFxuXFx0JHtzfWApXHJcblxyXG5cdFx0cmV0dXJuIHNcclxuXHR9XHJcbn0iXX0=