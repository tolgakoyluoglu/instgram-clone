import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div>
      <span>
        <Link to="/home">Home</Link>
        <Link to="/profile">Profile</Link>
      </span>
    </div>
  );
};

export default Header;
