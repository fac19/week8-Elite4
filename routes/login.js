import query from "../query.js";

const app = document.querySelector("#app");

const html = /*html*/ `
<nav>
  <a href="/">Home</a>
</nav>
<h2>Login to add to your Pokemon collection</h2>
<form class="login-form"> 

  <label for="email">Email<span aria-hidden="true">*</span></label>
  <input type="email" id="email" 
  placeholder="Insert email here" 
  name="email" required>

  <label for="password">Password<span aria-hidden="true">*</span></label>
  <input type="password" id="password" 
  placeholder="Insert password here" 
  name="password" required>
  
  <div id="errorMessage"></div>

  <button type="submit">Log In</button>
</form>
`;

function logIn({ redirect }) {
	app.innerHTML = html;

	app.querySelector(".login-form").addEventListener("submit", (event) => {
		event.preventDefault();
		const formData = new FormData(event.target);
		const formObject = Object.fromEntries(formData);

		query("https://fac19-pokemon.herokuapp.com/v1/users/login", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify(formObject)
		})
			.then((body) => {
				window.localStorage.setItem("token", body.access_token);
				window.localStorage.setItem("userId", body.id);
				redirect("/");
			})
			.catch((error) => {
				console.error(error);
				app.querySelector("#errorMessage").textContent = "";
				app.querySelector("#errorMessage").append("Your username does not exist or your password does not match");
			});
	});
}

export default logIn;
