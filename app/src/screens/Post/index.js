import React, { useContext } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useParams, Link } from 'react-router-dom';
import {
  GET_POST,
  DELETE_POST,
  GET_POSTS,
  ADD_COMMENT,
  GET_COMMENTS
} from '../../shared/utils/graphql';
import { LoadingContainer, Loader } from '../../shared/styled/Loading';
import {
  Card,
  Image,
  CardBody,
  CardHeader,
  CommentInput,
  ImageContainer,
  Container,
  Content,
  CommentBody,
  CommentContainer,
  LikeContainer
} from './Styled';
import Avatar from '../../res/images/avatar.png';
import Like from '../Feed/Posts/components/Like';
import { AuthContext } from '../../shared/common/AuthContext';

const Post = () => {
  const [comment, setComment] = React.useState('');
  const { userId } = useContext(AuthContext);
  let { id } = useParams();
  const { loading, data } = useQuery(GET_POST, {
    variables: { id }
  });
  const queryComments = useQuery(GET_COMMENTS, {
    variables: { postId: id }
  });
  const [deletePost] = useMutation(DELETE_POST, {
    variables: { postId: id },
    refetchQueries: [
      {
        query: GET_POSTS,
        variables: { id }
      }
    ]
  });
  const [addComment] = useMutation(ADD_COMMENT, {
    variables: { postId: id, comment: comment },
    refetchQueries: [
      {
        query: GET_COMMENTS,
        variables: { postId: id }
      }
    ]
  });
  if (queryComments.data) {
    console.log(queryComments.data);
  }
  if (loading) {
    return (
      <LoadingContainer>
        <Loader />
      </LoadingContainer>
    );
  }
  const handleDelete = () => {
    deletePost();
  };

  const comments = queryComments.data.getComments;
  const post = data.getPost;

  return (
    <Container>
      <Card key={post._id}>
        <Image src={post.url} alt={post.title} />
        <Content>
          <CardHeader>
            <ImageContainer>
              <img src={Avatar} alt={post.title} />
              {post.creator ? (
                <Link
                  to={{ pathname: '/profile/' + post.creator[0]._id }}
                ></Link>
              ) : null}
              {post.creator[0]._id === userId ? (
                <Link to="/feed">
                  <button onClick={handleDelete}>Delete</button>
                </Link>
              ) : null}
            </ImageContainer>
            <p>{post.creator[0].username}</p>
          </CardHeader>
          <CardBody>
            {post.creator ? (
              <Link to={{ pathname: '/profile/' + post.creator[0]._id }}>
                <p>
                  {post.creator[0].username} {post.title}
                </p>
              </Link>
            ) : null}
            <LikeContainer>
              {post.likes && <Like likes={post.likes} post={post._id} />}
            </LikeContainer>
          </CardBody>
          <CommentContainer>
            <CommentBody>
              {comments &&
                comments.map(comment => {
                  return (
                    <div key={comment._id}>
                      <p>{comment.user}</p>
                      <p>{comment.comment}</p>
                    </div>
                  );
                })}
            </CommentBody>
            <CommentInput>
              <input
                value={comment}
                type="text"
                onChange={e => {
                  setComment(e.target.value);
                }}
                placeholder="Add a comment..."
              />
              <button
                onClick={e => {
                  e.preventDefault();
                  setComment('');
                  addComment();
                }}
              >
                Post
              </button>
            </CommentInput>
          </CommentContainer>
        </Content>
      </Card>
    </Container>
  );
};

export default Post;
