const router = require("express").Router();
const pool = require("../db");
const Authorization = require("../middleware/Authorization");

router.post("/isAdmin", Authorization, async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT isadmin FROM users WHERE id_user = $1",
      [req.user]
    );
    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

router.post("/nameAdmin", Authorization, async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT user_first_name FROM users WHERE id_user = $1",
      [req.user]
    );
    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

router.get("/artistes", async (req, res) => {
  try {
    const artists = await pool.query(
      "SELECT id_user, user_first_name, user_last_name, user_email FROM Users WHERE isAdmin = 0"
    );
    res.json(artists.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server Error");
  }
});

// Supprimer un utilisateur, le captcha associé et les images
router.delete("/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Vérifier si l'utilisateur existe
    const userExists = await pool.query(
      "SELECT * FROM users WHERE id_user = $1",
      [id]
    );
    if (userExists.rows.length === 0) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    // Supprimer le captcha associé à l'utilisateur
    await pool.query("DELETE FROM captcha WHERE id_user = $1", [id]);

    // Récupérer les IDs des images associées au captcha
    const imageIds = await pool.query(
      "SELECT id_image FROM image WHERE id_captcha IN (SELECT id_captcha FROM captcha WHERE id_user = $1)",
      [id]
    );

    // Supprimer les images associées au captcha
    await pool.query(
      "DELETE FROM image WHERE id_captcha IN (SELECT id_captcha FROM captcha WHERE id_user = $1)",
      [id]
    );

    // Supprimer l'utilisateur
    await pool.query("DELETE FROM users WHERE id_user = $1", [id]);

    res.json({ message: "Utilisateur supprimé avec succès" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;

module.exports = router;
