import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useAuth0 } from './auth/Auth0Wrapper';

//Components
import Header from './components/Header';
import Profile from './components/Profile';
import PrivateRoute from './components/PrivateRoute';
function App() {
  const { loading } = useAuth0();

  if (loading) {
    return <div>Loading..</div>;
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" exact />
          <PrivateRoute path="/profile" component={Profile} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
