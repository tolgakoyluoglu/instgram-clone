import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useAuth0 } from './auth/Auth0Wrapper';

import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { setContext } from 'apollo-link-context';

//Components
import Header from './components/Header';
import Profile from './components/Profile';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const { loading } = useAuth0();
  const [accessToken, setAccessToken] = React.useState('');
  const { getTokenSilently } = useAuth0();

  const getAccessToken = async () => {
    try {
      const token = await getTokenSilently();
      setAccessToken(token);
    } catch (e) {
      //console.log(e);
    }
  };
  getAccessToken();

  const authLink = setContext((_, { headers }) => {
    const token = accessToken;
    if (token) {
      return {
        headers: {
          ...headers,
          authorization: `Bearer ${token}`
        }
      };
    } else {
      return {
        headers: {
          ...headers
        }
      };
    }
  });

  const httpLink = new HttpLink({
    uri: 'https://graphql-postgres-fullstack.herokuapp.com/v1/graphql'
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });

  if (loading) {
    return <div>Loading..</div>;
  }

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <BrowserRouter>
          <Header />
          <Switch>
            <Route path="/" exact />
            <PrivateRoute path="/profile" component={Profile} />
          </Switch>
        </BrowserRouter>
      </div>
    </ApolloProvider>
  );
}

export default App;
