const Post = require('../../models/Post');
const Comment = require('../../models/Comment');

module.exports = {
  commentPost: async (args, req) => {
    if (!req.isAuth) {
      return res.json(401, { msg: 'Unauthorized.' });
    }
    if (!args.comment) {
      return res.json(204, { msg: 'Comment can not be null.' });
    }
    const comment = new Comment({
      user: req.userId,
      comment: args.comment,
      postId: args.postId
    });
    comment.save();
    return comment;
  },
  getComments: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthorizied!');
    }
    const comments = await Comment.find({ postId: args.postId });
    if (!comments) {
      return res.json(204, { msg: 'No comments found.' });
    }
    return comments;
  },
  DeleteComment: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthorizied!');
    }
    const comment = await Comment.findByIdAndDelete(args.id);
    if (!comment) {
      return res.json(204, { msg: 'Post not found.' });
    }
    return res.json(200, { msg: 'Comment deleted' });
  }
};
