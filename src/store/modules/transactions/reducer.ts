import {
  JAR_FUNDS_ADDED,
  JAR_FUNDS_REMOVED,
  JAR_FUNDS_TRANSFERRED,
} from '../jars/consts';
import type { Transaction, FundsTransaction, ExchangeTransaction } from '../../../types';
import type { JarAction } from '../jars/reducer';
import { generateId } from '../../../utils';

type TransactionsState = Transaction[];

export const transactionsReducer = (
  state: TransactionsState = [],
  action: JarAction,
): TransactionsState => {
  switch (action.type) {
    case JAR_FUNDS_ADDED: {
      const nextTransaction: FundsTransaction = {
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
      const nextTransaction: FundsTransaction = {
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
      const nextTransaction: ExchangeTransaction = {
        id: generateId(),
        fromJarId: action.meta.fromJarId,
        toJarId: action.meta.toJarId,
        amount: action.payload.amount,
        date: new Date().toISOString(),
        title: 'Transakcja środków',
        type: 'exchange',
      };

      return [nextTransaction, ...state];
    }
    default:
      return state;
  }
};
