import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createGlobalStyle } from 'styled-components';
import { AuthProvider } from './shared/common/AuthContext';
import Header from './screens/Header';
import Profile from './screens/Profile';
import Feed from './screens/Feed';
import Login from './screens/Auth/Login';
import Post from './screens/Post';
import Signup from './screens/Auth/Signup';
import PrivateRoute from './shared/common/PrivateRoute';
import EditProfile from './screens/Profile/EditProfile';

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

const httpLink = createHttpLink({
  uri: `${process.env.REACT_APP_API}/graphql`
});

const authLink = setContext(() => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  };
});
export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

function App() {
  const token = localStorage.getItem('token');

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
            <Route path="/settings" component={EditProfile} />
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
