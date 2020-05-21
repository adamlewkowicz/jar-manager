import React, { useMemo } from 'react';
import css from './index.module.scss';
import { TransactionsTable } from '../../components/TransactionsTable';
import { JarFundsActions } from '../../components/JarFundsActions';
import { SectionTitle } from '../../components/SectionTitle';
import { useJarStore, useQueryJarId } from '../../hooks';

export const JarPage = () => {
  const jarId = useQueryJarId();
  const jarStore = useJarStore();

  const currentJar = useMemo(
    () => jarStore.jars.find((jar) => jar.id === jarId),
    [jarStore.jars, jarId],
  );

  if (!currentJar) {
    return (
      <SectionTitle>Słoik o podanym id nie istnieje</SectionTitle>
    );
  }

  return (
    <main>
      <h2 className={css.balance}>
        Saldo: {currentJar.balance} {currentJar.currency}
      </h2>
      <SectionTitle>Zarządzaj słoikiem</SectionTitle>
      <JarFundsActions
        currentJar={currentJar}
        onFundsAdd={jarStore.fundsAdd}
        onFundsRemove={jarStore.fundsRemove}
      />
      <SectionTitle>Historia transakcji słoika</SectionTitle>
      <TransactionsTable transactions={currentJar.transactions} />
    </main>
  );
};

export default JarPage;
