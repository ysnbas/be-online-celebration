const express = require("express");
const {
  register,
  login,
  getProfileData,
} = require("../controllers/accountsControllers");
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/get_profile_data", getProfileData);

module.exports = router;
