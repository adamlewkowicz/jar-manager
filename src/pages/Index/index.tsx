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

export const HomePage = () => {
  const [todo, setTodo] = useState<any>();
  const [funds, setFunds] = useState(150);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const jars = useSelector(getJarsWithTransactions);
  const dispatch = useDispatch();

  const currentJar = jars[0];

  const normalizedTransactions = currentJar.transactions.map(
    (trx) => ({
      id: String(trx.id),
      ID: trx.id,
      Kwota: trx.amount,
      Data: trx.date,
      Tytuł: trx.title,
    }),
  );

  const handleFundsAdd = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    dispatch(jarFundsAdded(currentJar.id, funds));
  };

  const handleFundsRemove = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    dispatch(jarFundsRemoved(currentJar.id, funds));
  };

  const handleJarCreate = (currency: Currency, balance: number) => {
    dispatch(jarCreated({ currency, balance }));
  };

  return (
    <main>
      Środki: {currentJar.balance} {currentJar.currency}
      <Form onSubmit={handleFundsAdd}>
        <NumberInput
          id="add-funds-input"
          invalidText="Nieprawidłowa ilość. Maksymalna wartość to 1000."
          label="Wpłać środki"
          max={1000}
          min={0}
          value={funds}
          onChange={(event) => setFunds(Number(event.target.value))}
        />
        <Button kind="primary" tabIndex={0} type="submit">
          Wpłać
        </Button>
      </Form>
      <Form onSubmit={handleFundsRemove}>
        <NumberInput
          id="remove-funds-input"
          invalidText="Nieprawidłowa ilość. Maksymalna wartość to 1000."
          label="Wypłać środki"
          max={1000}
          min={0}
          value={funds}
          onChange={(event) => setFunds(Number(event.target.value))}
        />
        <Button kind="primary" tabIndex={0} type="submit">
          Wypłać
        </Button>
      </Form>
      <Transfer />
      <CreateJarModal onCreate={handleJarCreate} />
      <Table
        title="Transakcje"
        headers={['ID', 'Kwota', 'Tytuł', 'Data']}
        rows={normalizedTransactions}
      />
    </main>
  );
};

export default HomePage;
