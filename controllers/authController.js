const jwt = require("jsonwebtoken");
const env = require("../config/environment");

module.exports.login = (req, res) => {
  try {
    const { email, password } = req.body;

    const user = {
      email,
      password,
    };
    const token = jwt.sign(user, env.jwt_secret);
    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "server error",
      error: err,
    });
  }
};
