import { getCurrentPlayer, removeCurrentPlayer } from "./player.js";

let cPlayer = await getCurrentPlayer()
let nav = document.querySelector('nav')
let profile = document.getElementById("profile")
let updateForm = document.getElementById("update-form")

if (cPlayer) {
  nav.innerHTML = `
    <ul>
      <li><a href="sessionlog.html">Create Session Entry</a></li>
      <li><a href="profile.html">Profile</a></li>
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

if (profile) {
  profile.innerHTML = `
    <h2>Hello, ${cPlayer.username}!</h2>
    <h3>Current Info: </h3>
    <h4>Player Name: ${cPlayer.first_name} ${cPlayer.last_name}</h4>
  `
}

if(updateForm) {
  updateForm.innerHTML = `
    <p id="error"></p>
    <label for="fname">First Name: </label>
    <input type="text" id="fname" value="${cPlayer.first_name}">
    <br>
    <label for="lname">Last Name: </label>
    <input type="text" id="lname" value="${cPlayer.last_name}">
    <br><br>
    <input type="submit" value="Update">
  `
}

//logout event listener
let logout = document.getElementById("logout")
if (logout) logout.addEventListener('click', removeCurrentPlayer)

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
