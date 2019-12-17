const Follow = require('../../models/Follow');

module.exports = {
  follow: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthorized');
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
      throw new Error('You already follow this user');
    }
  },
  getFollowers: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthorized');
    }
    const followers = await Follow.find({ following: args.userId });
    if (!followers) {
      throw new Error('Not found');
    } else {
      return followers;
    }
  },
  getFollowing: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthorized');
    }
    const following = await Follow.find({ userId: args.userId });
    if (!following) {
      4;
      throw new Error('You are not following anyone');
    } else {
      return following;
    }
  }
};
