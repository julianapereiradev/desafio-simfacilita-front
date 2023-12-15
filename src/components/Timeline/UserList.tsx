import styled from "styled-components";
import { UserType } from "../../interfaces/interfaces";

export default function UserList({ userData }: { userData: UserType }) {
  return (
    <ContainerUser>
      <img src={userData.profileUrl} alt="user_profile" />
      <UsersName>{userData.name}</UsersName>
      <UsersName>{userData.lastName}</UsersName>
    </ContainerUser>
  );
}

const ContainerUser = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 9px;
  margin: 5px 20px 5px 0px;
  background-color: #ffffff;
  width: 150px;
  padding: 10px;

  img {
    width: 90px;
    height: 90px;
    border-radius: 100px;
    margin-bottom: 10px;
    border: 2px solid #9acb4b;
    box-shadow: rgba(0, 0, 0, 0.7) 0px 1px 4px;
  }
`;

const UsersName = styled.h2`
  color: #7f3e98;
  font-weight: 500;
`;
