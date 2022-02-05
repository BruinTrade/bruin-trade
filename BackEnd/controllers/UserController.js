import User from "../models/User.js";

export default class UserController {
  static async register(req, res, next) {
    let temp_user = new User(req.body);
    temp_user
      .register()
      .then(() => {
        req.sesson = { username: temp_user.data.username };
        res.json({ status: "success" });
      })
      .catch((errors) => {
        res.json({ errors: errors });
      });
  }

  static async login(req, res, next) {
    let temp_user = new User(req.body);
    temp_user
      .login()
      .then((message) => {
        //maybe add to session?
        res.json({ status: message });
      })
      .catch((error_message) => {
        res.json({ errors: error_message });
      });
  }

  static async logout(req, res, next) {}

  static async findUserById(req, res, next) {}

  static async getPostedItems(req, res, next) {}

  static async getFavorites(req, res, next) {}
}
