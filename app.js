import router from "./router.js";
import home from "./routes/home.js";
import signUp from "./routes/signup.js";
import logIn from "./routes/login.js";
import logOut from "./routes/logout.js";
import missing from "./routes/missing.js";
import newPokemon from "./routes/new-pokemon.js";
import myPokemon from "./routes/my-pokemon.js";

const app = router();

app.get("/", home); // Home (see all pokemon)
app.get("/sign-up", signUp);
app.get("/login", logIn);
app.get("/logout", logOut);
app.get("default", missing);
app.get("/new-pokemon", newPokemon);
app.get("/my-pokemon", myPokemon);

app.listen();
