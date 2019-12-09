import styled from 'styled-components';
import Image from '../../res/images/upload.png';

const Card = styled.div`
  padding-top: 150px;
  min-height: calc(100vh - 70px);
  box-sizing: border-box;
  max-width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Input = styled.input`
  padding: 1rem;
  border: 1px solid #999;
  margin-bottom: 1rem;
  font-size: 0.8rem;
`;

const Button = styled.button`
  background-color: #3897f0;
  border-color: rgb(182, 182, 191);
  border: none;
  border-radius: 6px;
  border-width: 1px;
  padding: 1rem;
  margin: 5px;
  color: white;
  font-weight: 700;
  font-size: 0.8rem;
  cursor: pointer;
`;

const UploadButton = styled.button`
  position: fixed;
  background: none;
  display: block;
  background-position: -64px -34px;
  background-image: url(${Image});
  background-size: 280px 250px;
  background-repeat: no-repeat;
  height: 53px;
  width: 56px;
  padding-left: 10px;
  text-indent: -1000%;
  top: 80%;
  left: 85%;
  text-decoration: none;
  border: none;
  outline: none;
  cursor: pointer;
  @media only screen and (min-width: 500px) {
    margin-left: 12px;
  }
`;

const FileImage = styled.img`
  width: 50%;
  margin: auto;
  border: 1px solid #cdcdcd;
  height: max-content;
`;

export { Form, Input, Button, Card, UploadButton, FileImage };
