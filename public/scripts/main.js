import { getCurrentPlayer, removeCurrentPlayer } from "./player.js";

let cPlayer = await getCurrentPlayer()
let nav = document.querySelector('nav')

if(cPlayer) {
    nav.innerHTML = `
       <ul>
         <li><a href="sessionlog.html">Create Session Entry</a></li>
         <li><a id="logout">Logout</a></li>
         <li><img class="logo" src="./images/logo.png" alt="wartpod logo"></li>
        </ul>
    `
} else {
    nav.innerHTML = `
         <ul>
           <li><a href="login.html">Login</a></li>
           <li><a href="register.html">Register</a></li>
           <li><img class="logo" src="./images/logo.png" alt="wartpod logo"></li>
         </ul>
    `
}

//logout event listener
let logout = document.getElementById("logout")
if(logout) logout.addEventListener('click', removeCurrentPlayer)

// fetchData function: use for POST, PUT, and DELETE. 
// Fetch method implementation:
export async function fetchData(route = '', data = {}, methodType) {
  const response = await fetch(`http://localhost:3500${route}`, {
    method: methodType, // *POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  if (response.ok) {
    return await response.json(); // parses JSON response into native JavaScript objects
  } else {
    throw await response.json();
  }
}
