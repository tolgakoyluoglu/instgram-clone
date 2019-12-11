import React from 'react';
import { Container } from '../../Post/Styled';
import styled from 'styled-components';
import { Input, Form } from '../../Auth/Styled';
import gql from 'graphql-tag';
import { client } from '../../../App';

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

const uploadFile = gql`
  mutation($filename: String!) {
    uploadImage(filename: $filename) {
      username
      photo
    }
  }
`;

const EditProfile = () => {
  const [file, setFile] = React.useState();

  const handleSubmit = event => {
    event.preventDefault();
    const data = new FormData();
    data.append('file', file, file.name);

    fetch('http://localhost:4000/upload', {
      method: 'POST',
      mode: 'cors',
      body: data
    })
      .then(res => res.json())
      .then(async filename => {
        await client.mutate({
          variables: { filename },
          mutation: uploadFile
        });
      })
      .catch(error => console.error(error));
  };
  return (
    <Container>
      <CardContent>
        <h2>Edit Profile</h2>
        <Form>
          <label>Upload profile photo:</label>
          <Input type="file" onChange={e => setFile(e.target.files[0])} />
          <ButtonContainer>
            <Button onClick={handleSubmit}>Save</Button>
            <Button>Delete Account</Button>
            <Button>Go Back</Button>
          </ButtonContainer>
        </Form>
      </CardContent>
    </Container>
  );
};

export default EditProfile;
