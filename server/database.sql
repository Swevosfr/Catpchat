CREATE DATABASE capchat;

CREATE TABLE User (
    id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255),
    isAdmin INT NOT NULL DEFAULT 0
);

CREATE TABLE Theme (
    id_theme uuid PRIMARY KEY DEFAULTm
    uuid_generate_v4(),
    name VARCHAR(255)
);

CREATE TABLE Capchat (
    id_capchat uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    nom_capchat VARCHAR(255),
    url VARCHAR(255),
    id uuid NOT NULL,
    id_theme uuid NOT NULL,
    FOREIGN KEY (id) REFERENCES User (id),
    FOREIGN KEY (id_theme) REFERENCES Theme (id_theme)
);

CREATE TABLE Image (
    id_image uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    nom_image VARCHAR(255),
)