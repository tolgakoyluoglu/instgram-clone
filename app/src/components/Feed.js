import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import Posts from './Posts';
import { CREATE_POST, GET_POSTS } from '../shared/utils/graphql';
import { LoadingContainer, Loader } from '../styled/Loading';

const Feed = () => {
  const [image, setImage] = React.useState('');
  const [title, setTitle] = React.useState('');

  const [createPost, { data, error, loading }] = useMutation(CREATE_POST, {
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
  };

  if (error) return `Error! ${error.message}`;

  if (loading)
    return (
      <LoadingContainer>
        <Loader />
      </LoadingContainer>
    );

  return (
    <div>
      <h1>Feed</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={title}
          type="text"
          placeholder="Title"
          onChange={e => setTitle(e.target.value)}
        />
        <input
          value={image}
          type="text"
          placeholder="Image"
          onChange={e => setImage(e.target.value)}
        />
        <button type="submit">Add Photo</button>
      </form>
      <Posts />
    </div>
  );
};

export default Feed;
