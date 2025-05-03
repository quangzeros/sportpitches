const express = require("express");
const authController = require("../controllers/authController");
const authValidation = require("../validations/authValidation");
const router = express.Router();

router.post("/register", authValidation.Register, authController.Register);

router.post("/login", authController.Login);

module.exports = router;
