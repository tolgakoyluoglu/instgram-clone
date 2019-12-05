import React, { useContext } from 'react';
import { AuthContext } from '../../shared/common/AuthContext';
import {
  Navbar,
  List,
  ListItem,
  StyledLink,
  PageContainer,
  PageHeader,
  SearchInput,
  Form,
  Paragraph
} from './Styled';
import { useMutation } from '@apollo/react-hooks';
import { SEARCH_USER } from '../../shared/utils/graphql';
import { LoadingContainer, Loader } from '../../shared/styled/Loading';
import { Redirect } from 'react-router-dom';

const Header = () => {
  const { setAuthTokens, authTokens, userId, setUserId } = useContext(
    AuthContext
  );
  const [username, setValue] = React.useState('');
  const [active, setActive] = React.useState(1);
  const [searchUser, { data, loading, error }] = useMutation(SEARCH_USER, {
    variables: { username }
  });

  const toggleSelected = index => {
    setActive(index);
  };

  if (loading) {
    return (
      <LoadingContainer>
        <Loader />
      </LoadingContainer>
    );
  }
  const logout = () => {
    setAuthTokens();
    setUserId();
    localStorage.clear();
  };

  if (data) {
    return (
      <>
        <Header />
        <Redirect
          to={{ pathname: '/profile/' + data.searchUser[0]._id }}
          component={Header}
        />
      </>
    );
  }
  const handleSubmit = event => {
    event.preventDefault();
    searchUser();
    setValue();
  };

  return (
    <PageContainer>
      <Navbar>
        <StyledLink to={authTokens ? '/feed' : '/login'}>
          <PageHeader>InstaClone</PageHeader>
        </StyledLink>
        {authTokens && (
          <>
            <Form type="submit" onSubmit={handleSubmit}>
              <SearchInput
                value={username}
                type="text"
                onChange={event => setValue(event.target.value)}
                placeholder="Search.."
              />
              {error && <Paragraph>User not found</Paragraph>}
            </Form>

            <List>
              <ListItem>
                <StyledLink
                  onClick={() => toggleSelected(1)}
                  selected={active === 1 ? true : false}
                  to="/feed"
                >
                  Feed
                </StyledLink>
              </ListItem>
              <ListItem>
                <StyledLink
                  to={{ pathname: '/profile/' + userId }}
                  onClick={() => toggleSelected(2)}
                  selected={active === 2 ? true : false}
                >
                  Profile
                </StyledLink>
              </ListItem>
              <ListItem>
                <StyledLink to="/login" onClick={logout}>
                  Logout
                </StyledLink>
              </ListItem>
            </List>
          </>
        )}
      </Navbar>
    </PageContainer>
  );
};

export default Header;
