import Head from 'next/head';
import { FC } from 'react';

const Title: FC<ITitle> = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content="Admin Dashboard by Sikal" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default Title;
