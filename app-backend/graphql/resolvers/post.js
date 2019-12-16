const Post = require('../../models/Post');
const User = require('../../models/User');
const Follow = require('../../models/Follow');
const Like = require('../../models/Like');
const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

module.exports = {
  posts: async (args, req) => {
    if (!req.isAuth) {
      return res.json(401, { msg: 'Unauthorized' });
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
        path: 'like',
        model: 'Post'
      });
    return posts;
  },
  getPost: async (args, req) => {
    if (!req.isAuth) {
      return res.json(401, { msg: 'Unauthorized' });
    }
    const post = await Post.findById(args.id)
      .populate({
        path: 'creator',
        model: 'User'
      })
      .populate({
        path: 'likes',
        model: 'Post'
      });
    if (!post) {
      return res.json(404, { msg: 'Not found' });
    }
    return post;
  },
  userPosts: async (args, req) => {
    if (!req.isAuth) {
      return res.json(401, { msg: 'Unauthorized' });
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
      return res.json(401, { msg: 'Unauthorized' });
    }
    let filename = args.postInput.filename;
    const path = require('path');
    const mainDir = path.dirname(require.main.filename);
    filename = `${mainDir}/uploads/${filename}`;
    try {
      const photo = await cloudinary.v2.uploader.upload(filename);
      const post = new Post({
        title: args.postInput.title,
        url: photo.secure_url,
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
            return res.json(404, { msg: 'Not found' });
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
    } catch (error) {
      throw new Error(error);
    }
  },
  likePost: async (args, req) => {
    if (!req.isAuth) {
      return res.json(401, { msg: 'Unauthorized' });
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
            return res.json(404, { msg: 'Not found' });
          }
          post.likes.push(post);
          return post.save();
        });
    } else {
      return res.json(204, { msg: 'You already like this post' });
    }
  },
  deletePost: async (args, req) => {
    if (!req.isAuth) {
      return res.json(401, { msg: 'Unauthorized' });
    }
    const post = await Post.findByIdAndDelete(args.postId);
    if (!post) {
      throw new Error('Post not found');
    }
    return 'Post deleted';
  },
  getLikes: async (args, req) => {
    if (!req.isAuth) {
      return res.json(401, { msg: 'Unauthorized' });
    }
    const likes = await Like.find({ user: req.userId });
    if (!likes) {
      return res.json(204, { msg: 'No likes found.' });
    }
    return likes;
  },
  deleteLike: async (args, req) => {
    if (!req.isAuth) {
      return res.json(401, { msg: 'Unauthorized' });
    }
    const like = await Like.findByIdAndDelete(args.id);
    if (!like) {
      return res.json(204, { msg: 'Like not found' });
    }
    return res.json(200, { msg: 'Like deleted' });
  }
};
