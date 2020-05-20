import React from 'react';
import { Table } from '../Table';
import { Transaction } from '../../types';
import { formatDate } from '../../utils';
import { TransactionAmount } from '../TransactionAmount';

interface TransactionsTableProps {
  transactions: Transaction[];
}

export const TransactionsTable = (props: TransactionsTableProps) => {
  const normalizedTransactions = props.transactions.map(
    (transaction) => [
      String(transaction.id),
      transaction.id,
      <TransactionAmount {...transaction} />,
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
