const router = require("express").Router();
const pool = require("../db");
const Authorization = require("../middleware/Authorization");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (req.body.question) {
      cb(null, "./uploads/singulier");
    } else {
      cb(null, "./uploads/neutre");
    }
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/images", Authorization, async (req, res) => {});

module.exports = router;
