import '../styles/globals.css'
import React, { ReactElement, useState } from 'react';
import { AppProps } from 'next/app';
import { UserContext } from './components/UserContext';
import Layout from './components/Layout';


function MyApp({ Component, pageProps }: AppProps) {


  const [user, setUser] = useState('');

  return (
    <Layout>
    <UserContext.Provider value={{ user, setUser }}>
      <Component {...pageProps} />
    </UserContext.Provider>
    </Layout>
  );
}

export default MyApp
