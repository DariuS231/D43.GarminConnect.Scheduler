import * as React from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { RRuleFrequency } from '.';

export interface IFrequencySelectorProps {
  frequency: RRuleFrequency;
  onChange: (event: SelectChangeEvent<RRuleFrequency>) => void;
}

export const FrequencySelector = (props: IFrequencySelectorProps): JSX.Element => {
  return (
    <div>
      <RadioGroup row value={props.frequency} onChange={props.onChange}>
        <FormControlLabel
          value={RRuleFrequency.Daily}
          control={<Radio />}
          label={RRuleFrequency.Daily}
        />
        <FormControlLabel
          value={RRuleFrequency.Weekly}
          control={<Radio />}
          label={RRuleFrequency.Weekly}
        />
        <FormControlLabel
          value={RRuleFrequency.Monthly}
          control={<Radio />}
          label={RRuleFrequency.Monthly}
        />
      </RadioGroup>
    </div>
  );
};
