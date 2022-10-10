import React, { createContext } from "react";
import { useContext } from "react";
import { UserContext } from "./UserContext";

export default function Home() {
    const {user} = useContext(UserContext)

    return (
        <div>
            <h2>Benvenut* {user}</h2>
            <p>Nella sezione Calendario potrai creare gli appuntamenti.</p>
            <p>Nella sezione Calendario2 potrai visualizzare gli eventi disponibili</p>
            <p>Nella sezione Tabella Utenti potrai vedere gli utenti iscritti alla community.</p>
            <p>Cliccando il tuo utente in basso potrai cambiare la Password o fare il Logout.</p>
        </div>

    );
}