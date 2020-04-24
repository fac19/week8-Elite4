import query from "../query.js";

const app = document.querySelector("#app");
const loggedOutNav = document.querySelector("#loggedOutNav");
const loggedInNav = document.querySelector("#loggedInNav");

const html = /*html*/ `
<nav></nav>
<h2>All your lovely pokemon!</h2>
<div id="errorMessage"></div>
<ul></ul>
`;

function createMyPokemonListItem(pokemon) {
	const userId = localStorage.getItem("userId");
	if (pokemon.owner === parseInt(userId)) {
		const li = document.createElement("li");
		const h3 = document.createElement("h3");
		const type = document.createElement("p");
		const deleteBut = document.createElement("button");
		const editBut = document.createElement("button");
		h3.append(pokemon.name);
		type.append(pokemon.breed);
		deleteBut.append("Delete");
		editBut.append("Edit"); 
		
		deleteBut.addEventListener("click", ()=>{
			const token = localStorage.getItem("token");
			query(`https://fac19-pokemon.herokuapp.com/v1/dogs/${pokemon.id}`, {
				method: "DELETE",
				headers: {
					authorization: `Bearer ${token}`
				}
			})
			.then(()=>{
				li.remove(); 
			}).catch(()=>{
				console.error(error);
				app.querySelector("#errorMessage").append("Deleting pokemon failed");
			})
		});

		// editBut.addEventListener("click", ()=>{
		// 	const token = localStorage.getItem("token");
			
		// 	//create Form
		// 	const form = document.createElement("form")
		// 	const label = document.createElement("label")
		// 	const button = document.createElement("button")
		//   	const input = document.createElement("input")
			
		// 	label.append("New Name:", {"for": "name"}); 
		// 	input.append("", {"type": "text", "name":"name", "id":"name", "minlength":"1", "maxlength":"50"});
		// 	button.append("Make Changes", {"type": "submit"})
		// 	form.append(label, input, button, {"id": "editForm"});

		// 	//append form to list
		// 	li.append(form);
			
		// 	const editForm = document.querySelector("editForm");
		// 	editForm.addEventListener("submit", () => {
		// 		event.preventDefault();
		// 		const formData = new FormData(event.target);
		// 		const formObject = Object.fromEntries(formData);
		// 		query(`https://fac19-pokemon.herokuapp.com/v1/dogs/${pokemon.id}`, {
		// 			method: "PUT",
		// 			headers: {
		// 				authorization: `Bearer ${token}`,
		// 				"content-type": "application/json"
		// 			},
		// 			body: JSON.stringify(formObject)
		// 		})
		// 		.then(()=>{
		// 			redirect("/my-pokemon");
		// 		}).catch(()=>{
		// 			console.error(error);
		// 			app.querySelector("#errorMessage").append("Editing pokemon failed");
		// 		})
		// 	});

		// });

		li.append(h3, type, deleteBut, editBut);
		return li;
	} else {
		return "";
	}
}

function myPokemon() {
	app.innerHTML = html;
	const token = localStorage.getItem("token");
	if (!token) {
		const domFrag = loggedOutNav.content.cloneNode(true);
		app.querySelector("nav").append(domFrag);
		app
			.querySelector("#errorMessage")
			.append("You must be logged in to view your pokemon.");
	} else {
		const domFrag = loggedInNav.content.cloneNode(true);
		app.querySelector("nav").append(domFrag);
	}

	query("https://fac19-pokemon.herokuapp.com/v1/dogs")
		.then((pokeArr) => {
			const pokemonList = pokeArr.map((pokemon) =>
				createMyPokemonListItem(pokemon)
			);
			app.querySelector("ul").append(...pokemonList);
		})
		.catch((error) => {
			console.error(error);
			app
				.querySelector("#errorMessage")
				.append("Sorry, we couldn't load your pokemon");
		});
}

export default myPokemon;
