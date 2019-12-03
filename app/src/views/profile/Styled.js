import styled from 'styled-components';

const PageContainer = styled.div``;

const Container = styled.div`
  width: 100%;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  padding-top: 50px;
  justify-content: center;
  @media only screen and (min-width: 1000px) {
    width: 100%;
  }
  @media only screen and (min-width: 1100px) {
    width: 65%;
  }
`;

const Card = styled.div`
  width: 100px;
  height: 100px;
  background-color: white;
  text-align: center;
  border: 1px solid #f3f3f3;
  margin: 5px;
  @media only screen and (min-width: 400px) {
    width: 120px;
    height: 120px;
  }
  @media only screen and (min-width: 700px) {
    width: 200px;
    height: 200px;
    margin: 15px;
  }
  @media only screen and (min-width: 1000px) {
    margin-top: 50px;
    margin: 15px;
    width: 300px;
    height: 300px;
  }
  @media only screen and (min-width: 320px) and (max-width: 350px) {
    margin: 2px;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  max-height: 100%;
  max-width: 100%;
`;

const BioContainer = styled.div`
  width: 40%;
  margin: auto;
  display: flex;
  flex-direction: column;
  padding-top: 150px;
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
