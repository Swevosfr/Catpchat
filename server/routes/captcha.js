const router = require("express").Router();
const pool = require("../db");
const Authorization = require("../middleware/Authorization");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const AdmZip = require("adm-zip");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "uploads", "images", "temp")); // Spécifiez le répertoire de destination des fichiers
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Utilisez le nom d'origine du fichier
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
  "/api/newCaptcha",
  Authorization,
  upload.array("files"),
  async (req, res) => {
    try {
      const { captchaName, theme, newTheme } = req.body;
      const userID = req.user;
      const filesData = JSON.parse(req.body.filesData);
      let fileFiles = req.files;

      const validCaptchaName = await pool.query(
        "SELECT id_captcha FROM Captcha WHERE nom_capchat = $1",
        [captchaName]
      );
      if (validCaptchaName.rows.length >= 1)
        return res
          .status(400)
          .json({ error: "Le nom de captcha est déjà utilisé" });

      let themeID;
      if (theme === "nouveau") {
        const insertThemeQuery =
          "INSERT INTO Theme (nom_theme) VALUES ($1) RETURNING id_theme";
        const result = await pool.query(insertThemeQuery, [newTheme]);

        themeID = result.rows[0].id_theme;
      } else {
        themeID = theme;
      }

      const insertCaptchaQuery =
        "INSERT INTO Captcha (id_user, id_theme, nom_capchat) VALUES ($1, $2, $3) RETURNING id_captcha";
      const captchaResult = await pool.query(insertCaptchaQuery, [
        userID,
        themeID,
        captchaName,
      ]);
      const captchaID = captchaResult.rows[0].id_captcha;

      for (let i = 0; i < filesData.length; i++) {
        const { name, question } = filesData[i];

        const isQuestionFile = !!question;
        let newFileName = name;
        const fileFile = fileFiles[i];
        const extension = path.extname(newFileName);
        if (!extension || (extension !== ".png" && extension !== ".jpg")) {
          const originalExtension = path.extname(fileFile.originalname);
          if (originalExtension === ".png" || originalExtension === ".jpg") {
            newFileName = newFileName + originalExtension;
          } else {
            return res
              .status(400)
              .json({ error: "Le fichier doit être une image PNG ou JPG" });
          }
        }

        const sourcePath = path.join(__dirname, "..", "uploads", "temp", name);
        const destinationPath = path.join(
          __dirname,
          "..",
          "uploads",
          isQuestionFile ? "questions" : "answers",
          captchaName,
          newFileName
        );
        fs.renameSync(sourcePath, destinationPath);

        const url_image = path.join(
          "uploads",
          isQuestionFile ? "questions" : "answers",
          captchaName,
          newFileName
        );

        const insertImageQuery =
          "INSERT INTO Image (id_captcha, nom_image, question_associee) VALUES ($1, $2, $3)";
        await pool.query(insertImageQuery, [captchaID, newFileName, question]);
      }

      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur de serveur" });
    }
  }
);

module.exports = router;
