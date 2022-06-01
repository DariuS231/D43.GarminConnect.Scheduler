import * as React from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { Frequency } from 'rrule';

export interface IFrequencySelectorProps {
  frequency: Frequency;
  onChange: (frequency: Frequency) => void;
}

export const FrequencySelector = (props: IFrequencySelectorProps): JSX.Element => {
  const onChange = (event: SelectChangeEvent<Frequency>) => {
    const newFrequency = parseInt(event.target.value.toString()) as Frequency;
    props.onChange(newFrequency);
  };

  return (
    <div>
      <RadioGroup row value={props.frequency} onChange={onChange}>
        <FormControlLabel value={Frequency.DAILY} control={<Radio />} label='Daily' />
        <FormControlLabel value={Frequency.WEEKLY} control={<Radio />} label='Weekly' />
        <FormControlLabel value={Frequency.MONTHLY} control={<Radio />} label='Monthly' />
      </RadioGroup>
    </div>
  );
};
