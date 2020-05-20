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

export const JarPage = () => {
  const jars = useSelector(getJarsWithTransactions);
  const dispatch = useDispatch();
  const router = useRouter();
  const { jarId } = router.query;

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
      Środki: {currentJar.balance} {currentJar.currency}
      <JarFundsActions
        onFundsAdd={handleFundsAdd}
        onFundsRemove={handleFundsRemove}
      />
      <Transfer jars={jars} currentJar={currentJar} />
      <TransactionsTable transactions={currentJar.transactions} />
    </main>
  );
};

export default JarPage;
