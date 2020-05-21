import React, { useState } from 'react';
import css from './index.module.scss';
import { Form, Button } from 'carbon-components-react';
import { NumberInput } from '../NumberInput';
import { Jar } from '../../types';

interface JarFundsActionsProps {
  currentJar: Jar;
  onFundsAdd: (jarId: number, amount: number) => void;
  onFundsRemove: (jarId: number, amount: number) => void;
}

export const JarFundsActions = (props: JarFundsActionsProps) => {
  const [fundsToAdd, setFundsToAdd] = useState(150);
  const [fundsToRemove, setFundsToRemove] = useState(150);

  const handleFundsAdd = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    props.onFundsAdd(props.currentJar.id, fundsToAdd);
  };

  const handleFundsRemove = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    props.onFundsRemove(props.currentJar.id, fundsToRemove);
  };

  return (
    <div className={css.container}>
      <Form onSubmit={handleFundsAdd} className={css.form_item}>
        <NumberInput
          id="add-funds-input"
          label="Wpłać środki"
          max={10000}
          min={0}
          value={fundsToAdd}
          onChange={setFundsToAdd}
        />
        <Button
          kind="primary"
          tabIndex={0}
          type="submit"
          className={css.button}
        >
          Wpłać
        </Button>
      </Form>
      <Form onSubmit={handleFundsRemove} className={css.form_item}>
        <NumberInput
          id="remove-funds-input"
          label="Wypłać środki"
          max={10000}
          min={0}
          value={fundsToRemove}
          onChange={setFundsToRemove}
        />
        <Button
          kind="primary"
          tabIndex={0}
          type="submit"
          className={css.button}
        >
          Wypłać
        </Button>
      </Form>
    </div>
  );
};
