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

.post('/register', async (req, res) => {
    try {
        const player = await Player.register(req.body)
        res.send({...player, password: undefined})
    } catch(err) {
        res.status(401).send({message: err.message})
    }
})

module.exports = router