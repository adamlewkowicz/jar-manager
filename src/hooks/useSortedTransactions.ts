import { Transaction, SortDir } from '../types';
import { useMemo } from 'react';
import { SortProp } from '../components';
import { sortCompare, getJarIdFromTransaction } from '../utils';

interface SortOptions {
  property: SortProp;
  direction: SortDir;
}

export const useSortedTransactions = (
  transactions: Transaction[],
  { property, direction }: SortOptions,
): Transaction[] => {
  return useMemo(
    () => [
      ...transactions.sort((a, b) => {
        const numericDirection = direction == 'ASC' ? 1 : -1;
        let sortResult: number;

        if (property === 'jar') {
          const jarIdA = getJarIdFromTransaction(a);
          const jarIdB = getJarIdFromTransaction(b);

          sortResult = sortCompare(jarIdA, jarIdB);
        } else {
          sortResult = sortCompare(a[property], b[property]);
        }

        if (sortResult !== 0) {
          return sortResult * numericDirection;
        }

        return sortResult;
      }),
    ],
    [transactions, property, direction],
  );
};
