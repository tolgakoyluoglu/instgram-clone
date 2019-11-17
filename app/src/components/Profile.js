import React from 'react';
import { useAuth0 } from '../auth/Auth0Wrapper';

const Profile = () => {
  const { loading, user } = useAuth0();
  console.log(user);

  if (loading || !user) {
    return <div>Loading..</div>;
  }

  return (
    <div>
      <img src={user.picture} alt="Profile" />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
};

export default Profile;
