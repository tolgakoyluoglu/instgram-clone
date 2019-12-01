import React from 'react';
import { useAuth } from '../../shared/auth/authContext';
import {
  Navbar,
  List,
  ListItem,
  StyledLink,
  PageContainer,
  PageHeader
} from './Navbar';
const Header = () => {
  const { authTokens, setAuthTokens, userId } = useAuth();

  const logout = () => {
    setAuthTokens();
  };

  return (
    <PageContainer>
      <Navbar>
        <StyledLink to={authTokens ? '/feed' : '/login'}>
          <PageHeader>InstaClone</PageHeader>
        </StyledLink>
        <List>
          {authTokens && (
            <>
              <ListItem>
                <input type="text" placeholder="Search.." />
              </ListItem>
              <ListItem>
                <StyledLink to="/feed">Feed</StyledLink>
              </ListItem>
              <ListItem>
                <StyledLink to={{ pathname: '/profile/' + userId }}>
                  Profile
                </StyledLink>
              </ListItem>
              <ListItem>
                <StyledLink to="/login" onClick={logout}>
                  Logout
                </StyledLink>
              </ListItem>
            </>
          )}
        </List>
      </Navbar>
    </PageContainer>
  );
};

export default Header;
