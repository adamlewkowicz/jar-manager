import React, { useState } from 'react';
import css from './index.module.scss';
import { Table } from '../../components/Table';
import { useJar } from '../../hooks';
import {
  NumberInput,
  Button,
  Form,
  ModalWrapper,
  FormGroup,
  RadioButtonGroup,
  RadioButton,
} from 'carbon-components-react';
import { getJarsWithTransactions } from '../../store/modules/jars/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { Transfer } from '../../components/Transfer';
import {
  jarFundsAdded,
  jarFundsRemoved,
  jarCreated,
} from '../../store/actions';
import { CreateJarModal } from '../../components/CreateJarModal';
import { Currency } from '../../types';
import { TransactionsTable } from '../../components/TransactionsTable';
import { JarFundsActions } from '../../components/JarFundsActions';
import { useRouter } from 'next/router';

export const HomePage = () => {
  const [todo, setTodo] = useState<any>();
  const [isModalOpened, setIsModalOpened] = useState(false);
  const jars = useSelector(getJarsWithTransactions);
  const dispatch = useDispatch();
  const router = useRouter();
  const { jarId } = router.query;

  const currentJar = jars.find((jar) => jar.id === Number(jarId));

  if (!currentJar) {
    return null;
    // throw new Error('Jar not found');
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
      <Transfer />
      <CreateJarModal onCreate={handleJarCreate} />
      <TransactionsTable transactions={currentJar.transactions} />
    </main>
  );
};

export default HomePage;
