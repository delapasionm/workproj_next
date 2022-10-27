import { Loader } from '@mantine/core'
import { Auth } from 'aws-amplify'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Props } from 'next/script'
import React, { ReactElement, useContext, useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import Layout from './components/Layout'
import { UserContext } from './components/UserContext'
import HomePage from './HomePage'
import Login from './Login'


const Home = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>My App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Login />
    </div>
  )
}


export default Home

