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
      username: username,
      password: password
    }

    fetchData('/player/login', player, 'POST')
      .then(data => {
        if (!data.message) {
          window.location = "sessionlog.html"
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
    const user = {
      first_name: first_name,
      last_name: last_name,
      username: username,
      password: password
    }

    console.log(user)
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

// fetchData function: use for POST, PUT, and DELETE. 
// Fetch method implementation:
// fetchData function: use for POST, PUT, and DELETE. 
// Fetch method implementation:
async function fetchData(route = '', data = {}, methodType) {
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
