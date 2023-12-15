import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../routes/routes";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Loading from "../components/Loading";
import UserList from "../components/Timeline/UserList";
import { PostType, UserType } from "../interfaces/interfaces";
import PostList from "../components/Timeline/PostList";


export default function TimelinePage() {
  const [usersData, setUsersData] = useState<UserType[]>([]);
  const [postsData, setPostsData] = useState<PostType[]>([]);

  const MySwal = withReactContent(Swal);

  function UsersDataError() {
    return <p>Não foi possível carregar os usuários!</p>;
  }

  function PostsDataError() {
    return <p>Não foi possível carregar todos os posts!</p>;
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

      axios.get(API.getAllPosts)
      .then((res) => {
        setPostsData(res.data);
      })
      .catch((error) => {
        MySwal.fire({
          title: "Oops... 😓",
          html: <PostsDataError />,
          timer: 5000,
          confirmButtonText: "OK",
        });
        console.log('PostsDataError:', error)
      });
  }, []);

  if (!usersData || !postsData) {
    return <Loading />
  }

  //console.log("postsdata", postsData)

  return (
    <>
    {/* TODOS OS USERS */}
    <RowUsers>
    {usersData.map((item) => <UserList userData={item} />)}
    </RowUsers>

    {/* ADICIONAR COMPONENTE DE CRIAR POST */}


    {/* TODOS OS POSTS */}
    <PostDiv>
      {postsData.map((item) => <PostList postData={item} /> )}
    </PostDiv>

    </>
  );
}

const RowUsers = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  white-space: nowrap;
  margin-bottom: 50px;
`;

const PostDiv = styled.div`

@media (min-width: 1024px) {
      display: flex;
      flex-direction : column;
      align-items: center
    }
`;