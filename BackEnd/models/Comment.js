import { ObjectId } from "mongodb";
import Item from "./Item.js";

let commmentCollection;

class Comment {
  constructor(author, content, item_id, target_user, created_time) {
    if (target_user) {
      this.data = {
        author: author,
        content: content,
        item_id: item_id,
        target_user: target_user,
        created_time: created_time
      };
    } else {
      this.data = {
        author: author,
        content: content,
        item_id: item_id,
        created_time: created_time
      };
    }
    this.errors = [];
  }

  static async getCommentCollection(client) {
    if (commmentCollection) {
      return;
    }
    try {
      commmentCollection = await client.db("BruinTrade").collection("comments");
    } catch (error) {
      console.log(error);
    }
  }

  static async findCommentById(comment_id) {
    return new Promise(async (resolve, reject) => {
      let result;
      try {
        result = await commmentCollection.findOne({
          _id: new ObjectId(comment_id),
        });
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  async addComment() {
    return new Promise((resolve, reject) => {
      //this.clean()
      //this.validate()
      Item.findItemById(this.data.item_id).then((result) => {
        if (!result) {
          reject("item commented to does not exist");
          return;
        }
        commmentCollection
          .insertOne(this.data)
          .then(() => {
            resolve("successfully added comment");
          })
          .catch(() => {
            reject("failed to add comment");
          })
          .catch(() => {
            reject("invalid item id");
          });
      });
    });
  }

  static async deleteCommentById(comment_id, current_user) {
    return new Promise(async (resolve, reject) => {
      let comment_info;
      Comment.findCommentById(comment_id)
        .then((result) => {
          comment_info = result;
          //console.log(result)
          if (!comment_info) {
            reject("comment does not exist");
            return;
          }
          if (comment_info.author != current_user) {
            reject("comment does not belong to current user");
            return;
          }
          commmentCollection
            .deleteOne({
              _id: ObjectId(comment_id),
            })
            .then(() => {
              resolve("successfully deleted comment");
            })
            .catch(() => {
              reject("failed to delete comment");
            });
        })
        .catch(() => {
          reject("invalid comment id");
          return;
        });
    });
  }
}

export default Comment;
