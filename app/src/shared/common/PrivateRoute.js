import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import decode from 'jwt-decode';

function PrivateRoute({ component: Component, ...rest }) {
  const token = localStorage.getItem('token');

  const checkToken = () => {
    if (!token) {
      return false;
    }
    try {
      const { exp } = decode(token);
      if (exp < new Date().getTime() / 1000) {
        localStorage.clear();
        return false;
      }
    } catch (error) {
      return false;
    }
    return true;
  };

  return (
    <Route
      {...rest}
      render={props =>
        checkToken() ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}
export default PrivateRoute;
