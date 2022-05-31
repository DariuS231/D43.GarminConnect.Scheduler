import * as React from 'react';
import { StringOptionsSelect } from '../../stringOptionsSelect';
import { TypographyBody } from '../../typographyBody';
import { MonthlyRepeatMode } from './frequencyMonthly';
import { IRepeatOnThe } from './rRuleGeneratorRepeat.types';

export interface IFrequencyMonthlyOnTheProps {
  mode: MonthlyRepeatMode;
  value: IRepeatOnThe;
  onChange: (repeatOn: IRepeatOnThe) => void;
}

export const FrequencyMonthlyOnThe = (props: IFrequencyMonthlyOnTheProps): JSX.Element => {
  if (props.mode !== MonthlyRepeatMode.OnThe) {
    return <></>;
  }

  const ordinalOptions = ['First', 'Second', 'Third', 'Fourth', 'Last'];
  const daysOptions = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
    'Day',
    'Week Day',
    'Weekend Day'
  ];

  return (
    <div>
      <TypographyBody prefix='On the' sufix='of each month'>
        <StringOptionsSelect
          value={props.value.ordinal}
          options={ordinalOptions}
          onChange={(newValue: string) => {
            props.onChange({ ...props.value, ordinal: newValue });
          }}
        />{' '}
        <StringOptionsSelect
          value={props.value.day}
          options={daysOptions}
          onChange={(newValue: string) => {
            props.onChange({ ...props.value, day: newValue });
          }}
        />
      </TypographyBody>
    </div>
  );
};
