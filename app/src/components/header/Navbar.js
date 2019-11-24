import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Navbar = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin: auto;
  font-size: 14px;
`;
const List = styled.ul`
  display: flex;
  list-style: none;
  text-decoration: none;
`;
const ListItem = styled.li`
  padding: 20px;
  text-decoration: none;
`;

const StyledLink = styled(NavLink)`
  text-decoration: none;
  color: #171e45;
  font-size: 15px;
  font-weight: 600;
`;

const PageContainer = styled.div`
  background-color: white;
  width: 100%;
  margin: auto;
  border-bottom: 2px solid #f1f1f1;
`;

const PageHeader = styled.h1`
  font-size: 2rem;
`;
export { Navbar, List, ListItem, StyledLink, PageContainer, PageHeader };
