import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../routes/routes";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Loading from "../components/Loading";
import UserList from "../components/Timeline/UserList";
import { UserType } from "../interfaces/interfaces";


export default function TimelinePage() {
  const [usersData, setUsersData] = useState<UserType[]>([]);

  const MySwal = withReactContent(Swal);

  function UsersDataError() {
    return <p>Não foi possível carregar os usuários!</p>;
  }

  useEffect(() => {
    axios.get(API.getUsers)
      .then((res) => {
        setUsersData(res.data);
      })
      .catch((error) => {
        MySwal.fire({
          title: "Oops... 😓",
          html: <UsersDataError />,
          timer: 5000,
          confirmButtonText: "OK",
        });
        console.log('UsersDataError:', error)
      });
  }, []);

  if (!usersData) {
    return <Loading />
  }

  console.log("usersdata", usersData)

  return (
    <>
     <RowUsers>
    {usersData.map((item) => <UserList userData={item} />)}
    </RowUsers>
    </>
  );
}

const RowUsers = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  white-space: nowrap;
`;