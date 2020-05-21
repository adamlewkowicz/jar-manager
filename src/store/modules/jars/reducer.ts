import { Jar, ValueOf } from '../../../types';
import * as jarAction from './creators';
import {
  JAR_CREATED,
  JAR_FUNDS_ADDED,
  JAR_FUNDS_REMOVED,
  JAR_FUNDS_TRANSFERRED,
} from './consts';

type JarsState = Jar[];

export const jarsReducer = (
  state: JarsState = [
    {
      id: 1,
      balance: 1000,
      currency: 'PLN',
      isDefault: true,
    },
    {
      id: 2,
      balance: 1500,
      currency: 'PLN',
      isDefault: false,
    },
  ],
  action: JarAction,
): JarsState => {
  switch (action.type) {
    case JAR_CREATED:
      const nextJar: Jar = {
        id: state.length + 1,
        isDefault: false,
        ...action.payload,
      };
      return [...state, nextJar];
    case JAR_FUNDS_ADDED:
      return state.map((jar) => {
        if (jar.id === action.meta.jarId) {
          return {
            ...jar,
            balance: jar.balance + action.payload.amount,
          };
        }
        return jar;
      });
    case JAR_FUNDS_REMOVED:
      return state.map((jar) => {
        if (jar.id === action.meta.jarId) {
          return {
            ...jar,
            balance: jar.balance - action.payload.amount,
          };
        }
        return jar;
      });
    case JAR_FUNDS_TRANSFERRED:
      return state.map((jar) => {
        if (jar.id === action.meta.fromJarId) {
          return {
            ...jar,
            balance: jar.balance - action.payload.amount,
          };
        } else if (jar.id === action.meta.toJarId) {
          return {
            ...jar,
            balance: jar.balance + action.payload.amount,
          };
        }
        return jar;
      });
    default:
      return state;
  }
};

export type JarAction = ReturnType<ValueOf<typeof jarAction>>;
