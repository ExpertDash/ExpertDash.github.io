"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Describes an aspect of an entity
 */
class Component {
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
exports.default = Component;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2Vjcy9jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQTs7R0FFRztBQUNILE1BQThCLFNBQVM7SUFDdEM7OztPQUdHO0lBQ08sS0FBSyxDQUFDLE1BQWMsSUFBUyxDQUFDO0lBRXhDOzs7T0FHRztJQUNPLE9BQU8sQ0FBQyxNQUFjLElBQVMsQ0FBQztDQUMxQztBQVpELDRCQVlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEVudGl0eSBmcm9tIFwiLi9lbnRpdHkuanNcIlxyXG5cclxuLyoqXHJcbiAqIERlc2NyaWJlcyBhbiBhc3BlY3Qgb2YgYW4gZW50aXR5XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBDb21wb25lbnQge1xyXG5cdC8qKlxyXG5cdCAqIENhbGxlZCBqdXN0IGFmdGVyIHRoaXMgY29tcG9uZW50IGhhcyBiZWVuIGFkZGVkIHRvIGFuIGVudGl0eVxyXG5cdCAqIEBwYXJhbSBFbnRpdHkgdGhpcyBjb21wb25lbnQgd2FzIGFkZGVkIHRvXHJcblx0ICovXHJcblx0cHJvdGVjdGVkIGFkZGVkKGVudGl0eTogRW50aXR5KTogdm9pZCB7fVxyXG5cclxuXHQvKipcclxuXHQgKiBDYWxsZWQganVzdCBiZWZvcmUgdGhpcyBjb21wb25lbnQgaGFzIGJlZW4gcmVtb3ZlZCBmcm9tIGFuIGVudGl0eVxyXG5cdCAqIEBwYXJhbSBlbnRpdHkgRW50aXR5IHRoaXMgY29tcG9uZW50IHdhcyByZW1vdmVkIGZyb21cclxuXHQgKi9cclxuXHRwcm90ZWN0ZWQgcmVtb3ZlZChlbnRpdHk6IEVudGl0eSk6IHZvaWQge31cclxufSJdfQ==