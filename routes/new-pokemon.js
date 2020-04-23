import query from "../query.js";

const loggedoutHTML = /*html*/ `
<nav></nav>
 <h1>You must be logged in to add a Pokemon</h1>
 `;

const loggedinHTML = /*html*/ `
<nav></nav>
<h1>Add a new Pokemon</h1>
<form>
<label for='name'>Name: </label>
<input type='text' name='name' id='name'>
<label for='breed'>Breed: </label>
<input type='text' name='breed' id='breed'>
<div id='errorMessage'></div>
<button type='submit'>Add to your collection!</button>
</form>
`;

function newPokemon() {
	const token = localStorage.getItem("token");
	if (!token) {
		const domFrag = loggedOutNav.content.cloneNode(true);
		app.innerHTML = loggedoutHTML;
		app.querySelector("nav").append(domFrag);
	} else {
		const domFrag = loggedInNav.content.cloneNode(true);
		app.innerHTML = loggedinHTML;
		app.querySelector("nav").append(domFrag);
	}
}

export default newPokemon;
