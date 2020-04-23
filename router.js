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

	function handleClick(event) {
		// if (e.button)
		if (event.target.tagName === "A") {
			event.preventDefault();
			window.history.pushState(null, null, event.target.href);
			navigate(event.target.href);
		}
	}

	function redirect() {}

	function listen() {
		window.addEventListener("click", handleClick);
		// window.addEventListener("popState", () => {
		// 	return navigate(window.location);
		// });
	}

	return { get, navigate, redirect, listen };
}

export default router;
