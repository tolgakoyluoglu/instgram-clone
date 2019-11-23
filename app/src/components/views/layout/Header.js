import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../shared/auth/authContext';

import { Navbar } from '../../../styled/Navbar';
const Header = () => {
  const { authTokens, setAuthTokens } = useAuth();

  const logout = () => {
    setAuthTokens();
  };

  return (
    <Navbar>
      {authTokens ? (
        <>
          <Link to="/feed">Feed</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/" onClick={logout}>
            Logout
          </Link>
        </>
      ) : null}
    </Navbar>
  );
};

export default Header;
