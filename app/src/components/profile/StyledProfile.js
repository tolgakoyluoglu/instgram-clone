import styled from 'styled-components';

const PageContainer = styled.div``;

const Container = styled.div`
  width: 80%;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  padding-top: 50px;
`;

const Card = styled.div`
  width: 45%;
  padding: 15px;
  background-color: white;
  text-align: center;
  margin: 15px;
  margin-top: 50px;
  border: 2px solid #f3f3f3;
`;

const Image = styled.img`
  width: 95%;
`;

const BioContainer = styled.div`
  width: 40%;
  margin: auto;
  display: flex;
  flex-direction: column;
  padding-top: 50px;
`;

const ImageContainer = styled.div`
  background-color: white;
  margin-top: 50px;
  margin: auto;
  border: 2px solid #f3f3f3;
  width: 25%;
  padding: 15px;
  border-radius: 50%;
`;

const Avatar = styled.img`
  width: 100%;
`;

const AboutContainer = styled.div`
  margin: auto;
  text-align: center;
`;

export {
  PageContainer,
  Container,
  Card,
  Image,
  BioContainer,
  ImageContainer,
  Avatar,
  AboutContainer
};
