const express = require("express");
const router = express.Router();

const { getLivresEmpruntesByEmail } = require("../controllers/livresController");

// Emprunts actifs d'un utilisateur via son email
router.get("/", getLivresEmpruntesByEmail);

module.exports = router;