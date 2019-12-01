const bcrypt = require('bcryptjs');
const Post = require('../../models/Post');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const Follow = require('../../models/Follow');
const Like = require('../../models/Like');
const Comment = require('../../models/Comment');

module.exports = {
  posts: async () => {
    let following = await Follow.find({
      userId: '5dd9a3878ec7eb2665d936ca'
    });
    following = following.map(f => f.following);
    const posts = Post.find({ creator: { $in: following } })
      .populate({
        path: 'creator',
        model: 'User'
      })
      .populate({
        path: 'likes',
        model: 'Post'
      });
    return posts.catch(err => {
      throw err;
    });
  },
  userPosts: args => {
    return Post.find({ creator: args.userId })
      .then(posts => {
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
      following: args.following
    });
    const exist = await Follow.findOne({
      userId: req.userId,
      following: args.following
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
    const followers = await Follow.find({ following: args.userId });
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
    const following = await Follow.find({ userId: args.userId });
    if (!following) {
      return new Error('You are not following anyone!');
    } else {
      return following;
    }
  },
  likePost: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthorizied!');
    }
    const liked = await Like.findOne({
      user: req.userId,
      post: args.post
    });
    if (!liked) {
      const likePost = new Like({
        user: req.userId,
        post: args.post
      });
      return likePost
        .save()
        .then(result => {
          return Post.findById(args.post);
        })
        .then(post => {
          if (!post) {
            throw new Error('Post not found.');
          }
          post.likes.push(post);
          return post.save();
        });
    } else {
      return new Error('You already like this post');
    }
  }
};
