import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  padding-top: 30px;
  min-height: calc(100vh - 70px);
  margin: auto;
  box-sizing: border-box;
  max-width: 90%;
  text-align: center;
  padding-bottom: 50px;
  @media only screen and (min-width: 1000px) {
    padding-top: 120px;
    max-width: 90%;
  }
  @media only screen and (min-width: 1200px) {
    padding-top: 120px;
    max-width: 50%;
  }
  -webkit-animation: fadein 1s;
  -moz-animation: fadein 1s;
  -ms-animation: fadein 1s;
  -o-animation: fadein 1s;
  animation: fadein 1s;
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-moz-keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-webkit-keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-ms-keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-o-keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
const UsersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const Image = styled.img`
  height: 150px;
  width: 100%;
  object-fit: contain;
`;
const Card = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 10px;
  @media only screen and (min-width: 1000px) {
    width: 20%;
  }
  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
`;
const UserInfo = styled.div`
  text-align: center;
  padding: 2px 16px;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: #262626;
`;
export { Container, UsersContainer, Image, Card, UserInfo, StyledLink };
