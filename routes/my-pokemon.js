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
		li.append(h3, type, deleteBut, editBut);

		deleteBut.addEventListener("click", ()=>{
			const token = localStorage.getItem("token");
			query(`https://fac19-pokemon.herokuapp.com/v1/dogs/${pokemon.id}`, {
				method: "DELETE",
				headers: {
					authorization: `Bearer ${token}`
				},
				mode: cors
			})
			.then(()=>{
				li.remove(); 
			}).catch(()=>{
				console.error(error);
				app.querySelector("#errorMessage").append("Deleting pokemon failed");
			})
		});

		function createEditForm(){
			const promise = new Promise((resolve, reject)=>{
				function createNode(tag, props, ...children) {
					const element = document.createElement(tag);
					const elementWithProps = Object.assign(element, props);
					elementWithProps.append(...children);
					return elementWithProps;
				}
				
				//create Form
				const label = createNode("label", {"for": "name"}, "New Name:")
				const button = createNode("button", {"type": "submit"}, "Make Changes")
				const input = createNode("input", {"type": "text", "name":"name", "id":"name", "minlength":"1", "maxlength":"50"})
				const form = createNode("form", {"id": "editForm"}, label, input, button)
				
				resolve(form)
				
				reject("form creation failed");
			});
			return promise;
		}
		
		editBut.addEventListener("click", ()=>{	
			createEditForm()
				.then((form)=>{
					li.append(form);
					console.log(li);
				})
				.then(()=>{
					return document.querySelector("#editForm");
				})
				.then((editForm)=>{
					const token = localStorage.getItem("token");
					editForm.addEventListener("submit", () => {
						event.preventDefault();
						const formData = new FormData(event.target);
						const formObject = Object.fromEntries(formData);
						console.log(formObject)
						query(`https://fac19-pokemon.herokuapp.com/v1/dogs/${pokemon.id}`, {
							method: "PUT",
							headers: {
								authorization: `Bearer ${token}`,
								"content-type": "application/json"
							},
							body: JSON.stringify(formObject)
						})
						.then(()=>{
							console.log("redirect1");
							redirect("/my-pokemon");
							console.log("redirect2");
						}).catch((error)=>{
							console.error(error);
							app.querySelector("#errorMessage").append("Editing pokemon failed");
						})
					});
				})
				.catch(console.log);
		})

		// editBut.addEventListener("click", ()=>{
		// 	const token = localStorage.getItem("token");
			
		// 	function createNode(tag, props, ...children) {
		// 		const element = document.createElement(tag);
		// 		const elementWithProps = Object.assign(element, props);
		// 		elementWithProps.append(...children);
		// 		return elementWithProps;
		// 	}
			
		// 	//create Form
		// 	const label = createNode("label", {"for": "name"}, "New Name:")
		// 	const button = createNode("button", {"type": "submit"}, "Make Changes")
		// 	const input = createNode("input", {"type": "text", "name":"name", "id":"name", "minlength":"1", "maxlength":"50"})
		// 	const form = createNode("form", {"id": "editForm"}, label, input, button)
		
		// 	//append form to list
		// 	li.append(form);
		// });

		// const editForm = document.querySelector("#editForm");
		// if(editForm){
		// 	editForm.addEventListener("submit", () => {
		// 		event.preventDefault();
		// 		const formData = new FormData(event.target);
		// 		const formObject = Object.fromEntries(formData);
		// 		console.log(formObject)
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
		// }	

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
			const pokemonList = pokeArr.map((pokemon) => {
				return createMyPokemonListItem(pokemon)
			});
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
