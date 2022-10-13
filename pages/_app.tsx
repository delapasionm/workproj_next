import '../styles/globals.css'
import React, { useState } from 'react';
import { AppProps } from 'next/app';
import { UserContext } from './components/UserContext';
import Layout from './components/Layout';

function MyApp({ Component, pageProps, router }: AppProps) {

  const [user, setUser] = useState(null);

  if(router.pathname.startsWith('/Homepage/')) {
      return (
      
        <UserContext.Provider value={{ user, setUser }}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </UserContext.Provider>
    );
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Component {...pageProps} />
    </UserContext.Provider>
  )
}

export default MyApp
