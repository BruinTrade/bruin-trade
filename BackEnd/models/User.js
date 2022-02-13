import bcrypt from "bcryptjs";

let userCollection;

class User {
  constructor(input_data) {
    this.data = input_data;
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

  clean() {

  }

  validate() {

  }

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
        return
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
      })
      if (user_info && bcrypt.compareSync(this.data.password, user_info.password)) {
        this.data = user_info
        resolve(user_info)
      }
      else {
        reject("invalid password")
      }
    })
  }

  static async addItemToCart(input_username, input_item_id) {
    return new Promise(async (resolve, reject) => {
      let current_user_info
      try{
        current_user_info = await this.findUserByName(input_username)
        //console.log(current_user_info)
        //console.log(current_user_info.cart)
        if (!current_user_info.cart)
        {
          current_user_info.cart = []
        }
        //console.log(current_user_info.cart)
      }
      catch
      {
        reject("failed to find user")
        return
      }

      if (current_user_info.cart.includes(input_item_id))
      {
        reject("item already in cart")
        return
      }

      const new_cart = [...current_user_info.cart, input_item_id]
      //console.log(new_cart)
      userCollection.findOneAndUpdate(
        { username: input_username },
        {
          $set: {
            cart: new_cart
          },
        }
      ).then(() => {
        resolve("successfully added to cart")
      }).catch(() => {
        reject("failed to add to cart")
      })
    })
  }

  static async getItemsInCart(input_username)
  {
    return new Promise(async (resolve, reject) => {
      this.findUserByName(input_username).then((result)=>{
        resolve(result.cart)
      }).catch(()=>{
        reject("failed to find user")
      })
    })
  }


  static async findUserByName(input_username) {
    return new Promise(async (resolve, reject) => {
      userCollection.findOne({ username: input_username }).then((user_info) => {
        if (user_info) {
          let temp_user = new User(user_info);
          //clean up sensitive information
          temp_user = {
            _id: temp_user.data._id,
            username: temp_user.data.username,
            email: temp_user.data.email,
            location: temp_user.data.location,
            cart: temp_user.data.cart
            //more info here
          };
          resolve(temp_user);
        } else {
          reject();
        }
      });
    });
  }
}

export default User;
