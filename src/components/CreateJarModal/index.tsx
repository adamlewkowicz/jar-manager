import React, { useState } from 'react';
import css from './index.module.scss';
import {
  ModalWrapper,
  NumberInput,
  RadioButton,
} from 'carbon-components-react';
import { Currency } from '../../types';
import { RadioGroup } from '../RadioGroup';
import { CURRENCIES } from '../../common/consts';

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
      buttonTriggerClassName={css.button}
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
      <RadioGroup
        title="Wybierz walutę"
        value={currency}
        onChange={(currency) => setCurrency(currency)}
      >
        {CURRENCIES.map((currency) => (
          <RadioButton
            key={currency}
            labelText={currency}
            value={currency}
          />
        ))}
      </RadioGroup>
    </ModalWrapper>
  );
};
