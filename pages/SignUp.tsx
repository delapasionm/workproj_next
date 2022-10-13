import { Text } from '@mantine/core';
import React from 'react';                                
import SignUpForm from './components/SignUpForm';

export default function SignUp() {
  
  return (
    <div className='card'>
      <div className='cardel'>
        <Text id='title'>Registrati qui</Text>
      </div>
      <div className='cardel'>
        <SignUpForm />
      </div>
    </div>
  );
  
}