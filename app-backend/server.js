const express = require('express');
const app = express();
const port = 4000;
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const bcrypt = require('bcryptjs');

//Models
const Post = require('./models/Post');
const User = require('./models/User');

app.use(cors());

app.use(
  '/graphql',
  graphqlHttp({
    schema: buildSchema(`
        type Post {
          _id: ID!
          title: String! 
          url: String!  
        }

        type User {
          _id: ID!
          email: String!
          password: String
          username: String!
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
        }
        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
      posts: () => {
        return Post.find()
          .then(posts => {
            return posts;
          })
          .catch(err => {
            throw err;
          });
      },
      createPost: args => {
        const post = new Post({
          title: args.postInput.title,
          url: args.postInput.url,
          user: '5dd147a5e9023034b28d9733'
        });
        let createdPost;
        return post
          .save()
          .then(result => {
            createdPost = result;
            return User.findById('5dd147a5e9023034b28d9733');
          })
          .then(user => {
            if (!user) {
              throw new Error('User not found.');
            }
            user.createdPosts.push(post);
            return user.save();
          })
          .then(result => {
            return createdPost;
          })
          .catch(err => {
            console.log(err);
            throw err;
          });
      },
      createUser: async args => {
        return await User.findOne({
          email: args.userInput.email,
          username: args.userInput.username
        })
          .then(user => {
            if (user) {
              throw new Error('User already exists.');
            }
            return bcrypt.hash(args.userInput.password, 12);
          })
          .then(hashedPassword => {
            const user = new User({
              email: args.userInput.email,
              username: args.userInput.username,
              password: hashedPassword
            });
            return user.save();
          })
          .then(result => {
            return { ...result._doc, password: null };
          })
          .catch(err => {
            throw err;
          });
      }
    },
    graphiql: true
  })
);

mongoose.connect(
  process.env.MONGO,
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
  function(err) {
    if (err) {
      throw err;
    } else {
      console.log(`Successfully connected to DB`);
    }
  }
);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
