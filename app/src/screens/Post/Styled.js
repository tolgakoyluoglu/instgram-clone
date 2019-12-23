import styled from 'styled-components';

const Container = styled.div`
  padding-top: 50px;

  @media only screen and (min-width: 1000px) {
    padding-top: 150px;
  }
`;

const Content = styled.div`
  width: 100%;
  border-left: 1px solid #e6e6e6;
  @media only screen and (min-width: 1000px) {
    width: 55%;
  }
`;
const Card = styled.div`
  display: flex;
  width: 90%;
  margin: auto;
  border-radius: 3px;
  border: 1px solid #e6e6e6;
  background-color: #fff;
  flex-direction: column;
  margin-bottom: 60px;
  border-radius: 8px;
  box-shadow: 0 7px 30px -10px rgba(150, 170, 180, 0.5);
  @media only screen and (min-width: 1000px) {
    width: 90%;
    flex-direction: row;
  }
  @media only screen and (min-width: 1200px) {
    width: 50%;
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

const Image = styled.img`
  min-height: 100%;
  width: 1000px;
  height: auto;
  max-width: 100%;
  max-height: 600px;
`;

const CardHeader = styled.div`
  display: flex;
  padding: 10px;
  flex-direction: row;
  align-self: start;
  border-bottom: 1px solid #e6e6e6;
`;

const CardBody = styled.div`
  display: flex;
  align-self: start;
  margin: 10px;
  justify-content: space-between;
  font-size: 14px;
  p {
    margin: 3px;
    font-weight: 500;
  }
  a {
    text-decoration: none;
    color: #000;
  }
`;
const Comments = styled.div`
  display: flex;
  flex-direction: row;
`;
const Text = styled.p`
  margin-right: 10px;
  font-weight: 600;
`;
const ImageContainer = styled.div`
  height: 32px;
  width: 32px;
  padding: 10px;
  img {
    width: 100%;
    height: 100%;
  }
`;
const CommentInput = styled.div`
  border-top: 1px solid #e6e6e6;
  width: 100%;
  height: 50px;
  display: flex;
  button {
    background: none;
    border: none;
    padding: 0;
    color: #3897f0;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    margin-right: 10px;
  }
  input {
    border: none;
    height: 40%;
    padding: 15px;
    width: 100%;

    &:focus {
      outline: none !important;
      border: none;
    }
  }
`;
const CommentBody = styled.div`
  overflow: scroll;
  display: flex;
  display: flex;
  padding: 20px;
  justify-content: space-between;
  flex-direction: column;
  height: 200px;
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #cdcdcd;
  }
  @media only screen and (min-width: 1000px) {
    height: 400px;
  }
`;

export {
  CommentBody,
  Container,
  Image,
  Card,
  Comments,
  CardBody,
  CardHeader,
  ImageContainer,
  CommentInput,
  Content,
  Text
};
