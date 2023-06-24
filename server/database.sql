CREATE DATABASE capchat;

CREATE TABLE Users(
    id_user uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    user_first_name VARCHAR(255) NOT NULL,
    user_last_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255),
    isAdmin INT NOT NULL DEFAULT 0
);

CREATE TABLE Theme (
    id_theme SERIAL PRIMARY KEY,
    nom_theme VARCHAR(255)
);

CREATE TABLE Captcha (
    id_captcha SERIAL PRIMARY KEY, 
    nom_capchat VARCHAR(255),
    id_user uuid NOT NULL,
    id_theme  INT NOT NULL,
    FOREIGN KEY (id_user) REFERENCES Users (id_user),
    FOREIGN KEY (id_theme) REFERENCES Theme (id_theme)
);

CREATE TABLE Image (
    id_image SERIAL PRIMARY KEY,
    nom_image VARCHAR(255) NOT NULL,
    id_captcha UUID NOT NULL,
    question_associee TEXT,
    url_imagte VARCHAR(255)
    FOREIGN KEY (id_captcha) REFERENCES Captcha(id_captcha)
);