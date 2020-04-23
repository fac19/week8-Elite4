import router from "./router.js";

const app = router();
const appContainer = document.querySelector("#app");
const loginNav = document.querySelector("#loggedInNav");

const domFrag = loginNav.content.cloneNode(true);
appContainer.appendChild(domFrag);

app.get("/", () => console.log("home"));
app.get("/logout", ({ redirect }) => {
	console.log(redirect);
	console.log("This is the home page");
	redirect("/");
});
app.get("/my-pokemon", () => console.log("This is the pokemon page"));

// app.get("/my-pokemon", ({ urlObj }) => {
// 	console.log("thing.searchParams", urlObj.searchParams.get("id"));
// });

app.get("default", () => console.log("404 page"));
// app.navigate("http://localhost:8080/");
app.listen();
