let sessionForm = document.getElementById("session-form")

sessionForm/addEventListener('submit', post)

function post(e){
  e.preventDefault()

  let sessionName = document.getElementById("session-name").value
  let groupName = document.getElementById("group-name").value
  let sessionDesc = document.getElementById("session-desc").value

  if(emptyField(sessionName)){
    console.log("Must include session title, try again.")
  } else {
    const session = {
      sessionName: sessionName,
      groupName: groupName,
      sessionDesc: sessionDesc
    }

    console.log(session)
  }
}

function emptyField(sessionName){
  if(sessionName == ''){
    return true
  }
  return false
}