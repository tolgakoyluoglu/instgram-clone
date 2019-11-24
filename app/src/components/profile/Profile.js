import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { USER_POSTS } from '../../shared/utils/graphql';
import { useAuth } from '../../shared/auth/authContext';
import { LoadingContainer, Loader } from '../../styled/Loading';

// TODO:
// create follow button and send mutation to update followers

const Profile = ({ match }) => {
  const {
    params: { id }
  } = match;
  const { setUserId } = useAuth();

  React.useEffect(() => {
    setUserId(id);
  });

  const { loading, error, data } = useQuery(USER_POSTS, {
    variables: { id: id }
  });

  if (loading) {
    return (
      <LoadingContainer>
        <Loader />
      </LoadingContainer>
    );
  }
  return (
    <div>
      <h1>{id.charAt(0).toUpperCase() + id.slice(1)}</h1>
      <button>Follow</button>
      <p>Posts</p>
    </div>
  );
};

export default Profile;
