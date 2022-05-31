import * as React from 'react';
import { RRuleFrequency } from '.';
import { IRRuleGeneratorRepeatDaily } from './rRuleGeneratorRepeat.types';
import { NumberOptionsSelect } from '../../numberOptionsSelect';
import { TypographyBody } from '../../typographyBody';

export interface IFrequencyDailyProps {
  frequency: RRuleFrequency;
  repeat: IRRuleGeneratorRepeatDaily;
  onChange: (repeat: IRRuleGeneratorRepeatDaily) => void;
}

export const FrequencyDaily = (props: IFrequencyDailyProps): JSX.Element => {
  if (props.frequency !== RRuleFrequency.Daily) {
    return <></>;
  }
  return (
    <TypographyBody prefix='Repeat every' sufix={props.repeat.every > 1 ? 'Days' : 'Day'}>
      <NumberOptionsSelect
        optionsCount={31}
        value={props.repeat.every.toString()}
        onChange={(value: string) => {
          props.onChange({ ...props.repeat, every: parseInt(value) });
        }}
      />
    </TypographyBody>
  );
};
