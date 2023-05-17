const express = require("express");
const { createUser } = require("../../controllers/userController");
const router = express.Router();

router.get("/", (req, res) => {
  return res.status(200).json({
    msg: "user loaded",
  });
});

router.post("/create", createUser);

module.exports = router;
