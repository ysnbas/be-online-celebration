const express = require("express");
const { getGeneratedData } = require("../controllers/generatedControllers");
const router = express.Router();

router.get("/generated_data", getGeneratedData);

module.exports = router;
