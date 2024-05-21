const express = require("express");
const { getPrompts } = require("../controllers/promptControllers");
const router = express.Router();

router.post("/prompts", getPrompts);

module.exports = router;
