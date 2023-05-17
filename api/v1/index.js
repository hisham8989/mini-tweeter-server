const express = require("express");
const { verifyToken } = require("../../middlewares/auth.middleware");
const router = express.Router();

router.get("/", (req, res) => {
  return res.status(200).json({
    status: "success",
    message: "v1 api",
  });
});

// API ROUTES
router.use("/auth", require("./auth.routes"));
router.use("/posts", require("./post.routes"));
router.use("/users", require("./user.routes"));

module.exports = router;
