const authResolver = require('./auth');
const postsResolver = require('./post');
const followResolver = require('./follow');
const commentResolver = require('./comment');

const rootResolver = {
  ...authResolver,
  ...postsResolver,
  ...followResolver,
  ...commentResolver
};

module.exports = rootResolver;
