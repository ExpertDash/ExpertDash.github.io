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
            component["added"](this);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50aXR5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2Vjcy9lbnRpdHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBT0E7O0dBRUc7QUFDSCxNQUFNLENBQUMsT0FBTyxPQUFPLE1BQU07SUFLMUIsWUFBbUIsUUFBa0IsRUFBRSxFQUFVO1FBQ2hELElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFBO1FBQ3hCLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFBO0lBQ2IsQ0FBQztJQUVEOztPQUVHO0lBQ0ksT0FBTztRQUNiLElBQUksaUJBQWlCLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUNqRCxJQUFJLGdCQUFnQixHQUFHLENBQUMsR0FBRyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFBO1FBRXRELEtBQUksSUFBSSxjQUFjLElBQUksZ0JBQWdCLEVBQUU7WUFDM0MsY0FBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDNUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7U0FDOUI7SUFDRixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksR0FBRyxDQUFDLEdBQUcsVUFBeUQ7UUFDdEUsSUFBSSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBRWpELEtBQUksSUFBSSxJQUFJLElBQUksVUFBVSxFQUFFO1lBQzNCLElBQUksSUFBNEIsQ0FBQTtZQUNoQyxJQUFJLFNBQW9CLENBQUE7WUFFeEIsUUFBTyxPQUFPLElBQUksRUFBRTtnQkFDbkIsS0FBSyxVQUFVO29CQUNkLElBQUksR0FBRyxJQUFxQyxDQUFBO29CQUM1QyxTQUFTLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQTtvQkFDdEIsTUFBSztnQkFDTixLQUFLLFFBQVE7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cm9tIFwiLi9jb21wb25lbnQuanNcIlxyXG5pbXBvcnQgRW50aXRpZXMgZnJvbSBcIi4vZW50aXRpZXMuanNcIlxyXG5cclxudHlwZSBDb25zdHJ1Y3RvcjxUPiA9IG5ldyguLi5hcmdzOiBhbnlbXSkgPT4gVFxyXG50eXBlIERlZmF1bHRDb25zdHJ1Y3RvcjxUPiA9IG5ldygpID0+IFRcclxudHlwZSBNYXBUb0NvbnN0cnVjdG9yPFRzPiA9IHtyZWFkb25seSBbSyBpbiBrZXlvZiBUc106IENvbnN0cnVjdG9yPFRzW0tdPn1cclxuXHJcbi8qKlxyXG4gKiBBIHVuaXF1ZSBvYmplY3Qgd2l0aCBjb21wb25lbnRzIGJvdW5kIHRvIGl0XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbnRpdHkge1xyXG5cdC8qKiBVbmlxdWUgaWRlbnRpZmllciBvZiB0aGlzIGVudGl0eSAqL1xyXG5cdHB1YmxpYyByZWFkb25seSBpZDogbnVtYmVyXHJcblx0cHJpdmF0ZSByZWFkb25seSBlbnRpdGllczogRW50aXRpZXNcclxuXHJcblx0cHVibGljIGNvbnN0cnVjdG9yKGVudGl0aWVzOiBFbnRpdGllcywgaWQ6IG51bWJlcikge1xyXG5cdFx0dGhpcy5lbnRpdGllcyA9IGVudGl0aWVzXHJcblx0XHR0aGlzLmlkID0gaWRcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIERlc3Ryb3lzIHRoaXMgZW50aXR5IGFsb25nIHdpdGggaXRzIGNvbXBvbmVudHNcclxuXHQgKi9cclxuXHRwdWJsaWMgZGVzdHJveSgpOiB2b2lkIHtcclxuXHRcdGxldCBjb21wb25lbnRSZWdpc3RyeSA9IHRoaXMuZW50aXRpZXNbXCJyZWdpc3RyeVwiXVxyXG5cdFx0bGV0IGVudGl0eVJlZ2lzdHJpZXMgPSBbLi4uY29tcG9uZW50UmVnaXN0cnkudmFsdWVzKCldXHJcblxyXG5cdFx0Zm9yKGxldCBlbnRpdHlSZWdpc3RyeSBvZiBlbnRpdHlSZWdpc3RyaWVzKSB7XHJcblx0XHRcdGVudGl0eVJlZ2lzdHJ5LmdldCh0aGlzLmlkKVtcInJlbW92ZWRcIl0odGhpcylcclxuXHRcdFx0ZW50aXR5UmVnaXN0cnkuZGVsZXRlKHRoaXMuaWQpXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGQgYSBjb21wb25lbnRcclxuXHQgKiBAcGFyYW0gY29tcG9uZW50cyBDb21wb25lbnRzIHRvIGFkZFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBhZGQoLi4uY29tcG9uZW50czogKENvbXBvbmVudCB8IERlZmF1bHRDb25zdHJ1Y3RvcjxDb21wb25lbnQ+KVtdKTogdm9pZCB7XHJcblx0XHRsZXQgY29tcG9uZW50UmVnaXN0cnkgPSB0aGlzLmVudGl0aWVzW1wicmVnaXN0cnlcIl1cclxuXHJcblx0XHRmb3IobGV0IHBhcjEgb2YgY29tcG9uZW50cykge1xyXG5cdFx0XHRsZXQgY3RvcjogQ29uc3RydWN0b3I8Q29tcG9uZW50PlxyXG5cdFx0XHRsZXQgY29tcG9uZW50OiBDb21wb25lbnRcclxuXHJcblx0XHRcdHN3aXRjaCh0eXBlb2YgcGFyMSkge1xyXG5cdFx0XHRcdGNhc2UgXCJmdW5jdGlvblwiOlxyXG5cdFx0XHRcdFx0Y3RvciA9IHBhcjEgYXMgRGVmYXVsdENvbnN0cnVjdG9yPENvbXBvbmVudD5cclxuXHRcdFx0XHRcdGNvbXBvbmVudCA9IG5ldyBjdG9yKClcclxuXHRcdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0Y2FzZSBcIm9iamVjdFwiOlxyXG5cdFx0XHRcdFx0Y29tcG9uZW50ID0gcGFyMSBhcyBDb21wb25lbnRcclxuXHRcdFx0XHRcdGN0b3IgPSBjb21wb25lbnQuY29uc3RydWN0b3IgYXMgQ29uc3RydWN0b3I8Q29tcG9uZW50PlxyXG5cdFx0XHRcdFx0YnJlYWtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0bGV0IGVudGl0eVJlZ2lzdHJ5ID0gY29tcG9uZW50UmVnaXN0cnkuZ2V0KGN0b3IpXHJcblxyXG5cdFx0XHRpZihlbnRpdHlSZWdpc3RyeS5oYXModGhpcy5pZCkpXHJcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGAnJHtjdG9yLm5hbWV9JyBhbHJlYWR5IHByZXNlbnQgb24gZW50aXR5ICR7dGhpcy5pZH1gKVxyXG5cclxuXHRcdFx0ZW50aXR5UmVnaXN0cnkuc2V0KHRoaXMuaWQsIGNvbXBvbmVudClcclxuXHRcdFx0Y29tcG9uZW50W1wiYWRkZWRcIl0odGhpcylcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBwYXJhbSBjdG9yIENvbXBvbmVudCBjbGFzc1xyXG5cdCAqIEByZXR1cm5zIENvbXBvbmVudCBpbnN0YW5jZSBib3VuZCB0byB0aGlzIGVudGl0eVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXQ8VCBleHRlbmRzIENvbXBvbmVudD4oY3RvcjogQ29uc3RydWN0b3I8VD4pOiBUIHtcclxuXHRcdHJldHVybiB0aGlzLmVudGl0aWVzW1wicmVnaXN0cnlcIl0uZ2V0KGN0b3IpLmdldCh0aGlzLmlkKSBhcyBUXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZW1vdmUgdGhlIGNvbXBvbmVudFxyXG5cdCAqIEBwYXJhbSBjdG9ycyBDb21wb25lbnQgY2xhc3Nlc1xyXG5cdCAqL1xyXG5cdHB1YmxpYyByZW1vdmUoLi4uY3RvcnM6IENvbnN0cnVjdG9yPENvbXBvbmVudD5bXSk6IHZvaWQge1xyXG5cdFx0Zm9yKGxldCBjdG9yIG9mIGN0b3JzKSB7XHJcblx0XHRcdGxldCBjb21wb25lbnRSZWdpc3RyeSA9IHRoaXMuZW50aXRpZXNbXCJyZWdpc3RyeVwiXVxyXG5cdFx0XHRsZXQgZW50aXR5UmVnaXN0cnkgPSBjb21wb25lbnRSZWdpc3RyeS5nZXQoY3RvcilcclxuXHRcdFx0bGV0IGNvbXBvbmVudCA9IGVudGl0eVJlZ2lzdHJ5LmdldCh0aGlzLmlkKVxyXG5cdFx0XHRjb21wb25lbnRbXCJyZW1vdmVkXCJdKHRoaXMpXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVjayB3aGV0aGVyIHRoaXMgZW50aXR5IGhhcyBhIGNvbXBvbmVudCBvZiBpZGVudGljYWwgdHlwZVxyXG5cdCAqIEBwYXJhbSBjdG9yIENvbXBvbmVudCBjbGFzc1xyXG5cdCAqL1xyXG5cdHB1YmxpYyBoYXMoY3RvcjogQ29uc3RydWN0b3I8Q29tcG9uZW50Pik6IGJvb2xlYW4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuZW50aXRpZXNbXCJyZWdpc3RyeVwiXS5nZXQoY3RvcikuaGFzKHRoaXMuaWQpXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBFeGVjdXRlcyB0aGUgZnVuY3Rpb24gaWYgdGhlIGVudGl0eSBoYXMgdGhlIHNwZWNpZmllZCBjb21wb25lbnRzXHJcblx0ICogQHBhcmFtIGV4ZWN1dG9yIEZ1bmN0aW9uIHRvIGV4ZWN1dGVcclxuXHQgKiBAcGFyYW0gY3RvcnMgQ29tcG9uZW50cyB0aGUgZW50aXR5IG11c3QgaGF2ZVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBydW48VHMgZXh0ZW5kcyByZWFkb25seSBDb21wb25lbnRbXT4oZXhlY3V0b3I6ICguLi5hcmdzOiBUcykgPT4gdm9pZCwgLi4uY3RvcnM6IE1hcFRvQ29uc3RydWN0b3I8VHM+KTogdm9pZCB7XHJcblx0XHRsZXQgY29tcG9uZW50czogQ29tcG9uZW50W10gPSBbXVxyXG5cclxuXHRcdGZvcihsZXQgaSA9IDA7IGkgPCBjdG9ycy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRsZXQgY29tcG9uZW50VHlwZSA9IGN0b3JzW2ldXHJcblxyXG5cdFx0XHRpZighdGhpcy5oYXMoY29tcG9uZW50VHlwZSkpXHJcblx0XHRcdFx0cmV0dXJuXHJcblxyXG5cdFx0XHRjb21wb25lbnRzLnB1c2godGhpcy5nZXQoY29tcG9uZW50VHlwZSkpXHJcblx0XHR9XHJcblxyXG5cdFx0ZXhlY3V0b3IoLi4uKGNvbXBvbmVudHMgYXMgYW55IGFzIFRzKSlcclxuXHR9XHJcblxyXG5cdHB1YmxpYyAqW1N5bWJvbC5pdGVyYXRvcl0oKTogSXRlcmFibGVJdGVyYXRvcjxDb21wb25lbnQ+IHtcclxuXHRcdGZvcihsZXQgZW50aXR5UmVnaXN0cnkgb2YgdGhpcy5lbnRpdGllc1tcInJlZ2lzdHJ5XCJdLnZhbHVlcygpKVxyXG5cdFx0XHRpZihlbnRpdHlSZWdpc3RyeS5oYXModGhpcy5pZCkpXHJcblx0XHRcdFx0eWllbGQgZW50aXR5UmVnaXN0cnkuZ2V0KHRoaXMuaWQpXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgdG9TdHJpbmcoKTogc3RyaW5nIHtcclxuXHRcdGxldCBzID0gYEVudGl0eVske3RoaXMuaWR9XWBcclxuXHJcblx0XHQvLyBmb3IobGV0IGVudGl0eVJlZ2lzdHJ5IG9mIHRoaXMuZW50aXRpZXNbXCJyZWdpc3RyeVwiXS52YWx1ZXMoKSlcclxuXHRcdC8vIFx0aWYoZW50aXR5UmVnaXN0cnkuaGFzKHRoaXMuaWQpKVxyXG5cdFx0Ly8gXHRcdHMgKz0gYCR7ZW50aXR5UmVnaXN0cnkuZ2V0KHRoaXMuaWQpLmNvbnN0cnVjdG9yLm5hbWV9YC5zcGxpdCgvKFxcbnxcXG5cXHJ8XFxyXFxufFxccikvZykubWFwKHMgPT4gYFxcblxcdCR7c31gKVxyXG5cclxuXHRcdHJldHVybiBzXHJcblx0fVxyXG59Il19