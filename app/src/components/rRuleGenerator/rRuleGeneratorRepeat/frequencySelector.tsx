import * as React from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { Frequency, RRule, Options } from 'rrule';
import { buildBaseOptions } from '../rRuleGenerator.utils';

export interface IFrequencySelectorProps {
  rrule: RRule;
  onChange: (newOptions: Partial<Options>) => void;
}

export const FrequencySelector = (props: IFrequencySelectorProps): JSX.Element => {
  const { rrule, onChange } = props;
  const { freq, dtstart, until } = rrule.options;

  const onFreqChange = (event: SelectChangeEvent<Frequency>) => {
    const newFrequency = parseInt(event.target.value.toString()) as Frequency;
    let newOptions = buildBaseOptions(newFrequency, dtstart, until as Date);

    switch (newFrequency) {
      case Frequency.WEEKLY:
        newOptions.byweekday = [];
        break;
      case Frequency.MONTHLY:
        newOptions = { ...newOptions, bymonthday: 1 };
        break;
    }

    onChange(newOptions);
  };

  return (
    <div>
      <RadioGroup row value={freq} onChange={onFreqChange}>
        <FormControlLabel value={Frequency.DAILY} control={<Radio />} label='Daily' />
        <FormControlLabel value={Frequency.WEEKLY} control={<Radio />} label='Weekly' />
        <FormControlLabel value={Frequency.MONTHLY} control={<Radio />} label='Monthly' />
      </RadioGroup>
    </div>
  );
};
