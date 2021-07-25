/**
 * Describes an aspect of an entity
 */
export default class Component {
    /**
     * Called just after this component has been added to an entity
     * @param Entity this component was added to
     */
    added(entity) { }
    /**
     * Called just before this component has been removed from an entity
     * @param entity Entity this component was removed from
     */
    removed(entity) { }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2Vjcy9jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUE7O0dBRUc7QUFDSCxNQUFNLENBQUMsT0FBTyxPQUFnQixTQUFTO0lBQ3RDOzs7T0FHRztJQUNPLEtBQUssQ0FBQyxNQUFjLElBQVMsQ0FBQztJQUV4Qzs7O09BR0c7SUFDTyxPQUFPLENBQUMsTUFBYyxJQUFTLENBQUM7Q0FDMUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRW50aXR5IGZyb20gXCIuL2VudGl0eS5qc1wiXHJcblxyXG4vKipcclxuICogRGVzY3JpYmVzIGFuIGFzcGVjdCBvZiBhbiBlbnRpdHlcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIENvbXBvbmVudCB7XHJcblx0LyoqXHJcblx0ICogQ2FsbGVkIGp1c3QgYWZ0ZXIgdGhpcyBjb21wb25lbnQgaGFzIGJlZW4gYWRkZWQgdG8gYW4gZW50aXR5XHJcblx0ICogQHBhcmFtIEVudGl0eSB0aGlzIGNvbXBvbmVudCB3YXMgYWRkZWQgdG9cclxuXHQgKi9cclxuXHRwcm90ZWN0ZWQgYWRkZWQoZW50aXR5OiBFbnRpdHkpOiB2b2lkIHt9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENhbGxlZCBqdXN0IGJlZm9yZSB0aGlzIGNvbXBvbmVudCBoYXMgYmVlbiByZW1vdmVkIGZyb20gYW4gZW50aXR5XHJcblx0ICogQHBhcmFtIGVudGl0eSBFbnRpdHkgdGhpcyBjb21wb25lbnQgd2FzIHJlbW92ZWQgZnJvbVxyXG5cdCAqL1xyXG5cdHByb3RlY3RlZCByZW1vdmVkKGVudGl0eTogRW50aXR5KTogdm9pZCB7fVxyXG59Il19