import type { NextPage } from 'next'
import Head from 'next/head'
import AppBarM from '../components/appBar';
import { Avatar, Container,Toolbar, Typography, Box } from '@mui/material';
import FormComp from './Form';

const Home: NextPage = () => {

  return (
    <>
      <Head>
        <title>INSURANCE</title>
        <meta name="description" content="Generated by Violeta" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
        <AppBarM title=' INSURANCE' />
        <Box display="flex" justifyContent="center" marginTop="10px">
          <Avatar alt='Remy Sharp' src='/static/insurance.png' style={{ display: "flex",width: '80px',
          height: '80px' }}
          />
        </Box>
        <FormComp />
         
      
    </>
  )
}

export default Home
