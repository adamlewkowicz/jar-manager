import React, { useState, useRef } from 'react';
import {
  ModalWrapper,
  RadioButton,
  Slider,
  InlineNotification,
  ToastNotification,
} from 'carbon-components-react';
import { useSelector, useDispatch } from 'react-redux';
import { getJars } from '../../store/modules/jars/selectors';
import { jarFundsTransferred } from '../../store/actions';
import { Jar } from '../../types';
import { useTimeoutBool } from '../../hooks/useTimeoutBool';
import { RadioGroup } from '../RadioGroup';

interface TransferProps {}

export const Transfer = (props: TransferProps) => {
  const dispatch = useDispatch();
  const jars = useSelector(getJars);
  const currentJar = jars[0];
  const [selectedJarId, setSelectedJarId] = useState<number | null>(
    null,
  );
  const [transferAmount, setTransferAmount] = useState(0);
  const {
    status: isNotificationShown,
    enable: showNotification,
    disable: hideNotification,
  } = useTimeoutBool(2500);

  const handleTransfer = () => {
    dispatch(
      jarFundsTransferred({
        fromJarId: 1,
        toJarId: selectedJarId,
        amount: transferAmount,
      }),
    );

    showNotification();

    return true;
  };

  const isTransactionNotAllowed = (targetJar: Jar): boolean => {
    const isSameJar = targetJar.id === currentJar.id;
    const isNotEqualCurrency =
      targetJar.currency !== currentJar.currency;

    if (isSameJar || isNotEqualCurrency) {
      return true;
    }
    return false;
  };

  return (
    <>
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
        <RadioGroup
          title="Wybierz słoik na który chcesz wpłacić środki"
          value={String(selectedJarId)}
          onChange={(jarId) => setSelectedJarId(Number(jarId))}
        >
          {jars.map((jar) => (
            <RadioButton
              key={jar.id}
              labelText={`Słoik ${jar.id} - ${jar.balance} ${jar.currency}`}
              value={String(jar.id)}
              disabled={isTransactionNotAllowed(jar)}
            />
          ))}
        </RadioGroup>
        <InlineNotification
          kind="warning"
          title={`Możesz przelać środki jedynie na słoik o różnym id (innym niż ${currentJar.id}), oraz o takiej samej walucie (${currentJar.currency}).`}
          hideCloseButton
        />
      </ModalWrapper>
      {isNotificationShown && (
        <ToastNotification
          kind="success"
          caption="00:00:00 AM"
          timeout={2500}
          title="Wykonano transakcję"
          onCloseButtonClick={hideNotification}
        />
      )}
    </>
  );
};
