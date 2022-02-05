import express from "express";
import ItemListController from "./controllers/ItemListController.js";
import UserController from "./controllers/UserController.js";
import CommentsController from "./controllers/CommentsController.js";
import FollowController from "./controllers/FollowController.js";

const BackEndRouter = express.Router();

BackEndRouter.get("/", ItemListController.getItems);

//About users
BackEndRouter.post("/register", UserController.register);
BackEndRouter.post("/login", UserController.login);
BackEndRouter.post("/logout", UserController.logout);
//maybe add let users input some descriptions of themselves

//About posted items
BackEndRouter.get("/items/:item_id", ItemListController.getItemById);
BackEndRouter.post("/:username/createItem", ItemListController.createItem);
BackEndRouter.post("/items/:item_id/edit", ItemListController.editItem);
BackEndRouter.post("/items/:item_id/delete", ItemListController.deleteItem);

//About comments

//About following other users
BackEndRouter.post("/follow/:username", FollowController.follow);
BackEndRouter.post("/unfollow/:username", FollowController.unfollow);

export default BackEndRouter;
