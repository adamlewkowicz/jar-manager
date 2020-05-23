import React from 'react';
import {
  NumberInput as CarbonNumberInput,
  NumberInputProps as CarbonNumberInputProps,
} from 'carbon-components-react';

interface NumberInputProps extends Omit<CarbonNumberInputProps, 'onChange' | 'ref'> {
  max: number;
  onChange: (value: number) => void;
}

export const NumberInput = ({ onChange, value, ...props }: NumberInputProps) => {
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const parsedValue = Number(event.target.value);

    if (Number.isNaN(parsedValue)) {
      onChange(0);
    }
    onChange(parsedValue);
  };

  return (
    <CarbonNumberInput
      invalidText={`Nieprawidłowa ilość. Maksymalna wartość to ${props.max}.`}
      value={value}
      onChange={handleOnChange}
      allowEmpty
      {...props}
    />
  );
};

NumberInput.defaultProps = {
  min: 0,
};
