const express = require("express");
const { generateImage } = require("../controllers/openaiControllers");
const router = express.Router();

router.post("/generate_image", generateImage);

module.exports = router;
