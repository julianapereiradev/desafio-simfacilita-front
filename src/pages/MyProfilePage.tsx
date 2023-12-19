import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { API, headersAuth } from "../routes/routes";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import dayjs from "dayjs";
import logo from "../images/logo.png";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Modal from "react-modal";
import ModalPage from "../components/MyProfilePage/ModalPage";

interface FormStates {
  name: string;
  lastName: string;
  birthday: string;
  phone: string;
  email: string;
  profileUrl: string;
}

export default function MyProfilePage() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formStates, setFormStates] = useState<FormStates>({
    name: "",
    lastName: "",
    birthday: "",
    phone: "",
    email: "",
    profileUrl: "",
  });

  const [disable, setDisable] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const navigate = useNavigate();

  const MySwal = withReactContent(Swal);

  function MyProfileDataError() {
    return <p>Não foi possível carregar toda as informações!</p>;
  }

  useEffect(() => {
    axios
      .get(API.getProfileId, headersAuth())
      .then((res) => {
        const userData = res.data;
        setFormStates({
          name: userData.name,
          lastName: userData.lastName,
          birthday: dayjs(userData.birthday).format("YYYY-MM-DD"),
          phone: userData.phone,
          email: userData.email,
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
      .put(API.putProfileId, newUser, headersAuth())
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

  function openModal() {
    setShowPasswordModal(true);
  }

  function handleDeleteConfirm() {
    axios
      .delete(API.deleteProfileId, headersAuth())
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
            <LoadingButtonContent>
              {disable ? (
                <ThreeDots color="#ffffff" height={20} width={50} />
              ) : (
                "Atualizar perfil"
              )}
            </LoadingButtonContent>
          </button>
        </RightBox>
      </form>

      <OtherActions>
        <button className="change-password" onClick={() => openModal()}>
          <LoadingButtonContent>
            {disable ? (
              <ThreeDots color="#ffffff" height={20} width={50} />
            ) : (
              "Mudar senha"
            )}
          </LoadingButtonContent>
        </button>

        <ModalPage
          showPasswordModal={showPasswordModal}
          setShowPasswordModal={setShowPasswordModal}
        />

        <button
          className="delete"
          disabled={disable}
          onClick={() => setShowDeleteModal(true)}
        >
          <LoadingButtonContent>
            {disable ? (
              <ThreeDots color="#ffffff" height={20} width={50} />
            ) : (
              "Deletar perfil"
            )}
          </LoadingButtonContent>
        </button>

        {/* Modal of exclude: */}
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
            <DivParagraph>
              Tem certeza que deseja deletar o perfil?
            </DivParagraph>
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
      </OtherActions>
    </RightContainer>
  );
}

const RightContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #ffffff;
  padding: 5px 20px 5px 20px;
  display: flex;
  flex-direction: column;
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
      margin-bottom: 0px;
    }
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

const LoadingButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const OtherActions = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: normal;
  padding: 0px 60px 0px 60px;

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

  .delete {
    background-color: #ec3f3f;

    &:hover {
      background-color: #ee6d6d;
    }

    @media (min-width: 1024px) {
    margin-top: 10px;
  }
  }

  .change-password {
    background-color: #524f4f;

    &:hover {
      background-color: #757070;
    }
  }

  @media (min-width: 1024px) {
    padding: 15px 370px 15px 370px;
  }
`;
