/** Fetches content from a location */
export default class Retriever {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmV0cmlldmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL3JldHJpZXZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxzQ0FBc0M7QUFDdEMsTUFBTSxDQUFDLE9BQU8sT0FBTyxTQUFTO0lBQzdCOzs7O09BSUc7SUFDSSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQVk7UUFDL0IsT0FBTyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUM1QixNQUFNLE9BQU8sR0FBRyxJQUFJLGNBQWMsRUFBRSxDQUFBO1lBRXBDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsR0FBRyxFQUFFO2dCQUNyQixJQUFHLE9BQU8sQ0FBQyxVQUFVLElBQUksQ0FBQyxJQUFJLE9BQU8sQ0FBQyxNQUFNLElBQUksR0FBRztvQkFDbEQsT0FBTyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQTtZQUMvQixDQUFDLENBQUE7WUFFRCxPQUFPLENBQUMsT0FBTyxHQUFHLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUNyQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUE7WUFDL0IsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFBO1FBQ2YsQ0FBQyxDQUFDLENBQUE7SUFDSCxDQUFDO0NBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogRmV0Y2hlcyBjb250ZW50IGZyb20gYSBsb2NhdGlvbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXRyaWV2ZXIge1xyXG5cdC8qKlxyXG5cdCAqIFJldHJpZXZlcyBhbiBpbnRlcm5hbCBmaWxlXHJcblx0ICogQHBhcmFtIHBhdGggUGF0aCB0byBmaWxlXHJcblx0ICogQHJldHVybnMgQ29udGVudCBhdCBwYXRoXHJcblx0ICovXHJcblx0cHVibGljIHN0YXRpYyBmZXRjaChwYXRoOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xyXG5cdFx0XHRjb25zdCByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KClcclxuXHJcblx0XHRcdHJlcXVlc3Qub25sb2FkID0gKCkgPT4ge1xyXG5cdFx0XHRcdGlmKHJlcXVlc3QucmVhZHlTdGF0ZSA9PSA0ICYmIHJlcXVlc3Quc3RhdHVzID09IDIwMClcclxuXHRcdFx0XHRcdHJlc29sdmUocmVxdWVzdC5yZXNwb25zZVRleHQpXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJlcXVlc3Qub25lcnJvciA9ICgpID0+IHJlc29sdmUobnVsbClcclxuXHRcdFx0cmVxdWVzdC5vcGVuKFwiZ2V0XCIsIHBhdGgsIHRydWUpXHJcblx0XHRcdHJlcXVlc3Quc2VuZCgpXHJcblx0XHR9KVxyXG5cdH1cclxufSJdfQ==