// context/Context.tsx
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginContextProps {
  userId: string;
  setUserId: (id: string) => void;
  isLogged: () => void;
}

export const LoginContext = createContext<LoginContextProps | undefined>(undefined);

export function LoginProvider({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate();
    const [userId, setUserId] = useState("");

    const isLogged = () => {
        let userId = localStorage.getItem("userId");

        if (userId) {
            setUserId(userId);
        } else {
            navigate("/");
        }
    };

    return (
        <LoginContext.Provider value={{ isLogged, userId, setUserId }}>
            {children}
        </LoginContext.Provider>
    );
}
