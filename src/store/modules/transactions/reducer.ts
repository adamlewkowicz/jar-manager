import {
  JAR_FUNDS_ADDED,
  JAR_FUNDS_REMOVED,
  JAR_FUNDS_TRANSFERRED,
} from '../jars/consts';
import { Transaction } from '../../../types';
import { JarAction } from '../jars/reducer';

interface JarTransaction extends Transaction {
  jarId: number;
}

type TransactionsState = JarTransaction[];

export const transactionsReducer = (
  state: TransactionsState = [],
  action: JarAction,
): TransactionsState => {
  switch (action.type) {
    case JAR_FUNDS_ADDED: {
      const nextTransaction: JarTransaction = {
        id: performance.now(),
        jarId: action.meta.jarId,
        amount: action.payload.amount,
        date: new Date().toISOString(),
        title: 'Wpłata środków',
      };

      return [nextTransaction, ...state];
    }
    case JAR_FUNDS_REMOVED: {
      const nextTransaction: JarTransaction = {
        id: performance.now(),
        jarId: action.meta.jarId,
        amount: action.payload.amount,
        date: new Date().toISOString(),
        title: 'Wypłata środków',
      };

      return [nextTransaction, ...state];
    }
    case JAR_FUNDS_TRANSFERRED: {
      const fromJarTransaction: JarTransaction = {
        id: performance.now(),
        jarId: action.meta.fromJarId,
        amount: action.payload.amount,
        date: new Date().toISOString(),
        title: 'Transakcja środków',
      };
      const toJarTransaction: JarTransaction = {
        id: performance.now(),
        jarId: action.meta.toJarId,
        amount: action.payload.amount,
        date: new Date().toISOString(),
        title: 'Transakcja środków',
      };

      return [toJarTransaction, fromJarTransaction, ...state];
    }
    default:
      return state;
  }
};
