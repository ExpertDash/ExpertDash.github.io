import Entity from "./entity.js";
/**
 * Containins all entities and systems
 */
export default class Entities {
    constructor() {
        this.registry = new Map();
        this.ids = new Set();
        this.unusedIds = new Set();
        this.nextId = 0;
    }
    /**
     * The amount of entities present
     */
    get count() {
        return this.ids.size;
    }
    /**
     * @returns The entity associated with the given id
     */
    from(entityId) {
        return new Entity(this, entityId);
    }
    /**
     * @param components Components which the component will start with
     * @returns A new, unique entity with the specified components
     */
    create(...components) {
        let id;
        if (this.unusedIds.size == 0) {
            id = this.nextId;
            ++this.nextId;
        }
        else {
            let it = this.unusedIds[Symbol.iterator]();
            let result = it.next();
            id = result.value;
            this.unusedIds.delete(id);
        }
        this.ids.add(id);
        let entity = new Entity(this, id);
        entity.add(...components);
        return entity;
    }
    /**
     * @param executor Function to run on all components of matching entities
     * @param ctors Components which an entity must have
     */
    forEach(executor, ...ctors) {
        if (ctors.length == 0)
            return;
        outer: for (let id of this.registry.get(ctors[0]).keys()) {
            let components = [];
            for (let i = 0; i < ctors.length; i++) {
                let componentRegistry = this.registry.get(ctors[i]);
                if (!componentRegistry.has(id))
                    continue outer;
                components.push(componentRegistry.get(id));
            }
            executor(...components);
        }
    }
    /**
     * @param ctors Components which an entity must have
     * @returns An iterator for each entity with the specified components
     */
    *with(...ctors) {
        if (ctors.length == 0)
            return;
        outer: for (let id of this.registry.get(ctors[0]).keys()) {
            for (let i = 1; i < ctors.length; i++)
                if (!this.registry.get(ctors[i]).has(id))
                    continue outer;
            yield new Entity(this, id);
        }
    }
    *[Symbol.iterator]() {
        for (let id of this.ids)
            yield new Entity(this, id);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50aXRpZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZWNzL2VudGl0aWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sTUFBTSxNQUFNLGFBQWEsQ0FBQTtBQU1oQzs7R0FFRztBQUNILE1BQU0sQ0FBQyxPQUFPLE9BQU8sUUFBUTtJQUE3QjtRQUNrQixhQUFRLEdBQXdELElBQUksR0FBRyxFQUFFLENBQUE7UUFDbEYsUUFBRyxHQUFnQixJQUFJLEdBQUcsRUFBRSxDQUFBO1FBQzVCLGNBQVMsR0FBZ0IsSUFBSSxHQUFHLEVBQUUsQ0FBQTtRQUNsQyxXQUFNLEdBQVcsQ0FBQyxDQUFBO0lBdUYzQixDQUFDO0lBckZBOztPQUVHO0lBQ0gsSUFBVyxLQUFLO1FBQ2YsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQTtJQUNyQixDQUFDO0lBRUQ7O09BRUc7SUFDSSxJQUFJLENBQUMsUUFBZ0I7UUFDM0IsT0FBTyxJQUFJLE1BQU0sQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFDbEMsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxHQUFHLFVBQXlEO1FBQ3pFLElBQUksRUFBVSxDQUFBO1FBRWQsSUFBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksSUFBSSxDQUFDLEVBQUU7WUFDNUIsRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUE7WUFDaEIsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFBO1NBQ2I7YUFBTTtZQUNOLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUE7WUFDMUMsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFBO1lBQ3RCLEVBQUUsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFBO1lBRWpCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFBO1NBQ3pCO1FBRUQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUE7UUFFaEIsSUFBSSxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFBO1FBQ2pDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxVQUFVLENBQUMsQ0FBQTtRQUV6QixPQUFPLE1BQU0sQ0FBQTtJQUNkLENBQUM7SUFFRDs7O09BR0c7SUFDSSxPQUFPLENBQWtDLFFBQStCLEVBQUUsR0FBRyxLQUEyQjtRQUM5RyxJQUFHLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQztZQUNuQixPQUFNO1FBRVAsS0FBSyxFQUFDLEtBQUksSUFBSSxFQUFFLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDdkQsSUFBSSxVQUFVLEdBQWdCLEVBQUUsQ0FBQTtZQUVoQyxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDckMsSUFBSSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtnQkFFbkQsSUFBRyxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7b0JBQzVCLFNBQVMsS0FBSyxDQUFBO2dCQUVmLFVBQVUsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7YUFDMUM7WUFFRCxRQUFRLENBQUMsR0FBSSxVQUF3QixDQUFDLENBQUE7U0FDdEM7SUFDRixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUErQjtRQUM5QyxJQUFHLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQztZQUNuQixPQUFNO1FBRVAsS0FBSyxFQUFDLEtBQUksSUFBSSxFQUFFLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDdkQsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFO2dCQUNuQyxJQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztvQkFDdEMsU0FBUyxLQUFLLENBQUE7WUFFaEIsTUFBTSxJQUFJLE1BQU0sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUE7U0FDMUI7SUFDRixDQUFDO0lBRU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDeEIsS0FBSSxJQUFJLEVBQUUsSUFBSSxJQUFJLENBQUMsR0FBRztZQUNyQixNQUFNLElBQUksTUFBTSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQTtJQUM1QixDQUFDO0NBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tcG9uZW50IGZyb20gXCIuL2NvbXBvbmVudC5qc1wiXHJcbmltcG9ydCBFbnRpdHkgZnJvbSBcIi4vZW50aXR5LmpzXCJcclxuXHJcbnR5cGUgQ29uc3RydWN0b3I8VD4gPSBuZXcoLi4uYXJnczogYW55W10pID0+IFRcclxudHlwZSBEZWZhdWx0Q29uc3RydWN0b3I8VD4gPSBuZXcoKSA9PiBUXHJcbnR5cGUgTWFwVG9Db25zdHJ1Y3RvcjxUcz4gPSB7cmVhZG9ubHkgW0sgaW4ga2V5b2YgVHNdOiBDb25zdHJ1Y3RvcjxUc1tLXT59XHJcblxyXG4vKipcclxuICogQ29udGFpbmlucyBhbGwgZW50aXRpZXMgYW5kIHN5c3RlbXNcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVudGl0aWVzIHtcclxuXHRwcml2YXRlIHJlYWRvbmx5IHJlZ2lzdHJ5OiBNYXA8Q29uc3RydWN0b3I8Q29tcG9uZW50PiwgTWFwPG51bWJlciwgQ29tcG9uZW50Pj4gPSBuZXcgTWFwKClcclxuXHRwcml2YXRlIGlkczogU2V0PG51bWJlcj4gPSBuZXcgU2V0KClcclxuXHRwcml2YXRlIHVudXNlZElkczogU2V0PG51bWJlcj4gPSBuZXcgU2V0KClcclxuXHRwcml2YXRlIG5leHRJZDogbnVtYmVyID0gMFxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgYW1vdW50IG9mIGVudGl0aWVzIHByZXNlbnRcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0IGNvdW50KCk6IG51bWJlciB7XHJcblx0XHRyZXR1cm4gdGhpcy5pZHMuc2l6ZVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQHJldHVybnMgVGhlIGVudGl0eSBhc3NvY2lhdGVkIHdpdGggdGhlIGdpdmVuIGlkXHJcblx0ICovXHJcblx0cHVibGljIGZyb20oZW50aXR5SWQ6IG51bWJlcik6IEVudGl0eSB7XHJcblx0XHRyZXR1cm4gbmV3IEVudGl0eSh0aGlzLCBlbnRpdHlJZClcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBwYXJhbSBjb21wb25lbnRzIENvbXBvbmVudHMgd2hpY2ggdGhlIGNvbXBvbmVudCB3aWxsIHN0YXJ0IHdpdGhcclxuXHQgKiBAcmV0dXJucyBBIG5ldywgdW5pcXVlIGVudGl0eSB3aXRoIHRoZSBzcGVjaWZpZWQgY29tcG9uZW50c1xyXG5cdCAqL1xyXG5cdHB1YmxpYyBjcmVhdGUoLi4uY29tcG9uZW50czogKENvbXBvbmVudCB8IERlZmF1bHRDb25zdHJ1Y3RvcjxDb21wb25lbnQ+KVtdKTogRW50aXR5IHtcclxuXHRcdGxldCBpZDogbnVtYmVyXHJcblxyXG5cdFx0aWYodGhpcy51bnVzZWRJZHMuc2l6ZSA9PSAwKSB7XHJcblx0XHRcdGlkID0gdGhpcy5uZXh0SWRcclxuXHRcdFx0Kyt0aGlzLm5leHRJZFxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0bGV0IGl0ID0gdGhpcy51bnVzZWRJZHNbU3ltYm9sLml0ZXJhdG9yXSgpXHJcblx0XHRcdGxldCByZXN1bHQgPSBpdC5uZXh0KClcclxuXHRcdFx0aWQgPSByZXN1bHQudmFsdWVcclxuXHJcblx0XHRcdHRoaXMudW51c2VkSWRzLmRlbGV0ZShpZClcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmlkcy5hZGQoaWQpXHJcblxyXG5cdFx0bGV0IGVudGl0eSA9IG5ldyBFbnRpdHkodGhpcywgaWQpXHJcblx0XHRlbnRpdHkuYWRkKC4uLmNvbXBvbmVudHMpXHJcblxyXG5cdFx0cmV0dXJuIGVudGl0eVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQHBhcmFtIGV4ZWN1dG9yIEZ1bmN0aW9uIHRvIHJ1biBvbiBhbGwgY29tcG9uZW50cyBvZiBtYXRjaGluZyBlbnRpdGllc1xyXG5cdCAqIEBwYXJhbSBjdG9ycyBDb21wb25lbnRzIHdoaWNoIGFuIGVudGl0eSBtdXN0IGhhdmVcclxuXHQgKi9cclxuXHRwdWJsaWMgZm9yRWFjaDxUcyBleHRlbmRzIHJlYWRvbmx5IENvbXBvbmVudFtdPihleGVjdXRvcjogKC4uLmFyZ3M6IFRzKSA9PiB2b2lkLCAuLi5jdG9yczogTWFwVG9Db25zdHJ1Y3RvcjxUcz4pOiB2b2lkIHtcclxuXHRcdGlmKGN0b3JzLmxlbmd0aCA9PSAwKVxyXG5cdFx0XHRyZXR1cm5cclxuXHJcblx0XHRvdXRlcjpmb3IobGV0IGlkIG9mIHRoaXMucmVnaXN0cnkuZ2V0KGN0b3JzWzBdKS5rZXlzKCkpIHtcclxuXHRcdFx0bGV0IGNvbXBvbmVudHM6IENvbXBvbmVudFtdID0gW11cclxuXHJcblx0XHRcdGZvcihsZXQgaSA9IDA7IGkgPCBjdG9ycy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdGxldCBjb21wb25lbnRSZWdpc3RyeSA9IHRoaXMucmVnaXN0cnkuZ2V0KGN0b3JzW2ldKVxyXG5cclxuXHRcdFx0XHRpZighY29tcG9uZW50UmVnaXN0cnkuaGFzKGlkKSlcclxuXHRcdFx0XHRcdGNvbnRpbnVlIG91dGVyXHJcblxyXG5cdFx0XHRcdGNvbXBvbmVudHMucHVzaChjb21wb25lbnRSZWdpc3RyeS5nZXQoaWQpKVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRleGVjdXRvciguLi4oY29tcG9uZW50cyBhcyBhbnkgYXMgVHMpKVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQHBhcmFtIGN0b3JzIENvbXBvbmVudHMgd2hpY2ggYW4gZW50aXR5IG11c3QgaGF2ZVxyXG5cdCAqIEByZXR1cm5zIEFuIGl0ZXJhdG9yIGZvciBlYWNoIGVudGl0eSB3aXRoIHRoZSBzcGVjaWZpZWQgY29tcG9uZW50c1xyXG5cdCAqL1xyXG5cdHB1YmxpYyAqd2l0aCguLi5jdG9yczogQ29uc3RydWN0b3I8Q29tcG9uZW50PltdKTogSXRlcmFibGVJdGVyYXRvcjxFbnRpdHk+IHtcclxuXHRcdGlmKGN0b3JzLmxlbmd0aCA9PSAwKVxyXG5cdFx0XHRyZXR1cm5cclxuXHJcblx0XHRvdXRlcjpmb3IobGV0IGlkIG9mIHRoaXMucmVnaXN0cnkuZ2V0KGN0b3JzWzBdKS5rZXlzKCkpIHtcclxuXHRcdFx0Zm9yKGxldCBpID0gMTsgaSA8IGN0b3JzLmxlbmd0aDsgaSsrKVxyXG5cdFx0XHRcdGlmKCF0aGlzLnJlZ2lzdHJ5LmdldChjdG9yc1tpXSkuaGFzKGlkKSlcclxuXHRcdFx0XHRcdGNvbnRpbnVlIG91dGVyXHJcblxyXG5cdFx0XHR5aWVsZCBuZXcgRW50aXR5KHRoaXMsIGlkKVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cHVibGljICpbU3ltYm9sLml0ZXJhdG9yXSgpOiBJdGVyYWJsZUl0ZXJhdG9yPEVudGl0eT4ge1xyXG5cdFx0Zm9yKGxldCBpZCBvZiB0aGlzLmlkcylcclxuXHRcdFx0eWllbGQgbmV3IEVudGl0eSh0aGlzLCBpZClcclxuXHR9XHJcbn0iXX0=