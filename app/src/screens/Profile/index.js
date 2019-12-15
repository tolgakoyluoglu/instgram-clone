import React, { useContext } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {
  USER_POSTS,
  FOLLOW_USER,
  GET_FOLLOWERS,
  GET_FOLLOWING,
  GET_POSTS,
  SEARCH_USER_ID
} from '../../shared/utils/graphql';
import { LoadingContainer, Loader } from '../../shared/styled/Loading';
import { Link, useParams } from 'react-router-dom';
import {
  PageContainer,
  Container,
  Card,
  Image,
  BioContainer,
  Avatar,
  ImageContainer,
  AboutContainer
} from './Styled';
import Photo from '../../res/images/avatar.png';
import { AuthContext } from '../../shared/common/AuthContext';

const Profile = () => {
  let { id } = useParams();
  const [following, setFollowing] = React.useState();
  const { userId } = useContext(AuthContext);

  const { loading, error, data } = useQuery(USER_POSTS, {
    variables: { id },
    fetchPolicy: 'no-cache'
  });
  const getUser = useQuery(SEARCH_USER_ID, {
    variables: { id }
  });
  const getFollower = useQuery(GET_FOLLOWERS, {
    variables: { id }
  });
  const getFollowing = useQuery(GET_FOLLOWING, {
    variables: { id }
  });
  const [followUser] = useMutation(FOLLOW_USER, {
    variables: { id },
    refetchQueries: [
      {
        query: GET_FOLLOWERS,
        variables: { id }
      },
      {
        query: GET_POSTS
      }
    ]
  });
  React.useEffect(() => {
    if (getFollower.data) {
      const isFollowing = getFollower.data.getFollowers.filter(
        following => following.userId === userId
      );
      if (isFollowing.length > 0) {
        setFollowing(true);
      }
    }
  }, [getFollower.data, userId]);
  const handleClick = () => {
    followUser(id);
  };

  if (error && getFollower.error) {
    console.log(error && getFollower.error);
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
        <Link to="/settings">Edit Profile</Link>
        <ImageContainer>
          <Avatar
            src={getUser.data ? getUser.data.searchUserId.photo : Photo}
          />
        </ImageContainer>
        <AboutContainer>
          <h1>Profile</h1>
          <p>Lorem ipsum text bla bla</p>
          <button onClick={handleClick} disabled={following === true && true}>
            {getFollower.data ? getFollower.data.getFollowers.length : null}
          </button>
          <span>
            {getFollowing.data ? getFollowing.data.getFollowing.length : null}
          </span>
        </AboutContainer>
      </BioContainer>
      <Container>{posts.reverse()}</Container>
    </PageContainer>
  );
};

export default Profile;
