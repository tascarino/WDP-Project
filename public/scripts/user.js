// grab the form and add to a variable
let loginForm = document.getElementById("login-form")

// add event listener to our form by using loginForm name
// make sure to check to see if login form exists before adding event listener
if(loginForm) loginForm.addEventListener('submit', login)

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
    console.log("Password sucks! Do better.")
  }
}

function checkPassword(password) {
  return true
}