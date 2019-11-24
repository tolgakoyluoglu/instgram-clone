import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { LoadingContainer, Loader } from '../styled/Loading';
import { Link } from 'react-router-dom';
import { GET_POSTS } from '../shared/utils/graphql';
import styled from 'styled-components';

const Card = styled.div`
  width: 50%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 3px;
  border: 1px solid #e6e6e6;
  background-color: #fff;
  margin-bottom: 60px;
`;

const Image = styled.img`
  min-width: 100%;
  min-height: 100%;
  width: 1000px;
  height: auto;
  max-width: 100%;
  max-height: 600px;
`;
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
          <Link to={{ pathname: '/profile/' + post.creator[0].username }}>
            <p>{post.creator[0].username}</p>{' '}
          </Link>
        ) : null}
      </Card>
    );
  });
  return <React.Fragment>{posts.reverse()}</React.Fragment>;
};

export default Posts;
