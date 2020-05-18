import { Jar, ValueOf } from '../../../types';
import * as jarAction from './creators';
import {
  JAR_CREATED,
  JAR_FUNDS_ADDED,
  JAR_FUNDS_REMOVED,
} from './consts';

interface JarsState {
  data: Jar[];
}

export const jarsReducer = (
  state: JarsState,
  action: JarAction,
): JarsState => {
  switch (action.type) {
    case JAR_CREATED:
      return state;
    case JAR_FUNDS_ADDED:
      return {
        ...state,
        data: state.data.map((jar) => {
          if (jar.id === action.meta.jarId) {
            return {
              ...jar,
              balance: jar.balance + action.payload.amount,
            };
          }
          return jar;
        }),
      };
    case JAR_FUNDS_REMOVED:
      return {
        ...state,
        data: state.data.map((jar) => {
          if (jar.id === action.meta.jarId) {
            return {
              ...jar,
              balance: jar.balance - action.payload.amount,
            };
          }
          return jar;
        }),
      };
    default:
      return state;
  }
};

export type JarAction = ReturnType<ValueOf<typeof jarAction>>;
