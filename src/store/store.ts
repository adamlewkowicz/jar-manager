import { createStore } from 'redux';
import { rootReducer } from './modules';

export const store = createStore(rootReducer);
