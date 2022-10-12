import { useContext } from "react";
import React from "react";
import { createContext } from "react";  
import { UserValues } from "./LoginForm";

let username = '';

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

/* import { createContext } from "react";

export const UserContext = React.createContext(null) */

