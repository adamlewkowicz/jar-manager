import { AppState } from '..';
import { createSelector } from 'reselect';
import { getTransactions } from '../transactions/selectors';
import { getJarIdsFromTransaction } from '../../../utils';

export const getJars = (state: AppState) => state.jars;

export const getJarsWithTransactions = createSelector(
  getJars,
  getTransactions,
  (jars, transactions) =>
    jars.map((jar) => ({
      ...jar,
      transactions: transactions.filter((transaction) => {
        const jarIds = getJarIdsFromTransaction(transaction);
        return jarIds.includes(jar.id);
      }),
    })),
);
