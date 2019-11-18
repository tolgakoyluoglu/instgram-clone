import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';

import { AuthContext } from './auth/authContext';
//Components
import Header from './components/Header';
import Profile from './components/Profile';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import PrivateRoute from './common/PrivateRoute';
import ApolloClient from 'apollo-boost';

function App() {
  const [authTokens, setAuthTokens] = React.useState();

  const setTokens = data => {
    localStorage.setItem('tokens', JSON.stringify(data));
    setAuthTokens(data);
  };

  const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql'
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
              <PrivateRoute path="/home" component={Home} />
            </Switch>
          </BrowserRouter>
        </div>
      </AuthContext.Provider>
    </ApolloProvider>
  );
}

export default App;
