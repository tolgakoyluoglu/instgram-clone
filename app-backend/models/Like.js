const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema({
  user: { type: String },
  post: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    }
  ]
});

module.exports = mongoose.model('Like', LikeSchema);
