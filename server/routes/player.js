const express = require("express")
const router = express.Router()
const Player = require("../models/player")

router
.get('/getAllPlayers', async (req, res) => {
    try {
        const players = await Player.getAllPlayers()
        res.send(players)
    } catch(err) {
        res.status(401).send({message: err.message})
    }
})

.post('/login', async (req, res) => {
    try {
        const player = await Player.login(req.body)
        res.send({...player, password: undefined})
    } catch(err) {
        res.status(401).send({message: err.message})
    }
})
// change back if broken
.post('/register', async (req, res) => {
  try {
    const player = await Player.register(req.body)
    res.send({ player: { ...player, password: undefined } })
  } catch (err) {
    res.status(401).send({ message: err.message })
  }
})

//change back if broken
.post('/update', async (req, res) => {
  try {
    const player = await Player.update(req.body)
    res.send({ player })
  } catch (err) {
    res.status(401).send({ message: err.message })
  }
})

module.exports = router