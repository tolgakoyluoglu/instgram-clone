import React from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import {
  LIKE_POST,
  GET_POSTS,
  GET_LIKES,
  DELETE_LIKE
} from '../../../../shared/utils/graphql';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as heart } from '@fortawesome/free-solid-svg-icons';
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
const Like = ({ post, likes }) => {
  const { userId } = React.useContext(AuthContext);
  const [liked, setliked] = React.useState(false);
  const [like] = useMutation(LIKE_POST, {
    variables: { post },
    refetchQueries: [
      {
        query: GET_POSTS
      }
    ]
  });
  const [unLike] = useMutation(DELETE_LIKE, {
    variables: { post },
    refetchQueries: [
      {
        query: GET_POSTS
      }
    ]
  });
  const getLikes = useQuery(GET_LIKES);
  React.useEffect(() => {
    if (getLikes.data) {
      // eslint-disable-next-line
      getLikes.data.getLikes.filter(like => {
        if (like.user === userId && likes[0]) {
          setliked(true);
        } else {
          setliked(false);
        }
      });
    }
  }, [getLikes.data, likes, userId]);
  const submitLike = () => {
    setliked(true);
    like();
  };
  const removeLike = () => {
    setliked(false);
    unLike();
  };
  return (
    <Container>
      {!liked && <StyledIcon size="2x" icon={faHeart} onClick={submitLike} />}
      {liked && (
        <StyledIcon
          size="2x"
          icon={heart}
          onClick={removeLike}
          isliked="true"
        />
      )}
      <p>{likes.length}</p>
    </Container>
  );
};

export default Like;
