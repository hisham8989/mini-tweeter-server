const TweetDao = require("../dao/tweetDao");
const tweetDao = new TweetDao();

class TweetController {
  getAllTweets = async (req, res) => {
    try {
      const { id: userId } = req.user;
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

  getFollowerTweets = async (req, res) => {
    try {
      const { userId } = req.params;
      const tweets = await tweetDao.readFollowerTweets(userId);
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
}

module.exports = TweetController;
