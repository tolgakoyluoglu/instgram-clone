import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_ALL_POSTS } from '../../shared/utils/graphql';
import { LoadingContainer, Loader } from '../../shared/styled/Loading';
import { Container, UsersContainer, Image, Card, StyledLink } from './Styled';

const Explore = () => {
  const { loading, data } = useQuery(GET_ALL_POSTS, {
    fetchPolicy: 'no-cache'
  });

  if (loading) {
    return (
      <LoadingContainer>
        <Loader />
      </LoadingContainer>
    );
  }

  const query = data.getAllPosts;

  return (
    <Container>
      <h2>Posts</h2>
      <UsersContainer>
        {query ? (
          query.map(post => {
            return (
              <Card key={post._id}>
                <StyledLink to={{ pathname: '/post/' + post._id }}>
                  <Image src={post.url && post.url} />
                </StyledLink>
              </Card>
            );
          })
        ) : (
          <p>No posts found</p>
        )}
      </UsersContainer>
    </Container>
  );
};

export default Explore;
