import React, { useState, useMemo } from 'react';
import {
  RadioButton,
  Slider,
  InlineNotification,
} from 'carbon-components-react';
import type { JarFundsTransfer } from '../../store/actions';
import { Jar } from '../../types';
import { RadioGroup } from '../RadioGroup';
import { Modal } from '../Modal';
import { getJarTitle } from '../../utils';

interface JarTransferModalProps {
  jars: Jar[];
  onFundsTransfer: (payload: JarFundsTransfer) => void;
}

export const JarTransferModal = (props: JarTransferModalProps) => {
  const [transferFromJarId, setTransferFromJarId] = useState<
    number | null
  >(null);
  const [transferToJarId, setTransferToJarId] = useState<
    number | null
  >(null);
  const [transferAmount, setTransferAmount] = useState(1);

  const handleTransfer = () => {
    props.onFundsTransfer({
      fromJarId: transferFromJarId,
      toJarId: transferToJarId,
      amount: transferAmount,
    });
  };

  const currentJar = useMemo(
    () => props.jars.find((jar) => jar.id === transferFromJarId),
    [props.jars, transferFromJarId],
  );

  const transferToJars = useMemo(
    () =>
      props.jars.map((jar) => {
        const isSameJar = jar.id === currentJar?.id;
        const isNotEqualCurrency =
          jar.currency !== currentJar?.currency;
        const isTransferAllowed = !isSameJar && isNotEqualCurrency;
        const currencyTitle =
          currentJar && isNotEqualCurrency
            ? ` - Waluta obu słoików musi być taka sama (${currentJar.currency})`
            : '';
        const title = `${getJarTitle(jar)}${currencyTitle}`;

        return {
          data: jar,
          title,
          isSameJar,
          isNotEqualCurrency,
          isTransferAllowed,
        };
      }),
    [props.jars, currentJar],
  );

  return (
    <>
      <Modal
        title="Przelej środki"
        label="Transfer środków"
        confirmText="Przelej"
        isDisabled={transferFromJarId === null}
        onSubmit={handleTransfer}
      >
        <RadioGroup
          title="Wybierz słoik z którego chcesz przelać środki"
          name="transfer-from-jar"
          value={String(transferFromJarId)}
          onChange={(jarId) => setTransferFromJarId(Number(jarId))}
        >
          {props.jars.map((jar) => (
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
          min={1}
          max={currentJar?.balance ?? 0}
          step={1}
          value={transferAmount}
          onChange={(event) => setTransferAmount(event.value)}
        />
        <RadioGroup
          title="Wybierz słoik na który chcesz wpłacić środki"
          name="transfer-to-jar"
          value={String(transferToJarId)}
          onChange={(jarId) => setTransferToJarId(Number(jarId))}
        >
          {transferToJars.map((jar) => (
            <RadioButton
              key={jar.data.id}
              labelText={jar.title}
              value={String(jar.data.id)}
              disabled={jar.isTransferAllowed}
            />
          ))}
        </RadioGroup>
        <InlineNotification
          kind="info"
          title={`Możesz przelać środki jedynie na słoik o różnym id, oraz o takiej samej walucie.`}
          hideCloseButton
        />
        {transferToJarId === null && (
          <InlineNotification
            kind="warning"
            title={`Nie wybrałeś słoika na który chcesz wpłacić. Kwota zostanie przelana pomiędzy dostępne słoiki.`}
            hideCloseButton
          />
        )}
      </Modal>
    </>
  );
};