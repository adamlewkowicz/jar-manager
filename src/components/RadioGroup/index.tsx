import React, { ReactNode } from 'react';
import css from './index.module.scss';
import {
  FormGroup,
  RadioButtonGroup,
  RadioButton,
} from 'carbon-components-react';

interface RadioGroupProps<T extends string> {
  title: string;
  value: T;
  onChange: (value: T) => void;
  children: ReactNode;
  name: string;
}

export const RadioGroup = <T extends string>(
  props: RadioGroupProps<T>,
) => {
  return (
    <FormGroup legendText={props.title} style={{ marginTop: 20 }}>
      <RadioButtonGroup
        orientation="vertical"
        labelPosition="right"
        name={props.name}
        valueSelected={props.value}
        onChange={(value) => props.onChange(value as T)}
      >
        {props.children}
      </RadioButtonGroup>
    </FormGroup>
  );
};
