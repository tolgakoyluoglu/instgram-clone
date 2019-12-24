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

  @media only screen and (min-width: 1000px) {
    width: 40%;
  }
`;

const ImageContainer = styled.div`
  margin: auto;
`;
const UploadButton = styled.div`
  background: none;
  border: none;
  padding: 0;
  font-family: arial, sans-serif;
  color: #069;
  text-decoration: underline;
  cursor: pointer;
  margin: auto;
  text-align: center;
  margin-bottom: 20px;
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
const FollowButton = styled.button`
  display: inline-flex;
  background-color: ${props =>
    props.followingColor === 'true' ? '#3897f0' : 'f3f3f3'};
  border-radius: 6px;
  align-items: center;
  justify-content: center;
  border-color: rgb(182, 182, 191);
  appearance: none;
  box-sizing: border-box;
  border: 0;
  transition: all 0.4s ease 0s;
  font-weight: 700;
  margin: 10px;
  color: #fff;
  text-decoration: none;
  padding: 6px;
  font-size: 14px;
  cursor: 'pointer';

  &:hover {
    background-color: ${props =>
      props.followingColor === 'true' ? '#447fe5' : 'f3f3f3'};
    transition: all 0.4s ease 0s;
  }
  &:focus {
    box-shadow: 0 0 0 4px #293dce;
    outline: none;
  }
`;
const FollowContainer = styled.div``;
export {
  PageContainer,
  Container,
  Card,
  FollowContainer,
  Image,
  FollowButton,
  BioContainer,
  ImageContainer,
  Avatar,
  AboutContainer,
  UploadButton
};
