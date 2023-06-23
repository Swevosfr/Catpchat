const router = require("express").Router();
const pool = require("../db");
const Authorization = require("../middleware/Authorization");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const AdmZip = require("adm-zip");

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

router.post("/api/ajout-theme", Authorization, async (req, res) => {
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

router.get("/theme", Authorization, async (req, res) => {
  try {
    const { id_theme } = req.query;
    // Insertion du nouveau thème dans la base de données
    const Theme = await pool.query("SELECT nom_theme from Theme");
    // Succès
    res.json(Theme.rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur de serveur" });
  }
});

router.post("/api/ajout-captcha/:id_theme", Authorization, async (req, res) => {
  try {
    const { nom_captcha } = req.body;
    const id_theme = req.params.id_theme;
    const id_user = req.user; // l'ID de l'utilisateur est obtenu à partir du middleware

    // Vérifiez si le thème existe
    const themeQuery = "SELECT * FROM Theme WHERE id_theme = $1";
    const themeResult = await pool.query(themeQuery, [id_theme]);

    if (themeResult.rows.length === 0) {
      return res
        .status(400)
        .json({ message: "Le thème spécifié n'existe pas" });
    }

    // Insertion du nouveau captcha dans la base de données
    const insertQuery =
      "INSERT INTO Captcha (nom_capchat, id_user, id_theme) VALUES ($1, $2, $3)";
    await pool.query(insertQuery, [nom_captcha, id_user, id_theme]);

    // Succès
    res.status(200).json({ message: "Captcha ajouté avec succès" });
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
  "/ajout-images/:id_captcha/:id_theme",
  upload.array("image", 8),
  async (req, res) => {
    try {
      const id_captcha = req.params.id_captcha;
      const id_theme = req.params.id_theme;
      const files = req.files;

      // Vérifiez si le captcha et le thème existent
      const captchaQuery = "SELECT * FROM Captcha WHERE id_captcha = $1";
      const themeQuery = "SELECT * FROM Theme WHERE id_theme = $1";
      const captchaResult = await pool.query(captchaQuery, [id_captcha]);
      const themeResult = await pool.query(themeQuery, [id_theme]);

      if (captchaResult.rows.length === 0) {
        return res
          .status(400)
          .json({ message: "Le captcha spécifié n'existe pas" });
      }
      if (themeResult.rows.length === 0) {
        return res
          .status(400)
          .json({ message: "Le thème spécifié n'existe pas" });
      }

      // Pour chaque fichier
      for (let i = 0; i < files.length; i++) {
        let file = files[i];
        let imageName = file.originalname;
        const question = req.body.questions[i];

        // Vérifiez le type d'image
        if (!isValidImageFile(image)) {
          return res.status(400).json({
            message:
              "Veuillez sélectionner un fichier d'image au format .png, .jpg ou .jpeg",
          });
        }

        // Déplacez l'image téléchargée vers le bon dossier en fonction de la présence de la question
        const destinationDir = question ? "singuliers" : "neutres";
        const oldFilePath = file.path;
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
          "INSERT INTO Image (nom_image, id_captcha, question_associee, id_theme) VALUES ($1, $2, $3, $4)";
        await pool.query(insertQuery, [
          imageName,
          id_captcha,
          question,
          id_theme,
        ]);
      }

      // Succès
      res.status(200).json({ message: "Images ajoutées avec succès" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erreur de serveur" });
    }
  }
);

module.exports = router;
