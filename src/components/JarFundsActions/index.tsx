import React, { useState } from 'react';
import css from './index.module.scss';
import { Form, Button } from 'carbon-components-react';
import { NumberInput } from '../NumberInput';

interface JarFundsActionsProps {
  onFundsAdd: (amount: number) => void;
  onFundsRemove: (amount: number) => void;
}

export const JarFundsActions = (props: JarFundsActionsProps) => {
  const [fundsToAdd, setFundsToAdd] = useState(150);
  const [fundsToRemove, setFundsToRemove] = useState(150);

  const handleFundsAdd = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    props.onFundsAdd(fundsToAdd);
  };

  const handleFundsRemove = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    props.onFundsRemove(fundsToRemove);
  };

  return (
    <div className={css.container}>
      <Form onSubmit={handleFundsAdd}>
        <NumberInput
          id="add-funds-input"
          label="Wpłać środki"
          max={1000}
          min={0}
          value={fundsToAdd}
          onChange={setFundsToAdd}
        />
        <Button kind="primary" tabIndex={0} type="submit">
          Wpłać
        </Button>
      </Form>
      <Form onSubmit={handleFundsRemove}>
        <NumberInput
          id="remove-funds-input"
          label="Wypłać środki"
          max={1000}
          min={0}
          value={fundsToRemove}
          onChange={setFundsToRemove}
        />
        <Button kind="primary" tabIndex={0} type="submit">
          Wypłać
        </Button>
      </Form>
    </div>
  );
};
