const { Joi } = require("express-validation");
const { OBJECTID_REGEX } = require("../constants");

module.exports.getTweet = {
  query: Joi.object({
    userId: Joi.string().regex(OBJECTID_REGEX).optional().allow(null, ""),
  }),
};

module.exports.getFollowingsTweets = {
  params: Joi.object({
    userId: Joi.string().regex(OBJECTID_REGEX).optional(),
  }),
};

module.exports.createTweet = {
  body: Joi.object({
    content: Joi.string().required(),
  }),
  params: Joi.object({
    userId: Joi.string().regex(OBJECTID_REGEX).required(),
  }),
};

module.exports.updateTweet = {
  body: Joi.object({
    content: Joi.string().optional(),
  }),
  params: Joi.object({
    userId: Joi.string().regex(OBJECTID_REGEX).required(),
  }),
};

module.exports.destroyTweet = {
  params: Joi.object({
    tweetId: Joi.string().regex(OBJECTID_REGEX).required(),
  }),
};
