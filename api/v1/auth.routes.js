const express = require("express");
const router = express.Router();
const { validate } = require("express-validation");
const authValidation = require("../../validations/auth.validation");
const { login } = require("../../controllers/authController");

router.post("/login", validate(authValidation.login, {}, {}), login);

module.exports = router;
