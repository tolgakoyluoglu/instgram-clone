import React from 'react';
import { useAuth0 } from '../auth/Auth0Wrapper';
import { Link } from 'react-router-dom';

const Header = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  return (
    <div>
      {!isAuthenticated && (
        <button onClick={() => loginWithRedirect({})}>Login</button>
      )}

      {isAuthenticated && <button onClick={() => logout()}>Logout</button>}
      {isAuthenticated && (
        <span>
          <Link to="/">Home</Link>&nbsp;
          <Link to="/profile">Profile</Link>
        </span>
      )}
    </div>
  );
};

export default Header;
