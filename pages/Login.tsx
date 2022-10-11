
import { Button, Text } from '@mantine/core';
// import '../assets/Login.css'
import React from 'react';
import Link from 'next/link';
import LoginForm from './components/LoginForm';

export default function Login({children}: any) {
  
  return (
    <div>
      <div className='card'>
        <div className='cardel'>
          <Text id='title'>Accedi</Text>
        </div>
        <div className='cardel'>
          <LoginForm />
        </div>
        <div className='cardel'>
          <Text id='title'>Oppure...</Text>
        </div>
        <br/>
        <div className='cardel'>
          <Link href='/SignUp'>
            <Button className='btn'>Iscriviti qui</Button>
          </Link>
        </div>
      </div>
      {children}
    </div>
    
  );
  
}
