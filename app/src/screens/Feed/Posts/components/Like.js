import React from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import {
  LIKE_POST,
  GET_POSTS,
  GET_LIKES
} from '../../../../shared/utils/graphql';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import {} from '@fortawesome/free-regular-svg-icons';
import styled from 'styled-components';
import { AuthContext } from '../../../../shared/common/AuthContext';

const Container = styled.div`
  margin: auto;
  text-align: center;
  cursor: pointer;
`;
const StyledIcon = styled(FontAwesomeIcon)`
  color: ${props => (props.isliked === 'true' ? 'red' : '#cdcdcd')};
`;
const Like = post => {
  const { userId } = React.useContext(AuthContext);
  const [liked, setliked] = React.useState(false);
  const [like] = useMutation(LIKE_POST, {
    variables: post,
    refetchQueries: [
      {
        query: GET_POSTS
      }
    ]
  });
  const getLikes = useQuery(GET_LIKES);
  if (getLikes.data) {
  }
  React.useEffect(() => {
    if (getLikes.data) {
      getLikes.data.getLikes.filter(like => {
        if (like.user === userId && post.likes[0]) {
          setliked(true);
        }
      });
    }
  });
  const handleClick = () => {
    like();
  };
  return (
    <Container>
      {!liked && <StyledIcon size="2x" icon={faHeart} onClick={handleClick} />}
      {liked && (
        <StyledIcon
          size="2x"
          icon={faHeart}
          onClick={handleClick}
          isliked="true"
        />
      )}
      <p>{post.likes.length}</p>
    </Container>
  );
};

export default Like;
