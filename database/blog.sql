CREATE TABLE profile (
  idprofile SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  username VARCHAR(50) NOT NULL,
  dateofbirth VARCHAR(45) NOT NULL,
  avatar VARCHAR(255), 
  credentialid INT
);

CREATE TABLE credentials (
  idcredentials SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  userpassword VARCHAR(45) NOT NULL,
);

CREATE TABLE cards (
  idcard SERIAL PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  subtitle VARCHAR(50) NOT NULL,
  creationdate VARCHAR(45) NOT NULL,
  featuredimage TEXT NOT NULL,
  profileid INT NOT NULL,
  FOREIGN KEY (profileid) REFERENCES profile(idprofile)
);

CREATE TABLE cardtexts (
  idcardtexts SERIAL PRIMARY KEY,
  text TEXT NOT NULL,
  cardidtexts INT NOT NULL,
  FOREIGN KEY (cardidtexts) REFERENCES cards(idcard)
);

CREATE TABLE cardimages (
  idcardimages SERIAL PRIMARY KEY,
  images VARCHAR(255) NOT NULL, 
  cardidimages INT NOT NULL,
  FOREIGN KEY (cardidimages) REFERENCES cards(idcard)
);

CREATE TABLE commentssection (
  idcomment SERIAL PRIMARY KEY,
  comment TEXT NOT NULL,
  likes INT NOT NULL,
  dislikes INT NOT NULL,
  commentdate varchar(45) NOT NULL,
  profileid INT NOT NULL,
  cardid INT NOT NULL,
  FOREIGN KEY (profileid) REFERENCES profile(idprofile),
  FOREIGN KEY (cardid) REFERENCES cards(idcard)
);
