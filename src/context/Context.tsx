import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginContextProps {
  isLogged: () => void;
  token: string, 
  setToken: (token: string) => void;
  userId: string,
  setUserId: (id: string ) => void;
}

export const LoginContext = createContext<LoginContextProps | undefined>(
  undefined
);

export function LoginProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");

  const isLogged = () => {
    let token = localStorage.getItem("token");
    let userId = localStorage.getItem("userId")

    if(userId) {
      setUserId(userId)
    }
    
    if (token) {
      setToken(token);
    } else {
      navigate("/");
    }
  };

  return (
    <LoginContext.Provider value={{ isLogged, token, setToken, userId, setUserId}}>
      {children}
    </LoginContext.Provider>
  );
}
