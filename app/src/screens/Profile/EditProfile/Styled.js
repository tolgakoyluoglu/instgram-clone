import styled from 'styled-components';

const Card = styled.div`
  padding: 20px;
  width: 40%;
  margin: auto;
  border: 1px solid #cdcdcd;
  background-color: #fff;
  border-radius: 8px;
`;

const ButtonContainer = styled.div`
  display: flex;
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

export { Input, Label, ButtonContainer, Card };
