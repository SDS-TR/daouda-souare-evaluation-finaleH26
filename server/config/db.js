const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  connectTimeout: 15000,
  ssl:
    process.env.DB_SSL === "true"
      ? { rejectUnauthorized: false }
      : undefined,
});

db.connect((err) => {
  if (err) {
    console.error("Erreur de connexion MySQL :", err.message);
  } else {
    console.log("MySQL connecté");
  }
});

module.exports = db;
