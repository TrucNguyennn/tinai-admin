import type { AppProps } from 'next/app';
import '../sass/main.scss';
import { DarkModeContextProvider } from '../context/DarkModeContext';
import 'antd/dist/antd.css';
import React from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from '../redux/store';
import { PersistGate } from 'redux-persist/integration/react';

function MyApp({ Component, pageProps }: AppProps) {
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
