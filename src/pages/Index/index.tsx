import React from 'react';
import css from './index.module.scss';
import { useSelector } from 'react-redux';
import { getTransactions } from '../../store/modules/transactions/selectors';
import { AllTransactionsTable } from '../../components/AllTransactionsTable';
import { useJarStore } from '../../hooks';
import { CreateJarModal } from '../../components/CreateJarModal';
import { Jars } from '../../components/Jars';
import { JarTransferModal } from '../../components/JarTransferModal';

export const HomePage = () => {
  const transactions = useSelector(getTransactions);
  const jarStore = useJarStore();

  return (
    <>
      <h1>Słoiki</h1>
      <Jars jars={jarStore.jars} />
      <div className={css.modals}>
        <CreateJarModal onCreate={jarStore.createJar} />
        <JarTransferModal
          jars={jarStore.jars}
          onFundsTransfer={jarStore.fundsTransfer}
        />
      </div>
      <AllTransactionsTable transactions={transactions} />
    </>
  );
};

export default HomePage;
