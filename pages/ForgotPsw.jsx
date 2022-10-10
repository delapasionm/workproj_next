import { Button, Text, TextInput } from "@mantine/core";
import { Auth } from "aws-amplify";
import { useForm } from "@mantine/form";
import { Link, Outlet } from "react-router-dom";
import { createContext, React } from "react";
import { UserContext } from "../components/UserContext"; 

export default function ForgotPsw() {

  const { setUser } = createContext(UserContext);

    const form = useForm({
        initialValues: { 
            username: '',
        },
    
        // functions will be used to validate values at corresponding key
        validate: {
            username: (value) => (value.length < 2 ? 'la tua username deve essere lunga più di 2 caratteri' : null),
        },
      });

    async function forgotPassword(values) {
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
        
    }
    // Send confirmation code to user's email


    return (
        <div className='card'>
          <div className='cardel'>
            <Text id='titlew'>Non ti preoccupare</Text>
          </div>
          <form onSubmit={form.onSubmit( (values) => forgotPassword(values))}>
            <p>Inserisci la tua username e ti invieremo il codice di accesso per cambiare la password</p>
            <TextInput mt="sm" placeholder="Username" {...form.getInputProps('username')}/> <br/>
            <Button className="btn" type="submit" mt="sm">Invia</Button>
          </form>
          <Link to='/forgotpsw/forgotpswsub'><h6>Codice ricevuto</h6></Link>
          <Outlet />
        </div>
      );
}