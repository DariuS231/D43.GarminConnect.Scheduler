import * as React from 'react';
import { IRRuleGeneratorRepeatWeekly, RRuleFrequency } from '.';
import { NumberOptionsSelect } from '../../numberOptionsSelect';
import { ToggleOptionButtons } from '../../toggleOptionButtons';
import { TypographyBody } from '../../typographyBody';

export interface IFrequencyWeeklyProps {
  frequency: RRuleFrequency;
  repeat: IRRuleGeneratorRepeatWeekly;
  onChange: (repeat: IRRuleGeneratorRepeatWeekly) => void;
}

export const FrequencyWeekly = (props: IFrequencyWeeklyProps): JSX.Element => {
  if (props.frequency !== RRuleFrequency.Weekly) {
    return <></>;
  }

  return (
    <div>
      <TypographyBody prefix='Repeat every' sufix={props.repeat.every > 1 ? 'Weeks' : 'Week'}>
        <NumberOptionsSelect
          optionsCount={52}
          value={props.repeat.every.toString()}
          onChange={(value: string) => {
            props.onChange({ ...props.repeat, every: parseInt(value) });
          }}
        />
      </TypographyBody>
      <ToggleOptionButtons
        value={props.repeat.days}
        onChange={(days) => {
          props.onChange({ ...props.repeat, days: days as string[] });
        }}
        options={[
          { key: 'Mon', displayName: 'Mon' },
          { key: 'Tue', displayName: 'Tue' },
          { key: 'Wed', displayName: 'Wed' },
          { key: 'Thu', displayName: 'Thu' },
          { key: 'Fri', displayName: 'Fri' },
          { key: 'Sat', displayName: 'Sat' },
          { key: 'Sun', displayName: 'Sun' }
        ]}
      />
    </div>
  );
};
