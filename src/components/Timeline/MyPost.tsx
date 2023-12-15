import styled from "styled-components";
import { useState, ChangeEvent, FormEvent, useContext, useEffect } from "react";
import axios from "axios";
import { API } from "../../routes/routes";
import { LoginContext } from "../../context/Context";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { ThreeDots } from "react-loader-spinner";

interface FormState {
  description: string;
}

export default function MyPost() {
  const loginContext = useContext(LoginContext);

  if (!loginContext) {
    // Handle the case where the context is undefined
    return null; // or display an error message, redirect, etc.
  }

  const { userId, isLogged } = loginContext;

  const [disable, setDisable] = useState(false);
  const [formState, setFormState] = useState({
    description: "",
  });

  const MySwal = withReactContent(Swal);

  useEffect(() => {
    isLogged();
  }, []);

  function PostLimitError() {
    return <p>O comentário não pode ter mais de 500 caracteres.!</p>;
  }

  function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    const newFormStates = { ...formState };
    newFormStates[e.target.id as keyof FormState] = e.target.value;
    setFormState(newFormStates);
  }

  function submitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setDisable(true);

    if (formState.description.length > 500) {
      MySwal.fire({
        title: "Oops... 😓",
        html: <PostLimitError />,
        timer: 5000,
        confirmButtonText: "OK",
      });
      setDisable(false);
      return; // Impede a execução do restante da função se o comentário for muito longo.
    }

    const newUser = {
      ...formState,
      userId: Number(userId),
    };

    axios
      .post(API.createPost, newUser)
      .then(() => {
        window.location.reload();
        setDisable(false);
      })
      .catch((error) => {
        alert(error.response.data);
        setDisable(false);
      });
  }

  return (
    <ContainerPost>
      <form onSubmit={(e) => submitForm(e)}>
        <h1>Olá! O que você está pensando agora?</h1>
        <MessagePost>
          <textarea
            id="description"
            autoComplete="description"
            value={formState.description}
            required
            onChange={(e) => handleChange(e)}
            placeholder="Escreva aqui e compartilhe com todos!"
            disabled={disable}
          ></textarea>
        </MessagePost>
        <ButtonPost>
          <button type="submit" disabled={disable}>
            {disable ? (
              <ThreeDots color="#1F1712" height={20} width={50} />
            ) : (
              "POSTAR"
            )}
          </button>
        </ButtonPost>
      </form>
    </ContainerPost>
  );
}

const ContainerPost = styled.div`
  margin: 6px 0px 70px 0px;
  padding: 10px;
  border: 1px solid black;

  @media (min-width: 1024px) {
    width: 100%;
    height: 100%;
    max-width: 900px;
  }

  h1 {
    margin-top: 10px;
  }
`;

const MessagePost = styled.div`
  margin: 20px 0px;

  textarea {
    width: 100%;
    height: 100%;
    min-height: 100px;
    border: 1px solid black;
    padding: 10px;
  }
`;

const ButtonPost = styled.div`
  display: flex;
  justify-content: flex-end;  // Alinha os filhos ao final do container (canto direito)

  button {
    background-color: #7f3e98;
    border: none;
    color: #FFFFFF;
    font-size: 16px;
  }
`;
