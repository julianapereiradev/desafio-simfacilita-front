import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../context/Context";
import { PostUserType } from "../interfaces/interfaces";
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
  const [isFollowing, setIsFollowing] = useState(false);

  const MySwal = withReactContent(Swal);

  useEffect(() => {
    isLogged();
  }, []);

  function UserPostsDataError() {
    return <p>Não foi possível carregar todos os posts desse usuário!</p>;
  }

  console.log("userPostsData em FriendPage:", userPostsData);

  useEffect(() => {
    axios
      .get(API.getAllUserPosts + id)
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
        console.log("UserPostsDataError:", error);
      });

    checkIfFollowing();
  }, []);

  const checkIfFollowing = async () => {
    try {
      const response = await axios.get(API.getFollowers + id);
      const followers = response.data;

      const isAlreadyFollowing = followers.some(
        (item: { followerId: number }) => item.followerId === Number(userId)
      );

      setIsFollowing(isAlreadyFollowing);
    } catch (error) {
      console.error("Erro ao verificar seguidores", error);
    }
  };

  const handleFollowToggle = async () => {
    try {
      if (isFollowing) {
        const newUser = {
          followerId: Number(userId),
        };
        await axios.post(API.followOrUnfollow + id, newUser);
      } else {
        const newUser = {
          followerId: Number(userId),
        };
        await axios.post(API.followOrUnfollow + id, newUser);
      }
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error("Erro ao realizar ação de seguir/deseguir", error);
    }
  };

  if (!userPostsData) {
    return <Loading />;
  }

  console.log("userId em FriendPage:", userId);
  console.log("id", id);
  return (
    <>
      {id === userId ? (
        ""
      ) : (
        <button onClick={handleFollowToggle}>
          {isFollowing ? "SEGUINDO" : "SEGUIR"}
        </button>
      )}

      <PostDiv>
        {userPostsData.map((item) => (
          <UserPostsList postData={item} />
        ))}
      </PostDiv>
    </>
  );
}

const PostDiv = styled.div`
  @media (min-width: 1024px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
