import * as React from 'react';
import { Frequency } from 'rrule';
import { NumberOptionsSelect } from '../../numberOptionsSelect';
import { TypographyBody } from '../../typographyBody';

export interface IFrequencyDailyProps {
  frequency: Frequency;
  repeat: number;
  onRepeatChange: (repeat: number) => void;
}

export const FrequencyDaily = (props: IFrequencyDailyProps): JSX.Element => {
  if (props.frequency !== Frequency.DAILY) {
    return <></>;
  }
  return (
    <TypographyBody prefix='Repeat every' sufix={props.repeat > 1 ? 'Days' : 'Day'}>
      <NumberOptionsSelect
        optionsCount={31}
        value={props.repeat.toString()}
        onChange={(value: string) => {
          props.onRepeatChange(parseInt(value));
        }}
      />
    </TypographyBody>
  );
};
