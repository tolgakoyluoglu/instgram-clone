import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { LIKE_POST, GET_POSTS } from '../../../shared/utils/graphql';

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
    <div>
      <button onClick={handleClick}>Like</button>
      <p>{post.likes.length}</p>
    </div>
  );
};

export default Like;
