import styled from "styled-components";
import { PostType } from "../../interfaces/interfaces";
import { FaComment } from "react-icons/fa";
import dayjs from "dayjs";
import { useState, ChangeEvent, FormEvent, useContext, useEffect } from "react";
import CommentList from "./CommentList";
import axios from "axios";
import { API } from "../../routes/routes";
import { LoginContext } from "../../context/Context";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

interface FormState {
  comment: string;
}

export default function PostList({ postData }: { postData: PostType }) {
  const loginContext = useContext(LoginContext);

  if (!loginContext) {
    // Handle the case where the context is undefined
    return null; // or display an error message, redirect, etc.
  }

  const { userId, isLogged } = loginContext;

  const formattedDate = dayjs(postData.createdAt).format("DD-MM-YYYY");
  const [clickComment, setClickComment] = useState(false);
  const [formState, setFormState] = useState({
    comment: "",
  });

  const MySwal = withReactContent(Swal);

  useEffect(() => {
    isLogged();
  }, []);

  function CommentLimitError() {
    return <p>O comentário não pode ter mais de 150 caracteres.!</p>;
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const newFormStates = { ...formState };
    newFormStates[e.target.id as keyof FormState] = e.target.value;
    setFormState(newFormStates);
  }

  function submitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (formState.comment.length > 150) {
      MySwal.fire({
        title: "Oops... 😓",
        html: <CommentLimitError />,
        timer: 5000,
        confirmButtonText: "OK",
      });
      return; // Impede a execução do restante da função se o comentário for muito longo.
    }

    const newUser = {
      ...formState,
      userId: Number(userId),
      postId: postData.id,
    };

    axios
      .post(API.postComment, newUser)
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        alert(error.response.data);
      });
  }

  function showComments() {
    setClickComment((prevClickComment) => !prevClickComment);
  }

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
        <button onClick={showComments}>
          <FaCommentIcon />
        </button>
        {clickComment ? (
          <div>
            {postData.Comment.map((item) => (
              <CommentList commentsData={item} />
            ))}
            <FormNewComment onSubmit={(e) => submitForm(e)}>
              <input
                id="comment"
                autoComplete="comment"
                value={formState.comment}
                required
                type="text"
                placeholder="Escreva um comentário aqui..."
                onChange={(e) => handleChange(e)}
              />
            </FormNewComment>
          </div>
        ) : (
          ""
        )}
      </ButtonPost>
    </ContainerPost>
  );
}

const ContainerPost = styled.div`
  margin: 6px 0px;
  padding: 10px;
  border: 1px solid black;
  background-color: #e5e5e5;
  border-radius: 10px;
  border: none;

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

  h1 {
    color: #000000;
    font-weight: 500;
  }

  h2 {
    margin-top: 5px;
    font-size: 10px;
    color: #000000;
  }
`;

const MessagePost = styled.div`
  margin: 20px 0px;

  div {
    width: 100%;
    height: 100%;
    min-height: 100px;
    border: none;
    border-radius: 10px;
    background-color: #ffffff;
    padding: 10px;
  }
`;

const ButtonPost = styled.div`
  button {
    background-color: #e5e5e5;
    border: none;
  }
`;

const FaCommentIcon = styled(FaComment)`
  width: 25px;
  height: 25px;
  color: #9acb4b;

  &:hover {
    color: #7f3e98;
  }
`;

const FormNewComment = styled.form`
  input {
    width: 90%;
    height: 40px;
    border: none;
    border-radius: 10px;
    padding-left: 10px;
    outline: none;
  }
`;
