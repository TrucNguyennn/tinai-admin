import Layout from '@/components/Layout';
import type { NextPage } from 'next';
import React from 'react';
import Title from '../components/Title';
import Home from '../containers/Home';

const HomePage: NextPage = () => {
  return (
    <Layout>
      <>
        <Title title={`Dashboard`} />
        <Home />
      </>
    </Layout>
  );
};

export default HomePage;
