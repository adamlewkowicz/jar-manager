import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import 'carbon-components/scss/globals/scss/styles.scss';
import { store } from '../store';
import { Layout } from '../components/Layout';
import { AppProps } from 'next/app';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StoreProvider>
  );
}
