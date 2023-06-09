const { Joi } = require("express-validation");
const { PASSWORD_REGEX, OBJECTID_REGEX } = require("../constants");

module.exports.register = {
  body: Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().pattern(PASSWORD_REGEX).required(),
  }),
};

module.exports.login = {
  body: Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().required(),
  }),
};

module.exports.fetchUserById = {
  params: Joi.object({
    id: Joi.string().regex(OBJECTID_REGEX).required(),
  }),
};
