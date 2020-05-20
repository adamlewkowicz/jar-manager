import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import 'carbon-components/scss/globals/scss/styles.scss';
import { store } from '../store';
import { Layout } from '../components/Layout';

export default function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StoreProvider>
  );
}
