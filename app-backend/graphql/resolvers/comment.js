const Comment = require('../../models/Comment');

module.exports = {
  commentPost: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthorized');
    }
    if (!args.comment) {
      throw new Error('Comment cant be empty');
    }
    const comment = new Comment({
      username: req.username,
      comment: args.comment,
      postId: args.postId
    });
    comment.save();
    return comment;
  },
  getComments: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthorized');
    }
    const comments = await Comment.find({ postId: args.postId });
    if (!comments) {
      throw new Error('No comments found');
    }
    return comments;
  },
  DeleteComment: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthorized');
    }
    const comment = await Comment.findByIdAndDelete(args.id);
    if (!comment) {
      throw new Error('Comment not found');
    }
    return 'Comment deleted';
  }
};
