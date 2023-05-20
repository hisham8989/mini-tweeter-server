const UserDao = require("../dao/userDao");
const userDao = new UserDao();

class FollowController {
  followUser = async (req, res) => {
    try {
      const { toFollowId } = req.params;
      const { id: userId } = req.user;
      if (userId === toFollowId) throw "user can not follow himself";
      await userDao.followUser(userId, toFollowId);
      await userDao.addFollower(toFollowId, userId);
      return res
        .status(201)
        .json({ success: true, message: "start following" });
    } catch (err) {
      return res
        .status(500)
        .json({ success: false, error: err || "server error" });
    }
  };

  unFollowUser = async (req, res) => {
    try {
      const { toUnFollowId } = req.params;
      const { id: userId } = req.user;
      if (userId === toUnFollowId) throw "user can not unfollow himself";
      await userDao.unfollowUser(userId, toUnFollowId);
      await userDao.removeFollower(toUnFollowId, userId);
      return res
        .status(201)
        .json({ success: true, message: "remove following" });
    } catch (err) {
      return res
        .status(500)
        .json({ success: false, error: err || "server error" });
    }
  };
}

module.exports = FollowController;
