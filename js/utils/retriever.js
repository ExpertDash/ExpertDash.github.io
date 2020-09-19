/** Fetches content from a location */
export default class Retriever {
	/**
	 * Retrieves an internal file
	 * @param {string} path Path to file
	 * @returns {Promise.<string>} Content at path
	 */
	static fetch(path) {
		return new Promise(resolve => {
			const request = new XMLHttpRequest()

			request.onload = () => {
				if(request.readyState == 4 && request.status == 200)
					resolve(request.responseText)
			}

			request.onerror = () => resolve("")
			request.open("get", path, true)
			request.send()
		})
	}
}