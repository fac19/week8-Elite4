import query from "../query.js";

const app = document.querySelector("#app");
const loggedOutNav = document.querySelector("#loggedOutNav");

const html = /*html*/ `
<nav>
  <a href="/">Home</a>
</nav>
<form class="signup-form"> 

  <label for="email">Email<span aria-hidden="true">*</span></label>
  <input type="email" id="email" 
  placeholder="Insert email here"
  maxlength="50" 
  name="email" required>

  <label for="password">Password<span aria-hidden="true">*</span></label>
  <input type="password" id="password" 
  placeholder="Insert password here"
  minlength="8"
  maxlength="24"
  name="password" required>

  <label for="name">Name<span aria-hidden="true">*</span></label>
  <input type="text" id="name" 
  placeholder="Insert name here"
  maxlength="24" 
  name="name" required>
  
  <div id="errorMessage">
	<p>Your password should be at least 8 characters in length</p>
  </div>

  <button type="submit">Sign up</button>
</form>
`;

function signUp({ redirect }) {
	app.innerHTML = html;

	app.querySelector(".signup-form").addEventListener("submit", (event) => {
		event.preventDefault();
		const formData = new FormData(event.target);
		const formObject = Object.fromEntries(formData);

		query("https://fac19-pokemon.herokuapp.com/v1/users/", {
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
				app.querySelector("#errorMessage").append("Please make sure your password is 8 characters");
			});
	});
}

export default signUp;
