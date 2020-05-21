import React, { useState } from 'react';
import css from './index.module.scss';
import { getJarsWithTransactions } from '../../store/modules/jars/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { Transfer } from '../../components/Transfer';
import {
  jarFundsAdded,
  jarFundsRemoved,
  jarCreated,
} from '../../store/actions';
import { Currency } from '../../types';
import { TransactionsTable } from '../../components/TransactionsTable';
import { JarFundsActions } from '../../components/JarFundsActions';
import { useRouter } from 'next/router';
import { useQueryJarId } from '../../hooks/useQueryJarId';
import { SectionTitle } from '../../components/SectionTitle';

export const JarPage = () => {
  const jars = useSelector(getJarsWithTransactions);
  const dispatch = useDispatch();
  const jarId = useQueryJarId();

  const currentJar = jars.find((jar) => jar.id === Number(jarId));

  if (!currentJar) {
    throw new Error(`Nie znaleziono słoika o id ${jarId}`);
  }

  const handleFundsAdd = (funds: number) => {
    dispatch(jarFundsAdded(currentJar.id, funds));
  };

  const handleFundsRemove = (funds: number) => {
    dispatch(jarFundsRemoved(currentJar.id, funds));
  };

  const handleJarCreate = (currency: Currency, balance: number) => {
    dispatch(jarCreated({ currency, balance }));
  };

  return (
    <main>
      <h2 className={css.balance}>
        Saldo: {currentJar.balance} {currentJar.currency}
      </h2>
      <SectionTitle>Zarządzaj słoikiem</SectionTitle>
      <JarFundsActions
        onFundsAdd={handleFundsAdd}
        onFundsRemove={handleFundsRemove}
      />
      <SectionTitle>Historia transakcji słoika</SectionTitle>
      <TransactionsTable transactions={currentJar.transactions} />
    </main>
  );
};

export default JarPage;
