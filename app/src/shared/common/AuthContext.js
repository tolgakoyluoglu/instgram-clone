import React, { createContext } from 'react';

const AuthContext = createContext();

const AuthProvider = props => {
  const [authTokens, setAuthTokens] = React.useState();
  const [userId, setUserId] = React.useState();
  const [username, setUsername] = React.useState('');

  const setToken = data => {
    localStorage.setItem('token', data);
    setAuthTokens(data);
  };
  React.useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('userid');
    setAuthTokens(token);
    setUserId(user);
  }, []);
  const setUser = data => {
    localStorage.setItem('userid', data);
    setUserId(data);
  };
  const setUsernameLs = data => {
    localStorage.setItem('username', data);
    setUsername(data);
  };
  return (
    <AuthContext.Provider
      value={{
        authTokens,
        setAuthTokens: setToken,
        userId,
        setUserId: setUser,
        username,
        setUsername: setUsernameLs
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
