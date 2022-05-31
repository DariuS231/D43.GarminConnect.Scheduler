import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import * as React from 'react';
import { IToggleOptionButtonsProps } from '.';

export const ToggleOptionButtons = (props: IToggleOptionButtonsProps): JSX.Element => {
  const options = props.options.map((i) => (
    <ToggleButton value={i.key} key={i.key}>
      {i.displayName}
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
