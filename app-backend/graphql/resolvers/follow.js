const Follow = require('../../models/Follow');

module.exports = {
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
  }
};
