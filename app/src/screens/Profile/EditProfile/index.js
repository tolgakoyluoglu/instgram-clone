import React from 'react';
import gql from 'graphql-tag';
import { Container } from '../../Post/Styled';
import { client } from '../../../App';
import { ButtonContainer, Card, Input, Label } from './Styled';
import { Button, Form } from '../../../shared/styled/Styled';

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
  const [image, setImage] = React.useState();

  const handleSubmit = event => {
    event.preventDefault();
    const data = new FormData();
    data.append('file', file, file.name);

    fetch(`${process.env.REACT_APP_API}/upload`, {
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

  const handleImg = event => {
    setFile(event.target.files[0]);
    setImage(URL.createObjectURL(event.target.files[0]));
  };
  return (
    <Container>
      <Card>
        <h2>Edit Profile</h2>
        <Form>
          <Label>
            Upload profile photo
            <Input className="input" type="file" onChange={handleImg} />
          </Label>
          <img alt={file && file.filename} src={image} />
          <ButtonContainer>
            <Button onClick={handleSubmit}>Save</Button>
            <Button>Delete Account</Button>
            <Button>Go Back</Button>
          </ButtonContainer>
        </Form>
      </Card>
    </Container>
  );
};

export default EditProfile;
