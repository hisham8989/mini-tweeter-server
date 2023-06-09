const UserDao = require("../dao/userDao");
const bcrypt = require("bcrypt");
const userDao = new UserDao();

class UserController {
  createUser = async (req, res) => {
    try {
      const { username, password } = req.body;
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);
      await userDao.createUser(username, passwordHash);
      return res
        .status(201)
        .json({ success: true, message: "user registered" });
    } catch (err) {
      return res
        .status(err?.status || 500)
        .json({ success: false, error: err.message ?? err ?? "server error" });
    }
  };

  fetchUserById = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await userDao.getUserById(id);
      return res.status(200).json({ success: true, data: user });
    } catch (err) {
      return res
        .status(500)
        .json({ success: false, error: err || "server error" });
    }
  };
}

module.exports = UserController;
