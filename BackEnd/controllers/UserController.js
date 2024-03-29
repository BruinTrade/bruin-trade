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
            { expiresIn: "7d" }
          );
        } catch (error) {
          res.status(201).json({ errors: error });
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
        res.status(201).json({ errors: errors });
      });
  }

  static async login(req, res, next) {
    let temp_user = new User(req.body);

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
            { expiresIn: "7d" }
          );
        } catch (error) {
          res.status(201).json({ errors: error });
          return;
        }

        if (!user_info.icon_url)
        {
          user_info.icon_url = null
        }

        res.json({
          username: user_info.username,
          email: user_info.email,
          location: user_info.location,
          cart: user_info.cart,
          followings: user_info.followings,
          icon_url: user_info.icon_url,
          token: token,
        });
      })
      .catch((error_message) => {
        res.status(201).json({ errors: error_message });
      });

      //console.log("login from backend");
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
        res.status(201).json({ errors: error_message });
      });
  }

  static async getItemsInCart(req, res, next) {
    User.getItemsInCart(req.user_info.username)
      .then((cart) => {
        res.json({ cart: cart });
      })
      .catch((error_message) => {
        res.status(201).json({ errors: error_message });
      });
  }

  static async removeItemFromCart(req, res, next) {
    User.removeItemFromCart(req.user_info.username, req.params.item_id)
      .then((message) => {
        res.json({ status: message });
      })
      .catch((error_message) => {
        res.status(201).json({ errors: error_message });
      });
  }

  static async updateLocation(req, res, next) {
    const location = req.body.location
    if (!location)
    {
      res.status(201).json({ errors: "no location provided" });
      return
    }
    User.updateLocation(req.user_info.username, location)
      .then((message) => {
        res.json({ status: message });
      })
      .catch((error_message) => {
        res.status(201).json({ errors: error_message });
      });
  }

  static async getLocation(req, res, next) {
    User.getLocation(req.user_info.username)
    .then((location) => {
      res.json({ location: location });
    })
    .catch((error_message) => {
      res.status(201).json({ errors: error_message });
    });
  }

  static async getLocationByUsername(req, res, next) {
    if (!req.params.username)
    {
      res.status(201).json({ errors: "No username provided" });
      return
    }
    User.getLocation(req.params.username)
    .then((location) => {
      res.json({ location: location });
    })
    .catch((error_message) => {
      res.status(201).json({ errors: error_message });
    });
  }

  static async getVerbolLocationByUsername(req, res, next) {
    if (!req.params.username)
    {
      res.status(201).json({ errors: "No username provided" });
      return
    }
    User.getVerbolLocationByUsername(req.params.username)
    .then((location) => {
      res.json({ location: location });
    })
    .catch((error_message) => {
      res.status(201).json({ errors: error_message });
    });
  }

  static async updateUserInfo(req, res, next) {
    const new_email = req.body.email;
    const new_icon_url = req.body.icon_url;
    const new_location = req.body.location;
    if (!new_email)
    {
      res.status(201).json({ errors: "No new email provided" });
      return
    }
    if (!new_location)
    {
      res.status(201).json({ errors: "No new location" });
      return
    }
    if (new_icon_url)
    {
      User.updateUserInfo(req.user_info.username, new_email, new_icon_url, new_location)
      .then((message) => {
        res.json({ status: message });
      })
      .catch((error_message) => {
        res.status(201).json({ errors: error_message });
      });
    }
    else
    {
      User.updateUserInfo(req.user_info.username, new_email, null, new_location)
      .then((message) => {
        res.json({ status: message });
      })
      .catch((error_message) => {
        res.status(201).json({ errors: error_message });
      });
    }
  }
  
  static async getUserIconByUsername(req, res, next) {
    if (!req.params.username)
    {
      res.status(201).json({ errors: "No username provided" });
      return
    }
    User.getUserIconByUsername(req.params.username)
    .then((url) => {
      res.json({ icon_url: url });
    })
    .catch((error_message) => {
      res.status(201).json({ errors: error_message });
    });
  }

  
  
  static async findUserById(req, res, next) {}

  //static async getPostedItems(req, res, next) {}

  //static async getFavorites(req, res, next) {}
}
