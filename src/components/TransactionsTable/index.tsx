import React, { useState, useMemo } from 'react';
import { Transaction } from '../../types';
import {
  formatDate,
  sortCompare,
  getJarIdFromTransaction,
} from '../../utils';
import { TransactionAmount } from './TransactionAmount';
import { JarLinks } from './JarLinks';
import * as Table from '../Table';

interface TransactionsTableProps {
  transactions: Transaction[];
}

export const TransactionsTable = (props: TransactionsTableProps) => {
  const [sortProp, setSortProp] = useState<SortProp>('id');
  const [sortDir, setSortDir] = useState<SortDir>('ASC');

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
    <Table.Container title="Transakcje">
      <Table.Head>
        <Table.Row>
          {HEADERS.map((header) => (
            <Table.Header
              key={header.key}
              isSortable
              sortDirection={sortDir}
              isSortHeader={header.key === sortProp}
              onClick={() => handleDirSort(header.key)}
            >
              {header.title}
            </Table.Header>
          ))}
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {sortedTransactions.map((transaction) => (
          <Table.Row key={transaction.id}>
            <Table.Cell>{transaction.id}</Table.Cell>
            <Table.Cell>
              <JarLinks {...transaction} />
            </Table.Cell>
            <Table.Cell>
              <TransactionAmount {...transaction} />
            </Table.Cell>
            <Table.Cell>{transaction.title}</Table.Cell>
            <Table.Cell>{formatDate(transaction.date)}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Container>
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

type SortDir = 'ASC' | 'DESC';
