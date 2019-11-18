import React from 'react';
import { Link, Redirect } from 'react-router-dom';
//Components
import { Card, Form, Input, Button } from '../styled/LoginForm';
import { useAuth } from '../auth/authContext';
//Apollo stuff
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { LoadingContainer, Loader } from '../styled/Loading';

function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { setAuthTokens } = useAuth();

  const LOGIN_USER = gql`
    mutation userLogin($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        token
      }
    }
  `;
  const [loginUser, { data, loading }] = useMutation(LOGIN_USER, {
    variables: { email: email, password: password }
  });
  if (loading) {
    return (
      <LoadingContainer>
        <Loader />
      </LoadingContainer>
    );
  }

  if (data) {
    setAuthTokens(data.login.token);
    return <Redirect to="/home" />;
  }
  const handleSubmit = event => {
    event.preventDefault();
    loginUser();
  };

  return (
    <Card>
      <Form type="submit" onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="email"
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
        <Input
          type="password"
          placeholder="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Button type="submit" value="Submit">
          Sign In
        </Button>
      </Form>
      <Link to="/signup">Don't have an account?</Link>
    </Card>
  );
}

export default Login;
