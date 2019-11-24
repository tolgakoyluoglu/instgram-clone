import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import Posts from '../posts/Posts';
import { CREATE_POST, GET_POSTS } from '../../shared/utils/graphql';
import { LoadingContainer, Loader } from '../../styled/Loading';
import { Card, Form, Input, UploadButton } from './StyledFeed';
import Modal from '../../shared/common/Modal';
import Backdrop from '../../shared/common/Backdrop';

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
    update(proxy, result) {
      const data = proxy.readQuery({
        query: GET_POSTS
      });
      data.posts.push(result.data.createPost);
      proxy.writeQuery({ query: GET_POSTS, data: { ...data } });
    }
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
    <Card>
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
    </Card>
  );
};

export default Feed;
