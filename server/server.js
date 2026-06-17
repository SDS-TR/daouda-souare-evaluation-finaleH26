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

const clientDist = path.join(__dirname, "../client/dist");

if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));

  app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(clientDist, "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.json({
      message: "API Bibliothèque numérique",
      endpoints: {
        livres: "/api/livres",
        emprunts: "/api/emprunts?email=votre@email.com",
      },
    });
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
