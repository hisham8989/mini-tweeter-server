const express = require("express");
const { validate } = require("express-validation");
const authValidation = require("../../validations/auth.validation");
const followValidation = require("../../validations/follow.validation");
const authMiddleware = require("../../middlewares/auth.middleware");
const UserController = require("../../controllers/userController");
const FollowController = require("../../controllers/followController");
const router = express.Router();

const controller = new UserController();
const followController = new FollowController();

router.post(
  "/create",
  validate(authValidation.register, {}, {}),
  authMiddleware.verifyToken,
  controller.createUser
);

router.post(
  "/follow/:toFollowId",
  validate(followValidation.follow, {}, {}),
  authMiddleware.verifyToken,
  followController.followUser
);

router.post(
  "/unfollow/:toUnFollowId",
  validate(followValidation.unfollow, {}, {}),
  authMiddleware.verifyToken,
  followController.unFollowUser
);

module.exports = router;
