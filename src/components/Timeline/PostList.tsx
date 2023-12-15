import styled from "styled-components";
import { PostType } from "../../interfaces/interfaces";
import { FaComment } from "react-icons/fa";
import dayjs from "dayjs";

export default function PostList({ postData }: { postData: PostType }) {
  console.log("postsdata", postData);

  const formattedDate = dayjs(postData.createdAt).format("DD-MM-YYYY");

  return (
    <ContainerPost>
      <AuthorPost>
        <img src={postData.User.profileUrl} />
        <div>
          <h1>{postData.User.name}</h1>
          <h1>{postData.User.lastName}</h1>
          <h2>{formattedDate}</h2>
        </div>
      </AuthorPost>

      <MessagePost>
        <div>{postData.description}</div>
      </MessagePost>

      <ButtonPost>
        <button>
          <FaCommentIcon />
        </button>
      </ButtonPost>
    </ContainerPost>
  );
}

const ContainerPost = styled.div`
  margin: 6px 0px;
  padding: 10px;
  border: 1px solid black;

  @media (min-width: 1024px) {
    width: 100%;
    height: 100%;
    max-width: 900px;
  }
`;

const AuthorPost = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;

  img {
    width: 60px;
    height: 60px;
    border-radius: 100px;
    border: 2px solid #9acb4b;
    box-shadow: rgba(0, 0, 0, 0.7) 0px 1px 4px;
  }

  div {
    display: flex;
    flex-direction: column;
  }

  h2 {
    margin-top: 5px;
    font-size: 10px;
  }
`;

const MessagePost = styled.div`
  margin: 20px 0px;

  div {
    width: 100%;
    height: 100%;
    min-height: 200px;
    border: 1px solid black;
  }
`;

const ButtonPost = styled.div`
  
  button {
    background-color: #ffffff;
    border: none;
  }
`;

const FaCommentIcon = styled(FaComment)`
    width: 25px;
    height: 25px;
    color: #7f3e98;
`;