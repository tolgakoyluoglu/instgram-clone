import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import Posts from './Posts';
import { CREATE_POST, GET_POSTS } from '../../shared/utils/graphql';
import { LoadingContainer, Loader } from '../../shared/styled/Loading';
import { Container, Form, Input, UploadButton } from './Styled';
import Modal from '../../shared/common/components/Modal';
import Backdrop from '../../shared/common/components/Backdrop';

const Feed = () => {
  const [image, setImage] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [creating, setCreating] = React.useState(false);

  const createHandler = () => {
    setCreating(true);
  };

  const confirmHandler = event => {
    setCreating(false);
    event.preventDefault();
    createPost();
    setTitle('');
    setImage('');
  };

  const cancelHandler = () => {
    setCreating(false);
  };
  const [createPost, { error, loading }] = useMutation(CREATE_POST, {
    variables: { title: title, url: image },
    fetchPolicy: 'no-cache',
    refetchQueries: [
      {
        query: GET_POSTS
      }
    ]
  });
  const handleSubmit = event => {
    event.preventDefault();
    createPost();
    setTitle('');
    setImage('');
  };

  if (error) {
    console.log(error.message);
  }

  if (loading)
    return (
      <LoadingContainer>
        <Loader />
      </LoadingContainer>
    );

  return (
    <Container>
      {creating && <Backdrop />}
      {creating && (
        <Modal
          title="Add a Photo"
          canCancel
          canConfirm
          onCancel={cancelHandler}
          onConfirm={confirmHandler}
        >
          <Form onSubmit={handleSubmit}>
            <Input
              value={title}
              type="text"
              placeholder="Title"
              required
              onChange={e => setTitle(e.target.value)}
            />
            <Input
              value={image}
              type="text"
              placeholder="Image"
              required
              onChange={e => setImage(e.target.value)}
            />
          </Form>
        </Modal>
      )}
      <UploadButton onClick={createHandler} />
      <Posts />
    </Container>
  );
};

export default Feed;
