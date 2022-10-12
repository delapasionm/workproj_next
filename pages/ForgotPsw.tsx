import { Button, PasswordInput, Text, TextInput } from "@mantine/core";
import { Auth } from "aws-amplify";
import { useForm } from "@mantine/form";
import { createContext} from "react";
import { UserContext } from "./components/UserContext";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function ForgotPsw({children}: any) {

  //const { setUser } = createContext(UserContext);
  let navigate = useRouter();

    const form = useForm({
        initialValues: { 
            username: '',
            code: '',
            newpsw: '',
        },
    
        // functions will be used to validate values at corresponding key
        validate: {
            username: (value) => (value.length < 2 ? 'la tua username deve essere lunga più di 2 caratteri' : null),
            code:  (value) => (value.length === 5 ? 'Il codice deve essere lungo 6 caratteri' : null),
            newpsw:  (value) => (value.length < 8 ? 'la password deve essere lunga almeno 8 caratteri' : null),
          },
      });

    /*async function forgotPassword(values) {
        try {
            const {username} = values;
            await Auth.forgotPassword(username)
            .then(data => console.log(data))
            .catch(err => console.log(err));
            
            console.log(username);
            setUser(username);
        }catch (error) {
            console.log('error sending email', error);
        } 
        
    }*/
    // Send confirmation code to user's email

     /* async function forgotPasswordSubmit(values) {
        try {
            //const username = localStorage.getItem('username');
            console.log(user);
            await Auth.forgotPasswordSubmit(user, values.code, values.newpsw)
                .then(data => console.log(data))
                .catch(err => console.log(err));
            console.log(values);
            navigate.push("/");
        } catch (error) {
            console.log('error changing password', error);
        }
    } */


    return (
        <div className='card'>
          <div className='cardel'>
            <Text id='titlew'>Non ti preoccupare</Text>
          </div>
          <form onSubmit={form.onSubmit( () => console.log(''))}>
            <p>Inserisci la tua username e ti invieremo il codice di accesso per cambiare la password</p>
            <TextInput mt="sm" placeholder="Username" {...form.getInputProps('username')}/> <br/>
            <Button className="btn" type="submit" mt="sm">Invia</Button>
          </form>
          <br />
          <Text>Codice ricevuto?</Text>
          <form onSubmit={form.onSubmit( () => navigate.push("/"))} >
            <TextInput  mt="sm" placeholder="Verify Code" {...form.getInputProps('code')}/> <br />
            <PasswordInput  mt="sm" placeholder="new Password" {...form.getInputProps('newpsw')}/> <br />
            <Button className="btn" type='submit'  mt="sm">Invia</Button>
        </form>
        </div>
      );
}