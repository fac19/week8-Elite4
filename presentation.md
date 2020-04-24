# W8 AGIL - The Pokemon Choose You! :cherry_blossom:  

![Pika](https://media3.giphy.com/media/TsV9Sr9AG2Ne8/200.gif?cid=e1bb72ffda09744a4397b9973a9d75ac3487a42b9e31fdf6&rid=200.gif)

---

## What is it?
A front end Single Page Application where you can see pokemon and add and delete your own if you are signed in.

---

## Demo :video_game:

![The Elite 4's amazing SPA](https://i.imgur.com/fO4W6Yp.png)

---

## Who were we talking to?

'Our' own naughty API *ILLEGAL OLI PLAGIARISM FORBIDDEN*

![naughty pika](https://media3.giphy.com/media/U2nN0ridM4lXy/200.gif?cid=e1bb72ffda09744a4397b9973a9d75ac3487a42b9e31fdf6&rid=200.gif)

---

## Wireframe (what could have been) 

![](https://i.imgur.com/V6mQ7qw.png)

---

## WHAT WE'VE LEARNED
![](https://media.giphy.com/media/Tf3mp01bfrrUc/giphy.gif)

---

### Team 
- Set your headers! `415 Unsupported Media Type`
- Don't work on the same files...
- Check for typos!! `query` or `query.js`

---

## HTML Templates for our navbar
```html
<template id="loggedOutNav">
  <nav>
    <a href="/">Home</a>
	<a href="/sign-up">Sign Up</a>
	<a href="/login">Log In</a>
  </nav>
</template>
<template id="loggedInNav">
  <nav>
    <a href="/">Home</a>
	<a href="/my-pokemon">My Pokemon</a>
	<a href="/new-pokemon">Add a Pokemon</a>
	<a href="/logout">Log Out</a>
  </nav>
</template>
```

---

```javascript=
const token = localStorage.getItem("token");
  if (!token) {
	const domFrag = loggedOutNav.content.cloneNode(true);
	app.querySelector("nav").append(domFrag);
} else {
  const domFrag = loggedInNav.content.cloneNode(true);
  app.querySelector("nav").append(domFrag);
}
```

---

## Configuring npm servor package

[Documentation](https://www.npmjs.com/package/servor)

```json	
"scripts": {
  "dev": "servor . index.html 3000"
},
```

`npx servor <root> <fallback> <port>`

---

### Fuzz-ball

- Parsing JSON, What JSON is!
-- Heroku, db.query (model), query.js 
- Destructuring in the (router.js) 
- window.location (in roter.js)
- Methods of Consent
-- ask everyone else
-- ask afterwards

---

![](https://i.imgur.com/DVM07jd.png)

---

### cHANsey

- How an SPA actual works!
- Joe's branch song is entertaining, but disturbing *&ast;shudders&ast;*
![](https://media.giphy.com/media/DXmHUqfA8YKqs/giphy.gif =300x)


---

### Joeteon

- Query your API first
- What is Servør?

---

>This is a tool useful for serving up single page applications with frontend routing. It basically reads your files and tells the application that there is one index.html file so that when rendering other endpoints it redirects all path requests to a single file.

---

So you have static file servers and multi file server?
- Something that fufils requests

---

### AlaCHLOzam

This week's project------ vs ------Me  

![](https://media.giphy.com/media/dICjAqixKQFnG/giphy.gif)

- What is the point of router.js
- What is an SPA

---

## THANK P*k@chu THAT'S OVER :tada::tada:
![Pikachu chillin' like a boss](https://media.giphy.com/media/slVWEctHZKvWU/giphy.gif)

---

## Now let's drink! (Don't ask us any questions)

![](https://media2.giphy.com/media/428dIJljoEbxS/200.gif?cid=e1bb72ffda09744a4397b9973a9d75ac3487a42b9e31fdf6&rid=200.gif)
