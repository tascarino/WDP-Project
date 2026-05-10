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
      CONSTRAINT player_pk PRIMARY KEY(player_id)
    );`

  await con.query(sql)
}

createPlayerTable()

// Login Function
// READ
async function login(player) {
  let cPlayer = await playerExists(player)
  if(!cPlayer) throw Error("Username not found!")
  
  let match = await bcrypt.compare(player.password, cPlayer.password)
  if(!match) throw Error("Password Incorrect!")
  
  return cPlayer
}

// Register Function
// CREATE
async function register(player) {
  let cPlayer = await playerExists(player)
  if(cPlayer) throw Error("Username already in use!")

  let hashedPassword = await bcrypt.hash(player.password, 10)
  
  let sql = `
    INSERT INTO Player(first_name, last_name, username, password)
    VALUES(?, ?, ?, ?)
  `

  await con.query(sql, [player.first_name, player.last_name, player.username, hashedPassword])
  return await playerExists(player)
}

// UPDATE
async function update(player) {
  let cPlayer = await playerExists(player)
  if (!cPlayer) throw Error("Player doesn't exist!")

  let sql = `
    UPDATE player
    SET first_name=?, 
        last_name=?, 
        username=?
    WHERE player_id=?;
  `

  await con.query(sql, [player.first_name, player.last_name, player.username, cPlayer.player_id])
  return await getPlayerByUsername(player.username)
}

// DELETE
async function deletePlayer(player) {
  let cPlayer = await playerExists(player)
  if (!cPlayer) throw Error("Player doesn't exist!")

  let sql = `
    DELETE FROM Player
    WHERE player_id=?
  `

  await con.query(sql, [player.player_id])
  return cPlayer;
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

async function playerExists(player) {
  let sql = `
    SELECT * FROM Player
    WHERE username=?
  `

  let cPlayer = await con.query(sql, [player.username])
  return cPlayer[0]
}


module.exports = { getAllPlayers, login, register, playerExists }