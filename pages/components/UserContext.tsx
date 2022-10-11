import { useContext } from "react";
import React from "react";
import { createContext } from "react";  

let username = '';

type UserContextType = {
    user: string;
    setUser: (username: string) => void;
}

const userContextDefault: UserContextType = {
    user: '',
    setUser: () => {},
};

export const UserContext = createContext(userContextDefault);

export function useUserContext() {
    return useContext(UserContext);
}

/* import { createContext } from "react";

export const UserContext = React.createContext(null) */

