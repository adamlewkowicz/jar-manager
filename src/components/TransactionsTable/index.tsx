import React, { useState, useMemo } from 'react';
import { Table } from '../Table';
import { Transaction, ValueOf } from '../../types';
import { formatDate } from '../../utils';
import { TransactionAmount } from './TransactionAmount';
import { JarLinks } from './JarLinks';

interface TransactionsTableProps {
  transactions: Transaction[];
}

export const TransactionsTable = (props: TransactionsTableProps) => {
  const [sortProp, setSortProp] = useState<SortProp>(KEYS.id);

  const normalizedTransactions = useMemo(
    () =>
      props.transactions
        .sort((a, b) => {
          return 0;
        })
        .map((transaction) => [
          String(transaction.id),
          <JarLinks {...transaction} />,
          <TransactionAmount {...transaction} />,
          transaction.title,
          formatDate(transaction.date),
        ]),
    [props.transactions, sortProp],
  );

  return (
    <Table
      title="Transakcje"
      headers={HEADERS}
      data={normalizedTransactions}
      // sortRow={(a, b, data) => {
      //   console.log({ data });
      //   setSortProp(data.key as SortProp);
      //   return 0;
      // }}
    />
  );
};

const KEYS = {
  id: 'ID',
  jar: 'Słoik',
  amount: 'Kwota',
  title: 'Rodzaj operacji',
  date: 'Data',
} as const;

const HEADERS = [
  KEYS.id,
  KEYS.jar,
  KEYS.amount,
  KEYS.title,
  KEYS.date,
];

type SortProp = ValueOf<typeof KEYS>;
