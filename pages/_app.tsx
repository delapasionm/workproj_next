import '../styles/globals.css'
import Login from './Login';
import SignUp from './SignUp';
import React, { useState } from 'react';
import { AppProps } from 'next/app';
import { UserContext } from './components/UserContext';

function MyApp({ Component, pageProps }: AppProps) {

  const [user, setUser] = useState('');

  return (
    <UserContext.Provider value={{ user, setUser }}>
    <div className='container'>
      <Component {...pageProps} />
    </div>
    </UserContext.Provider>
  );
}

export default MyApp
