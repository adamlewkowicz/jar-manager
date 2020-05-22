import { createStore, Store } from 'redux';
import { rootReducer, AppState } from './modules';
import { composeWithDevTools } from 'redux-devtools-extension';
import { initialState } from './data';

export const configureStore = (initialState?: Partial<AppState>): AppStore => {
  const store = createStore(rootReducer, initialState, composeWithDevTools());

  module.hot?.accept(() => {
    const { rootReducer } = require('./modules');
    store.replaceReducer(rootReducer);
  });

  return store;
};

export const store = configureStore(initialState);

export type AppStore = Store<AppState>;
