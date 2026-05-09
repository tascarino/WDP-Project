import { fetchData } from "./main.js"

// grab the forms and add to a variable
let loginForm = document.getElementById("login-form")
let registrationForm = document.getElementById("registration-form")

// add event listener to forms
// make sure to check to see if login form exists before adding event listener
if (loginForm) loginForm.addEventListener('submit', login)
if (registrationForm) registrationForm.addEventListener('submit', register)

//create function that will take in data from form and create a new user object
function login(e) {
  e.preventDefault()

  let username = document.getElementById("username").value
  let password = document.getElementById("password").value
  if (checkPassword(password)) {
    const player = {
      username: document.getElementById("username").value,
      password: document.getElementById("password").value
    }

    fetchData('/player/login', player, "POST")
      .then(data => {
        if (!data.message) {
          setCurrentPlayer(data)
          window.location.href = "sessionlog.html"
        }
      })
      .catch(err => {
        let error = document.getElementById("error")
        error.innerText = err.message
        document.getElementById("password").value = ""
      })
  } else {
    console.log("Password sucks! Do better. (At least 10 characters)")
  }

}

//create function that will take in data from form and create a new user object
function register(e) {
  e.preventDefault()

  let first_name = document.getElementById("fname").value
  let last_name = document.getElementById("lname").value
  let username = document.getElementById("username").value
  let password = document.getElementById("password").value
  if (checkPassword(password)) {
    const player = {
      first_name: first_name,
      last_name: last_name,
      username: username,
      password: password
    }

    console.log(player)
  } else {
    console.log("Password sucks! Do better. (At least 10 characters)")
  }
}

function checkPassword(password) {
  if (password.length >= 10) {
    return true
  }
  return false
}

async function setCurrentPlayer(player) {
  await localStorage.setItem('player', JSON.stringify(player))
}

export async function getCurrentPlayer() {
  return await JSON.parse(localStorage.getItem('player'))
}

export async function removeCurrentPlayer() {
  localStorage.removeItem('player')
  window.location = "login.html"
}
