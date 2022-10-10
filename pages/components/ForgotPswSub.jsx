import { Button, TextInput, PasswordInput } from '@mantine/core';                              
import '../assets/Welcome.css';
import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';
import { useForm } from '@mantine/form';
import { useContext } from 'react';
import { UserContext } from './UserContext';
import React from 'react';

export default function ForgotPswSub(){
    let navigate = useNavigate();

    const {user} = useContext(UserContext);

    const form = useForm({
        initialValues: { 
            code: '',
            newpsw: '',
        },
    
        // functions will be used to validate values at corresponding key
        validate: {
          code:  (value) => (value.length === 5 ? 'Il codice deve essere lungo 6 caratteri' : null),
          newpsw:  (value) => (value.length < 8 ? 'la password deve essere lunga almeno 8 caratteri' : null),
        },
      });

    async function forgotPasswordSubmit(values) {
        try {
            //const username = localStorage.getItem('username');
            console.log(user);
            await Auth.forgotPasswordSubmit(user, values.code, values.newpsw)
                .then(data => console.log(data))
                .catch(err => console.log(err));
            console.log(values);
            navigate("/", { replace: true });
        } catch (error) {
            console.log('error changing password', error);
        }
    }

    return (
        <form onSubmit={form.onSubmit( (values) => forgotPasswordSubmit(values))} >
            <TextInput  mt="sm" placeholder="Verify Code" {...form.getInputProps('code')}/> <br />
            <PasswordInput  mt="sm" placeholder="new Password" {...form.getInputProps('newpsw')}/> <br />
            <Button className="btn" type='submit'  mt="sm">Invia</Button>
        </form>
    );
  
}