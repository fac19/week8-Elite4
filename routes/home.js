import query from "../query";

const app = document.querySelector("#app");
const loggedOutNav = document.querySelector("#loggedOutNav");
const loggedInNav = document.querySelector("#loggedInNav");

const html = /*html*/ `
<div id="errorMessage"></div>
<ul></ul>
`;

function createPokemonListItem(pokemon) {
  const li = document.createElement("li");
  const h2 = document.createElement("h2");
  h2.append(pokemon.name);
  const type = document.createElement("p");
  type.append(pokemon.breed);
  const owner = document.createElement("p");
  owner.append(pokemon.owner);
  li.append(h2, type, owner);
} 

function home() {
  console.log("home handler running")
  app.innerHTML = html;
  const token = localStorage.getItem("token");
  if (!token) {
    const domFrag = loggedOutNav.content.cloneNode(true);
    app.appendChild(domFrag);
  } else {
    const domFrag = loggedInNav.content.cloneNode(true);
    app.appendChild(domFrag);
  }
  
  query("https://dogs-rest.herokuapp.com/v1/dogs")
    .then((pokemon) => {
      const pokemonList = pokemon.map((pokemon) => createPokemonListItem(pokemon));
      app.querySelector("ul").append(...pokemonList);
    })
    .catch((error) => {
      console.error(error);
      app.querySelector("#errorMessage").append("Sorry, we couldn't load the pokemon");
    });
};

export default home;