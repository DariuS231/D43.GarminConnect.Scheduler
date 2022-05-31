import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';
import { INumberOptionsSelectProps } from '.';

import './numberOptionsSelect.module.scss';

export const NumberOptionsSelect = (props: INumberOptionsSelectProps): JSX.Element => {
  const options: JSX.Element[] = [];

  for (let i = 1; i <= props.optionsCount; i++) {
    options.push(
      <MenuItem value={i} key={i}>
        {i}
      </MenuItem>
    );
  }

  return (
    <FormControl variant='standard' sx={{ m: 1 }}>
      <Select
        value={props.value}
        onChange={(event: SelectChangeEvent) => {
          props.onChange(event.target.value);
        }}
      >
        {options}
      </Select>
    </FormControl>
  );
};
