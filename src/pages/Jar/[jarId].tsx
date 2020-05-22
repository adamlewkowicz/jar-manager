import React, { useMemo } from 'react';
import css from './index.module.scss';
import { H2, JarFundsActions, TransactionsTable } from '../../components';
import { useJarStore, useQueryJarId } from '../../hooks';
import { Toggle } from 'carbon-components-react';

export const JarPage = () => {
  const jarId = useQueryJarId();
  const jarStore = useJarStore();

  const currentJar = useMemo(() => jarStore.jars.find((jar) => jar.id === jarId), [
    jarStore.jars,
    jarId,
  ]);

  if (!currentJar) {
    return <H2>Słoik o podanym id nie istnieje</H2>;
  }

  return (
    <article>
      <h2 className={css.balance}>
        Saldo: {currentJar.balance} {currentJar.currency}
      </h2>
      <Toggle
        id="jar-default-toggle"
        labelText="Ustawiony jako domyślny"
        labelA="Nie"
        labelB="Tak"
        toggled={currentJar.isDefault}
        onToggle={() => jarStore.updateDefault(currentJar.id)}
        className={css.toggle}
      />
      <H2>Zarządzaj słoikiem</H2>
      <JarFundsActions
        currentJar={currentJar}
        onFundsAdd={jarStore.fundsAdd}
        onFundsRemove={jarStore.fundsRemove}
      />
      <H2>Historia transakcji słoika</H2>
      <TransactionsTable transactions={currentJar.transactions} />
    </article>
  );
};

export default JarPage;
