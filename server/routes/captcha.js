const router = require("express").Router();
const pool = require("../db");
const Authorization = require("../middleware/Authorization");

router.get("/images", Authorization, async (req, res) => {});

module.exports = router;
