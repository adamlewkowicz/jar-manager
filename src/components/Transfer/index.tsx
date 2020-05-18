import React, { useState } from 'react';
import {
  ModalWrapper,
  RadioButtonGroup,
  FormGroup,
  RadioButton,
  Slider,
} from 'carbon-components-react';
import { useSelector, useDispatch } from 'react-redux';
import { getJars } from '../../store/modules/jars/selectors';
import { jarFundsTransferred } from '../../store/actions';
import { Jar } from '../../types';

interface TransferProps {}

export const Transfer = (props: TransferProps) => {
  const dispatch = useDispatch();
  const jars = useSelector(getJars);
  const currentJar = jars[0];
  const [selectedJarId, setSelectedJarId] = useState<number | null>(
    null,
  );
  const [transferAmount, setTransferAmount] = useState(0);

  const handleTransfer = () => {
    dispatch(
      jarFundsTransferred({
        fromJarId: 1,
        toJarId: selectedJarId,
        amount: transferAmount,
      }),
    );

    return true;
  };

  const isTransactionNotAllowed = (
    fromJar: Jar,
    toJar: Jar,
  ): boolean => {
    const isSameJar = fromJar.id === currentJar.id;
    const isNotEqualCurrency = fromJar.currency !== toJar.currency;

    if (isSameJar || isNotEqualCurrency) {
      return true;
    }
    return false;
  };

  return (
    <ModalWrapper
      buttonTriggerText="Przelej środki na inny słoik"
      modalHeading="Przelej środki na inny słoik"
      modalLabel="Transfer środków"
      primaryButtonText="Przelej"
      secondaryButtonText="Anuluj"
      handleSubmit={handleTransfer}
      primaryButtonDisabled={selectedJarId === null}
    >
      <Slider
        id="slider"
        labelText="Kwota jaką chcesz przelać"
        min={1}
        max={jars[0]?.balance}
        step={1}
        value={transferAmount}
        onChange={(event) => setTransferAmount(event.value)}
      />
      <FormGroup legendText="Słoik na który chcesz wpłacić środki">
        <RadioButtonGroup
          orientation="vertical"
          labelPosition="right"
          name="radio-button-group"
          valueSelected={String(selectedJarId)}
          onChange={(jarId) => setSelectedJarId(Number(jarId))}
        >
          {jars.map((jar) => (
            <RadioButton
              key={jar.id}
              labelText={`Słoik ${jar.id} - ${jar.balance} ${jar.currency}`}
              value={String(jar.id)}
              disabled={isTransactionNotAllowed(currentJar, jar)}
            />
          ))}
        </RadioButtonGroup>
      </FormGroup>
    </ModalWrapper>
  );
};
