import React from 'react';
import {
  Dropdown as CarbonDropdown,
  DropdownProps as CarbonDropdownProps,
} from 'carbon-components-react';

interface DropdownProps<T extends string>
  extends Partial<Omit<CarbonDropdownProps, 'onChange'>> {
  options: T[];
  onChange: (option: T) => void;
}

export const Dropdown = <T extends string>({
  options,
  onChange,
  ...props
}: DropdownProps<T>) => {
  return (
    <CarbonDropdown
      id="dropdown"
      ariaLabel="Dropdown"
      items={options}
      label="Dropdown menu options"
      titleText="Wybierz walutę"
      itemToString={(item) => item}
      onChange={(event) => {
        if (event.selectedItem) {
          onChange(event.selectedItem as T);
        }
      }}
      {...props}
    />
  );
};
