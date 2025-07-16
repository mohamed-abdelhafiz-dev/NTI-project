const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const {
  registerValidation,
  loginValidation,
  validate,
} = require("../utils/validation");
const upload = require("../config/multer");
router.post(
  "/register",
  upload.single("image"),

  registerValidation,
  validate,
  authController.signUp
);

router.post("/login", loginValidation, validate, authController.login);

module.exports = router;
