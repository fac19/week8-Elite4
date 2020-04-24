import query from "../query.js";

const app = document.querySelector("#app");
const loggedOutNav = document.querySelector("#loggedOutNav");
const loggedInNav = document.querySelector("#loggedInNav");

const html = /*html*/ `
<nav></nav>
<div id="errorMessage"></div>
<ul></ul>
`;

function createPokemonListItem(pokemon) {
	const li = document.createElement("li");
	const h3 = document.createElement("h3");
	h3.append(pokemon.name);
	const type = document.createElement("p");
	type.append(pokemon.breed);
	li.append(h3, type);
	return li;
}

function home() {
	app.innerHTML = html;
	const token = localStorage.getItem("token");
	if (!token) {
		const domFrag = loggedOutNav.content.cloneNode(true);
		app.querySelector("nav").append(domFrag);
	} else {
		const domFrag = loggedInNav.content.cloneNode(true);
		app.querySelector("nav").append(domFrag);
	}

	query("https://fac19-pokemon.herokuapp.com/v1/dogs")
		.then((pokeArr) => {
			const pokemonList = pokeArr.map((pokemon) =>
				createPokemonListItem(pokemon)
			);
			app.querySelector("ul").append(...pokemonList);
		})
		.catch((error) => {
			console.error(error);
			app
				.querySelector("#errorMessage")
				.append("Sorry, we couldn't load the pokemon");
		});
}

export default home;
