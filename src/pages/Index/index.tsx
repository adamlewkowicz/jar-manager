import React from 'react';
import css from './index.module.scss';
import { useSelector } from 'react-redux';
import { getJarsWithTransactions } from '../../store/modules/jars/selectors';
import { getTransactions } from '../../store/modules/transactions/selectors';
import { AllTransactionsTable } from '../../components/AllTransactionsTable';
import { useJarStore } from '../../hooks';
import { CreateJarModal } from '../../components/CreateJarModal';
import { Jars } from '../../components/Jars';

interface HomePageProps {}

export const HomePage = (props: HomePageProps) => {
  const jars = useSelector(getJarsWithTransactions);
  const transactions = useSelector(getTransactions);
  const jarStore = useJarStore();

  return (
    <>
      Słoiki
      <Jars jars={jarStore.jars} />
      <CreateJarModal onCreate={jarStore.createJar} />
      <AllTransactionsTable transactions={transactions} />
    </>
  );
};

export default HomePage;
