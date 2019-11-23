const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type Post {
    _id: ID!
    title: String! 
    url: String!  
    creator: [User!]
  }

  type User {
    _id: ID!
    email: String!
    password: String
    username: String!
    createdPosts: [Post!]
    followers: [String]!
    following: [String]!
  }

  type Auth {
    userId: ID!
    token: String!
    tokenExp: Int!
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
  }
  type RootMutation {
    createPost(postInput: PostInput): Post
    createUser(userInput: UserInput): User
    login(email: String!, password: String!): Auth!
    follow(followers: String!, following: String!): User
  }
  schema {
      query: RootQuery
      mutation: RootMutation
  }
`);
