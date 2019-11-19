import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';

import { AuthContext } from './auth/authContext';
//Components
import Header from './components/Header';
import Profile from './components/Profile';
import Feed from './components/Feed';
import Login from './components/Login';
import Signup from './components/Signup';
import PrivateRoute from './common/PrivateRoute';
import ApolloClient from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

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
      <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
        <div className="App">
          <BrowserRouter>
            <Header />
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="/" exact component={Login} />
              <PrivateRoute path="/profile" component={Profile} />
              <Route path="/feed" component={Feed} />
            </Switch>
          </BrowserRouter>
        </div>
      </AuthContext.Provider>
    </ApolloProvider>
  );
}

export default App;
