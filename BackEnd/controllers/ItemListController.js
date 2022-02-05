import Item from "../models/Item.js";

export default class ItemListController {
  static async getItems(req, res, next) {
    //filter name, category, ...
  }

  static async getItemById(req, res, next) {}

  static async createItem(req, res, next) {
    let temp_item = new Item(req.body, req.params.username);
    temp_item
      .create()
      .then((message) => {
        res.json({ status: message });
      })
      .catch((error_message) => {
        res.json({ errors: error_message });
      });
  }

  static async editItem(req, res, next) {}

  static async deleteItem(req, res, next) {}
}
