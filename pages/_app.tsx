import type { AppProps } from 'next/app';
import '../sass/main.scss';
import Layout from '../components/Layout';
import { DarkModeContextProvider } from '../context/DarkModeContext';
import 'antd/dist/antd.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DarkModeContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </DarkModeContextProvider>
  );
}

export default MyApp;
