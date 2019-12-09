import React, { useContext } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {
  USER_POSTS,
  FOLLOW_USER,
  GET_FOLLOWERS,
  GET_FOLLOWING,
  GET_POSTS
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
  const [following, setFollowing] = React.useState(false);
  const { userId } = useContext(AuthContext);
  const { loading, error, data } = useQuery(USER_POSTS, {
    variables: { id }
  });

  React.useEffect(() => {
    if (query.data) {
      const isFollowing = query.data.getFollowers.filter(
        following => following.userId === userId
      );
      setFollowing(true);
    }
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

  const query = useQuery(GET_FOLLOWERS, {
    variables: { id }
  });

  const followingQuery = useQuery(GET_FOLLOWING, {
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
          <Avatar src={Photo} />
        </ImageContainer>
        <AboutContainer>
          <h1>Profile</h1>
          <p>Lorem ipsum text bla bla</p>
          <button onClick={handleClick} disabled={following && true}>
            {query.data ? query.data.getFollowers.length : null}
          </button>
          <span>
            {followingQuery.data
              ? followingQuery.data.getFollowing.length
              : null}
          </span>
        </AboutContainer>
      </BioContainer>
      <Container>{posts.reverse()}</Container>
    </PageContainer>
  );
};

export default Profile;
