const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");

router.post("/register", async (req, res) => {
  try {
    const { user_first_name, user_last_name, user_email, user_password } =
      req.body;

    const user = await pool.query("SELECT * FROM Users WHERE user_email = $1", [
      user_email,
    ]);
    if (user.rows.length !== 0) {
      return res.status(401).send("Utilisateur déjà existant !");
    }

    // Crypter le mot de passe
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);

    const bcryptPassword = await bcrypt.hash(user_password, salt);

    //entrer le nouvel utilisateur
    const newUser = await pool.query(
      "INSERT INTO Users (user_first_name, user_last_name, user_email, user_password) VALUES ($1, $2, $3, $4) RETURNING *",
      [user_first_name, user_last_name, user_email, bcryptPassword]
    );

    //jwt token
    const token = jwtGenerator.jwtUser(newUser.rows[0].id);
    res.json({ token });
  } catch (err) {
    console.error("Error: ", err.message, "Stack: ", err.stack);
    res.status(500).send("Server Error");
  }
});

router.post("/test", async (req, res) => {
  console.log("COucou");
});

router.post("/login", async (req, res) => {
  try {
  } catch (err) {
    console.error("Error: ", err.message, "Stack: ", err.stack);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
