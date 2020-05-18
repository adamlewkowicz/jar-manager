import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import 'carbon-components/scss/globals/scss/styles.scss';
import { store } from '../store';

export default function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider store={store}>
      <Component {...pageProps} />
    </StoreProvider>
  );
}
