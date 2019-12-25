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
  Comments,
  Container,
  Content,
  CommentBody,
  Text,
  Wrapper,
  DeleteContainer
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

  const comments = queryComments.data;
  const post = data.getPost;

  return (
    <Container>
      <Card key={post._id}>
        <Wrapper>
          <Image src={post.url} alt={post.title} />
        </Wrapper>
        <Content>
          <CardHeader>
            <ImageContainer>
              <img src={Avatar} alt={post.title} />
              {post.creator ? (
                <Link
                  to={{ pathname: '/profile/' + post.creator[0]._id }}
                ></Link>
              ) : null}
            </ImageContainer>
            <DeleteContainer>
              <p>{post.creator[0].username}</p>
              {post.creator[0]._id === userId ? (
                <Link to="/feed">
                  <p onClick={handleDelete}>X</p>
                </Link>
              ) : null}
            </DeleteContainer>
          </CardHeader>
          <CardBody>
            {post.creator ? (
              <Link to={{ pathname: '/profile/' + post.creator[0]._id }}>
                <p>
                  {post.creator[0].username} {post.title}
                </p>
              </Link>
            ) : null}
            <div>
              {post.likes && <Like likes={post.likes} post={post._id} />}
            </div>
          </CardBody>
          <div>
            <CommentBody>
              {comments &&
                comments.getComments.map(comment => {
                  return (
                    <Comments key={comment._id}>
                      <Text>{comment.username}</Text>
                      <p>{comment.comment}</p>
                    </Comments>
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
          </div>
        </Content>
      </Card>
    </Container>
  );
};

export default Post;
