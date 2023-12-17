import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { API } from "../routes/routes";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import dayjs from "dayjs";
import logo from "../images/logo.png";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
//import Modals from "../components/MyProfilePage/Modal";
import Modal from "react-modal";

interface FormStates {
  name: string;
  lastName: string;
  birthday: string;
  phone: string;
  email: string;
  password: string;
  profileUrl: string;
}

export default function MyProfilePage() {
  const { id } = useParams();

  const [showPassword, setShowPassword] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
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

  const MySwal = withReactContent(Swal);

  function MyProfileDataError() {
    return <p>Não foi possível carregar toda as informações!</p>;
  }

  useEffect(() => {
    axios
      .get(API.getProfileId + id)
      .then((res) => {
        const userData = res.data;
        setFormStates({
          name: userData.name,
          lastName: userData.lastName,
          birthday: dayjs(userData.birthday).format("YYYY-MM-DD"),
          phone: userData.phone,
          email: userData.email,
          password: userData.password,
          profileUrl: userData.profileUrl,
        });
      })
      .catch((error) => {
        MySwal.fire({
          title: "Oops... 😓",
          html: <MyProfileDataError />,
          timer: 5000,
          confirmButtonText: "OK",
        });
        console.log("MyProfileDataError:", error);
      });
  }, []);

  async function submitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const newUser = { ...formStates };
    newUser.birthday = dayjs(newUser.birthday).endOf("day").toISOString();
    setDisable(true);

    if (showDeleteModal) {
      setShowDeleteModal(true);
      return;
    }

    axios
      .put(API.putProfileId + id, newUser) //mudar aqui
      .then(() => {
        navigate("/dashboard/timeline");
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

  function handleDeleteConfirm() {
    // Realize a lógica de exclusão aqui
    axios
      .delete(API.deleteProfileId + id)
      .then(() => {
        navigate("/");
        setDisable(false);
      })
      .catch((error) => {
        alert(error.response.data);
        setDisable(false);
      });
  }

  return (
    <RightContainer>
      <form onSubmit={(e) => submitForm(e)}>
        <RightBox>
          <img src={logo} />
          <h1>Meu perfil:</h1>
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
            placeholder="Telefone Celular"
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

          <DivPassword>
            <input
              id="password"
              placeholder="Senha"
              type={showPassword ? "text" : "password"}
              autoComplete="password"
              value={formStates.password}
              onChange={(e) => handleChange(e)}
              required
              disabled={disable}
            />
            {showPassword ? (
              <AiOutlineEye
                onClick={() => setShowPassword(!showPassword)}
                className="type-eye"
              />
            ) : (
              <AiOutlineEyeInvisible
                onClick={() => setShowPassword(!showPassword)}
                className="type-eye"
              />
            )}
          </DivPassword>

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
              "Atualizar perfil"
            )}
          </button>

          <button
            className="delete"
            disabled={disable}
            onClick={() => setShowDeleteModal(true)}
          >
            {disable ? (
              <ThreeDots color="#1F1712" height={20} width={50} />
            ) : (
              "Deletar perfil"
            )}
          </button>
        </RightBox>
      </form>

      {/* Modal de confirmação de exclusão */}
      {showDeleteModal && (
        <Modal
          isOpen={showDeleteModal}
          onRequestClose={() => {
            setShowDeleteModal(false);
            setDisable(false);
          }}
          contentLabel="Confirmar exclusão"
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
            content: {
              width: "50%",
              height: "50%",
              margin: "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "10px",
            },
          }}
        >
          <DivParagraph>Tem certeza que deseja deletar o perfil?</DivParagraph>
          <DivModalText>
            <button onClick={handleDeleteConfirm}>Sim</button>
            <button
              onClick={() => {
                setShowDeleteModal(false);
                setDisable(false);
              }}
            >
              Cancelar
            </button>
          </DivModalText>
        </Modal>
      )}
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
  padding: 0px 60px 0px 60px;

  .delete {
    background-color: #ec3f3f;
  }

  @media (min-width: 1024px) {
    padding: 15px 370px 15px 370px;
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
    margin-bottom: 10px;

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

const DivPassword = styled.div`
  position: relative;

  .type-eye {
    position: absolute;
    top: 37%;
    right: 10px;
    transform: translateY(-50%);
    color: rgb(118, 118, 118);
    font-size: 25px;
    cursor: pointer;
  }
`;

const DivParagraph = styled.div`
  font-family: "Poppins", sans-serif;
`;

const DivModalText = styled.div`
  margin-top: 20px;

  button {
    margin-left: 10px;
    background-color: #7f3e98;
    border: none;
    color: #ffffff;
    border-radius: 10px;
    height: 30px;
    width: 80px;
    font-weight: 500;

    &:hover {
      color: #a85dc5;
      background-color: #9acb4b;
    }
  }
`;
