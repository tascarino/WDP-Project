const express = require("express")
const Session = require("../models/session")
const Player = require("../models/player")
const router = express.Router()

router
.get('/getAllSessions', async (req, res) => {
  try {
    const sessions = await Session.getAllSessions()
    res.send(sessions)
  } catch (err) {
    res.status(401).send({message: err.message})
  }
})

.post('/createSessionPost', async (req, res) => {
  try {
    const { session_creator } = req.body
    if (!session_creator) {
      return res.status(401).send({ message: "Unauthorized" })
    }

    const session = await Session.createSessionPost(req.body)
    res.send({session})
  } catch (err) {
    res.status(401).send({message: err.message})
  }
})

module.exports = router