const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const Tweet = require("../models/Tweet");
const User = require("../models/User");

class TweetDao {
  readTweets(userId = null) {
    return new Promise(async (resolve, reject) => {
      try {
        const findQuery = {};
        if (userId) findQuery.user = userId;
        const tweets = await Tweet.find(findQuery)
          .populate({
            path: "user",
            select: "-password",
          })
          .sort({ createdAt: -1 });
        resolve(tweets);
      } catch (err) {
        reject(err);
      }
    });
  }

  readFollowingsTweets(userId) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await User.findById({ _id: userId });
        const tweets = await Tweet.find({
          user: { $in: user.following },
        })
          .populate({
            path: "user",
            select: ["-password", "-following", "-followers"],
          })
          .sort({ createdAt: -1 });
        resolve(tweets);
      } catch (err) {
        reject(err);
      }
    });
  }

  createTweet(userId, content) {
    return new Promise(async (resolve, reject) => {
      try {
        const tweet = new Tweet({
          content: content,
          user: userId,
        });
        const savedTweet = (await tweet.save()).populate({
          path: "user",
          select: "-password",
        });
        resolve(savedTweet);
      } catch (err) {
        reject(err);
      }
    });
  }

  updateTweetByTweetId(tweetId, updatedContent) {
    return new Promise(async (resolve, reject) => {
      try {
        const tweet = await Tweet.findByIdAndUpdate(
          tweetId,
          { content: updatedContent },
          { new: true }
        );
        resolve(tweet);
      } catch (err) {
        reject(err);
      }
    });
  }
  updateTweetByUserId(userId, updatedContent) {
    return new Promise(async (resolve, reject) => {
      try {
        const tweet = await Tweet.findOneAndUpdate(
          { user: userId },
          { content: updatedContent },
          { new: true }
        );
        resolve(tweet);
      } catch (err) {
        reject(err);
      }
    });
  }

  deleteTweetByTweetId(tweetId) {
    return new Promise(async (resolve, reject) => {
      try {
        const tweet = await Tweet.findByIdAndDelete(tweetId);
        resolve(tweet);
      } catch (err) {
        reject(err);
      }
    });
  }

  deleteTweetByUserId(userId) {
    return new Promise(async (resolve, reject) => {
      try {
        const tweet = await Tweet.findOneAndDelete({ user: userId });
        resolve(tweet);
      } catch (err) {
        reject(err);
      }
    });
  }
}

module.exports = TweetDao;
