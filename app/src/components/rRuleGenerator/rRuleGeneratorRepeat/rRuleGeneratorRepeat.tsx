import { SelectChangeEvent } from '@mui/material/Select';
import * as React from 'react';
import {
  IRRuleGeneratorRepeatDaily,
  IRRuleGeneratorRepeatMonthly,
  IRRuleGeneratorRepeatWeekly,
  RRuleFrequency
} from '.';
import { FrequencyDaily } from './frequencyDaily';
import { FrequencyMonthly } from './frequencyMonthly';
import { FrequencySelector } from './frequencySelector';
import { FrequencyWeekly } from './frequencyWeekly';

import './rRuleGeneratorRepeat.module.scss';

export const RRuleGeneratorRepeat = (): JSX.Element => {
  const [frequency, setFrequency] = React.useState(RRuleFrequency.Weekly);
  const [repeat, setRepeat] = React.useState({ every: 1 } as
    | IRRuleGeneratorRepeatDaily
    | IRRuleGeneratorRepeatWeekly
    | IRRuleGeneratorRepeatMonthly);

  const onFrequencyChange = (event: SelectChangeEvent<RRuleFrequency>) => {
    const newFrequency = RRuleFrequency[event.target.value as keyof typeof RRuleFrequency];
    setFrequency(newFrequency);
    switch (newFrequency) {
      case RRuleFrequency.Daily:
        setRepeat({ every: 1 } as IRRuleGeneratorRepeatDaily);
        break;
      case RRuleFrequency.Weekly:
        setRepeat({ every: 1, days: [] } as IRRuleGeneratorRepeatWeekly);
        break;
      case RRuleFrequency.Monthly:
        setRepeat({
          every: 1,
          onThe: { ordinal: 'First', day: 'Monday' },
          onDay: 1
        } as IRRuleGeneratorRepeatMonthly);
        break;
    }
  };

  return (
    <div>
      <FrequencySelector frequency={frequency} onChange={onFrequencyChange} />
      <FrequencyDaily
        frequency={frequency}
        repeat={repeat as IRRuleGeneratorRepeatDaily}
        onChange={(repeat) => setRepeat(repeat)}
      />
      <FrequencyWeekly
        frequency={frequency}
        repeat={repeat as IRRuleGeneratorRepeatWeekly}
        onChange={(repeat: IRRuleGeneratorRepeatWeekly) => setRepeat(repeat)}
      />
      <FrequencyMonthly
        frequency={frequency}
        repeat={repeat as IRRuleGeneratorRepeatMonthly}
        onChange={(repeat: IRRuleGeneratorRepeatMonthly) => setRepeat(repeat)}
      />
    </div>
  );
};
