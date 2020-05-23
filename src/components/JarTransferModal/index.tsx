import React from 'react';
import { RadioButton, Slider, InlineNotification } from 'carbon-components-react';
import type { JarFundsTransferPayload } from '../../store/actions';
import { Jar } from '../../types';
import { RadioGroup } from '../RadioGroup';
import { Modal } from '../Modal';
import { getJarTitle } from '../../utils';
import { useJarTransfer } from '../../hooks/useJarTransfer';

interface JarTransferModalProps {
  jars: Jar[];
  onFundsTransfer: (payload: JarFundsTransferPayload) => void;
}

export const JarTransferModal = (props: JarTransferModalProps) => {
  const transfer = useJarTransfer(props.jars);
  const isDisabled = transfer.state.currentJar === null || transfer.state.amount === 0;

  const handleTransfer = () => {
    const { currentJar, targetJar, amount } = transfer.state;

    if (!currentJar || !targetJar || amount === 0) {
      return;
    }

    props.onFundsTransfer({
      fromJarId: currentJar.id,
      toJarId: targetJar.id,
      amount,
    });
  };

  return (
    <>
      <Modal
        title="Przelej środki"
        label="Transfer środków"
        confirmText="Przelej"
        isDisabled={isDisabled}
        onSubmit={handleTransfer}
      >
        <RadioGroup
          title="Wybierz słoik z którego chcesz przelać środki"
          name="transfer-from-jar"
          value={String(transfer.state.currentJar?.id)}
          onChange={transfer.updateCurrentJarId}
        >
          {transfer.state.jars.map((jar) => (
            <RadioButton
              key={jar.id}
              labelText={getJarTitle(jar)}
              value={String(jar.id)}
            />
          ))}
        </RadioGroup>
        <Slider
          id="slider"
          labelText="Kwota jaką chcesz przelać"
          min={0}
          max={transfer.maxAmount}
          step={1}
          value={transfer.state.amount}
          onChange={(event) => transfer.updateAmount(event.value)}
        />
        <RadioGroup
          title="Wybierz słoik na który chcesz wpłacić środki"
          name="transfer-to-jar"
          value={String(transfer.state.targetJar?.id)}
          onChange={transfer.updateTargetJarId}
        >
          {transfer.state.targetJars.map((jar) => (
            <RadioButton
              key={jar.data.id}
              labelText={`${getJarTitle(jar.data)} ${
                jar.data.isDefault ? '- Domyślny' : ''
              }`}
              value={String(jar.data.id)}
              disabled={!jar.isTransferAllowed}
            />
          ))}
        </RadioGroup>
        <InlineNotification
          kind="info"
          title="Możesz przelać środki jedynie na słoik o innym id, oraz o takiej samej walucie jak wybrany."
          hideCloseButton
        />
        {transfer.state.targetJar === null && (
          <InlineNotification
            kind="warning"
            title="Nie wybrałeś słoika na który chcesz wpłacić. Kwota zostanie rozdzielona pomiędzy dostępne słoiki."
            hideCloseButton
          />
        )}
      </Modal>
    </>
  );
};
