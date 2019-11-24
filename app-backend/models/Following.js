const mongoose = require('mongoose');

const FollowSchema = new mongoose.Schema({
  userId: {
    type: String
  },
  follow: {
    type: String
  }
});

module.exports = mongoose.model('Follow', FollowSchema);
