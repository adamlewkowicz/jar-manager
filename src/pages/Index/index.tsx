import React from 'react';
import css from './index.module.scss';
import { useSelector } from 'react-redux';
import { getTransactions } from '../../store/modules/transactions/selectors';
import { useJarStore } from '../../hooks';
import { H2 } from '../../components/H2';
import {
  TransactionsTable,
  JarTransferModal,
  JarGrid,
  JarCreateModal,
} from '../../components';

export const IndexPage = () => {
  const transactions = useSelector(getTransactions);
  const jarStore = useJarStore();

  return (
    <article>
      <JarGrid jars={jarStore.jars} />
      <H2>Zarządzaj słoikami</H2>
      <div className={css.modals}>
        <JarCreateModal onCreate={jarStore.createJar} />
        <JarTransferModal jars={jarStore.jars} onFundsTransfer={jarStore.fundsTransfer} />
      </div>
      <H2>Historia wszystkich transakcji</H2>
      <TransactionsTable transactions={transactions} />
    </article>
  );
};

export default IndexPage;
