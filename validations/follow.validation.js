const { Joi } = require("express-validation");
const { OBJECTID_REGEX } = require("../constants");

module.exports.follow = {
  params: Joi.object({
    toFollowId: Joi.string().regex(OBJECTID_REGEX).required(),
  }),
};

module.exports.unfollow = {
  params: Joi.object({
    toUnFollowId: Joi.string().regex(OBJECTID_REGEX).required(),
  }),
};
