const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  try {
    const {
      id_user,
      user_firstname,
      user_lastname,
      user_email,
      user_password,
    } = req.body;

    const user = await pool.query(
      "SELECT user_email FROM Users WHERE id_user = $1",
      [user_email]
    );
    if (user.rows.length !== 0) {
      return res.status(401).send("Utilisateur déjà existant !");
    }

    // Crypter le mot de passe
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);

    const bcryptPassword = await bcrypt.hash(user_password, salt);

    //entrer le nouvel utilisateur
    const newUser = await pool.query(
      "INSERT INTO Users (user_firstname, user_lastname, user_email, user_password) VALUES ($1, $2, $3, $4) RETURNING *",
      [user_firstname, user_lastname, user_email, bcryptPassword]
    );

    //jwt token
    const token = jwtGenetator.jwtGenerator(newUser.rows[0].id);
    res.json({ token });
  } catch (err) {
    console.error("Error: ", err.message, "Stack: ", err.stack);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
