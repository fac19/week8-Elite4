import router from "./router.js";

const app = router();
const appContainer = document.querySelector("#app");
const loginNav = document.querySelector("#loggedInNav");

const domFrag = loginNav.content.cloneNode(true);
appContainer.appendChild(domFrag);

app.get("/", () => console.log("This is the homepage"));
app.get("/my-pokemon", () => console.log("This is the hello page"));

// app.navigate("http://localhost:8080/");

app.listen();
