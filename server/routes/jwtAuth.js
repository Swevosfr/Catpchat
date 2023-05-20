const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  try {
    const { id, firstname, lastname, email, password } = req.body;

    const user = await pool.query("SELECT email FROM User WHERE id = $1", [
      email,
    ]);
    if (user.rows.length !== 0) {
      return res.status(401).send("Utilisateur déjà existant !");
    }

    // Crypter le mot de passe
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);

    const bcryptPassword = await bcrypt.hash(candidat_password, salt);

    //entrer le nouvel utilisateur
    const newUser = await pool.query(
      "INSERT INTO User (firstname, lastname, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
      [firstname, lastname, email, bcryptPassword]
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
