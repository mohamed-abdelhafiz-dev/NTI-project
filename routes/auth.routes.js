<<<<<<< HEAD
const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const { registerValidation, validate } = require("../utils/registerValidation");
router.post("/login", authController.login);

router.post("/register", registerValidation, validate, authController.signUp);

module.exports = router;
=======
const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
  // Handle user login logic here
  res.send("Login endpoint");
});

router.post("/register", (req, res) => {
  // Handle user registration logic here
  res.send("Register endpoint");
});

module.exports = router;
>>>>>>> cbb3a017eeac758ce9090898fe39a01302ae17a9
