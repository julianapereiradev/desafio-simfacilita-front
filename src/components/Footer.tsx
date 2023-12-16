import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { useContext } from "react";
import { LoginContext } from "../context/Context";


export default function Footer() {
  const loginContext = useContext(LoginContext);

  if (!loginContext) {
    // Handle the case where the context is undefined
    return null; // or display an error message, redirect, etc.
  }

  const { userId} = loginContext;

  return (
    <FooterContainer>
        <Links to="timeline"><FaHomeIcon/></Links>
        <Links to={`myprofile/${userId}`}><FaUserIcon /></Links>
        <Links to="/"><IoLogOutIcon /></Links>
    </FooterContainer>
  );
}

const FooterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #e5e5e5;
  height: 80px;
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
`;

const Links = styled(Link)`
  font-size: 18px;
  color: #7f3e98;

  &:hover {
    color: #a85dc5;
  }
`;

const FaHomeIcon = styled(FaHome)`
    width: 30px;
    height: 30px;
`;

const FaUserIcon = styled(FaUser)`
    width: 28px;
    height: 28px;
`;

const IoLogOutIcon = styled(IoLogOut)`
    width: 30px;
    height: 30px;
`;