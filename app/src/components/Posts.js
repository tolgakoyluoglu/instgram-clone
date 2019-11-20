import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { LoadingContainer, Loader } from '../styled/Loading';
import { Link } from 'react-router-dom';
import { GET_POSTS } from '../shared/utils/graphql';

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
      <div key={post._id}>
        <p>{post.title}</p>
        <Link to={{ pathname: '/post/' + post._id }}>
          <img src={post.url} alt={post.title} />
        </Link>
        <p>{post.creator[0].username}</p>
      </div>
    );
  });
  return <div>{posts.reverse()}</div>;
};

export default Posts;
