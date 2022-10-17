import { Text, Button, TextInput } from '@mantine/core';                              
import { Auth } from 'aws-amplify';
import { useForm } from '@mantine/form';
import { useContext } from 'react';
import React from 'react';
import { useRouter } from 'next/router';
import { UserContext } from './components/UserContext';

export default function ConfirmationPage(){
    let navigate = useRouter();

    const {user} = useContext(UserContext);
    console.log(user);
    

    const form = useForm({
        initialValues: { 
            code: '',
        },
    
        // functions will be used to validate values at corresponding key
        validate: {
          code:  (value) => (value.length === 5 ? 'Il codice deve essere lungo 6 caratteri' : null),
        },
      });

     async function confirmSignUp(values: { code: any; }) {
        try {
            const {code} = values;
            console.log(code);
            await Auth.confirmSignUp(user, code);
            navigate.push("/Welcome");
        } catch (error) {
            console.log('error confirming sign up', error);
        }
    } 

    return (
      <div className='card'>
        <div className='cardel'>
          <Text id='titlew'>Ciao! {user.username}</Text>
        </div>
        <p>
            Ti è stata inviata un email di conferma con un codice, controlla nella tua casella postale e inserisci il codice qui:
        </p>
        <form onSubmit={form.onSubmit((values: any) => confirmSignUp(values))} >
            <TextInput  mt="sm" placeholder="Verify Code" {...form.getInputProps('code')}/> <br />
            <Button variant='outline' className="btn" type='submit'  mt="sm" onClick={() => navigate.push("/Welcome")}>Invia</Button>
        </form>
        
      </div>
    );
  
}