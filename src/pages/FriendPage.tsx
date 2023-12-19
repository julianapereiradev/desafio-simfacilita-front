import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../context/Context";
import { PostUserType } from "../interfaces/interfaces";
import axios from "axios";
import { API, headersAuth } from "../routes/routes";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Loading from "../components/Loading";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import UserPostsList from "../components/FriendPage/UserPostsList";
import dayjs from "dayjs";

export default function FriendPage() {
  const { id } = useParams();
  const loginContext = useContext(LoginContext);


  if (!loginContext) {
    return null;
  }

  const { userId, isLogged } = loginContext;

  const [userPostsData, setUserPostsData] = useState<PostUserType[]>([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [profileUrl, setProfileUrle] = useState("");
  const [userIdLogged, setUserIdLogged] = useState("");

  const MySwal = withReactContent(Swal);

  useEffect(() => {
    isLogged();

   let banana = localStorage.getItem("userId")
   console.log("banana", banana)
   if(banana) {
    setUserIdLogged(banana)
   }

  }, []);

  function UserPostsDataError() {
    return <p>Não foi possível carregar todos os posts desse usuário!</p>;
  }

  function UserInfoDataError() {
    return <p>Não foi possível carregar os dados do usuário!</p>;
  }

  console.log("userPostsData em FriendPage:", userPostsData);

  useEffect(() => {
    axios
      .get(API.getAllUserPosts + id, headersAuth())
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

    axios
      .get(API.getOtherUsersProfileById + id, headersAuth())
      .then((res) => {
        setName(res.data.name),
          setLastName(res.data.lastName),
          setBirthday(res.data.birthday),
          setProfileUrle(res.data.profileUrl);
      })
      .catch((error) => {
        MySwal.fire({
          title: "Oops... 😓",
          html: <UserInfoDataError />,
          timer: 5000,
          confirmButtonText: "OK",
        });
        console.log("UserInfoDataError", error);
      });

    checkIfFollowing();
  }, []);

  const checkIfFollowing = async () => {
    try {
      const response = await axios.get(API.getFollowers + id, headersAuth());
      const followers = response.data;
      const isAlreadyFollowing = followers.some(
        (item: { followerId: number }) => {
          console.log('ITEM AQUII',item.followerId);
          const localstorageUser = localStorage.getItem("userId")
          console.log("LOCALSTORAGE USER ID")
          item.followerId === Number(localstorageUser)
        }
      );

      setIsFollowing(isAlreadyFollowing);
    } catch (error) {
      console.error("Erro ao verificar seguidores", error);
    }
  };

  const handleFollowToggle = async () => {
    try {
        await axios.post(API.followOrUnfollow + id, null,headersAuth());
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error("Erro ao realizar ação de seguir/deseguir", error);
    }
  };

  const formattedDate = dayjs(birthday).format("DD-MM-YYYY");

  if (!userPostsData) {
    return <Loading />;
  }

  return (
    <>
      <ProfileInfoDiv>
        <ContainerInfo>
          <img src={profileUrl} />
          <div>
            <h1>{name}</h1>
            <h1>{lastName}</h1>
            <h2>{formattedDate}</h2>
           
              <button onClick={handleFollowToggle}>
                {isFollowing ? "SEGUINDO" : "SEGUIR"}
              </button>
          
          </div>
        </ContainerInfo>
      </ProfileInfoDiv>
      <div>
        {userPostsData.length === 0 ? (
          <DivNotPost>
            <h1>Não tem publicações ainda!</h1>
          </DivNotPost>
        ) : (
          <PostDiv>
            {userPostsData.map((item) => (
              <UserPostsList postData={item} />
            ))}
          </PostDiv>
        )}
      </div>
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

const ProfileInfoDiv = styled.div`
  @media (min-width: 1024px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const ContainerInfo = styled.div`
  margin: 6px 0px;
  padding: 10px;
  background-color: #7f3e98;
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  border-radius: 10px;

  @media (min-width: 1024px) {
    width: 100%;
    height: 100%;
    max-width: 900px;
  }

  img {
    width: 120px;
    height: 120px;
    border-radius: 100px;
    box-shadow: rgba(0, 0, 0, 0.7) 0px 1px 4px;
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 5px;

    h1 {
      color: #ffffff;
      font-size: 20px;
    }

    h2 {
      color: #ffffff;
      font-weight: 400;
      margin: 5px 0px;
      font-size: 14px;
    }

    button {
      background-color: #e5e5e5;
      border: none;
      color: #7f3e98;
      font-weight: 600;
      font-size: 16px;
      border-radius: 10px;
      height: 40px;

      &:hover {
        color: #a85dc5;
        background-color: #9acb4b;
      }
    }
  }
`;

const DivNotPost = styled.div`
  margin-top: 200px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 1024px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h1 {
    font-size: 25px;
  }
`;
