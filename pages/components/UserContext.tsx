import React from "react";
import { createContext } from "react";  

var userf = 'John';

export const UserContext = React.createContext({
    user: userf,
    setUser: (username: string) => userf = 'Paul',
}); 

/* import { createContext } from "react";

export const UserContext = React.createContext(null) */

