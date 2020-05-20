import React, { ReactNode } from 'react';
import { ModalWrapper } from 'carbon-components-react';

interface ModalProps {
  title: string;
  label: string;
  confirmText: string;
  children?: ReactNode;
  isDisabled?: boolean;
  onSubmit: () => void;
}

export const Modal = (props: ModalProps) => {
  const handleSubmit = (): boolean => {
    props.onSubmit();
    return true;
  };

  return (
    <ModalWrapper
      buttonTriggerText={props.title}
      modalHeading={props.title}
      modalLabel={props.label}
      primaryButtonText={props.confirmText}
      handleSubmit={handleSubmit}
      primaryButtonDisabled={props.isDisabled}
      secondaryButtonText="Anuluj"
    >
      {props.children}
    </ModalWrapper>
  );
};
