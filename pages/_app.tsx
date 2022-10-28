import '../styles/globals.css'
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { AppProps } from 'next/app';
import { UserContext } from './components/UserContext';
import Layout from './components/Layout';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../src/aws-exports'
import { Loader } from '@mantine/core';
import { Props } from 'next/script';

Amplify.configure(awsconfig);

function MyApp({ Component, pageProps, router }: AppProps) {

  const [user, setUser] = useState(null);
  const value = useMemo(() => ({user, setUser}), [user, setUser])

  const PersistLogin: React.FC<Props> = () => {
    const [isLoading, setIsLoading] = useState(true)
  
    const {user, setUser} = useContext(UserContext)
  
    useEffect(() => {
        const checkUser = async () => {
            try {
                const user = await Auth.currentAuthenticatedUser()
                console.log({user})
                setUser(user)
            } catch (err) {
                console.log(err)
            } finally {
                setIsLoading(false)
            }
        }
        user ? setIsLoading(false) : checkUser()
        console.log(isLoading);
        
    }, [])
  
    return (
        <>
            {isLoading ? <Loader /> : <Component {...pageProps}/>}
        </>
    )
  }
  
  if(router.pathname.startsWith('/Homepage/')) {
      return (
        <UserContext.Provider value={value}>
          <Layout>
            <PersistLogin>
              <Component {...pageProps} />
            </PersistLogin>
          </Layout>
        </UserContext.Provider>
    );
  }

  return (
    <UserContext.Provider value={value}>
      <PersistLogin>
        <Component {...pageProps} />
      </PersistLogin>
    </UserContext.Provider>
  )
}

export default MyApp;
