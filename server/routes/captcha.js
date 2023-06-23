const router = require("express").Router();
const pool = require("../db");
const Authorization = require("../middleware/Authorization");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (req.body.question) {
      cb(null, "./uploads/singuliers");
    } else {
      cb(null, "./uploads/neutres");
    }
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/api/ajout-theme", async (req, res) => {
  try {
    const { nom_theme } = req.body;

    // Insertion du nouveau thème dans la base de données
    const newTheme = await pool.query(
      "INSERT INTO Theme (nom_theme) VALUES ($1) RETURNING *",
      [nom_theme]
    );
    // Succès
    res.status(200).json({ message: "Thème ajouté avec succès" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur de serveur" });
  }
});

router.post("/api/captcha", async (req, res) => {
  try {
    const { nom_captcha } = req.body;

    // Vérifiez si le label du captcha est déjà utilisé
    const existingCaptcha = await pool.query(
      "SELECT nom_captcha FROM Captcha WHERE id_captcha = $1",
      [nom_captcha]
    );
    if (existingCaptcha.rows.length > 0) {
      return res
        .status(400)
        .json({ message: "Le nom du captcha est déjà utilisé" });
    }

    const insertQuery =
      "INSERT INTO Captcha (nom_captcha) VALUES ($1) RETURNING id";
    const newCaptcha = await pool.query(insertQuery, [nom_captcha]);

    res.status(200).json({
      message: "Captcha ajouté avec succès",
      id: newCaptcha.rows[0].id_captcha,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur de serveur" });
  }
});

router.get("/upload-images", Authorization, async (req, res) => {});

router.get(
  "/upload-images",
  Authorization,
  upload.array("image"),
  async (req, res) => {}
);

router.post(
  "/upload-images/:imageName/:id_captcha",
  upload.single("imageFile"),
  async (req, res) => {
    try {
      let imageName = req.params.imageName;
      const question = req.body.question;
      const id_captcha = req.params.id_captcha;

      // Vérifiez le type d'image
      if (!isValidImageFile(req.file)) {
        return res.status(400).json({
          message:
            "Sélectionnez un fichier d'image au format .png, .jpg ou .jpeg",
        });
      }

      let ext = path.extname(req.file.originalname).toLowerCase();
      let newExt = path.extname(imageName).toLowerCase();

      if (newExt !== ".png" && newExt !== ".jpg" && newExt !== ".jpeg") {
        imageName += ext;
      }

      // Déplacez l'image téléchargée vers le bon dossier en fonction de la présence de la question
      const destinationDir = question ? "singuliers" : "neutres";
      const oldFilePath = req.file.path;
      const newFilePath = path.join(
        __dirname,
        "..",
        "upload",
        destinationDir,
        imageName
      );
      fs.renameSync(oldFilePath, newFilePath);

      // Insérer la nouvelle image dans la base de données
      const insertQuery =
        "INSERT INTO Image (nom_image, id_captcha, question_associee) VALUES ($1, $2, $3)";
      await pool.query(insertQuery, [imageName, id_captcha, question]);

      // Succès
      res.status(200).json({ message: "Image ajoutée avec succès" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erreur de serveur" });
    }
  }
);

module.exports = router;
