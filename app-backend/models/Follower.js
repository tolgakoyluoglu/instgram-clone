const mongoose = require('mongoose');

const FollowerSchema = new mongoose.Schema({
  uid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  follower: [{ type: String }],
  register_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Follower', FollowerSchema);
