import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import ErrorPage from "./pages/ErrorPage";
import TimelinePage from "./pages/TimelinePage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";

export default function App() {
  return (
    <PagesContainer>
      <BrowserRouter>
        <Routes>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/" element={<SignInPage />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </PagesContainer>
  );
}

const PagesContainer = styled.main`
  background-color: #ffffff;
`;
