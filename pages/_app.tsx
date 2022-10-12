import '../styles/globals.css'
import React, { useState } from 'react';
import { AppProps } from 'next/app';
import { UserContext } from './components/UserContext';
import Layout from './components/Layout';

function MyApp({ Component, pageProps, router }: AppProps) {

  const [user, setUser] = useState('');

  if(router.pathname.startsWith('/Homepage/')) {
      return (
      <Layout>
        <UserContext.Provider value={{ user, setUser }}>
            <Component {...pageProps} />
        </UserContext.Provider>
      </Layout>
    );
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Component {...pageProps} />
    </UserContext.Provider>
  )
}

export default MyApp
