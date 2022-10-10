import {useForm} from '@mantine/form';
import {PasswordInput, TextInput, Button} from '@mantine/core';
import {Auth} from 'aws-amplify';
import React, {useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { UserContext } from './UserContext';

 export type UserValues = {
    username: string,
    password: string,
    email?: string,
} 

export default function LoginForm() {

    let navigate = useRouter();

    const { setUser } = React.useContext(UserContext);
    
    const form = useForm({
        initialValues: {
            username: '',
            password: '',
        },

        // functions will be used to validate values at corresponding key
        validate: {
            username: (value) => (value.length < 2 ? 'La username deve avere almeno 2 caratteri' : null),
            password: (value) => (value.length < 6 ? 'La password deve avere almeno 6 caratteri' : null),
        },
    });

    /* async function signIn(values: any) {
        try {
            const user = await Auth.signIn(values.username, values.password);
            setUser(user);
            navigate.push("/homepage/home");
        } catch (error) {
            console.log('error signing in', error);
        }


    } */

    const handleSubmit = (values: { username: string; password: string; }) => {
        try {
            //const user = values.username;
            setUser("Paul"); 
            console.log(values);
             
            
        } catch(err) {
            console.log(err);  
        }
        navigate.push("/HomePage");
    }

    return (
        <form onSubmit={form.onSubmit((values) => {handleSubmit(values)})}>
            <TextInput mt="sm" label="Username" placeholder="Username" {...form.getInputProps('username')}/>
            <PasswordInput mt="sm" label="Password" placeholder="Password" {...form.getInputProps('password')} />
            <Link href='/forgotpsw'><h6>Password dimenticata?</h6></Link>

            <Button className="btn" type="submit" mt="sm">
                Invia
            </Button>


        </form>

    );
}





