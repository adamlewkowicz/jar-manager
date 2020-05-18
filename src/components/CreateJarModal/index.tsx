import React, { useState } from 'react';
import css from './index.module.scss';
import {
  ModalWrapper,
  TextInput,
  NumberInput,
} from 'carbon-components-react';
import { Jar, Currency } from '../../types';

interface CreateJarModalProps {}

export const CreateJarModal = (props: CreateJarModalProps) => {
  const [balance, setBalance] = useState(250);
  const [currency, setCurrency] = useState<Currency>('PLN');

  return (
    <ModalWrapper
      buttonTriggerText="Utwórz słoik"
      modalHeading="Tworzenie nowego słoika"
      modalLabel="Utwórz słoik"
      primaryButtonText="Utwórz"
      secondaryButtonText="Anuluj"
      handleSubmit={() => true}
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
    </ModalWrapper>
  );
};
