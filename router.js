function router() {
	const routes = {};

	function get(path, callback) {
		routes[path] = callback;
	}

	function navigate(url) {
		const parsedURL = new URL(url);
		const objCallback = routes[parsedURL.pathname];
		objCallback();
	}

	function redirect() {}

	function listen() {
		window.addEventListener("click", handleClick);
		// window.addEventListener("popState", handleClick);
	}

	return { get, navigate, redirect, listen };
}

export default router;
