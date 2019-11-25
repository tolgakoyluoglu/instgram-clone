import styled from 'styled-components';

const Card = styled.div`
  padding-top: 100px;
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
  padding: 1rem;
  border: 1px solid #999;
  margin-bottom: 1rem;
  font-size: 0.8rem;
`;

const Button = styled.button`
  background-color: #3897f0;
  border: none;
  border-radius: 3px;
  padding: 1rem;
  color: white;
  font-weight: 700;
  width: 100%;
  margin-bottom: 1rem;
  font-size: 0.8rem;
  cursor: pointer;
`;

export { Form, Input, Button, Card };
