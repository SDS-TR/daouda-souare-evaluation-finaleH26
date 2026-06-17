const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT) || 3306,
  connectTimeout: 20000,
});

db.connect((err) => {
  if (err) {
    console.error("Erreur de connexion MySQL :", err.message);
    console.error(
      "Vérifiez DB_HOST, DB_USER, DB_PASSWORD, DB_NAME et DB_PORT sur Render."
    );
  } else {
    console.log("MySQL connecté");
  }
});

module.exports = db;
