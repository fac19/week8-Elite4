// import query from "../query.js"

const app = document.querySelector("#app");

const html = /*html*/ `
<form>
    <label for="name">Name</label>
    <input type="text" id="name" 
    placeholder="Insert name here" required>

    <label for="email">Email</label>
    <input type="email" id="email" 
    placeholder="Insert email here" required>

    <label for="password">Password</label>
    <input type="password" id="password" 
    placeholder="Insert password here" required>
    
    <div id="errorMessage"></div>

    <button type="submit">Sign up</button>
</form>
`;

function signUp () {
    // Insert our lovely HTML
    console.log("running signUp")
    app.innerHTML = html;
    
    // Make a fetch POST request

    // Do some shit with the response
}

export default signUp;