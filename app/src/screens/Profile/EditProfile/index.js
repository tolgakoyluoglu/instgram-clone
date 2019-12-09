import React, { useContext } from 'react';
import { Container } from '../../Post/Styled';
import styled from 'styled-components';
import { Input, Form } from '../../Auth/Styled';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../shared/common/AuthContext';

const CardContent = styled.div`
  padding: 20px;
  width: 50%;
  margin: auto;
  border: 1px solid #cdcdcd;
  background-color: #fff;
  border-radius: 8px;
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const Button = styled.button`
  margin: 10px;
  background-color: #3897f0;
  border: none;
  border-radius: 6px;
  border-width: 1px;
  padding: 1rem;
  color: white;
  font-weight: 700;
  width: 33%;
  margin-bottom: 1rem;
  font-size: 0.8rem;
  cursor: pointer;
  outline: none;
  border-color: rgb(182, 182, 191);
`;

const EditProfile = () => {
  const { userId } = useContext(AuthContext);

  return (
    <Container>
      <CardContent>
        <h2>Edit Profile</h2>
        <Form>
          <label>Avatar:</label>
          <Input type="text" />

          <label>Description:</label>
          <Input type="text" />
          <ButtonContainer>
            <Button>Save</Button>
            <Button>Delete Account</Button>
            <Button>Go Back</Button>
          </ButtonContainer>
        </Form>
      </CardContent>
    </Container>
  );
};

export default EditProfile;
