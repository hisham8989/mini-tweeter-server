const User = require("../models/User");

class UserDao {
  createUser(username, password) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = new User({
          username: username,
          password: password,
        });
        await user.save();
        resolve(user);
      } catch (err) {
        reject(err);
      }
    });
  }

  getUserByUsername(username) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await User.findOne({ username: username });
        if (!user) throw "username does not exist";
        resolve(user);
      } catch (err) {
        reject(err);
      }
    });
  }

  followUser(userId, userToFollowId) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await User.findByIdAndUpdate(
          userId,
          { $addToSet: { following: userToFollowId } },
          { new: true }
        ).select("-password");
        resolve(user.following[user.following.length - 1]);
      } catch (err) {
        reject(err);
      }
    });
  }

  unfollowUser(userId, userToUnfollowId) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await User.findByIdAndUpdate(
          userId,
          { $pull: { following: userToUnfollowId } },
          { new: true }
        ).select("-password");

        resolve(userToUnfollowId);
      } catch (err) {
        reject(err);
      }
    });
  }

  addFollower(userId, userToFollowerListId) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await User.findByIdAndUpdate(
          userId,
          { $addToSet: { followers: userToFollowerListId } },
          { new: true }
        );
        resolve(user);
      } catch (err) {
        reject(err);
      }
    });
  }

  removeFollower(userId, userToUnfollowerListId) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await User.findByIdAndUpdate(
          userId,
          { $pull: { followers: userToUnfollowerListId } },
          { new: true }
        );

        resolve(user);
      } catch (err) {
        reject(err);
      }
    });
  }

  getUserById(userId) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await User.findById(userId).select("-password");
        if (!user) throw "username does not exist";
        resolve(user);
      } catch (err) {
        reject(err);
      }
    });
  }
}

module.exports = UserDao;
