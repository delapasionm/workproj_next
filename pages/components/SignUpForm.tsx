import { useForm } from '@mantine/form';
import { PasswordInput, TextInput, Button } from '@mantine/core';
import { Auth } from 'aws-amplify';
import { useContext } from 'react';
import React from 'react';
import { useRouter } from 'next/router';
import { UserContext } from './UserContext';

export default function SignUpForm() {
  
  let navigate = useRouter();
  const { setUser } = useContext(UserContext);

  const form = useForm({
    initialValues: { 
        username:'',
        email: '',
        password: '',
        confirmPassword: '',
    },

    validate: {
      username:  (value) => (value.length < 2 ? 'La tua username deve avere almeno 2 caratteri' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'email non valida'),
      password:  (value) => (value.length < 6 ? 'La password deve avere almeno 6 caratteri' : null),
      confirmPassword: (value, values) => value !== values.password ? 'La password deve corrispondere' : null,
    },
  });

   async function signUp(values: { username: any; email: any; password: any; confirmPassword?: string; }) {
    try {
        const user = await Auth.signUp({
            username : values.username,
            password : values.password,
            attributes : {
              email : values.email,
              'custom:username': values.username
            },
            autoSignIn: {
                enabled: true,
            }
        });
        setUser(user);
        console.log(user);
        navigate.push("/ConfirmationPage");
    } catch (error) {
        console.log('error signing up:', error);
    }
} 

  return (
      <form onSubmit={form.onSubmit( (values) => signUp(values))}>
        <div className='flex-container2'>
            <div className='flex-container'>
                <TextInput mt="sm" label="Username" placeholder="Username" {...form.getInputProps('username')}/>
                <TextInput mt="sm" label="Email" placeholder="Email" {...form.getInputProps('email')}/>
            </div>
            <div className='flex-container'>
                <PasswordInput mt="sm" label="Password" placeholder="Password" {...form.getInputProps('password')} />
                <PasswordInput mt="sm" label="Confirm password" placeholder="Confirm password" {...form.getInputProps('confirmPassword')} />
            </div>
        </div>
        
        <Button variant='outline' className="btn" type="submit" mt="sm">
          Invia
        </Button>
      </form>  
  );
}


