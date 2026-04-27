require('dotenv').config();
const express = require("express")
const app = express()

app.use(express.json())

const playerRoutes = require("./server/routes/player")

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
});

app.use("/players", playerRoutes)

// instead of having a domain name like, www.bestrecipes.com, 
// we are using localhost:3500

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!!`))
