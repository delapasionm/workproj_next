import { Text, Button, PasswordInput } from '@mantine/core';                              
import '../assets/Welcome.css';
import { Auth } from 'aws-amplify';
import { useForm } from '@mantine/form';
import React from 'react';
import { useRouter } from 'next/router';

export default function ChangePsw(){

    let navigate = useRouter();

    const form = useForm({
        initialValues: { 
            oldpsw: '',
            newpsw: '',
        },
    
        // functions will be used to validate values at corresponding key
        validate: {
          oldpsw:  (value) => (value.length < 8 ? 'la password deve essere lunga 8 caratteri' : null),
          newpsw:  (value) => (value.length < 8 ? 'la password deve essere lunga 8 caratteri' : null),
        },
      });

    
    
    /* async function changePassword(values) {
        
        try {
            Auth.currentAuthenticatedUser()
                .then(user => {
                    return Auth.changePassword(user, values.oldpsw, values.newpsw)})
            console.log(values);
            
           
            navigate("/homepage", { replace: true });
        }catch (error) {
            console.log('error changing password', error);
        }
    } */

    

    return (
      <div className='card'>
        <div className='cardel'>
          <Text id='titlew'>Cambia la tua password qui:</Text>
        </div>
        <form onSubmit={form.onSubmit( () => navigate.push("/HomePage")) } >
            <PasswordInput mt="sm" label="Vecchia password" placeholder="Password"  {...form.getInputProps('oldpsw')} /> <br />
            <PasswordInput mt="sm" label="Nuova password" placeholder="Password"  {...form.getInputProps('newpsw')} /> <br />
            <Button className="btn" type='submit'  mt="sm">Invia</Button>
        </form>
      </div>
    );
  
} 