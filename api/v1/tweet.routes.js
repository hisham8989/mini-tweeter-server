const express = require("express");
const router = express.Router();
const { validate } = require("express-validation");
const TweetController = require("../../controllers/tweetController");
const authMiddleware = require("../../middlewares/auth.middleware");
const tweetValidation = require("../../validations/tweet.validation");

const controller = new TweetController();

router.get(
  "/",
  authMiddleware.verifyToken,
  validate(tweetValidation.getTweet),
  controller.getAllTweets
);

router.get(
  "/:userId/followers",
  authMiddleware.verifyToken,
  validate(tweetValidation.getFollowerTweets),
  controller.getFollowerTweets
);

router.post(
  "/create/:userId",
  authMiddleware.verifyToken,
  validate(tweetValidation.createTweet),
  controller.createTweet
);

router.post(
  "/update/:userId",
  authMiddleware.verifyToken,
  validate(tweetValidation.updateTweet),
  controller.updateTweet
);

module.exports = router;
