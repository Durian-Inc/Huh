CREATE TABLE Markers(
    m_address VARCHAR(255),
    m_phone VARCHAR(80),
    m_id VARCHAR(255) NOT NULL,
    m_name VARCHAR(255) NOT NULL,
    lat FLOAT(10, 6) NOT NULL,
    lng FLOAT(10, 6) NOT NULL,
    PRIMARY KEY(m_id)
);


CREATE TABLE Ratings(
    r_id VARCHAR(255) NOT NULL,
    m_id VARCHAR(255) NOT NULL,
    /* --- PRIVACY RATING --- */
    p_rating int CHECK(p_rating > -1 AND p_rating < 6),
    /* --- COMMUNICATION THROUGH BARRIERS RATING --- */
    c_rating int CHECK(c_rating > -1 AND c_rating < 6),
    FOREIGN KEY(m_id) REFERENCES Markers,
    PRIMARY KEY(r_id)
);

/* --- EVERY ESTABLISHMENT WILL HAVE A DIFFERENT LITERACY RATING
        FOR EACH LANGUAGE --- */
CREATE TABLE Literacy(
    lang varchar(50) NOT NULL,
    r_id VARCHAR(255) NOT NULL,
    /* --- LITERACY IN LANGUAGE RATING --- */
    l_rating int CHECK(l_rating > -1 AND l_rating < 6),
    FOREIGN KEY(r_id) REFERENCES Ratings,
    PRIMARY KEY(lang)
);

/* --- LATITUDE AND LONGITUDE CAN BE ACCESSED THROUGH m_id
        MARKER CAN BE CREATED WITHOUT ADDRESS --- */
CREATE TABLE Events(
    e_id varchar(255) NOT NULL,
    e_name varchar(120) DEFAULT 'Event',
    m_id varchar(255) NOT NULL,
    e_type CHAR CHECK(e_type = 'E' OR e_type = 'J'),
    FOREIGN KEY(m_id) REFERENCES Markers
);



INSERT INTO Markers (m_address, m_phone, m_id, m_name, lat, lng) VALUES ("900 Collegiate Boulevard","(555)-123-4566","asdfghjkl1","Miner Village",39,-79);
INSERT INTO Markers (m_address, m_phone, m_id, m_name, lat, lng) VALUES ("222 Super Cool Boulevard","(555)-111-2222","asdfghjkl2","Shaved Ice Shop",39.002,-78.93);
INSERT INTO Markers (m_address, m_phone, m_id, m_name, lat, lng) VALUES ("123 Sweets Dr.","(555)-987-6543","asdfghjkl3","Global Sweets",38.579,-79.882);
INSERT INTO Markers (m_address, m_phone, m_id, m_name, lat, lng) VALUES ("9090 Green Way","(555)-8899-1122","asdfghjkl4","Recreation Center",40,-79.02);

INSERT INTO Ratings (r_id, m_id, p_rating, c_rating) VALUES ("00001", "asdfghjkl1", 5, 3);
INSERT INTO Ratings (r_id, m_id, p_rating, c_rating) VALUES ("00002", "asdfghjkl1", 4, 2);
INSERT INTO Ratings (r_id, m_id, p_rating, c_rating) VALUES ("00003", "asdafgjkl2", 2, 5);

INSERT INTO Literacy (lang, r_id, l_rating) VALUES("es","00001",5);
INSERT INTO Literacy (lang, r_id, l_rating) VALUES("fr","00002",3);
INSERT INTO Literacy (lang, r_id, l_rating) VALUES("de","00003",4);


INSERT INTO Events (e_id,m_id,e_name,e_type) VALUES("00001","asdfghjkl1","Summer Sno Cone Blast","E");
INSERT INTO Events (e_id,m_id,e_name,e_type) VALUES("00002","asdfghjkl2","Global Sweets Hiring","J");
INSERT INTO Events (e_id,m_id,e_name,e_type) VALUES("00003","asdfghjkl3","Futbol Team Meet", "E");