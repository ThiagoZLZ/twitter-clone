import styled, { keyframes } from "styled-components";

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;

  border: 5px solid #ddd;
  border-top: 5px solid #1da1f2;

  border-radius: 50%;

  animation: ${spin} 1s linear infinite;
`;

const Text = styled.p`
  margin-top: 20px;
  text-align: center;
  color: red;
`;

export default function Loader() {
  return (
    <Wrapper>
      <Spinner />

      <Text>
        Conectando ao servidor...
        <br />
        ☁️ O Render pode levar alguns segundos para iniciar.
      </Text>
    </Wrapper>
  );
}