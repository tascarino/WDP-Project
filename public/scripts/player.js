import { fetchData } from "./main.js"

// grab the forms and add to a variable
let loginForm = document.getElementById("login-form")
let registrationForm = document.getElementById("registration-form")
let updateForm = document.getElementById("update-form")
let deleteForm = document.getElementById("delete-form")

// add event listener to forms
// make sure to check to see if login form exists before adding event listener
if (loginForm) loginForm.addEventListener('submit', login)
if (registrationForm) registrationForm.addEventListener('submit', register)
if (updateForm) updateForm.addEventListener('submit', update)
if (deleteForm) deleteForm.addEventListener('submit', deletePlayer)

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

    fetchData('/player/register', player, "POST")
      .then(data => {
        if (!data.message) {
          setCurrentPlayer(data.player)
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

function update(e) {
  e.preventDefault()

  let current = getCurrentPlayer()
  let first_name = document.getElementById("fname").value
  let last_name = document.getElementById("lname").value

  const player = {
    player_id: current.player_id,
    first_name: first_name,
    last_name: last_name,
  }

  fetchData('/player/update', player, "POST")
    .then(data => {
      if (!data.message) {
        setCurrentPlayer(data.player)
        window.location.href = "profile.html"
      }
    })
    .catch(err => {
      let error = document.getElementById("error")
      error.innerText = err.message
    })

}

function deletePlayer(e) {
  e.preventDefault()



}

function checkPassword(password) {
  if (password.length >= 10) {
    return true
  }
  return false
}

//change back if broken
function setCurrentPlayer(player) {
  if (!player) return
  localStorage.setItem('player', JSON.stringify(player))
}

//change back if broken
export function getCurrentPlayer() {
  const stored = localStorage.getItem('player')
  if (!stored || stored === "undefined") return null

  try {
    return JSON.parse(stored)
  } catch (err) {
    console.error("Invalid player data:", err)
    localStorage.removeItem('player')
    return null
  }
}

export function getPlayerId(player) {
  return player.player_id
}

export function removeCurrentPlayer() {
  localStorage.removeItem('player')
  window.location = "login.html"
}
