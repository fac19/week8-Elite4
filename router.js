function router() {
	const routes = {};

	function get(path, callback) {
		routes[path] = callback;
	}

	function navigate(url) {
		const parsedURL = new URL(url);
		const objCallback = routes[parsedURL.pathname];
		if (objCallback) {
			const obj = { urlObj: parsedURL, redirect };
			objCallback(obj);
		} else {
			const defaultCallback = routes["default"];
			defaultCallback();
		}
	}

	function handleClick(event) {
		if (
			event.button !== 0 ||
			event.metaKey ||
			event.shiftKey ||
			event.altKey ||
			event.ctrlKey
		)
			return;
		if (event.target.tagName === "A") {
			event.preventDefault();
			window.history.pushState(null, null, event.target.href);
			navigate(event.target.href);
		}
	}

	function redirect(path) {
		const fullURL = window.location.origin + path;
		window.history.pushState(null, null, fullURL);
		navigate(fullURL);
	}

	function listen() {
		navigate(window.location);
		window.addEventListener("click", handleClick);
		window.addEventListener("popstate", () => {
			navigate(window.location);
		});
	}

	//also a close() function in workshop solution but add it here if it is needed

	return { get, navigate, listen };
}

export default router;