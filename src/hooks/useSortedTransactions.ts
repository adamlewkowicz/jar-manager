import { useMemo } from 'react';
import { Transaction, SortDir } from '../types';
import { SortProp } from '../components';
import { sortCompare, getJarIdsFromTransaction } from '../utils';

interface SortOptions {
  property: SortProp;
  direction: SortDir;
}

export const useSortedTransactions = (
  transactions: Transaction[],
  { property, direction }: SortOptions,
): Transaction[] =>
  useMemo(
    () => [
      ...transactions.sort((a, b) => {
        const numericDirection = direction === 'ASC' ? 1 : -1;
        let sortResult: number;

        if (property === 'jar') {
          const [jarIdA] = getJarIdsFromTransaction(a);
          const [jarIdB] = getJarIdsFromTransaction(b);

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
