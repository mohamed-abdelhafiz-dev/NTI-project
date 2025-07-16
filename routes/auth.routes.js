const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const { registerValidation, validate } = require("../utils/registerValidation");
router.post("/login", authController.login);

router.post("/register", registerValidation, validate, authController.signUp);

module.exports = router;
