import { combineReducers } from 'redux';
import { jarsReducer } from './jars/reducer';
import { transactionsReducer } from './transactions/reducer';

export const rootReducer = combineReducers({
  jars: jarsReducer,
  transactions: transactionsReducer,
});

export type StoreState = ReturnType<typeof rootReducer>;
