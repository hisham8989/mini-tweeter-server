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
        const tweets = await Tweet.find(findQuery);
        resolve(tweets);
      } catch (err) {
        reject(err);
      }
    });
  }

  readFollowerTweets(userId) {
    return new Promise(async (resolve, reject) => {
      try {
        const tweets = await User.aggregate([
          {
            $match: {
              _id: new ObjectId(userId),
            },
          },
          {
            $lookup: {
              from: "tweets",
              let: {
                followerIds: "$followers",
              },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $in: ["$user", "$$followerIds"],
                    },
                  },
                },
                {
                  $sort: {
                    createdAt: -1,
                  },
                },
              ],
              as: "followerTweets",
            },
          },
          {
            $project: {
              _id: 0,
              followerTweets: 1,
            },
          },
        ]);
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
        await tweet.save();
        resolve(tweet);
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
