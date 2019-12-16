const Follow = require('../../models/Follow');

module.exports = {
  follow: async (args, req) => {
    if (!req.isAuth) {
      return res.json(401, { msg: 'Unauthorized' });
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
      return res.json(204, { msg: 'You already follow this user' });
    }
  },
  getFollowers: async (args, req) => {
    if (!req.isAuth) {
      return res.json(401, { msg: 'Unauthorized' });
    }
    const followers = await Follow.find({ following: args.userId });
    if (!followers) {
      return res.json(404, { msg: 'Not found' });
    } else {
      return followers;
    }
  },
  getFollowing: async (args, req) => {
    if (!req.isAuth) {
      return res.json(401, { msg: 'Unauthorized' });
    }
    const following = await Follow.find({ userId: args.userId });
    if (!following) {
      4;
      return res.json(204, { msg: 'You are not following anyone' });
    } else {
      return following;
    }
  }
};
