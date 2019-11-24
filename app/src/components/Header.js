import React from 'react';
import { useAuth } from '../shared/auth/authContext';
import {
  Navbar,
  List,
  ListItem,
  StyledLink,
  PageContainer,
  PageHeader
} from '../styled/Navbar';
const Header = () => {
  const { authTokens, setAuthTokens } = useAuth();

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
                <StyledLink to="/feed">Feed</StyledLink>
              </ListItem>
              <ListItem>
                <StyledLink to="/profile">Profile</StyledLink>
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
