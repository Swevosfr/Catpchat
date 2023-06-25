const router = require("express").Router();
const pool = require("../db");
const Authorization = require("../middleware/Authorization");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const AdmZip = require("adm-zip");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "uploads")); // Spécifiez le répertoire de destination des fichiers
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

router.post(
  "/upload-captcha",
  Authorization,
  upload.array("files"),
  async (req, res) => {
    try {
      const { captchaName, theme, newTheme } = req.body;
      const userID = req.user;
      let questions = req.body.questions;
      if (typeof questions === "string") {
        questions = JSON.parse(questions); // Parse questions if it is a string
      }

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
        const existingThemeQuery =
          "SELECT id_theme FROM Theme WHERE id_theme = $1";
        const result = await pool.query(existingThemeQuery, [theme]);
        if (result.rows.length === 0) {
          return res
            .status(400)
            .json({ error: "Le thème spécifié n'existe pas" });
        }

        themeID = theme;
      }

      const insertCaptchaQuery =
        "INSERT INTO Captcha (id_user, id_theme, nom_capchat, urlUsage) VALUES ($1, $2, $3, $4) RETURNING id_captcha";
      const captchaResult = await pool.query(insertCaptchaQuery, [
        userID,
        themeID,
        captchaName,
        captchaName,
      ]);
      const captchaID = captchaResult.rows[0].id_captcha;

      req.files.forEach(async (file, index) => {
        const question = questions[index] || null;
        const imageName = file.originalname;

        const destinationPath = path.join(
          __dirname,
          "..",
          "uploads",
          imageName
        );
        fs.renameSync(file.path, destinationPath);

        const url_image = path.join("uploads", imageName);

        const insertImageQuery =
          "INSERT INTO Image (id_captcha, nom_image, question_associee, url_image) VALUES ($1, $2, $3, $4)";
        await pool.query(insertImageQuery, [
          captchaID,
          imageName,
          question,
          url_image,
        ]);
      });

      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur de serveur" });
    }
  }
);

router.delete("/captcha/:id", Authorization, async (req, res) => {
  try {
    const captchaID = req.params.id;

    // Vérifier si le captcha existe
    const checkCaptchaQuery = "SELECT * FROM Captcha WHERE id_captcha = $1";
    const checkCaptchaResult = await pool.query(checkCaptchaQuery, [captchaID]);

    if (checkCaptchaResult.rows.length === 0) {
      return res
        .status(404)
        .json({ error: "Le captcha spécifié n'existe pas" });
    }

    // Supprimer les images associées au captcha
    const deleteImagesQuery = "DELETE FROM Image WHERE id_captcha = $1";
    await pool.query(deleteImagesQuery, [captchaID]);

    // Supprimer le captcha lui-même
    const deleteCaptchaQuery = "DELETE FROM Captcha WHERE id_captcha = $1";
    await pool.query(deleteCaptchaQuery, [captchaID]);

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur de serveur" });
  }
});

// Ajoutez cette route pour récupérer les thèmes existants
router.get("/themes", async (req, res) => {
  try {
    const getThemesQuery = "SELECT * FROM Theme";
    const themesResult = await pool.query(getThemesQuery);

    const themes = themesResult.rows.map((theme) => ({
      id: theme.id_theme,
      name: theme.nom_theme,
    }));

    res.json(themes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur de serveur" });
  }
});

router.get("/user-captcha", Authorization, async (req, res) => {
  try {
    const userID = req.user;

    // Recherche des captchas de l'utilisateur
    const getCaptchaQuery = `
      SELECT 
        Captcha.*, 
        Theme.nom_theme AS theme,
        Image.nom_image AS image_nom,
        Image.url_image AS image_url
      FROM 
        Captcha 
      JOIN 
        Theme ON Captcha.id_theme = Theme.id_theme 
      JOIN 
        Image ON Captcha.id_captcha = Image.id_captcha 
      WHERE 
        Captcha.id_user = $1
    `;
    const captchaResult = await pool.query(getCaptchaQuery, [userID]);

    if (captchaResult.rows.length === 0) {
      return res.status(404).json({ error: "Aucun captcha trouvé" });
    }

    // Création de l'objet de réponse contenant les informations des captchas
    const captchas = captchaResult.rows.map((row) => ({
      id_captcha: row.id_captcha,
      id_theme: row.id_theme,
      nom_captcha: row.nom_captcha,
      urlUsage: row.urlUsage,
      theme: row.theme,
      images: [
        {
          nom_image: row.image_nom,
          url_image: `/uploads/${row.image_url}`,
        },
      ],
    }));

    res.json(captchas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur de serveur" });
  }
});

// Route pour obtenir un captcha aléatoire avec toutes ses images et questions
router.get("/random-captcha", async (req, res) => {
  try {
    // Requête pour obtenir un captcha aléatoire avec le thème, toutes ses images et questions associées
    const randomCaptchaQuery = `
      SELECT 
        Captcha.*, 
        Theme.nom_theme AS theme,
        Image.nom_image AS image_nom,
        Image.url_image AS image_url,
        Image.question_associee AS image_question
      FROM 
        Captcha 
      JOIN 
        Theme ON Captcha.id_theme = Theme.id_theme 
      JOIN 
        Image ON Captcha.id_captcha = Image.id_captcha 
      WHERE 
        Captcha.id_captcha IN (
          SELECT 
            id_captcha 
          FROM 
            Captcha 
          ORDER BY 
            RANDOM()
          LIMIT 1
        )
    `;
    const captchaResult = await pool.query(randomCaptchaQuery);

    if (captchaResult.rows.length === 0) {
      return res.status(404).json({ error: "Aucun captcha trouvé" });
    }

    // Création de l'objet de réponse contenant les informations du captcha, ses images et questions
    const captcha = {
      id_captcha: captchaResult.rows[0].id_captcha,
      id_theme: captchaResult.rows[0].id_theme,
      nom_captcha: captchaResult.rows[0].nom_captcha,
      urlUsage: captchaResult.rows[0].urlUsage,
      theme: captchaResult.rows[0].theme,
      images: captchaResult.rows.map((row) => ({
        nom_image: row.image_nom,
        url_image: `../../../../server/${row.image_url}`, // Ajout du chemin relatif vers l'image
        question_associee: row.image_question, // Ajout de la question associée à l'image
      })),
    };

    res.json(captcha);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur de serveur" });
  }
});

module.exports = router;
