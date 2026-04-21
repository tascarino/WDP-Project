const con = require("./db_connect")

async function createPlayerTable() {
  let sql = `
    CREATE TABLE IF NOT EXISTS Player (
      player_id INT NOT NULL AUTO_INCREMENT,
      first_name VARCHAR(255),
      last_name VARCHAR(255),
      username VARCHAR(255) NOT NULL UNIQUE,
      player_password VARCHAR(255),
      email VARCHAR(255),
      CONSTRAINT player_pk PRIMARY KEY(player_id)
    );`

  await con.query(sql)
}

createPlayerTable()

async function getAllPlayers() {
  let sql = `
    SELECT * FROM Player;
  `

  return await con.query(sql)
}

module.exports = { getAllPlayers }