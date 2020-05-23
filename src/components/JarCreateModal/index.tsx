import React, { useState } from 'react';
import { NumberInput, RadioButton } from 'carbon-components-react';
import type { Currency } from '../../types';
import { RadioGroup } from '../RadioGroup';
import { CURRENCIES } from '../../common/consts';
import { Modal } from '../Modal';

interface JarCreateModal {
  onCreate: (currency: Currency, balance: number) => void;
}

export const JarCreateModal = (props: JarCreateModal) => {
  const [balance, setBalance] = useState(250);
  const [currency, setCurrency] = useState<Currency>('PLN');

  const handleSubmit = () => props.onCreate(currency, balance);

  return (
    <Modal
      title="Utwórz słoik"
      label="Tworzenie nowego słoika"
      confirmText="Utwórz"
      onSubmit={handleSubmit}
    >
      <NumberInput
        id="ID"
        label="Środki"
        max={10000}
        min={0}
        value={balance}
        onChange={(event) => setBalance(Number(event.target.value))}
      />
      <RadioGroup
        name="select-currency"
        title="Wybierz walutę"
        value={currency}
        onChange={(newCurrency) => setCurrency(newCurrency)}
      >
        {CURRENCIES.map((ccy) => (
          <RadioButton key={ccy} labelText={ccy} value={ccy} />
        ))}
      </RadioGroup>
    </Modal>
  );
};
