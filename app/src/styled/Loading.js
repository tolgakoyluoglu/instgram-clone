import styled from 'styled-components';

const Loader = styled.div`
  -webkit-animation: sk-scaleout 1s infinite ease-in-out;
  animation: sk-scaleout 1s infinite ease-in-out;
  background-color: black;
  border-radius: 100%;
  height: 6em;
  width: 6em;

  @keyframes sk-scaleout {
    0% {
      -webkit-transform: scale(0);
      transform: scale(0);
    }
    100% {
      -webkit-transform: scale(1);
      opacity: 0;
      transform: scale(1);
    }
  }
`;

const LoadingContainer = styled.div`
  align-items: center;
  background-color: white;
  display: flex;
  height: 100vh;
  justify-content: center;
  width: 100vw;
`;

export { Loader, LoadingContainer };
