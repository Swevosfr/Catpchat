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

module.exports = router;
