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
      "SELECT user_first_name, user_last_name, user_email FROM Users WHERE isAdmin = 0"
    );
    res.json(artists.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
