import React, { useContext } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Link, useParams } from 'react-router-dom';
import Modal from '../../shared/common/components/Modal';
import Backdrop from '../../shared/common/components/Backdrop';
import { AuthContext } from '../../shared/common/AuthContext';
import { LoadingContainer, Loader } from '../../shared/styled/Loading';
import { client } from '../../App';
import {
  FormImage,
  FormImageInput,
  FormInput,
  FormLabel,
  FormModal
} from '../../shared/styled/Styled';
import {
  USER_POSTS,
  FOLLOW_USER,
  GET_FOLLOWERS,
  GET_FOLLOWING,
  GET_POSTS,
  SEARCH_USER_ID,
  ADD_BIO
} from '../../shared/utils/graphql';
import {
  PageContainer,
  Container,
  Card,
  BioContainer,
  Avatar,
  Image,
  UploadButton,
  ImageContainer,
  AboutContainer,
  FollowButton,
  FollowContainer
} from './Styled';

const uploadFile = gql`
  mutation($filename: String!) {
    uploadImage(filename: $filename) {
      username
      photo
    }
  }
`;

const Profile = () => {
  let { id } = useParams();
  const [following, setFollowing] = React.useState();
  const { userId } = useContext(AuthContext);
  const [isOpen, setOpen] = React.useState(false);
  const [bio, setBio] = React.useState('');

  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };
  const [file, setFile] = React.useState();
  const [image, setImage] = React.useState();

  const handleSubmit = event => {
    event.preventDefault();
    updateBio();
    setOpen(false);
    if (!file) {
      return;
    }
    const data = new FormData();
    data.append('file', file, file.name);

    fetch(`${process.env.REACT_APP_API}/upload`, {
      method: 'POST',
      mode: 'cors',
      body: data
    })
      .then(res => res.json())
      .then(async filename => {
        await client.mutate({
          variables: { filename },
          mutation: uploadFile
        });
      })
      .catch(error => console.error(error));
    closeModal();
  };
  const handleImg = event => {
    setFile(event.target.files[0]);
    setImage(URL.createObjectURL(event.target.files[0]));
  };
  const { loading, data } = useQuery(USER_POSTS, {
    variables: { id },
    fetchPolicy: 'no-cache'
  });
  const getUser = useQuery(SEARCH_USER_ID, {
    variables: { id }
  });
  const [updateBio] = useMutation(ADD_BIO, {
    variables: { bio },
    refetchQueries: [
      {
        query: SEARCH_USER_ID,
        variables: { id }
      }
    ]
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
        <UploadButton onClick={openModal}>Edit Profile</UploadButton>
        {isOpen && <Backdrop />}
        {isOpen && (
          <Modal
            title="Upload Photo"
            canCancel
            canConfirm
            onCancel={closeModal}
            onConfirm={handleSubmit}
          >
            <FormModal>
              <FormInput
                type="text"
                placeholder="Bio"
                onChange={e => {
                  setBio(e.target.value);
                }}
              />
              <FormLabel>
                Upload profile photo:
                <FormImageInput type="file" onChange={handleImg} />
              </FormLabel>
              <FormImage alt={file && file.filename} src={image} />
            </FormModal>
          </Modal>
        )}
        <ImageContainer>
          <Avatar src={getUser.data && getUser.data.searchUserId.photo} />
        </ImageContainer>
        <AboutContainer>
          <h1>{getUser.data && getUser.data.searchUserId.username}</h1>
          <p>{getUser.data && getUser.data.searchUserId.bio}</p>
          <FollowContainer>
            Followers:
            <FollowButton
              onClick={handleClick}
              disabled={following === true && true}
              followingColor={following === true && 'true'}
            >
              {getFollower.data ? getFollower.data.getFollowers.length : null}
            </FollowButton>
            Following:
            <FollowButton disabled>
              {getFollowing.data ? getFollowing.data.getFollowing.length : null}
            </FollowButton>
          </FollowContainer>
        </AboutContainer>
      </BioContainer>
      <Container>{posts.reverse()}</Container>
    </PageContainer>
  );
};

export default Profile;
