import type { AppProps } from 'next/app';
import '../sass/main.scss';
import { DarkModeContextProvider } from '../context/DarkModeContext';
import 'antd/dist/antd.css';
import '../styles/globals.css';
import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from '../redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { getCurrentAdmin } from '@/redux/slice/authSlice';
import { useRouter } from 'next/router';
import { Spin } from 'antd';

function MyApp({ Component, pageProps }: AppProps) {
  const fetchData = async () => {
    await store.dispatch(getCurrentAdmin());
  };

  useEffect(() => {
    fetchData();
  }, [Component, pageProps]);

  function Loading() {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
      const handleStart = (url: any) =>
        url !== router.asPath && setLoading(true);
      const handleComplete = () => {
        setLoading(false);
      };

      router.events.on(`routeChangeStart`, handleStart);
      router.events.on(`routeChangeComplete`, handleComplete);
      router.events.on(`routeChangeError`, handleComplete);

      return () => {
        router.events.off(`routeChangeStart`, handleStart);
        router.events.off(`routeChangeComplete`, handleComplete);
        router.events.off(`routeChangeError`, handleComplete);
      };
    });

    return loading ? (
      <div className="spinner-wrapper">
        <Spin size="large" />
      </div>
    ) : null;
  }

  return (
    <>
      <Loading />
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <DarkModeContextProvider>
            <Component {...pageProps} />
          </DarkModeContextProvider>
        </PersistGate>
      </Provider>
    </>
  );
}

export default MyApp;
