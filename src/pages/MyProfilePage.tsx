import { useContext, useEffect } from "react";
import { LoginContext } from "../context/Context";

export default function MyProfilePage() {
  const loginContext = useContext(LoginContext);

  if (!loginContext) {
    // Handle the case where the context is undefined
    return null; // or display an error message, redirect, etc.
  }

  const { userId, setUserId, isLogged } = loginContext;

  useEffect(() => {
    isLogged();
  },[])


  console.log('ver userId em profilepage:', userId)

    return (
      <>
        <h2>conteudo MyProfile aqui</h2>
        <h2>conteudo MyProfile aqui</h2>
      </>
    );
  }
  