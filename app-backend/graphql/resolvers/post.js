const Post = require('../../models/Post');
const User = require('../../models/User');
const Follow = require('../../models/Follow');
const Like = require('../../models/Like');

module.exports = {
  posts: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthorizied!');
    }
    let following = await Follow.find({
      userId: req.userId
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
  userPosts: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthorizied!');
    }
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