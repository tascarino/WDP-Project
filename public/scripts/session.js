import { getCurrentPlayer, getPlayerId } from "./player.js";
import { fetchData } from "./main.js"

let cPlayer = getCurrentPlayer()
if(!cPlayer) window.location = "login.html"

let sessionForm = document.getElementById("session-form")

sessionForm.addEventListener('submit', createSessionPost)

function createSessionPost(e){
  e.preventDefault()

  let session_title = document.getElementById("session-name").value
  let campaign_name = document.getElementById("campaign-name").value
  let session_notes = document.getElementById("session-desc").value
  
  let player = getCurrentPlayer()
  let player_id = getPlayerId(player)

  if(emptyField(session_title) || emptyField(campaign_name)){
    console.log("Must include session title and campaign name, try again.")
  } else {
    const session = {
      session_title: session_title,
      campaign_name: campaign_name,
      session_notes: session_notes,
      session_creator: cPlayer.player_id
    }

    fetchData('/session/createSessionPost', session, "POST")
      .then(data => {
        if (!data.message) window.location.href = "sessionlog.html"
      })
      .catch(err => {
        console.log("Error creating session:", err.message)
      })
  }
}

function emptyField(field){
  if(field == ''){
    return true
  }
  return false
}