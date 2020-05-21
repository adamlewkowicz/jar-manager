import React, { useMemo } from 'react';
import css from './index.module.scss';
import { JarFundsActions } from '../../components/JarFundsActions';
import { H2 } from '../../components/H2';
import { useJarStore, useQueryJarId } from '../../hooks';
import { TransactionsTable } from '../../components/TransactionsTable';

export const JarPage = () => {
  const jarId = useQueryJarId();
  const jarStore = useJarStore();

  const currentJar = useMemo(
    () => jarStore.jars.find((jar) => jar.id === jarId),
    [jarStore.jars, jarId],
  );

  if (!currentJar) {
    return <H2>Słoik o podanym id nie istnieje</H2>;
  }

  return (
    <main>
      <h2 className={css.balance}>
        Saldo: {currentJar.balance} {currentJar.currency}
      </h2>
      <H2>Zarządzaj słoikiem</H2>
      <JarFundsActions
        currentJar={currentJar}
        onFundsAdd={jarStore.fundsAdd}
        onFundsRemove={jarStore.fundsRemove}
      />
      <H2>Historia transakcji słoika</H2>
      <TransactionsTable transactions={currentJar.transactions} />
    </main>
  );
};

export default JarPage;
