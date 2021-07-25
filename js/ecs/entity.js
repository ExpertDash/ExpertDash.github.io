/**
 * A unique object with components bound to it
 */
export default class Entity {
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
    /**
     * Executes the function if the entity has the specified components
     * @param executor Function to execute
     * @param ctors Components the entity must have
     */
    run(executor, ...ctors) {
        let components = [];
        for (let i = 0; i < ctors.length; i++) {
            let componentType = ctors[i];
            if (!this.has(componentType))
                return;
            components.push(this.get(componentType));
        }
        executor(...components);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50aXR5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2Vjcy9lbnRpdHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBT0E7O0dBRUc7QUFDSCxNQUFNLENBQUMsT0FBTyxPQUFPLE1BQU07SUFLMUIsWUFBbUIsUUFBa0IsRUFBRSxFQUFVO1FBQ2hELElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFBO1FBQ3hCLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFBO0lBQ2IsQ0FBQztJQUVEOztPQUVHO0lBQ0ksT0FBTztRQUNiLElBQUksaUJBQWlCLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUNqRCxJQUFJLGdCQUFnQixHQUFHLENBQUMsR0FBRyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFBO1FBRXRELEtBQUksSUFBSSxjQUFjLElBQUksZ0JBQWdCLEVBQUU7WUFDM0MsY0FBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDNUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7U0FDOUI7SUFDRixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksR0FBRyxDQUFDLEdBQUcsVUFBeUQ7UUFDdEUsSUFBSSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBRWpELEtBQUksSUFBSSxJQUFJLElBQUksVUFBVSxFQUFFO1lBQzNCLElBQUksSUFBNEIsQ0FBQTtZQUNoQyxJQUFJLFNBQW9CLENBQUE7WUFFeEIsUUFBTyxPQUFPLElBQUksRUFBRTtnQkFDbkIsS0FBSyxVQUFVO29CQUNkLElBQUksR0FBRyxJQUFxQyxDQUFBO29CQUM1QyxTQUFTLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQTtvQkFDdEIsTUFBSztnQkFDTixLQUFLLFFBQVE7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cm9tIFwiLi9jb21wb25lbnQuanNcIlxyXG5pbXBvcnQgRW50aXRpZXMgZnJvbSBcIi4vZW50aXRpZXMuanNcIlxyXG5cclxudHlwZSBDb25zdHJ1Y3RvcjxUPiA9IG5ldyguLi5hcmdzOiBhbnlbXSkgPT4gVFxyXG50eXBlIERlZmF1bHRDb25zdHJ1Y3RvcjxUPiA9IG5ldygpID0+IFRcclxudHlwZSBNYXBUb0NvbnN0cnVjdG9yPFRzPiA9IHtyZWFkb25seSBbSyBpbiBrZXlvZiBUc106IENvbnN0cnVjdG9yPFRzW0tdPn1cclxuXHJcbi8qKlxyXG4gKiBBIHVuaXF1ZSBvYmplY3Qgd2l0aCBjb21wb25lbnRzIGJvdW5kIHRvIGl0XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbnRpdHkge1xyXG5cdC8qKiBVbmlxdWUgaWRlbnRpZmllciBvZiB0aGlzIGVudGl0eSAqL1xyXG5cdHB1YmxpYyByZWFkb25seSBpZDogbnVtYmVyXHJcblx0cHJpdmF0ZSByZWFkb25seSBlbnRpdGllczogRW50aXRpZXNcclxuXHJcblx0cHVibGljIGNvbnN0cnVjdG9yKGVudGl0aWVzOiBFbnRpdGllcywgaWQ6IG51bWJlcikge1xyXG5cdFx0dGhpcy5lbnRpdGllcyA9IGVudGl0aWVzXHJcblx0XHR0aGlzLmlkID0gaWRcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIERlc3Ryb3lzIHRoaXMgZW50aXR5IGFsb25nIHdpdGggaXRzIGNvbXBvbmVudHNcclxuXHQgKi9cclxuXHRwdWJsaWMgZGVzdHJveSgpOiB2b2lkIHtcclxuXHRcdGxldCBjb21wb25lbnRSZWdpc3RyeSA9IHRoaXMuZW50aXRpZXNbXCJyZWdpc3RyeVwiXVxyXG5cdFx0bGV0IGVudGl0eVJlZ2lzdHJpZXMgPSBbLi4uY29tcG9uZW50UmVnaXN0cnkudmFsdWVzKCldXHJcblxyXG5cdFx0Zm9yKGxldCBlbnRpdHlSZWdpc3RyeSBvZiBlbnRpdHlSZWdpc3RyaWVzKSB7XHJcblx0XHRcdGVudGl0eVJlZ2lzdHJ5LmdldCh0aGlzLmlkKVtcInJlbW92ZWRcIl0odGhpcylcclxuXHRcdFx0ZW50aXR5UmVnaXN0cnkuZGVsZXRlKHRoaXMuaWQpXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGQgYSBjb21wb25lbnRcclxuXHQgKiBAcGFyYW0gY29tcG9uZW50cyBDb21wb25lbnRzIHRvIGFkZFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBhZGQoLi4uY29tcG9uZW50czogKENvbXBvbmVudCB8IERlZmF1bHRDb25zdHJ1Y3RvcjxDb21wb25lbnQ+KVtdKTogdm9pZCB7XHJcblx0XHRsZXQgY29tcG9uZW50UmVnaXN0cnkgPSB0aGlzLmVudGl0aWVzW1wicmVnaXN0cnlcIl1cclxuXHJcblx0XHRmb3IobGV0IHBhcjEgb2YgY29tcG9uZW50cykge1xyXG5cdFx0XHRsZXQgY3RvcjogQ29uc3RydWN0b3I8Q29tcG9uZW50PlxyXG5cdFx0XHRsZXQgY29tcG9uZW50OiBDb21wb25lbnRcclxuXHJcblx0XHRcdHN3aXRjaCh0eXBlb2YgcGFyMSkge1xyXG5cdFx0XHRcdGNhc2UgXCJmdW5jdGlvblwiOlxyXG5cdFx0XHRcdFx0Y3RvciA9IHBhcjEgYXMgRGVmYXVsdENvbnN0cnVjdG9yPENvbXBvbmVudD5cclxuXHRcdFx0XHRcdGNvbXBvbmVudCA9IG5ldyBjdG9yKClcclxuXHRcdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0Y2FzZSBcIm9iamVjdFwiOlxyXG5cdFx0XHRcdFx0Y29tcG9uZW50ID0gcGFyMSBhcyBDb21wb25lbnRcclxuXHRcdFx0XHRcdGN0b3IgPSBjb21wb25lbnQuY29uc3RydWN0b3IgYXMgQ29uc3RydWN0b3I8Q29tcG9uZW50PlxyXG5cdFx0XHRcdFx0YnJlYWtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0bGV0IGVudGl0eVJlZ2lzdHJ5ID0gY29tcG9uZW50UmVnaXN0cnkuZ2V0KGN0b3IpXHJcblxyXG5cdFx0XHRpZihlbnRpdHlSZWdpc3RyeS5oYXModGhpcy5pZCkpXHJcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGAnJHtjdG9yLm5hbWV9JyBhbHJlYWR5IHByZXNlbnQgb24gZW50aXR5ICR7dGhpcy5pZH1gKVxyXG5cclxuXHRcdFx0ZW50aXR5UmVnaXN0cnkuc2V0KHRoaXMuaWQsIGNvbXBvbmVudClcclxuXHRcdFx0Y29tcG9uZW50W1wicmVtb3ZlZFwiXSh0aGlzKVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQHBhcmFtIGN0b3IgQ29tcG9uZW50IGNsYXNzXHJcblx0ICogQHJldHVybnMgQ29tcG9uZW50IGluc3RhbmNlIGJvdW5kIHRvIHRoaXMgZW50aXR5XHJcblx0ICovXHJcblx0cHVibGljIGdldDxUIGV4dGVuZHMgQ29tcG9uZW50PihjdG9yOiBDb25zdHJ1Y3RvcjxUPik6IFQge1xyXG5cdFx0cmV0dXJuIHRoaXMuZW50aXRpZXNbXCJyZWdpc3RyeVwiXS5nZXQoY3RvcikuZ2V0KHRoaXMuaWQpIGFzIFRcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbW92ZSB0aGUgY29tcG9uZW50XHJcblx0ICogQHBhcmFtIGN0b3JzIENvbXBvbmVudCBjbGFzc2VzXHJcblx0ICovXHJcblx0cHVibGljIHJlbW92ZSguLi5jdG9yczogQ29uc3RydWN0b3I8Q29tcG9uZW50PltdKTogdm9pZCB7XHJcblx0XHRmb3IobGV0IGN0b3Igb2YgY3RvcnMpIHtcclxuXHRcdFx0bGV0IGNvbXBvbmVudFJlZ2lzdHJ5ID0gdGhpcy5lbnRpdGllc1tcInJlZ2lzdHJ5XCJdXHJcblx0XHRcdGxldCBlbnRpdHlSZWdpc3RyeSA9IGNvbXBvbmVudFJlZ2lzdHJ5LmdldChjdG9yKVxyXG5cdFx0XHRsZXQgY29tcG9uZW50ID0gZW50aXR5UmVnaXN0cnkuZ2V0KHRoaXMuaWQpXHJcblx0XHRcdGNvbXBvbmVudFtcInJlbW92ZWRcIl0odGhpcylcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrIHdoZXRoZXIgdGhpcyBlbnRpdHkgaGFzIGEgY29tcG9uZW50IG9mIGlkZW50aWNhbCB0eXBlXHJcblx0ICogQHBhcmFtIGN0b3IgQ29tcG9uZW50IGNsYXNzXHJcblx0ICovXHJcblx0cHVibGljIGhhcyhjdG9yOiBDb25zdHJ1Y3RvcjxDb21wb25lbnQ+KTogYm9vbGVhbiB7XHJcblx0XHRyZXR1cm4gdGhpcy5lbnRpdGllc1tcInJlZ2lzdHJ5XCJdLmdldChjdG9yKS5oYXModGhpcy5pZClcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEV4ZWN1dGVzIHRoZSBmdW5jdGlvbiBpZiB0aGUgZW50aXR5IGhhcyB0aGUgc3BlY2lmaWVkIGNvbXBvbmVudHNcclxuXHQgKiBAcGFyYW0gZXhlY3V0b3IgRnVuY3Rpb24gdG8gZXhlY3V0ZVxyXG5cdCAqIEBwYXJhbSBjdG9ycyBDb21wb25lbnRzIHRoZSBlbnRpdHkgbXVzdCBoYXZlXHJcblx0ICovXHJcblx0cHVibGljIHJ1bjxUcyBleHRlbmRzIHJlYWRvbmx5IENvbXBvbmVudFtdPihleGVjdXRvcjogKC4uLmFyZ3M6IFRzKSA9PiB2b2lkLCAuLi5jdG9yczogTWFwVG9Db25zdHJ1Y3RvcjxUcz4pOiB2b2lkIHtcclxuXHRcdGxldCBjb21wb25lbnRzOiBDb21wb25lbnRbXSA9IFtdXHJcblxyXG5cdFx0Zm9yKGxldCBpID0gMDsgaSA8IGN0b3JzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGxldCBjb21wb25lbnRUeXBlID0gY3RvcnNbaV1cclxuXHJcblx0XHRcdGlmKCF0aGlzLmhhcyhjb21wb25lbnRUeXBlKSlcclxuXHRcdFx0XHRyZXR1cm5cclxuXHJcblx0XHRcdGNvbXBvbmVudHMucHVzaCh0aGlzLmdldChjb21wb25lbnRUeXBlKSlcclxuXHRcdH1cclxuXHJcblx0XHRleGVjdXRvciguLi4oY29tcG9uZW50cyBhcyBhbnkgYXMgVHMpKVxyXG5cdH1cclxuXHJcblx0cHVibGljICpbU3ltYm9sLml0ZXJhdG9yXSgpOiBJdGVyYWJsZUl0ZXJhdG9yPENvbXBvbmVudD4ge1xyXG5cdFx0Zm9yKGxldCBlbnRpdHlSZWdpc3RyeSBvZiB0aGlzLmVudGl0aWVzW1wicmVnaXN0cnlcIl0udmFsdWVzKCkpXHJcblx0XHRcdGlmKGVudGl0eVJlZ2lzdHJ5Lmhhcyh0aGlzLmlkKSlcclxuXHRcdFx0XHR5aWVsZCBlbnRpdHlSZWdpc3RyeS5nZXQodGhpcy5pZClcclxuXHR9XHJcblxyXG5cdHB1YmxpYyB0b1N0cmluZygpOiBzdHJpbmcge1xyXG5cdFx0bGV0IHMgPSBgRW50aXR5WyR7dGhpcy5pZH1dYFxyXG5cclxuXHRcdC8vIGZvcihsZXQgZW50aXR5UmVnaXN0cnkgb2YgdGhpcy5lbnRpdGllc1tcInJlZ2lzdHJ5XCJdLnZhbHVlcygpKVxyXG5cdFx0Ly8gXHRpZihlbnRpdHlSZWdpc3RyeS5oYXModGhpcy5pZCkpXHJcblx0XHQvLyBcdFx0cyArPSBgJHtlbnRpdHlSZWdpc3RyeS5nZXQodGhpcy5pZCkuY29uc3RydWN0b3IubmFtZX1gLnNwbGl0KC8oXFxufFxcblxccnxcXHJcXG58XFxyKS9nKS5tYXAocyA9PiBgXFxuXFx0JHtzfWApXHJcblxyXG5cdFx0cmV0dXJuIHNcclxuXHR9XHJcbn0iXX0=