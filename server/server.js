require("dotenv").config();

const path = require("path");
const fs = require("fs");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const livresRoutes = require("./routes/livresRoutes");
const empruntsRoutes = require("./routes/empruntsRoutes");

app.use("/api/livres", livresRoutes);
app.use("/api/emprunts", empruntsRoutes);

app.get("/api/health", (req, res) => {
  const db = require("./config/db");
  db.query("SELECT 1 AS ok", (err) => {
    if (err) {
      return res.status(503).json({
        status: "error",
        message: "Connexion MySQL impossible",
        details: err.message,
      });
    }
    res.json({ status: "ok", message: "API et base de données opérationnelles" });
  });
});

const staticCandidates = [
  path.join(__dirname, "public"),
  path.join(__dirname, "../client/dist"),
];

const clientDist = staticCandidates.find((dir) =>
  fs.existsSync(path.join(dir, "index.html"))
);

if (clientDist) {
  console.log(`Frontend servi depuis : ${clientDist}`);
  app.use(express.static(clientDist));

  app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(clientDist, "index.html"));
  });
} else {
  console.warn("Aucun build frontend trouvé (public/ ou client/dist).");
  app.get("/", (req, res) => {
    res.json({
      message: "API Bibliothèque numérique",
      endpoints: {
        health: "/api/health",
        livres: "/api/livres",
        emprunts: "/api/emprunts?email=votre@email.com",
      },
    });
  });
}

const PORT = process.env.PORT || 5000;

if (process.env.RENDER) {
  if (process.env.DB_PORT && String(PORT) === String(process.env.DB_PORT)) {
    console.error(
      "ATTENTION : PORT et DB_PORT ont la même valeur (" +
        PORT +
        "). Supprimez PORT des variables Render."
    );
  }

  if (!process.env.DB_HOST && !process.env.MYSQL_PUBLIC_URL) {
    console.error("ATTENTION : aucune configuration MySQL détectée sur Render.");
  }
}

app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
