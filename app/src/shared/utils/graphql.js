import { gql } from 'apollo-boost';

const CREATE_POST = gql`
  mutation createPost($title: String!, $url: String!) {
    createPost(postInput: { title: $title, url: $url }) {
      title
      url
      _id
      creator {
        _id
      }
    }
  }
`;
const GET_POSTS = gql`
  {
    posts {
      title
      url
      _id
      likes {
        _id
        user
      }
      creator {
        username
        email
        _id
      }
    }
  }
`;
const LIKE_POST = gql`
  mutation($post: String!) {
    likePost(post: $post, user: "") {
      _id
      user
    }
  }
`;
const USER_POSTS = gql`
  query($id: String!) {
    userPosts(userId: $id) {
      _id
      title
      url
      creator {
        _id
      }
    }
  }
`;
const FOLLOW_USER = gql`
  mutation($id: String!) {
    follow(following: $id, userId: "") {
      userId
      following
    }
  }
`;
const GET_FOLLOWERS = gql`
  query($id: String!) {
    getFollowers(userId: $id) {
      _id
      following
    }
  }
`;
const GET_FOLLOWING = gql`
  query($id: String!) {
    getFollowing(userId: $id) {
      _id
    }
  }
`;
const LOGIN_USER = gql`
  mutation userLogin($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      tokenExp
      userId
    }
  }
`;
const CREATE_USER = gql`
  mutation createUser($email: String!, $username: String!, $password: String!) {
    createUser(
      userInput: { email: $email, username: $username, password: $password }
    ) {
      username
      email
    }
  }
`;

export {
  CREATE_POST,
  GET_POSTS,
  LOGIN_USER,
  CREATE_USER,
  USER_POSTS,
  GET_FOLLOWERS,
  FOLLOW_USER,
  GET_FOLLOWING,
  LIKE_POST
};
