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
    id_theme SERIAL PRIMARY KEY, DEFAULT
    uuid_generate_v4(),
    nom_theme VARCHAR(255)
);

CREATE TABLE Captcha (
    id_captcha SERIAL PRIMARY KEY, DEFAULT
    uuid_generate_v4(),
    nom_capchat VARCHAR(255),
    id uuid NOT NULL,
    id_theme uuid NOT NULL,
    FOREIGN KEY (id) REFERENCES User (id),
    FOREIGN KEY (id_theme) REFERENCES Theme (id_theme)
);

CREATE TABLE Image (
    id_image SERIAL PRIMARY KEY, DEFAULT,
    nom_image VARCHAR(255) NOT NULL,
    id_captcha UUID NOT NULL,
    type_image TEXT CHECK(Type_Image IN ('neutre', 'singulière')) NOT NULL,
    indice TEXT,
    question_associee TEXT,
    url_image TEXT NOT NULL,
    FOREIGN KEY (id_captcha) REFERENCES Captcha(id_captcha)
);