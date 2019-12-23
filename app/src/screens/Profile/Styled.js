import styled from 'styled-components';

const PageContainer = styled.div`
  padding-top: 50px;
  @media only screen and (min-width: 1000px) {
    padding-top: 150px;
  }
`;

const Container = styled.div`
  padding-top: 50px;
  width: 100%;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  @media only screen and (min-width: 1000px) {
    width: 100%;
  }
  @media only screen and (min-width: 1100px) {
    width: 65%;
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

const Card = styled.div`
  width: 100px;
  height: 100px;
  background-color: white;
  text-align: center;
  border: 1px solid #f3f3f3;
  margin: 5px;
  border-radius: 8px;
  box-shadow: 0 7px 30px -10px rgba(150, 170, 180, 0.5);

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
  width: 90%;
  margin: auto;
  display: flex;
  flex-direction: column;

  a {
    margin-bottom: 20px;
    text-align: center;
  }
  @media only screen and (min-width: 1000px) {
    width: 40%;
  }
`;

const ImageContainer = styled.div`
  margin: auto;
`;

const Avatar = styled.img`
  height: 150px;
  width: 150px;
  border-radius: 50%;
  object-fit: contain;
  border: 1px solid #e6e6e6;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
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
