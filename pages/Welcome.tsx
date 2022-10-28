import { Text, Button } from '@mantine/core';                               
import Link from 'next/link';
import { useContext } from 'react';
import { UserContext } from './components/UserContext';

export default function Welcome(){

  const {user} = useContext(UserContext);
  
    return (
      <div className='card'>
        <div className='cardel'>
          <Text id='titlew'>Benvenuto! {!user ? null : user.user.username}</Text>
        </div>
        <p>
            Grazie per aver creato il tuo account. Il profilo è quasi finito devi solo accedere con le credenziali appena create
        </p>

        <h2> Compleata il tuo profilo qui:</h2>
        <Link href='/'>
            <Button variant='outline'>Accedi</Button>
        </Link>
      </div>
    );
  
}