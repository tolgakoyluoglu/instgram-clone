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
          return res.json(404, { msg: 'User already exist' });
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
      return res.json(401, { msg: 'Unauthorized' });
    }
    const searchUser = await User.find({
      username: args.username
    });
    if (!searchUser.length) {
      return res.json(404, { msg: 'Not found' });
    } else {
      return searchUser;
    }
  },
  getUser: async (args, req) => {
    if (!req.isAuth) {
      return res.json(401, { msg: 'Unauthorized' });
    }
    const user = await User.findById(req.userId);
    if (!user) {
      throw Error('User not found.');
    }
    return user;
  },
  searchUserId: async (args, req) => {
    if (!req.isAuth) {
      return res.json(401, { msg: 'Unauthorized' });
    }
    const user = User.findById(args.userId);
    if (!user) {
      return res.json(404, { msg: 'Not found' });
    }
    return user;
  },
  DeleteUser: async (args, req) => {
    if (!req.isAuth) {
      return res.json(401, { msg: 'Unauthorized' });
    }
    const user = User.findByIdAndDelete(req.userId);
    if (!user) {
      return res.json(204, { msg: 'User not found.' });
    }
    return res.json(200, { msg: 'User deleted.' });
  },
  uploadImage: async (args, req) => {
    if (!req.isAuth) {
      return res.json(401, { msg: 'Unauthorized' });
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
  },
  addBio: async (args, req) => {
    if (!req.isAuth) {
      return res.json(401, { msg: 'Unauthorized' });
    }
    const user = await User.findById(req.userId);
    if (!user) {
      return res.json(204, { msg: 'User not found.' });
    }
    await user.updateOne({
      bio: args.bio
    });
    return user;
  }
};
