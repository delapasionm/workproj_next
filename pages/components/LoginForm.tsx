import {useForm} from '@mantine/form';
import {PasswordInput, TextInput, Button, Checkbox, Text} from '@mantine/core';
import {Auth} from 'aws-amplify';
import React, {useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { UserContext } from './UserContext';
import { userAgent } from 'next/server';

 export type UserValues = {
    username: string,
    password: string,
    email?: string,
} 

export default function LoginForm() {

    let navigate = useRouter();

    const { setUser } = useContext(UserContext);
    
    const form = useForm({
        initialValues: {
            username: '',
            password: '',
            adminRole: false,
            tutRole: false,
            studRole: false,
        },

        // functions will be used to validate values at corresponding key
        validate: {
            username: (value) => (value.length < 2 ? 'La username deve avere almeno 2 caratteri' : null),
            password: (value) => (value.length < 6 ? 'La password deve avere almeno 6 caratteri' : null),
        },
    });

    async function signIn(values: any) {
        try {
            const user = await Auth.signIn(values.username, values.password);
            //setUser(user);
            const admin = values.adminRole;
            const tutor = values.tutRole;
            const student = values.studRole;
            setUser({...user, admin, tutor, student});
            navigate.push("/HomePage");
        } catch (error) {
            console.log('error signing in', error);
        }


    }

    /* const handleSubmit = (values: { username: string; password: string; adminRole: boolean; tutRole: boolean; studRole: boolean;}) => {
        try {
            //const user = values.username;
            setUser(values); 
            console.log(values);
             
            
        } catch(err) {
            console.log(err);  
        }
        navigate.push("/HomePage")
    } */

    return (
        <form onSubmit={form.onSubmit((values) => signIn(values))}>
            <TextInput mt="sm" label="Username" placeholder="Username" {...form.getInputProps('username')}/>
            <PasswordInput mt="sm" label="Password" placeholder="Password" {...form.getInputProps('password')} />
            <Link href='/ForgotPsw'><h6 className='forgotPsw'>Password dimenticata?</h6></Link>
            <Text mt="sm">Scegli il ruolo</Text>
            <div style={{display: 'flex'}}>
                <Checkbox mt="md" label="Admin" {...form.getInputProps('adminRole', {type: 'checkbox'})} />
                <Checkbox mt="md" label="Tutor" {...form.getInputProps('tutRole', {type: 'checkbox'})} />
                <Checkbox mt="md" label="Studente" {...form.getInputProps('studRole', {type: 'checkbox'})} />
            </div>

            <Button variant='outline' className="btn" type="submit" mt="sm">
                Accedi
            </Button>


        </form>

    );
}





