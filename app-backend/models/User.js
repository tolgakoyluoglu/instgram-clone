const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdPosts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    }
  ],
  photo: {
    type: String,
    default: 'https://i.imgur.com/EuSn6V6.jpg'
  },
  bio: {
    type: String
  },
  register_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
