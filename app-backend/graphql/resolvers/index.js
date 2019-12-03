const authResolver = require('./auth');
const postsResolver = require('./post');
const followResolver = require('./follow');

const rootResolver = {
  ...authResolver,
  ...postsResolver,
  ...followResolver
};

module.exports = rootResolver;
