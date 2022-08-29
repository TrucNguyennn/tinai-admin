import type { AppProps } from 'next/app';
import '../sass/main.scss';
import { DarkModeContextProvider } from '../context/DarkModeContext';
import 'antd/dist/antd.css';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from '../redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { getCurrentAdmin } from '@/redux/slice/authSlice';

function MyApp({ Component, pageProps }: AppProps) {
  const fetchData = async () => {
    await store.dispatch(getCurrentAdmin());
  };

  useEffect(() => {
    fetchData();
  }, [Component, pageProps]);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <DarkModeContextProvider>
          <Component {...pageProps} />
        </DarkModeContextProvider>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
