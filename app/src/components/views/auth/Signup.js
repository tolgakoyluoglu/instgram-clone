import React from 'react';
import { Link, Redirect } from 'react-router-dom';
//Components
import { Card, Form, Input, Button } from '../../../styled/LoginForm';
//Apollo stuff
import { useMutation } from '@apollo/react-hooks';
import { LoadingContainer, Loader } from '../../../styled/Loading';
import { CREATE_USER } from '../../../shared/utils/graphql';

const SignUp = () => {
  const [email, setEmail] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [createUser, { data, loading }] = useMutation(CREATE_USER, {
    variables: { email: email, username: username, password: password }
  });
  if (loading) {
    return (
      <LoadingContainer>
        <Loader />
      </LoadingContainer>
    );
  }
  if (data) {
    return <Redirect to="/" />;
  }
  const handleSubmit = event => {
    event.preventDefault();
    createUser();
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
          type="text"
          placeholder="username"
          value={username}
          onChange={event => setUsername(event.target.value)}
        />
        <Input
          type="password"
          placeholder="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Button type="submit" value="Submit">
          Sign up
        </Button>
      </Form>
      <Link to="/login">Already have an account?</Link>
    </Card>
  );
};

export default SignUp;
