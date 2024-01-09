CREATE TABLE profile (
  idprofile SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  username VARCHAR(50) NOT NULL,
  dateofbirth VARCHAR,
  avatar VARCHAR(255), 
  credentialid INT
);

CREATE TABLE credentials (
  idcredentials SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  userpassword VARCHAR(45) NOT NULL,
  profileid INT,
  FOREIGN KEY (profileid) REFERENCES profile(idprofile)
);

CREATE TABLE cards (
  idcard SERIAL PRIMARY KEY,
  title VARCHAR(30),
  subtitle VARCHAR(50),
  creationdate VARCHAR,
  featuredimage TEXT,
  profileid INT,
  FOREIGN KEY (profileid) REFERENCES profile(idprofile)
);

CREATE TABLE cardtexts (
  idcardtexts SERIAL PRIMARY KEY,
  text TEXT,
  cardidtexts INT,
  FOREIGN KEY (cardidtexts) REFERENCES cards(idcard)
);

CREATE TABLE cardimages (
  idcardimages SERIAL PRIMARY KEY,
  images VARCHAR(255), 
  cardidimages INT,
  FOREIGN KEY (cardidimages) REFERENCES cards(idcard)
);

CREATE TABLE commentssection (
  idcomment SERIAL PRIMARY KEY,
  comment TEXT,
  likes INT,
  dislikes INT,
  profileid INT,
  commentdate INT,
  cardid INT,
  FOREIGN KEY (profileid) REFERENCES profile(idprofile),
  FOREIGN KEY (cardid) REFERENCES cards(idcard)
);
