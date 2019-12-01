const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  user: {
    type: String
  },
  post: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    }
  ]
});

module.exports = mongoose.model('Comment', CommentSchema);
