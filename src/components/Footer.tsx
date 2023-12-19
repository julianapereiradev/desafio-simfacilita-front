import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { useContext } from "react";
import { LoginContext } from "../context/Context";
import Swal from "sweetalert2";

export default function Footer() {
  const loginContext = useContext(LoginContext);

  if (!loginContext) {
    return null;
  }


  const navigate = useNavigate();

  function logout() {
    Swal.fire({
      title: `<span style="font-family: 'Poppins', sans-serif; font-size: 16px; color:black">Deseja sair?</span>`,
      showCancelButton: true,
      confirmButtonColor: "#7f3e98",
      cancelButtonColor: "#7f3e98",
      confirmButtonText: "Sim",
      cancelButtonText: "Cancelar",
      width: 300,
      heightAuto: false,
      imageWidth: 200,
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("userId");
        localStorage.removeItem("token")
        navigate("/");
      }
    });
  }

  return (
    <FooterContainer>
      <Links to="timeline">
        <FaHomeIcon />
      </Links>
      <Links to={`myprofile`}>
        <FaUserIcon />
      </Links>
      <div onClick={logout}>
        <IoLogOutIcon />
      </div>
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
  font-size: 18px;
  color: #7f3e98;
  width: 30px;
  height: 30px;
  &:hover {
    color: #a85dc5;
  }
`;
