import React, { useState, useMemo } from 'react';
import { Transaction } from '../../types';
import {
  formatDate,
  sortCompare,
  getJarIdFromTransaction,
} from '../../utils';
import { TransactionAmount } from './TransactionAmount';
import { JarLinks } from './JarLinks';
import {
  Table,
  TableHead,
  TableRow as TR,
  TableHeader as TH,
  TableBody,
  TableCell as TD,
  TableContainer,
} from 'carbon-components-react';
import { DataTableSortState } from 'carbon-components-react/lib/components/DataTable/state/sorting';

interface TransactionsTableProps {
  transactions: Transaction[];
}

export const TransactionsTable = (props: TransactionsTableProps) => {
  const [sortProp, setSortProp] = useState<SortProp>('id');
  const [sortDir, setSortDir] = useState<DataTableSortState>('ASC');

  const handleDirSort = (nextSortProp: SortProp) => {
    if (sortProp !== nextSortProp) {
      setSortProp(nextSortProp);
    } else {
      setSortDir((dir) => (dir === 'ASC' ? 'DESC' : 'ASC'));
    }
  };

  const sortedTransactions = useMemo(
    () => [
      ...props.transactions.sort((a, b) => {
        const numericDirection = sortDir == 'ASC' ? 1 : -1;

        if (sortProp === 'jar') {
          const jarIdA = getJarIdFromTransaction(a);
          const jarIdB = getJarIdFromTransaction(b);

          return sortCompare(jarIdA, jarIdB) * numericDirection;
        }

        return (
          sortCompare(a[sortProp], b[sortProp]) * numericDirection
        );
      }),
    ],
    [props.transactions, sortProp, sortDir],
  );

  return (
    <>
      <TableContainer title="Transakcje">
        <Table isSortable>
          <TableHead>
            <TR>
              {HEADERS.map((header) => (
                <TH
                  key={header.key}
                  isSortable
                  sortDirection={sortDir}
                  isSortHeader={header.key === sortProp}
                  onClick={() => handleDirSort(header.key)}
                >
                  {header.title}
                </TH>
              ))}
            </TR>
          </TableHead>
          <TableBody>
            {sortedTransactions.map((transaction) => (
              <TR key={transaction.id}>
                <TD>{transaction.id}</TD>
                <TD>
                  <JarLinks {...transaction} />
                </TD>
                <TD>
                  <TransactionAmount {...transaction} />
                </TD>
                <TD>{transaction.title}</TD>
                <TD>{formatDate(transaction.date)}</TD>
              </TR>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

const HEADERS = [
  {
    key: 'id',
    title: 'ID',
  },
  {
    key: 'jar',
    title: 'Słoik',
  },
  {
    key: 'amount',
    title: 'Kwota',
  },
  {
    key: 'title',
    title: 'Rodzaj operacji',
  },
  {
    key: 'date',
    title: 'Data',
  },
] as const;

type SortProp = typeof HEADERS[number]['key'];
