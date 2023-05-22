const express = require("express");
const router = express.Router();
const { validate } = require("express-validation");
const TweetController = require("../../controllers/tweetController");
const authMiddleware = require("../../middlewares/auth.middleware");
const tweetValidation = require("../../validations/tweet.validation");

const controller = new TweetController();

router.get(
  "/",
  validate(tweetValidation.getTweet),
  authMiddleware.verifyToken,
  controller.getAllTweets
);

router.get(
  "/:userId/following",
  validate(tweetValidation.getFollowingsTweets),
  authMiddleware.verifyToken,
  controller.getFollowingsTweets
);

router.post(
  "/create/:userId",
  validate(tweetValidation.createTweet),
  authMiddleware.verifyToken,
  controller.createTweet
);

router.post(
  "/update/:userId",
  validate(tweetValidation.updateTweet),
  authMiddleware.verifyToken,
  controller.updateTweet
);

router.delete(
  "/:tweetId",
  validate(tweetValidation.destroyTweet),
  authMiddleware.verifyToken,
  controller.destroyTweet
);

module.exports = router;
