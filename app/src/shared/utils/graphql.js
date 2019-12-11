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
  query {
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
        photo
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
const GET_POST = gql`
  query($id: String!) {
    getPost(id: $id) {
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
        photo
      }
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
        photo
      }
    }
  }
`;
const GET_USER = gql`
  query {
    getUser {
      _id
      username
      photo
      email
    }
  }
`;
const DELETE_POST = gql`
  mutation deletePost($postId: String!) {
    deletePost(postId: $postId)
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
      userId
      following
    }
  }
`;
const GET_FOLLOWING = gql`
  query($id: String!) {
    getFollowing(userId: $id) {
      userId
      following
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
      photo
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
const SEARCH_USER = gql`
  mutation($username: String!) {
    searchUser(username: $username) {
      _id
      username
      photo
    }
  }
`;
const SEARCH_USER_ID = gql`
  query($id: String!) {
    searchUserId(userId: $id) {
      _id
      username
      photo
    }
  }
`;

export {
  CREATE_USER,
  LOGIN_USER,
  GET_POSTS,
  GET_FOLLOWERS,
  FOLLOW_USER,
  GET_FOLLOWING,
  LIKE_POST,
  CREATE_POST,
  GET_POST,
  DELETE_POST,
  USER_POSTS,
  SEARCH_USER,
  GET_USER,
  SEARCH_USER_ID
};
