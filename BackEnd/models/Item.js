import mongodb from "mongodb";
import { ObjectId } from "mongodb";

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
    return new Promise(async (resolve, reject) => {
      let query;
      //can have more filters
      if (input_query.title) {
        query = { $text: { $search: input_query.title} };
      } else if (input_query.owner) {
        query = { $text: { $search: input_query.owner} };
      }

      let matching_items;
      try {
        matching_items = await itemCollection.find(query);
      } catch {
        reject("error when finding items");
      }

      try {
        const item_list = await matching_items.toArray();
        resolve(item_list);
      } catch(error){
        reject(error);
      }
    });
  }

  static async getItemDetailsById(item_id, current_user) {
    return new Promise(async (resolve, reject) => {
      let temp_item_info;
      try {
        temp_item_info = await Item.findItemById(item_id);
      } catch {
        reject("invalid item id");
        return;
      }
      if (!temp_item_info) {
        reject("item does not exist");
        return;
      }

      let pipeline = [
        {
          $match: {
            _id: new ObjectId(item_id),
          },
        },
        { $addFields: { string_id: { $toString: "$_id" } } },
        {
          $lookup: {
            from: "comments",
            localField: "string_id",
            foreignField: "item_id",
            as: "relatedComments",
          },
        },
        {
          $project: {
            _id: 1,
            title: 1,
            price: 1,
            description: 1,
            owner: 1,
            images: 1,
            condition: 1,
            location: 1,
            tags: 1,
            relatedComments: "$relatedComments",
          },
        },
      ];

      let item_details
      try{
        item_details = await itemCollection
        .aggregate(pipeline)
        .toArray();
        item_details = item_details[0]
      }
      catch
      {
        reject("failed to get item details")
      }

      // const related_comments = item_details.relatedComments
      // const filtered_comments = []
      // if (current_user != temp_item_info.owner)
      // {
      //   related_comments.forEach(comment => {
      //     if (comment.author === current_user || comment.target_user === current_user || !comment.target_user)
      //     {
      //       filtered_comments.push(comment)
      //     }
      //   });
      //   item_details = {...item_details, relatedComments : filtered_comments}
      //   resolve(item_details)
      // }
      // else
      // {
      //   resolve(item_details)
      // }
      resolve(item_details)
    });
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

  static async findItemsById(item_id_array) {
    return new Promise(async (resolve, reject) => {
      let ObjectId_array = [];
      if (!item_id_array)
      {
        return [];
      }
      item_id_array.forEach((element) => {
        try {
          ObjectId_array.push(new ObjectId(element));
        } catch {}
      });
      try {
        const result = await itemCollection
          .find({
            _id: {
              $in: [...ObjectId_array],
            },
          })
          .toArray();
        resolve(result);
      } catch {
        reject("failed to find items");
      }

      // .then(async (result) => {
      //   item_id_array = await result.toArray();
      //   target_object.items_array = item_id_array;
      //   resolve();
      // });

      // try {
      //   for (let item_id of item_id_array) {
      //     itemCollection
      //       .findOne({ _id: new ObjectId(item_id) })
      //       .then((result) => {
      //         if (result) {
      //           target_object.items_array.push(result);

      //           //console.log(target_object.items_array)
      //         }
      //       })
      //       .catch((error) => { console.log(error);});
      //   }
      // } catch (error) {
      //   reject(error);
      // }
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
