import express, { Router } from "express";
import ItemListController from "./controllers/ItemListController.js";
import UserController from "./controllers/UserController.js";
import CommentsController from "./controllers/CommentsController.js";
import FollowController from "./controllers/FollowController.js";
import check_auth from "./middleware/check-login.js";
//import image_upload from "./middleware/image-upload.js";

const BackEndRouter = express.Router();



//About users
BackEndRouter.post("/register", UserController.register);
BackEndRouter.post("/login", UserController.login);
BackEndRouter.get("/login", UserController.checkLogin);
BackEndRouter.post("/logout", UserController.logout);
//maybe add let users input some descriptions of themselves

//About posted items
BackEndRouter.get("/items/:item_id", ItemListController.getItemById);
BackEndRouter.get("/items", ItemListController.getItems);

//Check user login
BackEndRouter.use(check_auth)

//About logged in users
BackEndRouter.post("/:username/createItem", ItemListController.createItem);
BackEndRouter.get("/:username/:item_id/details", ItemListController.getItemDetails);
BackEndRouter.get("/:username/:item_id/edit", ItemListController.viewEditItemPage);
BackEndRouter.post("/:username/:item_id/edit", ItemListController.editItem);
BackEndRouter.post("/:username/:item_id/delete", ItemListController.deleteItem);
BackEndRouter.post("/:username/:item_id/addToCart", UserController.addItemToCart);
BackEndRouter.post("/:username/:item_id/removeFromCart", UserController.removeItemFromCart);
BackEndRouter.get("/:username/cart", UserController.getItemsInCart);
BackEndRouter.post("/updateLocation", UserController.updateLocation);
BackEndRouter.get("/getLocation", UserController.getLocation);
BackEndRouter.get("/:username/getLocationByUsername", UserController.getLocationByUsername);
BackEndRouter.get("/:username/getVerbolLocationByUsername", UserController.getVerbolLocationByUsername);
BackEndRouter.get("/:username/getUserIconByUsername", UserController.getUserIconByUsername);
BackEndRouter.post("/updateUserInfo", UserController.updateUserInfo);

//About comments
BackEndRouter.post("/post_comment/:item_id", CommentsController.postComment);
BackEndRouter.post("/delete_comment/:comment_id", CommentsController.deleteComment);

//About following other users
BackEndRouter.post("/follow/:followed_username", FollowController.follow);
BackEndRouter.post("/unfollow/:followed_username", FollowController.unfollow);
BackEndRouter.get("/followings", FollowController.getAllFollowings)

export default BackEndRouter;
