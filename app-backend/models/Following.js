const mongoose = require('mongoose');

const FollowingSchema = new mongoose.Schema({
  uid: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  following: [{ type: String }],
  register_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Following', FollowingSchema);
