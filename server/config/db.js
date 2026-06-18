const mysql = require("mysql2");

function getDbConfig() {
  const publicUrl = process.env.MYSQL_PUBLIC_URL || process.env.DATABASE_URL;

  if (publicUrl && publicUrl.startsWith("mysql://")) {
    const parsed = new URL(publicUrl);

    return {
      host: parsed.hostname,
      port: Number(parsed.port) || 3306,
      user: decodeURIComponent(parsed.username),
      password: decodeURIComponent(parsed.password),
      database: parsed.pathname.replace(/^\//, ""),
    };
  }

  return {
    host: process.env.DB_HOST || process.env.MYSQLHOST,
    user: process.env.DB_USER || process.env.MYSQLUSER,
    password: process.env.DB_PASSWORD || process.env.MYSQLPASSWORD,
    database: process.env.DB_NAME || process.env.MYSQLDATABASE,
    port: Number(process.env.DB_PORT || process.env.MYSQLPORT) || 3306,
  };
}

const config = getDbConfig();

if (!config.host || !config.user || !config.password || !config.database) {
  console.error("Variables de base de données manquantes.");
  console.error(
    "Sur Render, configurez DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT"
  );
  console.error("ou collez MYSQL_PUBLIC_URL depuis Railway (onglet Public Network).");
}

if (config.host && config.host.includes("railway.internal")) {
  console.error("DB_HOST utilise mysql.railway.internal : cela ne fonctionne pas depuis Render.");
  console.error(
    "Utilisez l'hôte PUBLIC Railway (ex: xxx.proxy.rlwy.net) depuis l'onglet Public Network."
  );
}

const db = mysql.createConnection({
  ...config,
  connectTimeout: 20000,
});

db.connect((err) => {
  if (err) {
    console.error("Erreur de connexion MySQL :", err.message);
    console.error(`Tentative : ${config.user}@${config.host}:${config.port}/${config.database}`);
  } else {
    console.log("MySQL connecté");
  }
});

module.exports = db;
