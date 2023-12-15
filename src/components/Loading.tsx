import styled from "styled-components";
import loading from "../images/loading.gif";

export default function Loading() {
  return (
    <LoadingContainer>
      <img src={loading} />
    </LoadingContainer>
  );
}

const LoadingContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;

  img {
    width: 20vw;
    height: 20vw;
  }
`;
