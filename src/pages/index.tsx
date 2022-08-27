import Layout from '@/components/Layout';
import Title from '@/components/Title';
import type { NextPage } from 'next';
import React from 'react';
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
