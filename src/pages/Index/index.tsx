import React from 'react';
import css from './index.module.scss';
import { useSelector } from 'react-redux';
import { getTransactions } from '../../store/modules/transactions/selectors';
import { AllTransactionsTable } from '../../components/AllTransactionsTable';
import { useJarStore } from '../../hooks';
import { CreateJarModal } from '../../components/CreateJarModal';
import { Jars } from '../../components/Jars';
import { JarTransferModal } from '../../components/JarTransferModal';
import { H2 } from '../../components/H2';

export const IndexPage = () => {
  const transactions = useSelector(getTransactions);
  const jarStore = useJarStore();

  return (
    <article>
      <Jars jars={jarStore.jars} />
      <H2>Zarządzaj słoikami</H2>
      <div className={css.modals}>
        <CreateJarModal onCreate={jarStore.createJar} />
        <JarTransferModal
          jars={jarStore.jars}
          onFundsTransfer={jarStore.fundsTransfer}
        />
      </div>
      <H2>Historia wszystkich transakcji</H2>
      <AllTransactionsTable transactions={transactions} />
    </article>
  );
};

export default IndexPage;
