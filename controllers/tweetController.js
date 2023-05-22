const TweetDao = require("../dao/tweetDao");
const tweetDao = new TweetDao();

class TweetController {
  getAllTweets = async (req, res) => {
    try {
      const tweets = await tweetDao.readTweets();
      return res.status(200).json({
        success: true,
        data: tweets,
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        error: err,
      });
    }
  };

  createTweet = async (req, res) => {
    try {
      const { id: userId } = req.user;
      const { content } = req.body;
      const tweet = await tweetDao.createTweet(userId, content);
      return res.status(201).json({
        success: true,
        messege: "tweet added",
        data: tweet,
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        error: err,
      });
    }
  };

  updateTweet = async (req, res) => {
    try {
      const { id: userId } = req.user;
      const { content } = req.body;
      const tweet = await tweetDao.updateTweetByUserId(userId, content);
      return res.status(200).json({
        success: true,
        messege: "tweet updated",
        data: tweet,
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        error: err,
      });
    }
  };

  getFollowingsTweets = async (req, res) => {
    try {
      const { userId } = req.params;
      const tweets = await tweetDao.readFollowingsTweets(userId);
      return res.status(200).json({
        success: true,
        data: tweets,
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        error: err,
      });
    }
  };

  destroyTweet = async (req, res) => {
    try {
      const { tweetId } = req.params;
      const deletedTweet = await tweetDao.deleteTweetByTweetId(tweetId);
      return res.status(200).json({
        success: true,
        messege: "tweet updated",
        data: deletedTweet,
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        error: err,
      });
    }
  };
}

module.exports = TweetController;
