import { gql } from 'apollo-boost';

const CREATE_POST = gql`
  mutation($title: String!, $filename: String!) {
    createPost(postInput: { title: $title, filename: $filename }) {
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
      }
      creator {
        username
        email
        _id
        photo
      }
      comments {
        _id
      }
    }
  }
`;
const LIKE_POST = gql`
  mutation($post: String!) {
    likePost(post: $post, user: "") {
      _id
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
      }
      creator {
        username
        email
        _id
        photo
      }
      comments {
        _id
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
const ADD_COMMENT = gql`
  mutation($comment: String!, $postId: String!) {
    commentPost(comment: $comment, postId: $postId) {
      _id
      comment
      user
    }
  }
`;
const GET_COMMENTS = gql`
  query($postId: String!) {
    getComments(postId: $postId) {
      _id
      comment
      user
    }
  }
`;
const GET_LIKES = gql`
  query {
    getLikes {
      _id
      user
    }
  }
`;
const DELETE_USER = gql`
  mutation {
    deleteUser
  }
`;
const DELETE_COMMENT = gql`
  mutation($id: String!) {
    deleteComment(id: $id)
  }
`;
const DELETE_LIKE = gql`
  mutation($post: String!) {
    deleteLike(post: $post)
  }
`;
const ADD_BIO = gql`
  mutation($bio: String!) {
    addBio(bio: $bio) {
      _id
      bio
    }
  }
`;

export {
  ADD_BIO,
  DELETE_LIKE,
  DELETE_COMMENT,
  DELETE_USER,
  GET_LIKES,
  GET_COMMENTS,
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
  SEARCH_USER_ID,
  ADD_COMMENT
};
