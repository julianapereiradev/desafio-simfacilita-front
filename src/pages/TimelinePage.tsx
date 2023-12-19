import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { API, headersAuth } from "../routes/routes";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Loading from "../components/Loading";
import UserList from "../components/Timeline/UserList";
import { PostType, UserType } from "../interfaces/interfaces";
import PostList from "../components/Timeline/PostList";
import { LoginContext } from "../context/Context";
import MyPost from "../components/Timeline/MyPost";

export default function TimelinePage() {
  const loginContext = useContext(LoginContext);

  if (!loginContext) {
    return null;
  }

  const { isLogged } = loginContext;

  const [usersData, setUsersData] = useState<UserType[]>([]);
  const [postsData, setPostsData] = useState<PostType[]>([]);

  const MySwal = withReactContent(Swal);

  useEffect(() => {
    isLogged();
  }, []);

  function UsersDataError() {
    return <p>Não foi possível carregar os usuários!</p>;
  }

  function PostsDataError() {
    return <p>Não foi possível carregar todos os posts!</p>;
  }

  useEffect(() => {
    axios
      .get(API.getUsers, headersAuth())
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
        console.log("UsersDataError:", error);
      });

    axios
      .get(API.getAllPosts, headersAuth())
      .then((res) => {
        const reversedPosts = res.data.reverse();
        setPostsData(reversedPosts);
      })
      .catch((error) => {
        MySwal.fire({
          title: "Oops... 😓",
          html: <PostsDataError />,
          timer: 5000,
          confirmButtonText: "OK",
        });
        console.log("PostsDataError:", error);
      });
  }, []);

  if (!usersData || !postsData) {
    return <Loading />;
  }

  return (
    <>
      <RowUsers>
        {usersData.map((item) => (
          <UserList userData={item} />
        ))}
      </RowUsers>

      <PostDiv>
        <MyPost />
      </PostDiv>

      <PostDiv>
        {postsData.map((item) => (
          <PostList postData={item} />
        ))}
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
    flex-direction: column;
    align-items: center;
  }
`;
