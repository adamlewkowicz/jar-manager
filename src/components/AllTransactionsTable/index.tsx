import React from 'react';
import { Table } from '../Table';
import { Transaction } from '../../types';
import { formatDate } from '../../utils';

interface AllTransactionsTableProps {
  transactions: Transaction[];
}

export const AllTransactionsTable = React.memo(
  (props: AllTransactionsTableProps) => {
    const normalizedTransactions = props.transactions.map(
      (transaction) => [
        String(transaction.id),
        transaction.id,
        `Słoik ${transaction.jarId}`,
        transaction.amount,
        transaction.title,
        `${formatDate(transaction.date)}`,
      ],
    );

    return (
      <Table
        title="Wszystkie transakcje"
        headers={['ID', 'Słoik', 'Kwota', 'Tytuł', 'Data']}
        data={normalizedTransactions}
      />
    );
  },
);
