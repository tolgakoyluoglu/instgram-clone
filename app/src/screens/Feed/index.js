import React from 'react';
import Posts from './Posts';
import { Container, ButtonContainer } from './Styled';
import Modal from '../../shared/common/components/Modal';
import Backdrop from '../../shared/common/components/Backdrop';
import { client } from '../../App';
import { GET_POSTS, CREATE_POST } from '../../shared/utils/graphql';
import {
  Button,
  FormImage,
  FormImageInput,
  FormInput,
  FormLabel,
  FormModal
} from '../../shared/styled/Styled';

const Feed = () => {
  const [image, setImage] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [file, setFile] = React.useState();
  const [isOpen, setOpen] = React.useState(false);

  const openModal = () => {
    setOpen(true);
  };
  const cancelHandler = () => {
    setOpen(false);
  };
  const handleSubmit = event => {
    event.preventDefault();
    setOpen(false);
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
          variables: { filename, title },
          mutation: CREATE_POST,
          refetchQueries: [
            {
              query: GET_POSTS
            }
          ]
        });
      })
      .catch(error => console.error(error));
    setTitle('');
    setImage('');
  };
  const handleImg = event => {
    setFile(event.target.files[0]);
    setImage(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <Container>
      <ButtonContainer>
        <Button onClick={openModal}>Upload a photo</Button>
      </ButtonContainer>
      {isOpen && <Backdrop />}
      {isOpen && (
        <Modal
          title="Upload Photo"
          canCancel
          canConfirm
          onCancel={cancelHandler}
          onConfirm={handleSubmit}
        >
          <FormModal onSubmit={handleSubmit}>
            <FormInput
              value={title}
              type="text"
              placeholder="Title"
              required
              onChange={e => setTitle(e.target.value)}
            />
            <FormLabel>
              Select image
              <FormImageInput
                className="input"
                type="file"
                onChange={handleImg}
              />
            </FormLabel>
            <FormImage alt={title} src={image} />
          </FormModal>
        </Modal>
      )}
      <Posts />
    </Container>
  );
};

export default Feed;
