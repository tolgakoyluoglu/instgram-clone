const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type Post {
    _id: ID!
    title: String! 
    url: String!  
    likes: [Like!]
    creator: [User!]
    comments: [Comment!]
  }

  type Comment {
    _id: ID!
    user: String!
    comment: String!
    post: [Post!]!
    postId: String!
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
    filename: String!
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
      getLikes: [Like!]!
      getUser: User!
      searchUserId(userId: String) : User!
      getComments(postId: String!) : [Comment]
  }

  type RootMutation {
    createPost(postInput: PostInput): Post
    createUser(userInput: UserInput): User
    login(email: String!, password: String!): Auth!
    follow(following: String!, userId: String!): Follow
    likePost(user: String!, post: String!): Like!
    searchUser(username: String!) : [User!]!
    deletePost(postId: String!) : String!
    uploadImage(filename: String!): User!
    commentPost(comment: String!, postId: String!): Comment
    deleteComment(id: String!) : String!
    deleteLike(id: String!) : String!
    deleteUser : String!
    addBio(bio: String!) : User!
  }
  schema {
      query: RootQuery
      mutation: RootMutation
  }
`);
