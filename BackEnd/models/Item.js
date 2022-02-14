import mongodb from "mongodb";
const ObjectId = mongodb.ObjectID;

let itemCollection;

class Item {
  constructor(input_data, username, id_to_edit) {
    this.data = input_data;
    this.errors = [];

    if (id_to_edit) {
      this.data = {
        ...this.data,
        owner: username,
        id_to_edit: id_to_edit,
      };
    } else {
      this.data = {
        ...this.data,
        owner: username,
      };
    }
  }

  static async getItemCollection(client) {
    if (itemCollection) {
      return;
    }
    try {
      itemCollection = await client.db("BruinTrade").collection("items");
    } catch (error) {
      console.log(error);
    }
  }

  static async getItems(input_query) {
    let query;
    //can have more filters
    if (input_query.title) {
      query = { $text: { $search: input_query.title } };
    } else if (input_query.owner) {
      query = { $text: { $search: input_query.owner } };
    }

    let matching_items;
    try {
      matching_items = await itemCollection.find(query);
    } catch {
      console.log("error when finding items");
      return [];
    }

    try {
      const item_list = await matching_items.toArray();
      return item_list;
    } catch {
      console.log("error when converting to array");
      return [];
    }
  }

  clean() {}

  validate() {}

  async create() {
    return new Promise((resolve, reject) => {
      //this.clean()
      //this.validate()
      itemCollection
        .insertOne(this.data)
        .then(() => {
          resolve("successfully created item");
        })
        .catch(() => {
          reject("failed to create item");
        });
    });
  }

  static async findItemById(item_id) {
    return new Promise(async (resolve, reject) => {
      let result;
      try {
        result = await itemCollection.findOne({ _id: new ObjectId(item_id) });
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  //add check if the user is the owner of the item
  //title
  //price
  //description
  async update() {
    return new Promise(async (resolve, reject) => {
      // const temp_item = itemCollection.find({ "_id": { $eq: objectId(this.data.id_to_edit) } })
      // if (!temp_item)
      // {
      //   reject("item does not exist");
      //   return
      // }
      let item_info;

      Item.findItemById(this.data.id_to_edit)
        .then((result) => {
          item_info = result;
          if (!item_info) {
            reject("item does not exist");
            return;
          }
          if (item_info.owner != this.data.owner) {
            reject("item does not belong to current user");
            return;
          }
          itemCollection
            .findOneAndUpdate(
              { _id: new ObjectId(this.data.id_to_edit) },
              {
                $set: {
                  title: this.data.title,
                  price: this.data.price,
                  description: this.data.description,
                },
              }
            )
            .then(() => {
              resolve("successfully edited item");
            })
            .catch(() => {
              reject("failed to edit item");
            });
        })
        .catch(() => {
          reject("invalid item id");
          return;
        });
    });
  }

  async delete() {
    return new Promise(async (resolve, reject) => {
      let item_info;
      Item.findItemById(this.data.id_to_edit)
        .then((result) => {
          item_info = result;
          if (!item_info) {
            reject("item does not exist");
            return;
          }
          if (item_info.owner != this.data.owner) {
            reject("item does not belong to current user");
            return;
          }
          itemCollection
            .deleteOne({
              _id: ObjectId(this.data.id_to_edit),
            })
            .then(() => {
              resolve("successfully deleted item");
            })
            .catch(() => {
              reject("failed to delete item");
            });
        })
        .catch(() => {
          reject("invalid item id");
          return;
        });
    });
  }
}

export default Item;
