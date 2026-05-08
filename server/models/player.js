const con = require("./db_connect")
const bcrypt = require("bcrypt")

async function createPlayerTable() {
  let sql = `
    CREATE TABLE IF NOT EXISTS Player (
      player_id INT NOT NULL AUTO_INCREMENT,
      first_name VARCHAR(255),
      last_name VARCHAR(255),
      username VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255),
      email VARCHAR(255),
      CONSTRAINT player_pk PRIMARY KEY(player_id)
    );`

  await con.query(sql)
}

createPlayerTable()

/*
{
  username: "username",
  password: "password123"
}
*/
async function login(player) {
  let cPlayer = await getPlayerByUsername(player.username)
  if(!cPlayer) throw Error("Username not found!")
  
  let match = await bcrypt.compare(player.password, cPlayer.password)
  if(!match) throw Error("Password Incorrect!")
  
  return cPlayer
}

async function getPlayerByUsername(username) {
  let sql = `
    SELECT * FROM Player
    WHERE username=?
  `
  let cPlayer = await con.query(sql, [username])
  return cPlayer[0]
}

async function getAllPlayers() {
    let sql = `
      SELECT * FROM Player;
    `
    return await con.query(sql)
}

// Register function
/*
{
  username: "username",
  password: "password123",
  first_name: "First",
  last_name: "Last"
}
*/
async function register(player) {
  let cPlayer = await getPlayerByUsername(player.username)
  if(Player) throw Error("Username already in use!")

  let hashedPassword = await bcrypt.hash(player.password, 10)
  
  let sql = `
    INSERT INTO User(first_name, last_name, username, password)
    VALUES(?, ?, ?, ?)
  `

  await con.query(sql, [player.first_name, player.last_name, player.username, hashedPassword])
  return await login(player)
}

module.exports = { getAllPlayers, login, register }