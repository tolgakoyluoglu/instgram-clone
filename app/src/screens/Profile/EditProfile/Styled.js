import styled from 'styled-components';

const Card = styled.div`
  padding: 20px;
  width: 40%;
  margin: auto;
  border: 1px solid #cdcdcd;
  background-color: #fff;
  border-radius: 8px;
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
