"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Fetches content from a location */
class Retriever {
    /**
     * Retrieves an internal file
     * @param path Path to file
     * @returns Content at path
     */
    static fetch(path) {
        return new Promise(resolve => {
            const request = new XMLHttpRequest();
            request.onload = () => {
                if (request.readyState == 4 && request.status == 200)
                    resolve(request.responseText);
            };
            request.onerror = () => resolve(null);
            request.open("get", path, true);
            request.send();
        });
    }
}
exports.default = Retriever;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmV0cmlldmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL3JldHJpZXZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFzQztBQUN0QyxNQUFxQixTQUFTO0lBQzdCOzs7O09BSUc7SUFDSSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQVk7UUFDL0IsT0FBTyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUM1QixNQUFNLE9BQU8sR0FBRyxJQUFJLGNBQWMsRUFBRSxDQUFBO1lBRXBDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsR0FBRyxFQUFFO2dCQUNyQixJQUFHLE9BQU8sQ0FBQyxVQUFVLElBQUksQ0FBQyxJQUFJLE9BQU8sQ0FBQyxNQUFNLElBQUksR0FBRztvQkFDbEQsT0FBTyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQTtZQUMvQixDQUFDLENBQUE7WUFFRCxPQUFPLENBQUMsT0FBTyxHQUFHLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUNyQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUE7WUFDL0IsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFBO1FBQ2YsQ0FBQyxDQUFDLENBQUE7SUFDSCxDQUFDO0NBQ0Q7QUFwQkQsNEJBb0JDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIEZldGNoZXMgY29udGVudCBmcm9tIGEgbG9jYXRpb24gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmV0cmlldmVyIHtcclxuXHQvKipcclxuXHQgKiBSZXRyaWV2ZXMgYW4gaW50ZXJuYWwgZmlsZVxyXG5cdCAqIEBwYXJhbSBwYXRoIFBhdGggdG8gZmlsZVxyXG5cdCAqIEByZXR1cm5zIENvbnRlbnQgYXQgcGF0aFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBzdGF0aWMgZmV0Y2gocGF0aDogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuXHRcdFx0Y29uc3QgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpXHJcblxyXG5cdFx0XHRyZXF1ZXN0Lm9ubG9hZCA9ICgpID0+IHtcclxuXHRcdFx0XHRpZihyZXF1ZXN0LnJlYWR5U3RhdGUgPT0gNCAmJiByZXF1ZXN0LnN0YXR1cyA9PSAyMDApXHJcblx0XHRcdFx0XHRyZXNvbHZlKHJlcXVlc3QucmVzcG9uc2VUZXh0KVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXF1ZXN0Lm9uZXJyb3IgPSAoKSA9PiByZXNvbHZlKG51bGwpXHJcblx0XHRcdHJlcXVlc3Qub3BlbihcImdldFwiLCBwYXRoLCB0cnVlKVxyXG5cdFx0XHRyZXF1ZXN0LnNlbmQoKVxyXG5cdFx0fSlcclxuXHR9XHJcbn0iXX0=