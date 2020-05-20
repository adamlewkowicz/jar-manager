import React, { useState } from 'react';
import css from './index.module.scss';
import {
  ModalWrapper,
  TextInput,
  NumberInput,
} from 'carbon-components-react';
import { Jar, Currency } from '../../types';
import { Dropdown } from '../Dropdown';

interface CreateJarModalProps {
  onCreate: (currency: Currency, balance: number) => void;
}

export const CreateJarModal = (props: CreateJarModalProps) => {
  const [balance, setBalance] = useState(250);
  const [currency, setCurrency] = useState<Currency>('PLN');

  const handleSubmit = (): boolean => {
    props.onCreate(currency, balance);
    return true;
  };

  return (
    <ModalWrapper
      buttonTriggerText="Utwórz słoik"
      modalHeading="Tworzenie nowego słoika"
      modalLabel="Utwórz słoik"
      primaryButtonText="Utwórz"
      secondaryButtonText="Anuluj"
      handleSubmit={handleSubmit}
      shouldCloseAfterSubmit
    >
      <NumberInput
        id="ID"
        // invalidText="Nieprawidłowa ilość. Maksymalna wartość to 1000."
        label="Środki"
        max={10000}
        min={0}
        value={balance}
        onChange={(event) => setBalance(Number(event.target.value))}
      />
      <Dropdown
        titleText="Wybierz walutę"
        label="Dropdown menu options"
        options={['PLN', 'EUR']}
        onChange={(currency) => setCurrency(currency)}
      />
    </ModalWrapper>
  );
};
