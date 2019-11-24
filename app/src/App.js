import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

//Components
import { AuthContext } from './shared/auth/authContext';
import Header from './components/Header';
import Profile from './components/Profile';
import Feed from './components/Feed';
import Login from './components/Login';
import Signup from './components/Signup';

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html, body {
    font-family: sans-serif;
    background-color: #FAFAFC;
    margin: 0;
    padding: 0;
  }
`;
function App() {
  const [authTokens, setAuthTokens] = React.useState();
  const [userId, setUserId] = React.useState();
  const [tokenExp, setTokenExp] = React.useState();

  const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql'
  });

  const setTokens = data => {
    localStorage.setItem('tokens', data);
    setAuthTokens(data);
  };

  const setUser = data => {
    setUserId(data);
  };

  const setExp = data => {
    setTokenExp(data);
  };
  const authLink = setContext(() => {
    const token = localStorage.getItem('tokens');
    return {
      headers: {
        Authorization: token ? `Bearer ${token}` : ''
      }
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });

  return (
    <ApolloProvider client={client}>
      <GlobalStyle />
      <BrowserRouter>
        <AuthContext.Provider
          value={{
            authTokens,
            setAuthTokens: setTokens,
            userId,
            setUserId: setUser,
            tokenExp,
            setTokenExp: setExp
          }}
        >
          <Header />
          <Switch>
            {!authTokens && <Redirect path="/" to="/login" exact />}
            {!authTokens && <Route path="/login" component={Login} />}
            {!authTokens && <Route path="/signup" component={Signup} />}
            {authTokens && <Route path="/profile/:id" component={Profile} />}
            {authTokens && <Route path="/feed" component={Feed} />}
          </Switch>
        </AuthContext.Provider>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
