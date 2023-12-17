import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import ErrorPage from "./pages/ErrorPage";
import TimelinePage from "./pages/TimelinePage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import Dashboard from "./pages/Dashboard";
import MyProfilePage from "./pages/MyProfilePage";
import FriendPage from "./pages/FriendPage";
import { LoginProvider } from "./context/Context";

export default function App() {
  return (
    <PagesContainer>
      <BrowserRouter>
        <LoginProvider>
          <Routes>
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/" element={<SignInPage />} />
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="timeline" element={<TimelinePage />} />
              <Route path="myprofile/:id" element={<MyProfilePage />} />
              <Route path="friend/:id" element={<FriendPage />} />
              <Route path="*" element={<ErrorPage />} />
            </Route>
          </Routes>
        </LoginProvider>
      </BrowserRouter>
    </PagesContainer>
  );
}

const PagesContainer = styled.main`
  background-color: #ffffff;
`;
