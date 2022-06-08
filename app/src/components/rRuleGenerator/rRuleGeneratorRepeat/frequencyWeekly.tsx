import * as React from "react";
import { Frequency, RRule, Options } from "rrule";
import { NumberOptionsSelect } from "../../numberOptionsSelect";
import { ToggleOptionButtons } from "../../toggleOptionButtons";
import { TypographyBody } from "../../typographyBody";
import { buildBaseOptions } from "../rRuleGenerator.utils";

export interface IFrequencyWeeklyProps {
  rrule: RRule;
  onChange: (newOptions: Partial<Options>) => void;
}

export const FrequencyWeekly = (props: IFrequencyWeeklyProps): JSX.Element => {
  const { rrule, onChange } = props;
  const { freq, dtstart, until, interval, byweekday } = rrule.options;

  if (freq !== Frequency.WEEKLY) {
    return <></>;
  }

  const options = [
    { key: 0, displayName: "Mon" },
    { key: 1, displayName: "Tue" },
    { key: 2, displayName: "Wed" },
    { key: 3, displayName: "Thu" },
    { key: 4, displayName: "Fri" },
    { key: 5, displayName: "Sat" },
    { key: 6, displayName: "Sun" },
  ];
  return (
    <div>
      <TypographyBody
        prefix="Repeat every"
        sufix={interval > 1 ? "Weeks" : "Week"}
      >
        <NumberOptionsSelect
          optionsCount={52}
          value={interval.toString()}
          onChange={(value: string) => {
            const newInterval = parseInt(value);
            let newOptions = buildBaseOptions(freq, dtstart, until as Date);
            onChange({ ...newOptions, interval: newInterval });
          }}
        />
      </TypographyBody>
      <ToggleOptionButtons
        value={byweekday}
        onChange={(newByWeekDay: number | number[]) => {
          let newOptions = buildBaseOptions(freq, dtstart, until as Date);
          onChange({ ...newOptions, byweekday: newByWeekDay });
        }}
        options={options}
      />
    </div>
  );
};
