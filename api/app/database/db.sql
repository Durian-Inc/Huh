CREATE TABLE Markers(
    m_address VARCHAR(255) NOT NULL,
    m_phone VARCHAR(80),
    m_id VARCHAR(255) NOT NULL,
    m_name VARCHAR(255) NOT NULL,
    lat FLOAT(10, 6) NOT NULL,
    lng FLOAT(10, 6) NOT NULL,
    m_type CHAR(1) NOT NULL,
    PRIMARY KEY(id)
);


CREATE TABLE Ratings(
    r_id VARCHAR(255) NOT NULL,
    m_id VARCHAR(255) NOT NULL,
    /* --- PRIVACY RATING --- */
    p_rating int CHECK(privacy_rating > -1 AND privacy_rating < 6),
    /* --- COMMUNICATION THROUGH BARRIERS RATING --- */
    c_rating int CHECK(privacy_rating > -1 AND privacy_rating < 6),
    FOREIGN KEY(m_id) REFERENCES Markers,
    PRIMARY KEY(r_id),
);

/* --- EVERY ESTABLISHMENT WILL HAVE A DIFFERENT LITERACY RATING
        FOR EACH LANGUAGE --- */
CREATE TABLE Literacy(
    lang varchar(50) NOT NULL,
    id VARCHAR(255) NOT NULL,
    /* --- LITERACY IN LANGUAGE RATING --- */
    l_rating int CHECK(privacy_rating > -1 AND privacy_rating < 6),
    FOREIGN KEY(id) REFERENCES Markers,
    PRIMARY KEY(lang)
);

CREATE TABLE Events(
    e_id = varchar(255) NOT NULL,
    e_name = varchar(120) DEFAULT 'Event',
    lat FLOAT(10, 6) NOT NULL,
    lng FLOAT(10, 6) NOT NULL,
    e_type = CHAR CHECK(e_type = 'E' OR e_type = 'J'),
    FOREIGN KEY(lat,lng) REFERENCES Markers
);

INSERT INTO `Markers` (`id`, `m_name`, `formatted_address`, `lat`, `lng`, `m_type`) VALUES ('1', 'Love.Fish', '580 Darling Street, Rozelle, NSW', '-33.861034', '151.171936', 'L');
INSERT INTO `Markers` (`id`, `m_name`, `formatted_address`, `lat`, `lng`, `m_type`) VALUES ('2', 'Young Henrys', '76 Wilford Street, Newtown, NSW', '-33.898113', '151.174469', 'L');
INSERT INTO `Markers` (`id`, `m_name`, `formatted_address`, `lat`, `lng`, `m_type`) VALUES ('3', 'Hunter Gatherer', 'Greenwood Plaza, 36 Blue St, North Sydney NSW', '-33.840282', '151.207474', 'L');
INSERT INTO `Markers` (`id`, `m_name`, `formatted_address`, `lat`, `lng`, `m_type`) VALUES ('4', 'The Potting Shed', '7A, 2 Huntley Street, Alexandria, NSW', '-33.910751', '151.194168', 'E');
INSERT INTO `Markers` (`id`, `m_name`, `formatted_address`, `lat`, `lng`, `m_type`) VALUES ('5', 'Nomad', '16 Foster Street, Surry Hills, NSW', '-33.879917', '151.210449', 'E');
INSERT INTO `Markers` (`id`, `m_name`, `formatted_address`, `lat`, `lng`, `m_type`) VALUES ('6', 'Three Blue Ducks', '43 Macpherson Street, Bronte, NSW', '-33.906357', '151.263763', 'M');
INSERT INTO `Markers` (`id`, `m_name`, `formatted_address`, `lat`, `lng`, `m_type`) VALUES ('7', 'Single Origin Roasters', '60-64 Reservoir Street, Surry Hills, NSW', '-33.881123', '151.209656', 'M');
INSERT INTO `Markers` (`id`, `m_name`, `formatted_address`, `lat`, `lng`, `m_type`) VALUES ('8', 'Red Lantern', '60 Riley Street, Darlinghurst, NSW', '-33.874737', '151.215530', 'M');