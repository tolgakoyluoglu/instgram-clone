import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

const Navbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  margin: auto;
  font-size: 14px;
  h1 {
    font-size: 18px;
  }
  @media only screen and (min-width: 700px) {
    width: 95%;
    h1 {
      font-size: 25px;
    }
  }
  @media only screen and (min-width: 1200px) {
    width: 50%;
  }
`;
const List = styled.ul`
  display: flex;
  list-style: none;
  text-decoration: none;
`;
const ListItem = styled.li`
  padding: 12px;
  text-decoration: none;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #262626;
  font-size: 15px;
  font-weight: 500;
  position: relative;

  &:hover {
    color: #293dce;
  }
`;

const PageContainer = styled.div`
  background-color: white;
  width: 100%;
  margin: auto;
  position: fixed;
  box-shadow: 0 7px 30px -10px rgba(150, 170, 180, 0.5);
`;

const PageHeader = styled.h1`
  font-size: 2rem;
`;

const SearchInput = styled.input`
  font-size: 13px;
  display: block;
  height: 35px;
  background-color: rgb(255, 255, 255);
  color: rgb(130, 130, 143);
  width: 100%;
  box-sizing: border-box;
  padding: 0px 24px 0px 8px;
  border-radius: 6px;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(182, 182, 191);

  &:focus {
    color: rgb(26, 26, 38);
    box-shadow: rgb(230, 230, 255) 0px 0px 0px 3px;
    outline: none;
    border-color: rgb(151, 151, 252);
    border-image: initial;
  }
`;

const Form = styled.form`
  margin-left: 100px;
`;

const Paragraph = styled.p`
  font-size: 12px;
  margin-top: 10px;
  padding: 0;
  text-align: center;
`;

export {
  Navbar,
  List,
  ListItem,
  StyledLink,
  PageContainer,
  PageHeader,
  SearchInput,
  Form,
  Paragraph
};
