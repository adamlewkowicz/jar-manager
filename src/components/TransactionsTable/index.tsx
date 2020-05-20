import React from 'react';
import { Table } from '../Table';
import { Transaction } from '../../types';
import { formatDate } from '../../utils';

interface TransactionsTableProps {
  transactions: Transaction[];
}

export const TransactionsTable = (props: TransactionsTableProps) => {
  const normalizedTransactions = props.transactions.map(
    (transaction) => [
      String(transaction.id),
      transaction.id,
      transaction.amount,
      transaction.title,
      `${formatDate(transaction.date)}`,
    ],
  );

  return (
    <Table
      title="Transakcje"
      headers={['ID', 'Kwota', 'Tytuł', 'Data']}
      data={normalizedTransactions}
    />
  );
};
