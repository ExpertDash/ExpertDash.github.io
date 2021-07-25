/** Fetches content from a location */
export default class Retriever {
	/**
	 * Retrieves an internal file
	 * @param path Path to file
	 * @returns Content at path
	 */
	public static fetch(path: string): Promise<string> {
		return new Promise(resolve => {
			const request = new XMLHttpRequest()

			request.onload = () => {
				if(request.readyState == 4 && request.status == 200)
					resolve(request.responseText)
			}

			request.onerror = () => resolve(null)
			request.open("get", path, true)
			request.send()
		})
	}
}