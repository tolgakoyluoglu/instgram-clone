import React, { useContext } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useParams, Link } from 'react-router-dom';
import { GET_POST, DELETE_POST, GET_POSTS } from '../../shared/utils/graphql';
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
  const { userId } = useContext(AuthContext);
  let { id } = useParams();
  const { loading, data } = useQuery(GET_POST, {
    variables: { id }
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
            <CommentBody />
            <CommentInput>
              <input type="text" placeholder="Add a comment..." />
              <button>Post</button>
            </CommentInput>
          </CommentContainer>
        </Content>
      </Card>
    </Container>
  );
};

export default Post;
