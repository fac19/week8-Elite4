const app = document.querySelector("#app");

const html = /*html*/ `
  <h1>Page not found</h1>
  <a href="/">Use Pelliper's Fly move to return home!</a>
`;

function missing() {
  document.title = "Page not found";
  app.innerHTML = html;
}

export default missing;