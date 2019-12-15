import styled from 'styled-components';

const Card = styled.div`
  padding: 20px;
  width: 50%;
  margin: auto;
  border: 1px solid #cdcdcd;
  background-color: #fff;
  border-radius: 8px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  margin: 10px;
  background-color: #3897f0;
  border: none;
  border-radius: 6px;
  border-width: 1px;
  padding: 12px 24px;
  color: white;
  font-weight: 700;
  margin-bottom: 1rem;
  font-size: 0.8rem;
  cursor: pointer;
  outline: none;
  border-color: rgb(182, 182, 191);
`;

const Label = styled.label`
  border: 1px solid #ccc;
  display: inline-block;
  padding: 6px 12px;
  width: 150px;
  text-align: center;
  cursor: pointer;
`;
const Input = styled.input`
  display: none;
`;

export { Input, Label, Button, ButtonContainer, Card };
