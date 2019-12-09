import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { LoadingContainer, Loader } from '../../../shared/styled/Loading';
import { Link } from 'react-router-dom';
import { GET_POSTS } from '../../../shared/utils/graphql';
import {
  Card,
  Image,
  CardBody,
  CardHeader,
  CommentContainer,
  ImageContainer
} from './Styled';
import Avatar from '../../../res/images/avatar.png';
import Like from './components/Like';
import { AuthContext } from '../../../shared/common/AuthContext';

const Posts = () => {
  const { loading, error, data } = useQuery(GET_POSTS);

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
          </ImageContainer>
          <Link to={{ pathname: '/profile/' + post.creator[0]._id }}>
            <p>{post.creator[0].username}</p>
          </Link>
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
