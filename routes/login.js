import query from "../query.js";

const app = document.querySelector("#app");

const html = /*html*/ `
<form class="signup-form"> 

  <label for="email">Email</label>
  <input type="email" id="email" 
  placeholder="Insert email here" 
  name="email" required>

  <label for="password">Password</label>
  <input type="password" id="password" 
  placeholder="Insert password here" 
  name="password" required>
  
  <div id="errorMessage"></div>

  <button type="submit">Log In</button>
</form>
`;

function logIn ({ redirect }) {
  app.innerHTML = html;

  app.querySelector(".signup-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formObject = Object.fromEntries(formData);

    query("https://dogs-rest.herokuapp.com/v1/users/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(formObject)
    })
      .then((body) => {
      console.log("signUp -> body", body)
        window.localStorage.setItem("token", body.access_token);
        window.localStorage.setItem("userId", body.id);
        redirect("/");
      })
      .catch((error) => {
        console.error(error);
        app.querySelector("#errorMessage").append("Something went wrong :(");
      });
  })
}

export default logIn;

