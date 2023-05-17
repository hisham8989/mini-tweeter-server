const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  return res.status(200).json({
    msg: "post loaded",
    user: req.user,
  });
});

module.exports = router;
