require("dotenv").config();
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post("/forgot-password", async (req, res) => {
  try {
    //regarde dans la base de données l'email
    const { user_email } = req.body;
    //regarde dans la base de données l'email
    const user = await pool.query(
      "SELECT id_user, user_email, user_password FROM Users WHERE user_email = $1",
      [user_email]
    );

    if (user.rows.length === 0) {
      return res.status(404).send("L'artiste n'existe pas");
    }

    const user_password = user.rows[0].user_password;
    const id_user = user.rows[0].id_user;

    // Autremement on lui attribue un token qui s'expires dans 10min
    const secret = user_password + process.env.jwtSecret;
    const payload = {
      user: id_user,
      email: user_email,
    };
    const token = jwt.sign(payload, secret, { expiresIn: "15m" });
    console.log("Signed token payload:", payload);
    //const token = jwtGenerator.jwtGeneratorEmailCandidat(
    //candidat.rows[0].email_candidat
    //);
    const msg = {
      to: user_email,
      from: "naierabassi@gmail.com", // Replace this with your own email address
      subject: "Réinitialisation du mot de passe",
      text: "Réinitialisez votre mot de passe",
      html: `<a href="http://localhost:3000/reset-password/${user.rows[0].id_user}/${token}">Cliquez ici pour réinitialiser votre mot de passe</a>`,
    };

    sgMail
      .send(msg)
      .then(() => {
        res.status(200).json({
          message:
            "Un lien de réinitialisation a été envoyé à votre adresse e-mail.",
        });
      })
      .catch((error) => {
        console.error("SendGrid error:", error);
        res
          .status(500)
          .send("Erreur lors de l'envoi de l'e-mail de réinitialisation");
      });
  } catch (err) {
    console.error("Error: ", err.message, "Stack: ", err.stack);
    res.status(500).send("Server Error");
  }
});

router.post("/reset-password/:id_user/:token", async (req, res) => {
  try {
    const { id_user, token } = req.params;
    const { newPassword } = req.body;

    const user = await pool.query(
      "SELECT id_user, user_email, user_password FROM Users WHERE id_user = $1",
      [id_user]
    );

    if (user.rows.length === 0) {
      return res.status(400).send({ message: "Invalid link" });
    }

    const secret = user.rows[0].user_password + process.env.jwtSecret;
    const payload = jwt.verify(token, secret);

    if (payload.user !== id_user) {
      return res.status(400).send({ message: "Invalid link" });
    }

    const salt = await bcrypt.genSalt(10);
    const newHashedPassword = await bcrypt.hash(newPassword, salt);

    await pool.query("UPDATE Users SET user_password = $1 WHERE id_user = $2", [
      newHashedPassword,
      id_user,
    ]);

    res.status(200).send({ message: "Password reset successfully" });
  } catch (err) {
    console.error("Error: ", err.message, "Stack: ", err.stack);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
