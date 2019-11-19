import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const GET_POSTS = gql`
  {
    posts {
      title
      url
      _id
      creator {
        username
        email
        _id
      }
    }
  }
`;
const Feed = () => {
  const { loading, error, data } = useQuery(GET_POSTS);
  const [image, setImage] = React.useState('');
  const [title, setTitle] = React.useState('');

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  console.log(data.posts);
  const posts = data.posts.map(post => {
    return (
      <div key={post._id}>
        <p>{post.title}</p>
        <img src={post.url} />
        <p>{post.creator[0].username}</p>
      </div>
    );
  });

  return (
    <div>
      <h1>Feed</h1>
      <form>
        <input
          value={title}
          type="text"
          placeholder="Title"
          onChange={e => setTitle(e.target.value)}
        />
        <input
          value={image}
          type="text"
          placeholder="Url"
          onChange={e => setImage(e.target.value)}
        />
        <button>Add Photo</button>
      </form>
      <div>{posts}</div>
    </div>
  );
};

export default Feed;
