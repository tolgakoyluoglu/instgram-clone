import styled from 'styled-components';

const Container = styled.div`
  padding-top: 50px;
  min-height: calc(100vh - 70px);
  box-sizing: border-box;
  max-width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media only screen and (min-width: 1000px) {
    padding-top: 150px;
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
const Button = styled.button`
  display: inline-flex;
  background-color: #3897f0;
  border-radius: 6px;
  position: relative;
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
  padding: 16px;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    background-color: #447fe5;
    transition: all 0.4s ease 0s;
  }
  &:focus {
    box-shadow: 0 0 0 4px #293dce;
    outline: none;
  }
`;
const ButtonContainer = styled.div`
  padding-bottom: 50px;
`;
const FileImage = styled.img`
  width: 50%;
  margin: auto;
  border: 1px solid #cdcdcd;
  height: max-content;
`;

export { Button, Container, ButtonContainer, FileImage };
