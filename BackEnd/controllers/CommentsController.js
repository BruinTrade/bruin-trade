import Comment from "../models/Comment.js";

export default class CommentsController {
  static async postComment(req, res, next) {
    const author = req.user_info.username;
    const content = req.body.content;
    const item_id = req.params.item_id;
    const target_user = req.body.target_user;
    if (!content || !item_id) {
      res.json({ error: "must provide content and item_id" });
    }
    let temp_comment = new Comment(author, content, item_id, target_user);
    temp_comment
      .addComment()
      .then((message) => {
        res.json({ status: message });
      })
      .catch((error_message) => {
        res.status(201).json({ errors: error_message });
      });
  }

  static async deleteComment(req, res, next) {
    const comment_id = req.params.comment_id;
    const current_user = req.user_info.username;
    Comment.deleteCommentById(comment_id, current_user)
      .then((message) => {
        res.json({ status: message });
      })
      .catch((error_message) => {
        res.status(201).json({ errors: error_message });
      });
  }
}
