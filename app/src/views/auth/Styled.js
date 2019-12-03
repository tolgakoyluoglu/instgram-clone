import styled from 'styled-components';

const Card = styled.div`
  padding-top: 150px;
  min-height: calc(100vh - 70px);
  box-sizing: border-box;
  max-width: 410px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;
  @media only screen and (min-width: 500px) {
    width: 100%;
  }
`;

const Input = styled.input`
  margin-bottom: 1rem;
  font-size: 13px;
  display: block;
  height: 40px;
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

const Button = styled.button`
  background-color: #3897f0;
  border: none;
  border-radius: 6px;
  border-width: 1px;
  padding: 1rem;
  color: white;
  font-weight: 700;
  width: 100%;
  margin-bottom: 1rem;
  font-size: 0.8rem;
  cursor: pointer;
  outline: none;
  border-color: rgb(182, 182, 191);
`;

export { Form, Input, Button, Card };
