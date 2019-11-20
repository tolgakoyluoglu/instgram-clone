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
      creator {
        username
        email
        _id
      }
    }
  }
`;
const LOGIN_USER = gql`
  mutation userLogin($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
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

export { CREATE_POST, GET_POSTS, LOGIN_USER, CREATE_USER };
