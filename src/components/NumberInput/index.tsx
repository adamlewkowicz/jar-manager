import React, { useRef } from 'react';
import css from './index.module.scss';
import {
  NumberInput as CarbonNumberInput,
  NumberInputProps as CarbonNumberInputProps,
} from 'carbon-components-react';
import { useUniqueId } from '../../hooks';

interface NumberInputProps
  extends Omit<CarbonNumberInputProps, 'onChange' | 'ref'> {
  max: number;
  onChange: (value: number) => void;
}

export const NumberInput = ({
  onChange,
  value,
  ...props
}: NumberInputProps) => {
  const id = useUniqueId();

  const handleOnChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = Number(event.target.value);

    if (Number.isNaN(value)) {
      onChange(0);
    }
    onChange(value);
  };

  return (
    <CarbonNumberInput
      id={`number-input-${id}`}
      invalidText={`Nieprawidłowa ilość. Maksymalna wartość to ${props.max}.`}
      value={value}
      onChange={handleOnChange}
      {...props}
    />
  );
};

NumberInput.defaultProps = {
  min: 0,
};
