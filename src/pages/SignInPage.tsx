import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { API } from "../routes/routes";
import { ChangeEvent, FormEvent, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import logo from "../images/logo.png";

interface FormStates {
  email: string;
  password: string;
}

export default function SignInPage() {
  const [formStates, setFormStates] = useState<FormStates>({
    email: "",
    password: "",
  });

  const [disable, setDisable] = useState(false);

  const navigate = useNavigate();

  async function submitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const newUser = { ...formStates };
    setDisable(true);

    axios
      .post(API.postLogin, newUser)
      .then(() => {
        navigate("/timeline");
        setDisable(false);
      })
      .catch((error) => {
        alert(error.response.data);
        setDisable(false);
      });
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const newFormStates = { ...formStates };
    newFormStates[e.target.id as keyof FormStates] = e.target.value;
    setFormStates(newFormStates);
  }

  return (
    <RightContainer>
      <form onSubmit={(e) => submitForm(e)}>
        <RightBox>
          <img src={logo} />
          <h1>Login</h1>

          <input
            id="email"
            placeholder="E-mail"
            type="email"
            autoComplete="email"
            value={formStates.email}
            onChange={(e) => handleChange(e)}
            required
            disabled={disable}
          />

          <input
            id="password"
            placeholder="Senha"
            type="password"
            autoComplete="new-password"
            value={formStates.password}
            onChange={(e) => handleChange(e)}
            required
            disabled={disable}
          />


          <button type="submit" disabled={disable}>
            {disable ? (
              <ThreeDots color="#1F1712" height={20} width={50} />
            ) : (
              "Login"
            )}
          </button>
          <LinkToSignUp to="/signup">Não tem conta? Se inscreva aqui!</LinkToSignUp>
        </RightBox>
      </form>
    </RightContainer>
  );
}

const RightContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #ffffff;
  padding: 5px 20px 5px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RightBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: normal;
 

  @media (min-width: 1024px) {
    padding: 50px 370px 50px 370px;
  }

  img {
    align-self: center;
    width: 100%;
    max-width: 30vw;

    @media (min-width: 1024px) {
      max-width: 15vw;
    }
  }

  h1 {
    align-self: center;
    font-size: 5vw;
    color: #7f3e98;
    margin: 20px 0px 20px 0px;

    @media (min-width: 1024px) {
      font-size: 2.5vw;
    }
  }

  input {
    margin-bottom: 20px;
    height: 100%;
    min-height: 42px;
    width: 100%;
    min-width: 90%;
    font-size: 3vw;
    border: 1px solid #7f3e98;
    border-radius: 15px;
    padding-left: 6px;
    color: rgb(118, 118, 118);
    outline: 0;

    @media (min-width: 1024px) {
      min-width: 100%;
      font-size: 1.2vw;
    }
  }

  button {
    align-self: center;
    width: 100%;
    min-width: 40px;
    max-width: 45vw;
    min-height: 40px;
    font-size: 3vw;
    border: none;
    background-color: #7f3e98;
    color: #ffffff;
    border-radius: 15px;

    &:hover {
      background-color: #a85dc5;
      color: #ffffff;
    }

    @media (min-width: 1024px) {
      width: 100%;
      min-width: 20px;
      max-width: 25vw;
      height: 100%;
      min-height: 40px;
      max-height: 55vw;
      font-size: 1.2vw;
    }
  }
`;

const LinkToSignUp = styled(Link)`
  font-size: 18px;
  color: #7f3e98;
  text-decoration: underline;
  align-self: center;
  margin: 20px 0px;

  &:hover {
    color: #a85dc5;
  }
`;
