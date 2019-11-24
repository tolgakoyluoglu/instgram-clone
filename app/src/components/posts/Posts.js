import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { LoadingContainer, Loader } from '../../styled/Loading';
import { Link } from 'react-router-dom';
import { GET_POSTS } from '../../shared/utils/graphql';
import { Card, Image } from './StyledPosts';

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
        <h3>{post.title}</h3>
        <Link to={{ pathname: '/post/' + post._id }}>
          <Image src={post.url} alt={post.title} />
        </Link>
        {post.creator ? (
          <Link to={{ pathname: '/profile/' + post.creator[0]._id }}>
            <p>{post.creator[0].username}</p>{' '}
          </Link>
        ) : null}
      </Card>
    );
  });
  return <React.Fragment>{posts.reverse()}</React.Fragment>;
};

export default Posts;
