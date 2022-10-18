import '../styles/globals.css'
import React, { useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import { UserContext } from './components/UserContext';
import Layout from './components/Layout';
import Amplify from 'aws-amplify';
import awsconfig from '../src/aws-exports'
import { useRouter } from 'next/router';

Amplify.configure(awsconfig);

function MyApp({ Component, pageProps, router }: AppProps) {
  const navigate = useRouter();

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

export default MyApp;