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
    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid credentials" });
    }

    const copyUser = {
      _id: user._id,
      username: user.username,
      followers: [...user.followers],
      following: [...user.following],
    };

    const token = generateToken({ id: copyUser._id });
    return res.status(200).json({
      success: true,
      message: "login successfull",
      token,
      user: copyUser,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: err,
    });
  }
};

function generateToken(payload) {
  const token = jwt.sign(payload, env.jwt_secret);
  return token;
}
