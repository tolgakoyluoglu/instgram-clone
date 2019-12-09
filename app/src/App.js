import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { AuthProvider } from './shared/common/AuthContext';
import Header from './views/header';
import Profile from './views/profile';
import Feed from './views/feed';
import Login from './views/auth/login';
import Post from './views/post';
import Signup from './views/auth/signup';
import { createGlobalStyle } from 'styled-components';
import PrivateRoute from './shared/common/PrivateRoute';

const GlobalStyle = createGlobalStyle`
  html, body {
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
    background-color: #FAFAFC;
    margin: 0;
    padding: 0;
    color: #262626;
    min-height: calc(90vh - 30px);
  }
`;
function App() {
  const token = localStorage.getItem('token');
  const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql'
  });

  const authLink = setContext(() => {
    const token = localStorage.getItem('token');
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
    <AuthProvider>
      <GlobalStyle />
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Redirect path="/" to={token ? '/feed' : '/login'} />
          <Header />
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <PrivateRoute path="/feed" component={Feed} />
            <PrivateRoute path="/profile/:id" component={Profile} />
            <PrivateRoute path="/post/:id" component={Post} />
          </Switch>
        </BrowserRouter>
      </ApolloProvider>
    </AuthProvider>
  );
}

export default App;
