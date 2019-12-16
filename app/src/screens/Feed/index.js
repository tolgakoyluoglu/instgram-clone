import React from 'react';
import Posts from './Posts';
import { Container, Form, Input, UploadButton } from './Styled';
import Modal from '../../shared/common/components/Modal';
import Backdrop from '../../shared/common/components/Backdrop';
import { client } from '../../App';
import { GET_POSTS, CREATE_POST } from '../../shared/utils/graphql';

const Feed = () => {
  const [image, setImage] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [file, setFile] = React.useState();
  const [creating, setCreating] = React.useState(false);

  const createHandler = () => {
    setCreating(true);
  };
  const cancelHandler = () => {
    setCreating(false);
  };
  const handleSubmit = event => {
    event.preventDefault();
    setCreating(false);
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
      {creating && <Backdrop />}
      {creating && (
        <Modal
          title="Add a Photo"
          canCancel
          canConfirm
          onCancel={cancelHandler}
          onConfirm={handleSubmit}
        >
          <Form onSubmit={handleSubmit}>
            <Input
              value={title}
              type="text"
              placeholder="Title"
              required
              onChange={e => setTitle(e.target.value)}
            />
            <label>
              Upload profile photo
              <Input className="input" type="file" onChange={handleImg} />
            </label>
            <img alt={title} src={image} />
          </Form>
        </Modal>
      )}
      <UploadButton onClick={createHandler} />
      <Posts />
    </Container>
  );
};

export default Feed;
