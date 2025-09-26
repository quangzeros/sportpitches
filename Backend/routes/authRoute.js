const express = require("express");
const authController = require("../controllers/authController");
const authValidation = require("../validations/authValidation");
const router = express.Router();

router.post("/register", authValidation.Register, authController.Register);

router.post("/login", authValidation.Login, authController.Login);

router.get("/verify-token", authController.VerifyToken);

router.get("/refresh-token", authController.RefreshToken);

router.get("/logout", authController.Logout);

module.exports = router;
