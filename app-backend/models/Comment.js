const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  user: {
    type: String
  },
  comment: {
    type: String
  },
  post: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    }
  ],
  postId: {
    type: String
  }
});

module.exports = mongoose.model('Comment', CommentSchema);
