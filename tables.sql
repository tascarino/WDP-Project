CREATE TABLE IF NOT EXISTS Player (
  player_id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  username VARCHAR(255) NOT NULL UNIQUE,
  player_password VARCHAR(255),
  email VARCHAR(255),
  CONSTRAINT player_pk PRIMARY KEY(player_id)
);

CREATE TABLE IF NOT EXISTS Campaign (
  campaign_id INT NOT NULL AUTO_INCREMENT,
  campaign_title VARCHAR(255),
  campaign_description VARCHAR(1500),
  game_master INT NOT NULL,
  CONSTRAINT campaign_pk PRIMARY KEY(campaign_id),
  CONSTRAINT campaign_fk FOREIGN KEY (game_master) 
    REFERENCES Player(player_id)
);

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
);