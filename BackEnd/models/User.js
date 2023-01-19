import bcrypt from "bcryptjs";
import Item from "./Item.js";

let userCollection;

class User {
  constructor(input_data) {
    this.data = { ...input_data, username: input_data.username };
    this.errors = [];
  }

  static async getUserCollection(client) {
    if (userCollection) {
      return;
    }
    try {
      userCollection = await client.db("BruinTrade").collection("users");
    } catch (error) {
      console.log(error);
    }
  }

  clean() {}

  validate() {}

  async register() {
    return new Promise(async (resolve, reject) => {
      //this.clean()
      //this.validate()

      let user_info = await userCollection.findOne({
        username: this.data.username,
      });
      if (user_info) {
        this.errors.push("Username already exists");
        reject(this.errors);
        return;
      }

      let salt = bcrypt.genSaltSync(10);
      this.data.password = bcrypt.hashSync(this.data.password, salt);
      await userCollection.insertOne(this.data);
      resolve();
    });
  }

  async login() {
    return new Promise(async (resolve, reject) => {
      let user_info = await userCollection.findOne({
        username: this.data.username,
      });
      if (!user_info) {
        reject("User does not exist");
        return;
      }
      if (
        user_info &&
        bcrypt.compareSync(this.data.password, user_info.password)
      ) {
        this.data = user_info;
        resolve(user_info);
      } else {
        reject("Invalid password");
      }
    });
  }

  static async addItemToCart(input_username, input_item_id) {
    return new Promise(async (resolve, reject) => {
      let current_user_info;
      let result;
      try {
        current_user_info = await this.findUserByName(input_username);
        //console.log(current_user_info)
        //console.log(current_user_info.cart)
        if (!current_user_info.cart) {
          current_user_info.cart = [];
        }
        //console.log(current_user_info.cart)
      } catch {
        reject("failed to find user");
        return;
      }

      if (current_user_info.cart.includes(input_item_id)) {
        reject("item already in cart");
        return;
      }

      try {
        result = await Item.findItemById(input_item_id);
      } catch {
        reject("invalid item id");
        return;
      }

      if (!result) {
        reject("item does not exist");
        return;
      }

      const new_cart = [...current_user_info.cart, input_item_id];
      //console.log(new_cart)
      userCollection
        .findOneAndUpdate(
          { username: input_username },
          {
            $set: {
              cart: new_cart,
            },
          }
        )
        .then(() => {
          resolve("successfully added to cart");
        })
        .catch(() => {
          reject("failed to add to cart");
        });
    });
  }

  static async getItemsInCart(input_username) {
    return new Promise(async (resolve, reject) => {
      this.findUserByName(input_username)
        .then(async (user) => {
          if (!user.cart)
          {
            resolve([])
          }
          Item.findItemsById(user.cart)
            .then((result) => {
              resolve(result);
            })
            .catch((error) => {
              reject(error);
            });
        })
        .catch((error) => {
          reject("failed to find user" + error);
        });
    });
  }

  static async findUserByName(input_username) {
    return new Promise(async (resolve, reject) => {
      userCollection.findOne({ username: input_username }).then((user_info) => {
        if (user_info) {
          let temp_user = new User(user_info);
          //clean up sensitive information
          if (!temp_user.data.icon_url)
          {
            temp_user.data.icon_url = null
          }
          temp_user = {
            _id: temp_user.data._id,
            username: temp_user.data.username,
            email: temp_user.data.email,
            location: temp_user.data.location,
            cart: temp_user.data.cart,
            followings: temp_user.data.followings,
            gps_location: temp_user.data.gps_location,
            icon_url: temp_user.data.icon_url
            //more info here
          };
          resolve(temp_user);
        } else {
          reject();
        }
      });
    });
  }

  static async follow(following_username, followed_username) {
    return new Promise(async (resolve, reject) => {
      let current_user_info;
      try {
        current_user_info = await this.findUserByName(following_username);
        if (!current_user_info.followings) {
          current_user_info.followings = [];
        }
      } catch {
        reject("failed to find current user");
        return;
      }

      let followed_user_info;
      try {
        followed_user_info = await this.findUserByName(followed_username);
      } catch {
        reject("failed to find the user to follow");
        return;
      }

      //console.log(current_user_info.followings)
      if (current_user_info.followings.includes(followed_username)) {
        reject("already followed this user");
        return;
      }

      const new_followings = [
        ...current_user_info.followings,
        followed_username,
      ];
      userCollection
        .findOneAndUpdate(
          { username: following_username },
          {
            $set: {
              followings: new_followings,
            },
          }
        )
        .then(() => {
          resolve("successfully followed user");
        })
        .catch(() => {
          reject("failed to follow user");
        });
    });
  }

  static async unfollow(following_username, followed_username) {
    return new Promise(async (resolve, reject) => {
      let current_user_info;
      try {
        current_user_info = await this.findUserByName(following_username);
        if (!current_user_info.followings) {
          current_user_info.followings = [];
        }
      } catch {
        reject("failed to find current user");
        return;
      }

      //console.log(current_user_info.followings)

      const new_followings = current_user_info.followings;
      const index = new_followings.indexOf(followed_username);
      if (index > -1) {
        new_followings.splice(index, 1);
      } else {
        reject("already unfollowed or user does not exist");
        return;
      }

      userCollection
        .findOneAndUpdate(
          { username: following_username },
          {
            $set: {
              followings: new_followings,
            },
          }
        )
        .then(() => {
          resolve("successfully unfollowed user");
        })
        .catch(() => {
          reject("failed to unfollow user");
        });
    });
  }

  static async getAllFollowings(following_username) {
    return new Promise(async (resolve, reject) => {
      let current_user_info;
      try {
        current_user_info = await this.findUserByName(following_username);
        if (!current_user_info.followings) {
          current_user_info.followings = [];
        }

        resolve(current_user_info.followings);
      } catch {
        reject("failed to find current user");
        return;
      }
    });
  }

  static async removeItemFromCart(input_username, item_id) {
    return new Promise(async (resolve, reject) => {
      let current_user_info;
      try {
        current_user_info = await this.findUserByName(input_username);
        if (!current_user_info.cart) {
          current_user_info.cart = [];
        }
      } catch {
        reject("failed to find user");
        return;
      }

      const new_cart = current_user_info.cart;
      const index = new_cart.indexOf(item_id);
      if (index > -1) {
        new_cart.splice(index, 1);
      } else {
        reject("already not in cart or item does not exist");
        return;
      }

      userCollection
        .findOneAndUpdate(
          { username: input_username },
          {
            $set: {
              cart: new_cart,
            },
          }
        )
        .then(() => {
          resolve("successfully removed from cart");
        })
        .catch(() => {
          reject("failed to remove from cart");
        });
    });
  }

  static async updateLocation(username, location) {
    return new Promise(async (resolve, reject) => {
      userCollection
        .findOneAndUpdate(
          { username: username },
          {
            $set: {
              gps_location: location,
            },
          }
        )
        .then(() => {
          resolve("successfully updated location");
        })
        .catch(() => {
          reject("failed to update location");
        });
    });
  }

  static async getLocation(username) {
    return new Promise(async (resolve, reject) => {
      let current_user_info;
      try {
        current_user_info = await this.findUserByName(username);
        //console.log(current_user_info)
        if (!current_user_info.gps_location) {
          current_user_info.gps_location = null;
        }
        resolve(current_user_info.gps_location);
      } catch {
        reject("failed to find current user");
        return;
      }
    });
  }

  static async getVerbolLocationByUsername(username) {
    return new Promise(async (resolve, reject) => {
      let current_user_info;
      try {
        current_user_info = await this.findUserByName(username);
        //console.log(current_user_info)
        if (!current_user_info.location) {
          current_user_info.location = null;
        }
        resolve(current_user_info.location);
      } catch {
        reject("failed to find current user");
        return;
      }
    });
  }

  static async updateUserInfo(username, new_email, new_icon_url, new_location) {
    return new Promise(async (resolve, reject) => {
      if (new_icon_url)
      {
        userCollection
        .findOneAndUpdate(
          { username: username },
          {
            $set: {
              email: new_email,
              icon_url: new_icon_url,
              location: new_location
            },
          }
        )
        .then(() => {
          resolve("successfully updated user info");
        })
        .catch(() => {
          reject("failed to updated user info");
        });
      }
      else
      {
        userCollection
        .findOneAndUpdate(
          { username: username },
          {
            $set: {
              email: new_email,
              location: new_location
            },
          }
        )
        .then(() => {
          resolve("successfully updated user info");
        })
        .catch(() => {
          reject("failed to updated user info");
        });
      }
    });
  }

  static async getUserIconByUsername(username) {
    return new Promise(async (resolve, reject) => {
      let current_user_info;
      try {
        current_user_info = await this.findUserByName(username);
        //console.log(current_user_info)
        if (!current_user_info.icon_url) {
          current_user_info.icon_url = null;
        }
        resolve(current_user_info.icon_url);
      } catch {
        reject("failed to find current user");
        return;
      }
    });
  }

  
}

export default User;
