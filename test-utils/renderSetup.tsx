import { render } from '@testing-library/react';
import { AppStore, configureStore } from '../src/store';
import { createRouter } from 'next/router';
import { RouterContext } from 'next/dist/next-server/lib/router-context';
import { ReactNode } from 'react';
import { Provider as StoreProvider } from 'react-redux';

interface Options<Q extends {}> {
  query?: Q;
  store?: AppStore;
}

export const renderSetup = <Q extends {}>(
  ui: ReactNode,
  { query, store }: Options<Q> = {},
) => {
  const router = createRouter('', query, '', {
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
