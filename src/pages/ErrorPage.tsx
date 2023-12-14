import styled from "styled-components";
import { VscError } from "react-icons/vsc";

export default function ErrorPage() {
  return (
    <ErrorContainer>
      <VscError className="error-icon" />
      <h2>Error 404:</h2>
      <h1>Sinto muito!</h1>
      <h3>Essa página não existe 😓</h3>
    </ErrorContainer>
  );
}

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: 100vh;

  h2 {
    font-size: 1.5vw;
    font-weight: 600;
    margin-bottom: 20px;
    color: red;

    @media (min-width: 600px) and (max-width: 1023px) {
      font-size: 3vw;
    }

    @media (max-width: 599px) {
      font-size: 4.5vw;
    }
  }

  h1 {
    font-size: 2.5vw;

    @media (min-width: 600px) and (max-width: 1023px) {
      font-size: 5vw;
    }

    @media (max-width: 599px) {
      font-size: 7vw;
    }
  }

  h3 {
    font-size: 2.5vw;

    @media (min-width: 600px) and (max-width: 1023px) {
      font-size: 5vw;
    }

    @media (max-width: 599px) {
      font-size: 7vw;
    }
  }

  .error-icon {
    color: red;
    width: 4.5vw;
    height: 4.5vw;
    width: 100%;

    @media (min-width: 600px) and (max-width: 1023px) {
      width: 6.5vw;
      height: 6.5vw;
    }

    @media (max-width: 599px) {
      width: 10vw;
      height: 10vw;
    }
  }
`;
