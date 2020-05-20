import React, { useState } from 'react';
import {
  ModalWrapper,
  RadioButton,
  Slider,
  InlineNotification,
  ToastNotification,
} from 'carbon-components-react';
import { useDispatch } from 'react-redux';
import { jarFundsTransferred } from '../../store/actions';
import { Jar } from '../../types';
import { useTimeoutBool } from '../../hooks/useTimeoutBool';
import { RadioGroup } from '../RadioGroup';
import { Modal } from '../Modal';

interface TransferProps {
  jars: Jar[];
  currentJar: Jar;
}

export const Transfer = (props: TransferProps) => {
  const dispatch = useDispatch();
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
  };

  const isTransactionNotAllowed = (targetJar: Jar): boolean => {
    const isSameJar = targetJar.id === props.currentJar.id;
    const isNotEqualCurrency =
      targetJar.currency !== props.currentJar.currency;

    if (isSameJar || isNotEqualCurrency) {
      return true;
    }
    return false;
  };

  const checkedJars = props.jars.map((jar) => ({
    isTransferAllowed: !isTransactionNotAllowed(jar),
    data: jar,
  }));

  const allowedTransactionJars = checkedJars.filter(
    (jar) => jar.isTransferAllowed,
  );

  return (
    <>
      <Modal
        title="Przelej środki na inny słoik"
        label="Transfer środków"
        confirmText="Przelej"
        isDisabled={selectedJarId === null}
        onSubmit={handleTransfer}
      >
        <Slider
          id="slider"
          labelText="Kwota jaką chcesz przelać"
          min={1}
          max={props.currentJar.balance}
          step={1}
          value={transferAmount}
          onChange={(event) => setTransferAmount(event.value)}
        />
        <RadioGroup
          title="Wybierz słoik na który chcesz wpłacić środki"
          value={String(selectedJarId)}
          onChange={(jarId) => setSelectedJarId(Number(jarId))}
        >
          {props.jars.map((jar) => (
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
          title={`Możesz przelać środki jedynie na słoik o różnym id (innym niż ${props.currentJar.id}), oraz o takiej samej walucie (${props.currentJar.currency}).`}
          hideCloseButton
        />
      </Modal>
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
