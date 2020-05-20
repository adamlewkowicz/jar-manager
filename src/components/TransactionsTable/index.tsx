import React from 'react';
import { Table } from '../Table';
import { Transaction } from '../../types';

interface TransactionsTableProps {
  transactions: Transaction[];
}

export const TransactionsTable = (props: TransactionsTableProps) => {
  const normalizedTransactions = props.transactions.map((trx) => [
    String(trx.id),
    trx.id,
    trx.amount,
    trx.date,
    trx.title,
  ]);

  return (
    <Table
      title="Transakcje"
      headers={['ID', 'Kwota', 'Tytuł', 'Data']}
      data={normalizedTransactions}
    />
  );
};
