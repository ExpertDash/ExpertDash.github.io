import KeySystem from "../common/systems/keySystem.js";
import MouseSystem from "../common/systems/mouseSystem.js";
import World from "../common/world.js";
/** Unifies mouse button and key state acquisition methods */
export default class Input {
    /** Position of the mouse on the display */
    static get mousePosition() {
        return World.systems.get(MouseSystem).position;
    }
    static held(button) {
        return button.startsWith("Mouse") ? World.systems.get(MouseSystem).held(button) : World.systems.get(KeySystem).held(button);
    }
    static down(button) {
        return button.startsWith("Mouse") ? World.systems.get(MouseSystem).down(button) : World.systems.get(KeySystem).down(button);
    }
    static up(button) {
        return button.startsWith("Mouse") ? World.systems.get(MouseSystem).up(button) : World.systems.get(KeySystem).up(button);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvaW5wdXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLE1BQU0sZ0NBQWdDLENBQUE7QUFDdEQsT0FBTyxXQUFXLE1BQU0sa0NBQWtDLENBQUE7QUFDMUQsT0FBTyxLQUFLLE1BQU0sb0JBQW9CLENBQUE7QUFHdEMsNkRBQTZEO0FBQzdELE1BQU0sQ0FBQyxPQUFPLE9BQU8sS0FBSztJQUN6QiwyQ0FBMkM7SUFDcEMsTUFBTSxLQUFLLGFBQWE7UUFDOUIsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxRQUFRLENBQUE7SUFDL0MsQ0FBQztJQUVNLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBYztRQUNoQyxPQUFPLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQzVILENBQUM7SUFFTSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQWM7UUFDaEMsT0FBTyxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUM1SCxDQUFDO0lBRU0sTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFjO1FBQzlCLE9BQU8sTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDeEgsQ0FBQztDQUNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEtleVN5c3RlbSBmcm9tIFwiLi4vY29tbW9uL3N5c3RlbXMva2V5U3lzdGVtLmpzXCJcclxuaW1wb3J0IE1vdXNlU3lzdGVtIGZyb20gXCIuLi9jb21tb24vc3lzdGVtcy9tb3VzZVN5c3RlbS5qc1wiXHJcbmltcG9ydCBXb3JsZCBmcm9tIFwiLi4vY29tbW9uL3dvcmxkLmpzXCJcclxuaW1wb3J0IFZlY3RvcjMgZnJvbSBcIi4uL21hdGgvdmVjMy5qc1wiXHJcblxyXG4vKiogVW5pZmllcyBtb3VzZSBidXR0b24gYW5kIGtleSBzdGF0ZSBhY3F1aXNpdGlvbiBtZXRob2RzICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIElucHV0IHtcclxuXHQvKiogUG9zaXRpb24gb2YgdGhlIG1vdXNlIG9uIHRoZSBkaXNwbGF5ICovXHJcblx0cHVibGljIHN0YXRpYyBnZXQgbW91c2VQb3NpdGlvbigpOiBWZWN0b3IzIHtcclxuXHRcdHJldHVybiBXb3JsZC5zeXN0ZW1zLmdldChNb3VzZVN5c3RlbSkucG9zaXRpb25cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzdGF0aWMgaGVsZChidXR0b246IHN0cmluZyk6IGJvb2xlYW4ge1xyXG5cdFx0cmV0dXJuIGJ1dHRvbi5zdGFydHNXaXRoKFwiTW91c2VcIikgPyBXb3JsZC5zeXN0ZW1zLmdldChNb3VzZVN5c3RlbSkuaGVsZChidXR0b24pIDogV29ybGQuc3lzdGVtcy5nZXQoS2V5U3lzdGVtKS5oZWxkKGJ1dHRvbilcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzdGF0aWMgZG93bihidXR0b246IHN0cmluZyk6IGJvb2xlYW4ge1xyXG5cdFx0cmV0dXJuIGJ1dHRvbi5zdGFydHNXaXRoKFwiTW91c2VcIikgPyBXb3JsZC5zeXN0ZW1zLmdldChNb3VzZVN5c3RlbSkuZG93bihidXR0b24pIDogV29ybGQuc3lzdGVtcy5nZXQoS2V5U3lzdGVtKS5kb3duKGJ1dHRvbilcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzdGF0aWMgdXAoYnV0dG9uOiBzdHJpbmcpOiBib29sZWFuIHtcclxuXHRcdHJldHVybiBidXR0b24uc3RhcnRzV2l0aChcIk1vdXNlXCIpID8gV29ybGQuc3lzdGVtcy5nZXQoTW91c2VTeXN0ZW0pLnVwKGJ1dHRvbikgOiBXb3JsZC5zeXN0ZW1zLmdldChLZXlTeXN0ZW0pLnVwKGJ1dHRvbilcclxuXHR9XHJcbn0iXX0=