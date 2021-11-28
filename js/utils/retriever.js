/** Fetches content from a location */
export default class Retriever {
    /**
     * Retrieves an internal file
     * @param path Path to file
     * @returns Content at path
     */
    static fetch(path) {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.onerror = () => reject("Request encountered a network error");
            request.ontimeout = () => reject(`Request timed out after ${request.timeout}ms`);
            request.onload = () => {
                switch (request.readyState) {
                    case 4:
                        switch (request.status) {
                            case 200:
                                resolve(request.responseText);
                                break;
                            default:
                                reject(`Request status was ${request.status}`);
                                break;
                        }
                        break;
                }
            };
            request.open("GET", path, true);
            request.send();
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmV0cmlldmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL3JldHJpZXZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxzQ0FBc0M7QUFDdEMsTUFBTSxDQUFDLE9BQU8sT0FBTyxTQUFTO0lBQzdCOzs7O09BSUc7SUFDSSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQVk7UUFDL0IsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUN0QyxNQUFNLE9BQU8sR0FBRyxJQUFJLGNBQWMsRUFBRSxDQUFBO1lBRXBDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLHFDQUFxQyxDQUFDLENBQUE7WUFDckUsT0FBTyxDQUFDLFNBQVMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsMkJBQTJCLE9BQU8sQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFBO1lBQ2hGLE9BQU8sQ0FBQyxNQUFNLEdBQUcsR0FBRyxFQUFFO2dCQUNyQixRQUFPLE9BQU8sQ0FBQyxVQUFVLEVBQUU7b0JBQzFCLEtBQUssQ0FBQzt3QkFDTCxRQUFPLE9BQU8sQ0FBQyxNQUFNLEVBQUU7NEJBQ3RCLEtBQUssR0FBRztnQ0FDUCxPQUFPLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFBO2dDQUM3QixNQUFLOzRCQUNOO2dDQUNDLE1BQU0sQ0FBQyxzQkFBc0IsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUE7Z0NBQzlDLE1BQUs7eUJBQ047d0JBQ0QsTUFBSztpQkFDTjtZQUNGLENBQUMsQ0FBQTtZQUVELE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQTtZQUMvQixPQUFPLENBQUMsSUFBSSxFQUFFLENBQUE7UUFDZixDQUFDLENBQUMsQ0FBQTtJQUNILENBQUM7Q0FDRCIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBGZXRjaGVzIGNvbnRlbnQgZnJvbSBhIGxvY2F0aW9uICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJldHJpZXZlciB7XHJcblx0LyoqXHJcblx0ICogUmV0cmlldmVzIGFuIGludGVybmFsIGZpbGVcclxuXHQgKiBAcGFyYW0gcGF0aCBQYXRoIHRvIGZpbGVcclxuXHQgKiBAcmV0dXJucyBDb250ZW50IGF0IHBhdGhcclxuXHQgKi9cclxuXHRwdWJsaWMgc3RhdGljIGZldGNoKHBhdGg6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRjb25zdCByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KClcclxuXHJcblx0XHRcdHJlcXVlc3Qub25lcnJvciA9ICgpID0+IHJlamVjdChcIlJlcXVlc3QgZW5jb3VudGVyZWQgYSBuZXR3b3JrIGVycm9yXCIpXHJcblx0XHRcdHJlcXVlc3Qub250aW1lb3V0ID0gKCkgPT4gcmVqZWN0KGBSZXF1ZXN0IHRpbWVkIG91dCBhZnRlciAke3JlcXVlc3QudGltZW91dH1tc2ApXHJcblx0XHRcdHJlcXVlc3Qub25sb2FkID0gKCkgPT4ge1xyXG5cdFx0XHRcdHN3aXRjaChyZXF1ZXN0LnJlYWR5U3RhdGUpIHtcclxuXHRcdFx0XHRcdGNhc2UgNDpcclxuXHRcdFx0XHRcdFx0c3dpdGNoKHJlcXVlc3Quc3RhdHVzKSB7XHJcblx0XHRcdFx0XHRcdFx0Y2FzZSAyMDA6XHJcblx0XHRcdFx0XHRcdFx0XHRyZXNvbHZlKHJlcXVlc3QucmVzcG9uc2VUZXh0KVxyXG5cdFx0XHRcdFx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHRcdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdFx0XHRcdFx0cmVqZWN0KGBSZXF1ZXN0IHN0YXR1cyB3YXMgJHtyZXF1ZXN0LnN0YXR1c31gKVxyXG5cdFx0XHRcdFx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRicmVha1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmVxdWVzdC5vcGVuKFwiR0VUXCIsIHBhdGgsIHRydWUpXHJcblx0XHRcdHJlcXVlc3Quc2VuZCgpXHJcblx0XHR9KVxyXG5cdH1cclxufSJdfQ==