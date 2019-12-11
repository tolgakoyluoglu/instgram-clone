const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type Post {
    _id: ID!
    title: String! 
    url: String!  
    likes: [Like!]
    creator: [User!]
  }

  type Comment {
    _id: ID!
    user: String!
    post: [Post!]
  }

  type Like {
    _id: ID!
    user: String
    post: [Post!]
  }

  type User {
    _id: ID!
    email: String!
    password: String
    username: String!
    createdPosts: [Post!]
    photo: String
  }

  type Follow {
    _id: ID!
    userId: String!
    following: String!
  }

  type Auth {
    userId: ID!
    token: String!
    tokenExp: Int!
    photo: String
  }

  input PostInput {
    title: String!
    url: String!  
  }

  input UserInput {
    email: String!
    password: String!
    username: String!
  }

  type RootQuery {
      posts: [Post!]!
      getPost(id: String!) : Post!
      getFollowing(userId: String!) : [Follow!]!
      getFollowers(userId: String!) : [Follow!]!
      userPosts(userId: String!): [Post!]!
      comment(post: String!): [Comment!]!
      likes: [Like!]!
      getUser: User!
      searchUserId(userId: String) : User!
  }

  type RootMutation {
    createPost(postInput: PostInput): Post
    createUser(userInput: UserInput): User
    login(email: String!, password: String!): Auth!
    follow(following: String!, userId: String!): Follow
    likePost(user: String!, post: String!): Like
    comment(user: String!): Comment
    searchUser(username: String!) : [User!]!
    deletePost(postId: String!) : String!
    uploadImage(filename: String!): User!
  }
  schema {
      query: RootQuery
      mutation: RootMutation
  }
`);
