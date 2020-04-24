const app = document.querySelector("#app");

const html = /*html*/ `
  <h2>Page not found</h1>
  <img src='https://media.giphy.com/media/12Bpme5pTzGmg8/giphy.gif' alt='sad-gif'>
  <br>
  <a href="/">Use Pelliper's Fly move to return home!</a>
`;

function missing() {
	document.title = "Page not found";
	app.innerHTML = html;
}

export default missing;
