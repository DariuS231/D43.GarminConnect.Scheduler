import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import * as React from 'react';
import { IToggleOptionButtonsProps } from '.';

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
export const ToggleOptionButtons = <T extends unknown>(
  props: IToggleOptionButtonsProps<T>
): JSX.Element => {
  const options = props.options.map((item, i) => (
    <ToggleButton value={item.key} key={i}>
      {item.displayName}
    </ToggleButton>
  ));
  return (
    <ToggleButtonGroup
      color='primary'
      exclusive={props.exclusive}
      value={props.value}
      onChange={(event: React.MouseEvent<HTMLElement>, newMode: string) => {
        props.onChange(newMode);
      }}
    >
      {options}
    </ToggleButtonGroup>
  );
};
