import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { API } from "../routes/routes";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Loading from "../components/Loading";
import UserList from "../components/Timeline/UserList";
import { PostType, UserType } from "../interfaces/interfaces";
import PostList from "../components/Timeline/PostList";
import { LoginContext } from "../context/Context";


export default function TimelinePage() {

  const loginContext = useContext(LoginContext);

  if (!loginContext) {
    // Handle the case where the context is undefined
    return null; // or display an error message, redirect, etc.
  }

  const { userId, setUserId, isLogged } = loginContext;

  const [usersData, setUsersData] = useState<UserType[]>([]);
  const [postsData, setPostsData] = useState<PostType[]>([]);

  const MySwal = withReactContent(Swal);


  useEffect(() => {
    isLogged();
  },[])


  function UsersDataError() {
    return <p>Não foi possível carregar os usuários!</p>;
  }

  function PostsDataError() {
    return <p>Não foi possível carregar todos os posts!</p>;
  }

  console.log('ver userId em timeline:', userId)

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