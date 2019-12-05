import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useParams, Link } from 'react-router-dom';
import { GET_POST } from '../../shared/utils/graphql';
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
import Like from '../feed/posts/components/Like';

const Post = () => {
  let { id } = useParams();
  const { loading, error, data } = useQuery(GET_POST, {
    variables: { id }
  });

  if (loading) {
    return (
      <LoadingContainer>
        <Loader />
      </LoadingContainer>
    );
  }
  const post = data.getPost;
  console.log(id);
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
