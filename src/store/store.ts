import { createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer, AppState } from './modules';
import { initialState } from './data';

export const configureStore = (customInitialState?: Partial<AppState>): AppStore => {
  const store = createStore(rootReducer, customInitialState, composeWithDevTools());

  /* eslint-disable */
  module.hot?.accept(() => {
    const { rootReducer } = require('./modules');
    store.replaceReducer(rootReducer);
  });
  /* eslint-enable */

  return store;
};

export const store = configureStore(initialState);

export type AppStore = Store<AppState>;
