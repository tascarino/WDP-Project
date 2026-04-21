const express = require("express")
const Player = require("../models/session")
const router = express.Router()

router.get('/getAllSessions', async (req, res) => {
  try {
    const sessions = await Player.getAllSessions()
    res.send(sessions)
  } catch (err) {
    res.status(401).send({message: err.message})
  }
});

module.exports = router