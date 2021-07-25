"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const entity_js_1 = __importDefault(require("./entity.js"));
/**
 * Containins all entities and systems
 */
class Entities {
    constructor() {
        this.registry = new Map();
        this.ids = new Set();
        this.unusedIds = new Set();
        this.nextId = 0;
    }
    get count() {
        return this.ids.size;
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
        let entity = new entity_js_1.default(this, id);
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
            yield new entity_js_1.default(this, id);
        }
    }
    *[Symbol.iterator]() {
        for (let id of this.ids)
            yield new entity_js_1.default(this, id);
    }
}
exports.default = Entities;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50aXRpZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZWNzL2VudGl0aWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsNERBQWdDO0FBTWhDOztHQUVHO0FBQ0gsTUFBcUIsUUFBUTtJQUE3QjtRQUNrQixhQUFRLEdBQXdELElBQUksR0FBRyxFQUFFLENBQUE7UUFDbEYsUUFBRyxHQUFnQixJQUFJLEdBQUcsRUFBRSxDQUFBO1FBQzVCLGNBQVMsR0FBZ0IsSUFBSSxHQUFHLEVBQUUsQ0FBQTtRQUNsQyxXQUFNLEdBQVcsQ0FBQyxDQUFBO0lBNkUzQixDQUFDO0lBM0VBLElBQVcsS0FBSztRQUNmLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUE7SUFDckIsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxHQUFHLFVBQXlEO1FBQ3pFLElBQUksRUFBVSxDQUFBO1FBRWQsSUFBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksSUFBSSxDQUFDLEVBQUU7WUFDNUIsRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUE7WUFDaEIsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFBO1NBQ2I7YUFBTTtZQUNOLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUE7WUFDMUMsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFBO1lBQ3RCLEVBQUUsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFBO1lBRWpCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFBO1NBQ3pCO1FBRUQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUE7UUFFaEIsSUFBSSxNQUFNLEdBQUcsSUFBSSxtQkFBTSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQTtRQUNqQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsVUFBVSxDQUFDLENBQUE7UUFFekIsT0FBTyxNQUFNLENBQUE7SUFDZCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksT0FBTyxDQUFrQyxRQUErQixFQUFFLEdBQUcsS0FBMkI7UUFDOUcsSUFBRyxLQUFLLENBQUMsTUFBTSxJQUFJLENBQUM7WUFDbkIsT0FBTTtRQUVQLEtBQUssRUFBQyxLQUFJLElBQUksRUFBRSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ3ZELElBQUksVUFBVSxHQUFnQixFQUFFLENBQUE7WUFFaEMsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3JDLElBQUksaUJBQWlCLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7Z0JBRW5ELElBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO29CQUM1QixTQUFTLEtBQUssQ0FBQTtnQkFFZixVQUFVLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO2FBQzFDO1lBRUQsUUFBUSxDQUFDLEdBQUksVUFBNEIsQ0FBQyxDQUFBO1NBQzFDO0lBQ0YsQ0FBQztJQUVEOzs7T0FHRztJQUNJLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBK0I7UUFDOUMsSUFBRyxLQUFLLENBQUMsTUFBTSxJQUFJLENBQUM7WUFDbkIsT0FBTTtRQUVQLEtBQUssRUFBQyxLQUFJLElBQUksRUFBRSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ3ZELEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRTtnQkFDbkMsSUFBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7b0JBQ3RDLFNBQVMsS0FBSyxDQUFBO1lBRWhCLE1BQU0sSUFBSSxtQkFBTSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQTtTQUMxQjtJQUNGLENBQUM7SUFFTSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUN4QixLQUFJLElBQUksRUFBRSxJQUFJLElBQUksQ0FBQyxHQUFHO1lBQ3JCLE1BQU0sSUFBSSxtQkFBTSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQTtJQUM1QixDQUFDO0NBQ0Q7QUFqRkQsMkJBaUZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbXBvbmVudCBmcm9tIFwiLi9jb21wb25lbnQuanNcIlxyXG5pbXBvcnQgRW50aXR5IGZyb20gXCIuL2VudGl0eS5qc1wiXHJcblxyXG50eXBlIENvbnN0cnVjdG9yPFQ+ID0gbmV3KC4uLmFyZ3M6IGFueVtdKSA9PiBUXHJcbnR5cGUgRGVmYXVsdENvbnN0cnVjdG9yPFQ+ID0gbmV3KCkgPT4gVFxyXG50eXBlIE1hcFRvQ29uc3RydWN0b3I8VHM+ID0ge3JlYWRvbmx5IFtLIGluIGtleW9mIFRzXTogQ29uc3RydWN0b3I8VHNbS10+fVxyXG5cclxuLyoqXHJcbiAqIENvbnRhaW5pbnMgYWxsIGVudGl0aWVzIGFuZCBzeXN0ZW1zXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbnRpdGllcyB7XHJcblx0cHJpdmF0ZSByZWFkb25seSByZWdpc3RyeTogTWFwPENvbnN0cnVjdG9yPENvbXBvbmVudD4sIE1hcDxudW1iZXIsIENvbXBvbmVudD4+ID0gbmV3IE1hcCgpXHJcblx0cHJpdmF0ZSBpZHM6IFNldDxudW1iZXI+ID0gbmV3IFNldCgpXHJcblx0cHJpdmF0ZSB1bnVzZWRJZHM6IFNldDxudW1iZXI+ID0gbmV3IFNldCgpXHJcblx0cHJpdmF0ZSBuZXh0SWQ6IG51bWJlciA9IDBcclxuXHJcblx0cHVibGljIGdldCBjb3VudCgpOiBudW1iZXIge1xyXG5cdFx0cmV0dXJuIHRoaXMuaWRzLnNpemVcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBwYXJhbSBjb21wb25lbnRzIENvbXBvbmVudHMgd2hpY2ggdGhlIGNvbXBvbmVudCB3aWxsIHN0YXJ0IHdpdGhcclxuXHQgKiBAcmV0dXJucyBBIG5ldywgdW5pcXVlIGVudGl0eSB3aXRoIHRoZSBzcGVjaWZpZWQgY29tcG9uZW50c1xyXG5cdCAqL1xyXG5cdHB1YmxpYyBjcmVhdGUoLi4uY29tcG9uZW50czogKENvbXBvbmVudCB8IERlZmF1bHRDb25zdHJ1Y3RvcjxDb21wb25lbnQ+KVtdKTogRW50aXR5IHtcclxuXHRcdGxldCBpZDogbnVtYmVyXHJcblxyXG5cdFx0aWYodGhpcy51bnVzZWRJZHMuc2l6ZSA9PSAwKSB7XHJcblx0XHRcdGlkID0gdGhpcy5uZXh0SWRcclxuXHRcdFx0Kyt0aGlzLm5leHRJZFxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0bGV0IGl0ID0gdGhpcy51bnVzZWRJZHNbU3ltYm9sLml0ZXJhdG9yXSgpXHJcblx0XHRcdGxldCByZXN1bHQgPSBpdC5uZXh0KClcclxuXHRcdFx0aWQgPSByZXN1bHQudmFsdWVcclxuXHJcblx0XHRcdHRoaXMudW51c2VkSWRzLmRlbGV0ZShpZClcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmlkcy5hZGQoaWQpXHJcblxyXG5cdFx0bGV0IGVudGl0eSA9IG5ldyBFbnRpdHkodGhpcywgaWQpXHJcblx0XHRlbnRpdHkuYWRkKC4uLmNvbXBvbmVudHMpXHJcblxyXG5cdFx0cmV0dXJuIGVudGl0eVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQHBhcmFtIGV4ZWN1dG9yIEZ1bmN0aW9uIHRvIHJ1biBvbiBhbGwgY29tcG9uZW50cyBvZiBtYXRjaGluZyBlbnRpdGllc1xyXG5cdCAqIEBwYXJhbSBjdG9ycyBDb21wb25lbnRzIHdoaWNoIGFuIGVudGl0eSBtdXN0IGhhdmVcclxuXHQgKi9cclxuXHRwdWJsaWMgZm9yRWFjaDxUcyBleHRlbmRzIHJlYWRvbmx5IENvbXBvbmVudFtdPihleGVjdXRvcjogKC4uLmFyZ3M6IFRzKSA9PiB2b2lkLCAuLi5jdG9yczogTWFwVG9Db25zdHJ1Y3RvcjxUcz4pOiB2b2lkIHtcclxuXHRcdGlmKGN0b3JzLmxlbmd0aCA9PSAwKVxyXG5cdFx0XHRyZXR1cm5cclxuXHJcblx0XHRvdXRlcjpmb3IobGV0IGlkIG9mIHRoaXMucmVnaXN0cnkuZ2V0KGN0b3JzWzBdKS5rZXlzKCkpIHtcclxuXHRcdFx0bGV0IGNvbXBvbmVudHM6IENvbXBvbmVudFtdID0gW11cclxuXHJcblx0XHRcdGZvcihsZXQgaSA9IDA7IGkgPCBjdG9ycy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdGxldCBjb21wb25lbnRSZWdpc3RyeSA9IHRoaXMucmVnaXN0cnkuZ2V0KGN0b3JzW2ldKVxyXG5cclxuXHRcdFx0XHRpZighY29tcG9uZW50UmVnaXN0cnkuaGFzKGlkKSlcclxuXHRcdFx0XHRcdGNvbnRpbnVlIG91dGVyXHJcblxyXG5cdFx0XHRcdGNvbXBvbmVudHMucHVzaChjb21wb25lbnRSZWdpc3RyeS5nZXQoaWQpKVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRleGVjdXRvciguLi4oY29tcG9uZW50cyBhcyB1bmtub3duIGFzIFRzKSlcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBwYXJhbSBjdG9ycyBDb21wb25lbnRzIHdoaWNoIGFuIGVudGl0eSBtdXN0IGhhdmVcclxuXHQgKiBAcmV0dXJucyBBbiBpdGVyYXRvciBmb3IgZWFjaCBlbnRpdHkgd2l0aCB0aGUgc3BlY2lmaWVkIGNvbXBvbmVudHNcclxuXHQgKi9cclxuXHRwdWJsaWMgKndpdGgoLi4uY3RvcnM6IENvbnN0cnVjdG9yPENvbXBvbmVudD5bXSk6IEl0ZXJhYmxlSXRlcmF0b3I8RW50aXR5PiB7XHJcblx0XHRpZihjdG9ycy5sZW5ndGggPT0gMClcclxuXHRcdFx0cmV0dXJuXHJcblxyXG5cdFx0b3V0ZXI6Zm9yKGxldCBpZCBvZiB0aGlzLnJlZ2lzdHJ5LmdldChjdG9yc1swXSkua2V5cygpKSB7XHJcblx0XHRcdGZvcihsZXQgaSA9IDE7IGkgPCBjdG9ycy5sZW5ndGg7IGkrKylcclxuXHRcdFx0XHRpZighdGhpcy5yZWdpc3RyeS5nZXQoY3RvcnNbaV0pLmhhcyhpZCkpXHJcblx0XHRcdFx0XHRjb250aW51ZSBvdXRlclxyXG5cclxuXHRcdFx0eWllbGQgbmV3IEVudGl0eSh0aGlzLCBpZClcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHB1YmxpYyAqW1N5bWJvbC5pdGVyYXRvcl0oKTogSXRlcmFibGVJdGVyYXRvcjxFbnRpdHk+IHtcclxuXHRcdGZvcihsZXQgaWQgb2YgdGhpcy5pZHMpXHJcblx0XHRcdHlpZWxkIG5ldyBFbnRpdHkodGhpcywgaWQpXHJcblx0fVxyXG59Il19