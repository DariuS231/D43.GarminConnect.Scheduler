import * as React from 'react';
import { IKeyValueOption, StringOptionsSelect } from '../../stringOptionsSelect';
import { TypographyBody } from '../../typographyBody';
import { MonthlyRepeatMode } from './rRuleGeneratorRepeat.types';

export interface IOnTheValue {
  bysetpos: number;
  byweekday: number[];
}
export interface IFrequencyMonthlyOnTheProps {
  mode: MonthlyRepeatMode;
  value: IOnTheValue;
  onChange: (newValue: IOnTheValue) => void;
}
const ordinalOptions = [
  { value: '1', key: 'First' },
  { value: '2', key: 'Second' },
  { value: '3', key: 'Third' },
  { value: '4', key: 'Fourth' },
  { value: '-1', key: 'Last' }
];
const daysOptions = [
  { value: '0', key: 'Monday' },
  { value: '1', key: 'Tuesday' },
  { value: '2', key: 'Wednesday' },
  { value: '3', key: 'Thursday' },
  { value: '4', key: 'Friday' },
  { value: '5', key: 'Saturday' },
  { value: '6', key: 'Sunday' },
  { value: '0,1,3,4,5,6,7', key: 'Day' },
  { value: '0,1,3,4,5', key: 'Week Day' },
  { value: '6,7', key: 'Weekend Day' }
];

export const FrequencyMonthlyOnThe = (props: IFrequencyMonthlyOnTheProps): JSX.Element => {
  const { mode, onChange, value } = props;
  if (mode !== MonthlyRepeatMode.OnThe) {
    return <></>;
  }

  const { bysetpos, byweekday } = value;

  return (
    <div>
      <TypographyBody prefix='On the' sufix='of each month'>
        <StringOptionsSelect
          value={bysetpos.toString()}
          options={ordinalOptions}
          onChange={(newValue: string | IKeyValueOption) => {
            onChange({
              ...value,
              bysetpos: parseInt(newValue as string)
            });
          }}
        />{' '}
        <StringOptionsSelect
          value={byweekday.toString()}
          options={daysOptions}
          onChange={(newValue: string | IKeyValueOption) => {
            const array = (newValue as string).split(',');
            onChange({ ...value, byweekday: array.map((v) => parseInt(v)) });
          }}
        />
      </TypographyBody>
    </div>
  );
};
