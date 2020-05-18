import React, { useState } from 'react';
import css from './index.module.scss';
import { Table } from '../../components/Table';
import { useJar } from '../../hooks';
import { NumberInput, Button, Form } from 'carbon-components-react';

export const HomePage = () => {
  const [todo, setTodo] = useState<any>();
  const jar = useJar();
  const [funds, nextFunds] = useState(150);

  const transactionData = {
    ID: 1,
    Kwota: 200,
    Data: '2015-01-01',
    Tytuł: 'Payment',
  };

  const handleFundsAdd = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    jar.addFunds(funds);
  };

  const handleFundsRemove = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    jar.addFunds(funds);
  };

  return (
    <main>
      Środki: {jar.data.balance}
      <Form onSubmit={handleFundsAdd}>
        <NumberInput
          id="add-funds-input"
          invalidText="Nieprawidłowa ilość. Maksymalna wartość to 1000."
          label="Wpłać środki"
          max={1000}
          min={0}
          step={10}
          value={funds}
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
          step={10}
          value={funds}
        />
        <Button kind="primary" tabIndex={0} type="submit">
          Wypłać
        </Button>
      </Form>
      <Table
        title="Transakcje"
        headers={['ID', 'Kwota', 'Tytuł', 'Data']}
        rows={[transactionData]}
      />
    </main>
  );
};

export default HomePage;
