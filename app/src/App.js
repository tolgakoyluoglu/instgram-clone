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
import Post from './components/Post';

function App() {
  const [authTokens, setAuthTokens] = React.useState();
  const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql'
  });

  const setTokens = data => {
    localStorage.setItem('tokens', data);
    setAuthTokens(data);
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
      <BrowserRouter>
        {!authTokens && <Redirect path="/" to="/login" />}
        <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
          <Header />
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/profile" component={Profile} />
            <Route path="/feed" component={Feed} />
            <Route path="/post/:id" component={Post} />
          </Switch>
        </AuthContext.Provider>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
