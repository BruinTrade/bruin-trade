import Item from "../models/Item.js";

export default class ItemListController {
  static async getItemById(req, res, next) {}

  static async createItem(req, res, next) {
    let temp_item = new Item(req.body, req.user_info.username);
    temp_item
      .create()
      .then((message) => {
        res.json({ status: message });
      })
      .catch((error_message) => {
        res.status(201).json({ errors: error_message });
      });
  }

  static async editItem(req, res, next) {
    let temp_item = new Item(
      req.body,
      req.user_info.username,
      req.params.item_id
    );
    temp_item
      .update()
      .then((message) => {
        res.json({ status: message });
      })
      .catch((error_message) => {
        res.status(201).json({ errors: error_message });
      });
  }

  static async deleteItem(req, res, next) {
    let temp_item = new Item(
      req.body,
      req.user_info.username,
      req.params.item_id
    );
    temp_item
      .delete()
      .then((message) => {
        res.json({ status: message });
      })
      .catch((error_message) => {
        res.status(201).json({ errors: error_message });
      });
  }

  static async getItems(req, res, next) {
    Item.getItems(req.query)
      .then((item_list) => {
        res.json(item_list);
      })
      .catch((error) => {
        res.status(201).json({errors: error});
      });
  }

  static async getItemDetails(req, res, next) {
    Item.getItemDetailsById(req.params.item_id, req.user_info.username)
      .then((item_details) => {
        res.json(item_details);
      })
      .catch((error_message) => {
        res.status(201).json({ errors: error_message });
      });
  }

  static async viewEditItemPage(req, res, next) {}
}
