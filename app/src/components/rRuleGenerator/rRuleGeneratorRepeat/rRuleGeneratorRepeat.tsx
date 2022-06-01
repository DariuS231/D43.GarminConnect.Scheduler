import * as React from 'react';
import { IRRuleGeneratorRepeatProps } from '.';
import { FrequencyDaily } from './frequencyDaily';
import { FrequencySelector } from './frequencySelector';
import { FrequencyWeekly } from './frequencyWeekly';
import { RRule, Frequency, Weekday } from 'rrule';

import './rRuleGeneratorRepeat.module.scss';
import { buildBaseOptions } from '../rRuleGenerator.utils';

export const RRuleGeneratorRepeat = (props: IRRuleGeneratorRepeatProps): JSX.Element => {
  /*
On Day
DTSTART:20190301T000000Z
RRULE:FREQ=MONTHLY;INTERVAL=1;BYMONTHDAY=2

On The
DTSTART:20190301T000000Z
RRULE:FREQ=MONTHLY;INTERVAL=1;BYSETPOS=-1;BYDAY=MO,TU,WE,TH,FR
*/
  const { rrule, onRruleChange } = props;
  const { freq, dtstart, until, interval, byweekday } = rrule.options;

  const onRepeatChange = (newInterval: number) => {
    onRruleChange(new RRule({ ...rrule.options, interval: newInterval }));
  };
  return (
    <div>
      <FrequencySelector
        frequency={freq}
        onChange={(newFrequency) => {
          const newOptions = buildBaseOptions(newFrequency, dtstart, until as Date);

          switch (newFrequency) {
            case Frequency.WEEKLY:
              newOptions.byweekday = [new Weekday(1)];
              break;
            case Frequency.MONTHLY:
              break;
          }

          onRruleChange(new RRule(newOptions));
        }}
      />
      <FrequencyDaily frequency={freq} repeat={interval} onRepeatChange={onRepeatChange} />
      <FrequencyWeekly
        frequency={freq}
        repeat={interval}
        onRepeatChange={onRepeatChange}
        weekDays={byweekday as unknown as Weekday[]}
        onDaysChange={(newByweekday) => {
          onRruleChange(new RRule({ ...rrule.options, byweekday: newByweekday }));
        }}
      />
      {/* <FrequencyMonthly frequency={freq} repeat={interval} onRepeatChange={onRepeatChange} /> */}
    </div>
  );
};
