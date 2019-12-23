import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { LoadingContainer, Loader } from '../../../shared/styled/Loading';
import { Link } from 'react-router-dom';
import { GET_POSTS } from '../../../shared/utils/graphql';
import { Card, Image, CardBody, CardHeader, ImageContainer } from './Styled.js';
import Avatar from '../../../res/images/avatar.png';
import Like from './components/Like';

const Posts = () => {
  const { loading, data } = useQuery(GET_POSTS, {
    refetchQueries: [
      {
        query: GET_POSTS
      }
    ]
  });

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
            <img
              src={
                post.creator[0].photo !== null ? post.creator[0].photo : Avatar
              }
              alt={post.title}
            />
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
      </Card>
    );
  });

  return (
    <React.Fragment>
      {posts.length > 0 ? (
        posts.reverse()
      ) : (
        <React.Fragment>
          No posts found. Visit the explore section to find other users you may
          want to follow.
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Posts;
