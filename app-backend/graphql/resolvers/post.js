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
      throw new Error('Unauthorized');
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
      throw new Error('Unauthorized');
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
      throw new Error('Not found');
    }
    return post;
  },
  userPosts: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthorized');
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
      throw new Error('Unauthorized');
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
            throw new Error('Not found');
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
      throw new Error('Unauthorized');
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
            throw new Error('Not found');
          }
          post.likes.push(post);
          return post.save();
        });
    } else {
      throw new Error('Not found');
    }
  },
  deletePost: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthorized');
    }
    const post = await Post.findByIdAndDelete(args.postId);
    if (!post) {
      throw new Error('Post not found');
    }
    return 'Post deleted';
  },
  getLikes: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthorized');
    }
    const likes = await Like.find({ user: req.userId });
    if (!likes) {
      throw new Error('No likes found');
    }
    return likes;
  },
  deleteLike: async (args, req, res) => {
    if (!req.isAuth) {
      throw new Error('Unauthorized');
    }
    const liked = await Like.findOneAndDelete({
      user: req.userId,
      post: args.post
    });
    if (!liked) {
      throw new Error('Like not found');
    }
    const post = await Post.findById(args.post);
    if (!post) {
      throw new Error('Post not found');
    }
    post.likes.pull(liked.post);
    post.save();
    return 'Like deleted';
  }
};
