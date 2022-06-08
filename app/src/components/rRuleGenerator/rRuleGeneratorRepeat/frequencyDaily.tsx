import * as React from "react";
import { Frequency, RRule, Options } from "rrule";
import { NumberOptionsSelect } from "../../numberOptionsSelect";
import { TypographyBody } from "../../typographyBody";
import { buildBaseOptions } from "../rRuleGenerator.utils";

export interface IFrequencyDailyProps {
  rrule: RRule;
  onChange: (newOptions: Partial<Options>) => void;
}

export const FrequencyDaily = (props: IFrequencyDailyProps): JSX.Element => {
  const { rrule, onChange } = props;
  const { freq, dtstart, until, interval } = rrule.options;

  if (freq !== Frequency.DAILY) {
    return <></>;
  }

  return (
    <TypographyBody prefix="Repeat every" sufix={interval > 1 ? "Days" : "Day"}>
      <NumberOptionsSelect
        optionsCount={31}
        value={interval.toString()}
        onChange={(value: string) => {
          const newInterval = parseInt(value);
          let newOptions = buildBaseOptions(freq, dtstart, until as Date);
          onChange({ ...newOptions, interval: newInterval });
        }}
      />
    </TypographyBody>
  );
};
