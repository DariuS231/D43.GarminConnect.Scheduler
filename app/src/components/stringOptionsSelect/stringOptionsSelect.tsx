import * as React from 'react';
import { IStringOptionsSelectProps } from '.';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import './stringOptionsSelect.module.scss';

export const StringOptionsSelect = (props: IStringOptionsSelectProps): JSX.Element => {
  const options = props.options.map((i) => (
    <MenuItem value={i} key={i}>
      {i}
    </MenuItem>
  ));

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
