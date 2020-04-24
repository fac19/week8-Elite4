import query from "../query.js";

const loggedoutHTML = /*html*/ `
<nav></nav>
 <h2>You must be logged in to add a Pokemon</h2>
 `;

const loggedinHTML = /*html*/ `
<nav></nav>
<h2>Add a new Pokemon</h2>
<form>
<label for='name'>Name: </label>
<input type='text' name='name' id='name' minlength="1" maxlength="50" required>
<label for='breed'>Species: </label>
<input type='text' name='breed' id='breed' minlength="3" maxlength="30" required>
<div id='errorMessage'></div>
<button type='submit'>Add to your collection!</button>
</form>
`;

function newPokemon({ redirect }) {
	const token = localStorage.getItem("token");
	if (!token) {
		const domFrag = loggedOutNav.content.cloneNode(true);
		app.innerHTML = loggedoutHTML;
		app.querySelector("nav").append(domFrag);
		app
			.querySelector("#errorMessage")
			.append("You must be logged in to add a new pokemon.");
	} else {
		const domFrag = loggedInNav.content.cloneNode(true);
		app.innerHTML = loggedinHTML;
		app.querySelector("nav").append(domFrag);

		const form = app.querySelector("form");
		form.addEventListener("submit", () => {
			event.preventDefault();
			const formData = new FormData(event.target);
			const formObject = Object.fromEntries(formData);
			query(`https://fac19-pokemon.herokuapp.com/v1/dogs`, {
				method: "POST",
				headers: {
					authorization: `Bearer ${token}`,
					"content-type": "application/json"
				},
				body: JSON.stringify(formObject)
			})
				.then(() => {
					redirect("/my-pokemon");
				})
				.catch((error) => {
					console.error(error);
					app.querySelector("#errorMessage").append("Something went wrong :(");
				});
		});
	}
}

export default newPokemon;
