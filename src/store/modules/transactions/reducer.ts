import {
  JAR_FUNDS_ADDED,
  JAR_FUNDS_REMOVED,
  JAR_FUNDS_TRANSFERRED,
} from '../jars/consts';
import { Transaction } from '../../../types';
import { JarAction } from '../jars/reducer';
import { generateId } from '../../../utils';

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
        id: generateId(),
        jarId: action.meta.jarId,
        amount: action.payload.amount,
        date: new Date().toISOString(),
        title: 'Wpłata środków',
        type: 'add',
      };

      return [nextTransaction, ...state];
    }
    case JAR_FUNDS_REMOVED: {
      const nextTransaction: JarTransaction = {
        id: generateId(),
        jarId: action.meta.jarId,
        amount: action.payload.amount,
        date: new Date().toISOString(),
        title: 'Wypłata środków',
        type: 'remove',
      };

      return [nextTransaction, ...state];
    }
    case JAR_FUNDS_TRANSFERRED: {
      const fromJarTransaction: JarTransaction = {
        id: generateId(),
        jarId: action.meta.fromJarId,
        amount: action.payload.amount,
        date: new Date().toISOString(),
        title: 'Transakcja środków',
        type: 'exchange',
      };
      const toJarTransaction: JarTransaction = {
        id: generateId(),
        jarId: action.meta.toJarId,
        amount: action.payload.amount,
        date: new Date().toISOString(),
        title: 'Transakcja środków',
        type: 'exchange',
      };

      return [toJarTransaction, fromJarTransaction, ...state];
    }
    default:
      return state;
  }
};
