const UserDao = require("../dao/userDao");
const userDao = new UserDao();

class FollowController {
  followUser = async (req, res) => {
    try {
      const { toFollowId, userId } = req.params;
      // const { id: userId } = req.user;
      if (userId === toFollowId) throw "user can not follow himself";
      const followedUser = await userDao.followUser(userId, toFollowId);
      await userDao.addFollower(toFollowId, userId);
      return res
        .status(201)
        .json({ success: true, message: "start following", followedUser });
    } catch (err) {
      return res
        .status(500)
        .json({ success: false, error: err || "server error" });
    }
  };

  unFollowUser = async (req, res) => {
    try {
      const { toUnFollowId, userId } = req.params;
      // const { id: userId } = req.user;
      if (userId === toUnFollowId) throw "user can not unfollow himself";
      const unfollowedUser = await userDao.unfollowUser(userId, toUnFollowId);
      await userDao.removeFollower(toUnFollowId, userId);
      return res
        .status(201)
        .json({ success: true, message: "remove following", unfollowedUser });
    } catch (err) {
      return res
        .status(500)
        .json({ success: false, error: err || "server error" });
    }
  };
}

module.exports = FollowController;
