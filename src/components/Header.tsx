import styled from "styled-components";
import { Link} from "react-router-dom";
import logo from "../images/logo.png";

export default function Header() {


  return (
      <HeaderContainer>
        <HeaderMargin>
          <HeaderTitle to="/dashboard/timeline">
          <img src={logo} />
          </HeaderTitle>
        </HeaderMargin>
      </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
display: flex;
  justify-content: left;
  align-items: center;
  height: 70px;
  background-color: #e5e5e5;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  cursor: pointer;
  box-shadow: rgba(138, 136, 136, 0.16) 0px 3px 6px, rgba(71, 70, 70, 0.23) 0px 3px 6px;
`;

const HeaderMargin = styled.div`
  margin: 10px 20px;
`;


const HeaderTitle = styled(Link)`
 img {
  height: 60px;
 }
`;