const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

module.exports = {
  createUser: async args => {
    return await User.findOne({
      username: args.userInput.username,
      email: args.userInput.email
    })
      .then(user => {
        if (user) {
          throw new Error('User already exists.');
        }
        return bcrypt.hash(args.userInput.password, 12);
      })
      .then(hashedPassword => {
        const user = new User({
          email: args.userInput.email,
          username: args.userInput.username,
          password: hashedPassword
        });
        return user.save();
      })
      .then(result => {
        return { ...result._doc, password: null };
      })
      .catch(err => {
        throw err;
      });
  },
  getUser: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthorizied!');
    }
    const user = await User.findById(req.userId);
    if (!user) {
      throw Error('User not found.');
    }
    return user;
  },
  login: async ({ email, password }) => {
    const user = await User.findOne({ email: email });
    if (!user) {
      return new Error('User does not exist.');
    }
    const checkPass = await bcrypt.compare(password, user.password);
    if (!checkPass) {
      return new Error('Password does not match.');
    }
    const token = jwt.sign(
      { userId: user.id, email: user.email, username: user.username },
      'jwtsecret',
      { expiresIn: '2h' }
    );
    return { userId: user.id, token: token, tokenExp: 2, photo: user.photo };
  },
  searchUser: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthorizied!');
    }
    const searchUser = await User.find({
      username: args.username
    });
    if (!searchUser.length) {
      throw new Error('User not found.');
    } else {
      return searchUser;
    }
  },
  searchUserId: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthorizied!');
    }
    console.log(args.userId);
    const user = User.findById(args.userId);
    if (!user) {
      throw new Error('User not found.');
    }
    return user;
  },
  uploadImage: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthorizied!');
    }
    let filename = args.filename;
    const path = require('path');
    const mainDir = path.dirname(require.main.filename);
    filename = `${mainDir}/uploads/${filename}`;

    try {
      const user = await User.findById(req.userId);
      const photo = await cloudinary.v2.uploader.upload(filename);
      await user.updateOne({
        photo: photo.secure_url
      });
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
};
