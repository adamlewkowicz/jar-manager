import { createStore, Store } from 'redux';
import { rootReducer, StoreState } from './modules';
import { composeWithDevTools } from 'redux-devtools-extension';

export const configureStore = (
  initialState?: Partial<StoreState>,
): Store<StoreState> => {
  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(),
  );

  module.hot?.accept(() => {
    const { rootReducer } = require('./modules');
    store.replaceReducer(rootReducer);
  });

  return store;
};

export const store = configureStore();
