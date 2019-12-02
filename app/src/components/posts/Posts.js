import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { LoadingContainer, Loader } from '../../styled/Loading';
import { Link } from 'react-router-dom';
import { GET_POSTS } from '../../shared/utils/graphql';
import {
  Card,
  Image,
  CardBody,
  CardHeader,
  CommentContainer,
  ImageContainer
} from './StyledPosts';
import Avatar from '../profile/avatar.png';
import Like from './Like';
import { AuthContext } from '../../shared/auth/AuthContext';

const Posts = () => {
  const { userId } = useContext(AuthContext);
  const { loading, error, data } = useQuery(GET_POSTS, {
    variables: { userId }
  });

  if (error) return `Error! ${error.message}`;
  if (loading)
    return (
      <LoadingContainer>
        <Loader />
      </LoadingContainer>
    );
  const posts = data.posts.map(post => {
    return (
      <Card key={post._id}>
        <CardHeader>
          <ImageContainer>
            <img src={Avatar} alt={post.title} />
            {post.creator ? (
              <Link to={{ pathname: '/profile/' + post.creator[0]._id }}></Link>
            ) : null}
          </ImageContainer>
          <p>{post.creator[0].username}</p>
        </CardHeader>
        <Link to={{ pathname: '/post/' + post._id }}>
          <Image src={post.url} alt={post.title} />
        </Link>
        <CardBody>
          {post.likes && <Like likes={post.likes} post={post._id} />}
          {post.creator ? (
            <Link to={{ pathname: '/profile/' + post.creator[0]._id }}>
              <p>{post.creator[0].username}</p>
            </Link>
          ) : null}
          <p>{post.title}</p>
        </CardBody>
        <CommentContainer>
          <input type="text" placeholder="Add a comment..." />
          <button>Post</button>
        </CommentContainer>
      </Card>
    );
  });

  return <React.Fragment>{posts.reverse()}</React.Fragment>;
};

export default Posts;
