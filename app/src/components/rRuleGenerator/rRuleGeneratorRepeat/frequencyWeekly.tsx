import * as React from 'react';
import { Frequency, Weekday } from 'rrule';
import { NumberOptionsSelect } from '../../numberOptionsSelect';
import { ToggleOptionButtons } from '../../toggleOptionButtons';
import { TypographyBody } from '../../typographyBody';

export interface IFrequencyWeeklyProps {
  frequency: Frequency;
  repeat: number;
  onRepeatChange: (repeat: number) => void;
  weekDays: Weekday[];
  onDaysChange: (days: Weekday | Weekday[]) => void;
}

export const FrequencyWeekly = (props: IFrequencyWeeklyProps): JSX.Element => {
  if (props.frequency !== Frequency.WEEKLY) {
    return <></>;
  }

  return (
    <div>
      <TypographyBody prefix='Repeat every' sufix={props.repeat > 1 ? 'Weeks' : 'Week'}>
        <NumberOptionsSelect
          optionsCount={52}
          value={props.repeat.toString()}
          onChange={(value: string) => {
            props.onRepeatChange(parseInt(value));
          }}
        />
      </TypographyBody>
      <ToggleOptionButtons
        value={props.weekDays}
        onChange={props.onDaysChange}
        options={[
          { key: new Weekday(0), displayName: 'Mon' },
          { key: new Weekday(1), displayName: 'Tue' },
          { key: new Weekday(2), displayName: 'Wed' },
          { key: new Weekday(3), displayName: 'Thu' },
          { key: new Weekday(4), displayName: 'Fri' },
          { key: new Weekday(5), displayName: 'Sat' },
          { key: new Weekday(6), displayName: 'Sun' }
        ]}
      />
    </div>
  );
};
