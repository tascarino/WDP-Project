const con = require("./db_connect")

async function createSessionTable() {
  let sql = `
    CREATE TABLE IF NOT EXISTS Session (
      session_id INT NOT NULL AUTO_INCREMENT,
      session_title VARCHAR(255),
      date_created DATE,
      session_notes VARCHAR(1500),
      campaign_id INT NOT NULL,
      session_creator INT NOT NULL,
      CONSTRAINT session_pk PRIMARY KEY (session_id),
      CONSTRAINT session_creator FOREIGN KEY (session_creator)
        REFERENCES Player(player_id),
      CONSTRAINT session_fk FOREIGN KEY (campaign_id) 
        REFERENCES Campaign(campaign_id)
    );`

  await con.query(sql)
}

createSessionTable()

async function getAllSessions() {
  let sql = `
    SELECT * FROM Session;
  `

  return await con.query(sql)
}

module.exports = { getAllSessions }