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
      if (user_info && bcrypt.compareSync(this.data.password, user_info.password))
      {
        this.data = user_info
        resolve(user_info)
      }
      else
      {
        reject("invalid password")
      }
    })
  }



  async findUserByName(input_username) {
    return new Promise(async (resolve, reject) => {
      userCollection.findOne({ username: input_username }).then((user_info) => {
        if (user_info) {
          let temp_user = new User(user_info);
          //clean up sensitive information
          temp_user = {
            _id: temp_user.data._id,
            username: temp_user.data.username,
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
