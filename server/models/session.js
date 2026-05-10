const con = require("./db_connect")

async function createSessionTable() {
  let sql = `
    CREATE TABLE IF NOT EXISTS \`Session\` (
      session_id INT NOT NULL AUTO_INCREMENT,
      session_title VARCHAR(255) NOT NULL,
      date_created DATETIME,
      session_notes VARCHAR(1500),
      campaign_name VARCHAR(255) NOT NULL,
      session_creator INT NOT NULL,
      CONSTRAINT session_pk PRIMARY KEY (session_id),
      CONSTRAINT session_creator FOREIGN KEY (session_creator)
        REFERENCES Player(player_id) ON DELETE CASCADE
    );`

  await con.query(sql)
}

createSessionTable()

async function getAllSessions() {
  let sql = `SELECT * FROM Session;`
  return await con.query(sql)
}

async function createSessionPost(session) {
  let cSession = await sessionExists(session)
  if (cSession) throw Error("Session exists with this title!")

  let sql = `
    INSERT INTO Session(session_title, date_created, session_notes, campaign_name, session_creator)
    VALUES (?, NOW(), ?, ?, ?)
  `

  await con.query(sql, [session.session_title, session.session_notes, session.campaign_name, session.session_creator])

  return await sessionExists(session)
}

async function sessionExists(session) {
  let sql = `
    SELECT * FROM Session
    WHERE session_title = ?
  `

  let result = await con.query(sql, [session.session_title])
  return result[0]
}

module.exports = { getAllSessions, createSessionPost }
