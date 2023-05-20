const jwt = require("jsonwebtoken");
const UserDao = require("../dao/userDao");
const env = require("../config/environment");
const bcrypt = require("bcrypt");
const userDao = new UserDao();

module.exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userDao.getUserByUsername(username);
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) throw "password does not match";

    const userData = {
      username: user.username,
      followers: user.following,
      following: user.following,
    };

    const token = jwt.sign({ id: user._id }, env.jwt_secret);
    return res.status(200).json({ token, userData });
  } catch (err) {
    console.log("asds", err);
    return res.status(500).json({
      success: false,
      error: err,
    });
  }
};
