import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { USER_POSTS } from '../../shared/utils/graphql';
import { useAuth } from '../../shared/auth/authContext';
import { LoadingContainer, Loader } from '../../styled/Loading';
import { Link } from 'react-router-dom';
import {
  PageContainer,
  Container,
  Card,
  Image,
  BioContainer,
  Avatar,
  ImageContainer,
  AboutContainer
} from './StyledProfile';
import Selfie from './avatar.png';
// TODO:
// create follow button and send mutation to update followers

const Profile = ({ match }) => {
  const {
    params: { id }
  } = match;
  const { setUserId } = useAuth();

  React.useEffect(() => {
    setUserId(id);
  });

  const { loading, error, data } = useQuery(USER_POSTS, {
    variables: { id: id }
  });

  if (loading) {
    return (
      <LoadingContainer>
        <Loader />
      </LoadingContainer>
    );
  }
  const posts = data.userPosts.map(post => {
    return (
      <Card key={post._id}>
        <h3>{post.title}</h3>
        <Link to={{ pathname: '/post/' + post._id }}>
          <Image src={post.url} alt={post.title} />
        </Link>
      </Card>
    );
  });
  return (
    <PageContainer>
      <BioContainer>
        <ImageContainer>
          <Avatar src={Selfie} />
        </ImageContainer>
        <AboutContainer>
          <h1>Profile</h1>
          <p>Lorem ipsum text bla bla</p>
        </AboutContainer>
      </BioContainer>
      <Container>{posts.reverse()}</Container>
    </PageContainer>
  );
};

export default Profile;
