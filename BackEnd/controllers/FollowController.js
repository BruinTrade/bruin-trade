import User from "../models/User.js";

export default class FollowController {
  static async follow(req, res, next) {
    const following_username = req.user_info.username;
    const followed_username = req.params.followed_username;
    User.follow(following_username, followed_username)
      .then((message) => {
        res.json({ status: message });
      })
      .catch((error_message) => {
        res.json({ errors: error_message });
      });
  }

  static async unfollow(req, res, next) {
    const following_username = req.user_info.username;
    const followed_username = req.params.followed_username;
    User.unfollow(following_username, followed_username)
      .then((message) => {
        res.json({ status: message });
      })
      .catch((error_message) => {
        res.json({ errors: error_message });
      });
  }

  static async getAllFollowings(req, res, next) {
    const following_username = req.user_info.username;
    User.getAllFollowings(following_username)
      .then((result) => {
        res.json({ users_followed: result });
      })
      .catch((error_message) => {
        res.json({ errors: error_message });
      });
  }
}
