const bcrypt = require('bcryptjs');
const Post = require('../../models/Post');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const Follow = require('../../models/Following');

module.exports = {
  posts: async req => {
    return Post.find()
      .populate('creator')
      .then(posts => {
        return posts;
      })
      .catch(err => {
        throw err;
      });
  },
  userPosts: args => {
    console.log(args);
    return Post.find({ creator: args.userId })
      .then(posts => {
        console.log(posts);
        return posts;
      })
      .catch(err => {
        throw err;
      });
  },
  createPost: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthorizied!');
    }
    const post = new Post({
      title: args.postInput.title,
      url: args.postInput.url,
      creator: req.userId
    });
    let createdPost;
    return post
      .save()
      .then(result => {
        createdPost = result;
        return User.findById(req.userId);
      })
      .then(user => {
        if (!user) {
          throw new Error('User not found.');
        }
        user.createdPosts.push(post);
        return user.save();
      })
      .then(result => {
        return createdPost;
      })
      .catch(err => {
        throw err;
      });
  },
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
    return { userId: user.id, token: token, tokenExp: 2 };
  },
  follow: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthorizied!');
    }
    const follow = new Follow({
      userId: req.userId,
      follow: args.followerId
    });
    const exist = await Follow.findOne({
      userId: follow.userId,
      follow: follow.followerId
    });
    if (!exist) {
      return await follow.save();
    } else {
      return new Error('You already follow this user!');
    }
  },
  getFollowers: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthorizied!');
    }
    const followers = await Follow.find({ userId: req.userId });
    if (!followers) {
      return new Error('User not found');
    } else {
      return followers;
    }
  },
  getFollowing: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthorizied!');
    }
    const following = await Follow.find({ follow: args.followerId });
    if (!following) {
      return new Error('You are not following anyone!');
    } else {
      return following;
    }
  }
};
