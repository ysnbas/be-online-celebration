const express = require("express");
const { generateVideo } = require("../controllers/runwaymlControllers");
const router = express.Router();

router.post("/generate_video", generateVideo);

module.exports = router;
