import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {
  USER_POSTS,
  FOLLOW_USER,
  GET_FOLLOWERS
} from '../../shared/utils/graphql';
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

const Profile = ({ match }) => {
  const {
    params: { id }
  } = match;

  const { loading, error, data } = useQuery(USER_POSTS, {
    variables: { id: id }
  });

  const [followUser] = useMutation(FOLLOW_USER, {
    variables: { id }
  });

  const query = useQuery(GET_FOLLOWERS, {
    variables: { id }
  });

  const handleClick = () => {
    followUser(id);
  };
  if (error && query.error) {
    console.log(error && query.error);
  }

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
          <button onClick={handleClick}>
            {query.data ? query.data.getFollowers.length : null}
          </button>
        </AboutContainer>
      </BioContainer>
      <Container>{posts.reverse()}</Container>
    </PageContainer>
  );
};

export default Profile;
