import styled from 'styled-components';

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
const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;
  @media only screen and (min-width: 500px) {
    width: 100%;
  }
`;

export { Button, Form };
