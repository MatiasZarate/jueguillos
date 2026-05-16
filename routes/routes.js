const homeController = require('./../controllers/homeController');
const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", homeController.index)
router.get("/ahorcado", homeController.ahorcado)
router.get("/tateti", homeController.tateti)
router.get("/birdFlappy", homeController.birdFlappy)

module.exports = router;