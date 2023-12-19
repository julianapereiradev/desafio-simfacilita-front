import styled from "styled-components";
import Modal from "react-modal";
import { FormEvent, useContext, useState } from "react";
import { API, headersAuth } from "../../routes/routes";
import axios from "axios";
import { LoginContext } from "../../context/Context";

export default function ModalPage({
  showPasswordModal,
  setShowPasswordModal,
}: any) {
  const loginContext = useContext(LoginContext);

  if (!loginContext) {
    return null;
  }

  const [actualPassword, setActualPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function submitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      return alert("As senhas novas não são as mesmas!");
    }

    const updatePassword = {
      actualPassword: actualPassword,
      newPassword: newPassword,
    };

    axios
      .put(`${API.updatePassword}/update-password`, updatePassword, headersAuth())
      .then((res) => {
        console.log("res:", res);
        setShowPasswordModal(false);
      })
      .catch((error) => {
        alert(error.response.data);
        console.log("error", error);
      });
  }

  return (
    <Modal
      isOpen={showPasswordModal}
      onRequestClose={() => {
        setShowPasswordModal(false);
      }}
      contentLabel="Confirmar mudança"
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
      <form onSubmit={(e) => submitForm(e)}>
        <input
          id="password"
          placeholder="Senha antiga"
          type="text"
          autoComplete="password"
          value={actualPassword}
          onChange={(e) => setActualPassword(e.target.value)}
          required
        />
        <input
          id="password"
          placeholder="Senha nova"
          type="text"
          autoComplete="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <input
          id="password"
          placeholder="Confirmar senha nova"
          type="text"
          autoComplete="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <DivModalText>
          <button onClick={() => ""}>Sim</button>
          <button
            onClick={() => {
              setShowPasswordModal(false);
            }}
          >
            Cancelar
          </button>
        </DivModalText>
      </form>
    </Modal>
  );
}

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
