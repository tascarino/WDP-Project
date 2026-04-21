const express = require("express")
const Player = require("../models/player")
const router = express.Router()

router.get('/getAllPlayers', async (req, res) => {
  try {
    const players = await Player.getAllPlayers()
    res.send(players)
  } catch (err) {
    res.status(401).send({message: err.message})
  }
});

module.exports = router