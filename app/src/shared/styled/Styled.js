import styled from 'styled-components';

const Button = styled.button`
  display: inline-flex;
  background-color: #3897f0;
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
const FormModal = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const FormInput = styled.input`
  padding: 1rem;
  border: 1px solid #999;
  margin-bottom: 1rem;
  font-size: 0.8rem;
`;
const FormLabel = styled.label`
  border: 1px solid #ccc;
  display: inline-block;
  padding: 6px 12px;
  text-align: center;
  cursor: pointer;
`;
const FormImageInput = styled.input`
  display: none;
`;
const FormImage = styled.img`
  height: 350px;
  width: 100%;
  object-fit: contain;
`;
export {
  Button,
  Form,
  FormImage,
  FormImageInput,
  FormInput,
  FormLabel,
  FormModal
};
