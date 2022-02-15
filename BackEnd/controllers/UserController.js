import User from "../models/User.js";
import jwt from "jsonwebtoken";

export default class UserController {
  static async register(req, res, next) {
    let temp_user = new User(req.body);
    temp_user
      .register()
      .then(() => {
        //req.sesson = { username: temp_user.data.username };
        let token;
        try {
          token = jwt.sign(
            {
              username: temp_user.data.username,
              email: temp_user.data.email,
              location: temp_user.data.location,
            },
            "scretekeygeneratedbyajshawn",
            { expiresIn: "1h" }
          );
        } catch (error) {
          res.json({ error: error });
          return;
        }

        res.json({
          username: temp_user.data.username,
          email: temp_user.data.email,
          location: temp_user.data.location,
          token: token,
        });
      })

      .catch((errors) => {
        res.json({ errors: errors });
      });
  }

  static async login(req, res, next) {
    let temp_user = new User(req.body);
    var temp;
    temp_user
      .login()
      .then((user_info) => {
        let token;
        try {
          token = jwt.sign(
            {
              username: user_info.username,
              email: user_info.email,
              location: user_info.location,
              cart: user_info.cart,
              followings: user_info.followings,
            },
            "scretekeygeneratedbyajshawn",
            { expiresIn: "1h" }
          );
        } catch (error) {
          res.json({ error: error });
          return;
        }

        res.json({
          username: user_info.username,
          email: user_info.email,
          location: user_info.location,
          cart: user_info.cart,
          followings: user_info.followings,
          token: token,
        });
      })
      .catch((error_message) => {
        res.json({ errors: error_message });
      });
    //.then(() => {
    //req.session.user = temp
    //});
  }

  static async checkLogin(req, res, next) {
    // console.log(req.session);
    // if (req.session.user) {
    //   res.json({ isLoggedIn: true, user: req.session.user });
    // } else {
    //   res.json({ isLoggedIn: false });
    // }
  }

  static async logout(req, res, next) {
    // req.session.destroy(() => {
    //   res.json({ status: "successfully logged out" });
    // });
  }

  static async addItemToCart(req, res, next) {
    User.addItemToCart(req.user_info.username, req.params.item_id)
      .then((message) => {
        res.json({ status: message });
      })
      .catch((error_message) => {
        res.json({ error: error_message });
      });
  }

  static async getItemsInCart(req, res, next) {
    User.getItemsInCart(req.user_info.username).then((cart)=>{
      res.json({cart: cart})
    }).catch((error_message)=>{
      res.json({error: error_message})
    })
  }

  static async findUserById(req, res, next) {}


  //static async findUserById(req, res, next) {}

  //static async getPostedItems(req, res, next) {}

  //static async getFavorites(req, res, next) {}
}
