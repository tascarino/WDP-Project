// grab the forms and add to a variable
let loginForm = document.getElementById("login-form")
let registrationForm = document.getElementById("registration-form")

// add event listener to forms
// make sure to check to see if login form exists before adding event listener
if(loginForm) loginForm.addEventListener('submit', login)
if(registrationForm) registrationForm.addEventListener('submit', login)

//create function that will take in data from form and create a new user object
function login(e) {
  e.preventDefault()
  
  let username = document.getElementById("username").value
  let password = document.getElementById("password").value
  if (checkPassword(password)){
    const user = {
      username: username,
      password: password
    }

    console.log(user)
  } else {
    console.log("Password sucks! Do better. (At least 10 characters)")
  }
}

function checkPassword(password) {
  if(password.length >= 10){
    return true
  }
  return false
}