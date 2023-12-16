import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../context/Context";
import {PostUserType } from "../interfaces/interfaces";
import axios from "axios";
import { API } from "../routes/routes";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Loading from "../components/Loading";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import UserPostsList from "../components/FriendPage/UserPostsList";

export default function FriendPage() {
  const { id } = useParams();
  const loginContext = useContext(LoginContext);

  if (!loginContext) {
    // Handle the case where the context is undefined
    return null; // or display an error message, redirect, etc.
  }

  const { userId, isLogged } = loginContext;

  const [userPostsData, setUserPostsData] = useState<PostUserType[]>([]);

  const MySwal = withReactContent(Swal);


  useEffect(() => {
    isLogged();
  },[])


  function UserPostsDataError() {
    return <p>Não foi possível carregar todos os posts desse usuário!</p>;
  }

  console.log('userPostsData em FriendPage:', userPostsData)

  useEffect(() => {
      axios.get(API.getAllUserPosts + id)
      .then((res) => {
        const reversedPosts = res.data.reverse();
        setUserPostsData(reversedPosts);
      })
      .catch((error) => {
        MySwal.fire({
          title: "Oops... 😓",
          html: <UserPostsDataError />,
          timer: 5000,
          confirmButtonText: "OK",
        });
        console.log('UserPostsDataError:', error)
      });
  }, []);

  if (!userPostsData) {
    return <Loading />
  }

  console.log('userId em FriendPage:', userId)

  return (
    <>
    {/* COLOCAR ALGO EM CIMA PARA O MEU USERID SEGUIR ELE/ELA */}


    <PostDiv>
      {userPostsData.map((item) => <UserPostsList postData={item} /> )}
    </PostDiv>

    </>
  );
}

const PostDiv = styled.div`

@media (min-width: 1024px) {
      display: flex;
      flex-direction : column;
      align-items: center
    }
`;