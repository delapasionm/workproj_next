import { useContext } from "react";
import { createContext } from "react";  

type UserContextType = {
    user: any;
    setUser: (username: any) => void;
}

const userContextDefault: UserContextType = {
    user: null,
    setUser: () => {},
};

export const UserContext = createContext(userContextDefault);

export function useUserContext() {
    return useContext(UserContext);
}

