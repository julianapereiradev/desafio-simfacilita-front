import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { API } from "../routes/routes";
import { ChangeEvent, FormEvent, useState } from "react";
//import Logo from "../components/Logo";
import { ThreeDots } from "react-loader-spinner";
import dayjs from 'dayjs';

interface FormStates {
  name: string;
  lastName: string;
  birthday: string;
  phone: string;
  email: string;
  password: string;
  profileUrl: string;
}

export default function SignUpPage() {
  const [formStates, setFormStates] = useState<FormStates>({
    name: "",
    lastName: "",
    birthday: "",
    phone: "",
    email: "",
    password: "",
    profileUrl: "",
  });

  const [disable, setDisable] = useState(false);

  const navigate = useNavigate();

  async function submitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const newUser = { ...formStates };
    newUser.birthday = dayjs(newUser.birthday).endOf('day').toISOString();
    setDisable(true);

    axios
      .post(API.postSignUp, newUser)
      .then(() => {
        navigate("/");
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
    <>
      <form onSubmit={(e) => submitForm(e)}>
        {/* <Logo />*/}
        <div className="font-brit">Cadastro</div>

        <input
          id="name"
          placeholder="Nome"
          type="text"
          value={formStates.name}
          onChange={(e) => handleChange(e)}
          autoComplete="name"
          required
          disabled={disable}
        />

        <input
          id="lastName"
          placeholder="Sobrenome"
          type="text"
          value={formStates.lastName}
          onChange={(e) => handleChange(e)}
          autoComplete="lastName"
          required
          disabled={disable}
        />

        <input
          id="birthday"
          placeholder="Data de aniversário"
          type="date"
          value={formStates.birthday}
          onChange={(e) => handleChange(e)}
          autoComplete="birthday"
          required
          disabled={disable}
        />

        <input
          id="phone"
          placeholder="Telefone"
          type="text"
          value={formStates.phone}
          onChange={(e) => handleChange(e)}
          autoComplete="phone"
          required
          disabled={disable}
        />

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

        <input
          id="profileUrl"
          placeholder="Foto URL"
          type="text"
          value={formStates.profileUrl}
          onChange={(e) => handleChange(e)}
          autoComplete="profileUrl"
          required
          disabled={disable}
        />

        <button type="submit" disabled={disable}>
          {disable ? (
            <ThreeDots color="#1F1712" height={20} width={50} />
          ) : (
            "Cadastrar"
          )}
        </button>
        <LinkToSignIn to="/">Já tem uma conta? Entre agora!</LinkToSignIn>
      </form>
    </>
  );
}

const LinkToSignIn = styled(Link)`
  font-size: 18px;
  color: #db8f0b;
  text-decoration: underline;
`;
