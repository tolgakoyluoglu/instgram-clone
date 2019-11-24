import React from 'react';

// TODO:
// Get username from url.
// query user data and user posts
// create follow button and send mutation to update followers
const Profile = ({ match }) => {
  const {
    params: { id }
  } = match;

  return (
    <div>
      <h1>{id.charAt(0).toUpperCase() + id.slice(1)}</h1>
      <button>Follow</button>
      <p>Posts</p>
    </div>
  );
};

export default Profile;
