/* eslint-disable */
import React from 'react';
import { render } from '@testing-library/react';
import { createRouter } from 'next/router';
import { RouterContext } from 'next/dist/next-server/lib/router-context';
import type { ReactNode } from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { AppStore, configureStore } from '../src/store';

interface Options<Q extends {}> {
  query?: Q;
  store?: AppStore;
}

export const renderSetup = <Q extends {}>(
  ui: ReactNode,
  { query, store }: Options<Q> = {},
) => {
  const router = createRouter('', query as any, '', {
    initialProps: {},
    pageLoader: jest.fn(),
    App: jest.fn(),
    Component: jest.fn(),
  } as any);

  const storeMock = store ?? configureStore();

  return render(
    <RouterContext.Provider value={router}>
      <StoreProvider store={storeMock}>{ui}</StoreProvider>
    </RouterContext.Provider>,
  );
};
