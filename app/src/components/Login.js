import React from 'react';
import { Link } from 'react-router-dom';
//Components
import { Card, Logo, Form, Input, Button } from '../styled/LoginForm';
import { useAuth } from '../auth/auth';
//Apollo stuff
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

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
  const [loginUser, { data }] = useMutation(LOGIN_USER, {
    variables: { email: email, password: password }
  });

  if (data) {
    setAuthTokens(data.login.token);
  }
  const handleSubmit = event => {
    event.preventDefault();
    loginUser();
    console.log(email, password);
  };

  return (
    <Card>
      <Logo />
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
