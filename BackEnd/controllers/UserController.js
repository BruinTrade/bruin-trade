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
      .then((user_info) => {
        //maybe add to session?
        req.session.user = user_info
        res.json({ status: "successfully logged in" });
      })
      .catch((error_message) => {
        res.json({ errors: error_message });
      });
  }
  static async checkLogin(req, res, next) {
    if (req.session.user) {
      res.json({ isLoggedIn: true, user: req.session.user });
    } else {
      res.json({ isLoggedIn: false });
    }
  }

  static async logout(req, res, next) {
    req.session.destroy(()=>{
      res.json({ status: "successfully logged out" })
    })
  }

  static async addItemToCart(req, res, next) {
    User.addItemToCart(req.params.username, req.params.item_id).then((message)=>{
      res.json({ status: message });
    }).catch((error_message)=>{
      res.json({ error: error_message });
    })
  }

  static async findUserById(req, res, next) {}

  static async getPostedItems(req, res, next) {}

  static async getFavorites(req, res, next) {}
}
