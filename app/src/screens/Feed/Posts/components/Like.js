import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { LIKE_POST, GET_POSTS } from '../../../../shared/utils/graphql';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import {} from '@fortawesome/free-regular-svg-icons';
import styled from 'styled-components';

const Container = styled.div`
  margin: auto;
  text-align: center;
  cursor: pointer;
`;
const Like = post => {
  const [like] = useMutation(LIKE_POST, {
    variables: post,
    refetchQueries: [
      {
        query: GET_POSTS
      }
    ]
  });

  const handleClick = () => {
    like();
  };
  return (
    <Container>
      <FontAwesomeIcon size="2x" icon={faHeart} onClick={handleClick} />
      <p>{post.likes.length}</p>
    </Container>
  );
};

export default Like;
