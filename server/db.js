const { Pool } = require("pg");

// Configurer les paramètres de connexion à la base de données
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "capchat",
  password: "Basket170",
  port: 5432, // Port par défaut pour PostgreSQL
});

module.exports = pool;
