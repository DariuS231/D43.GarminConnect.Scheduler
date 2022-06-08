import * as React from "react";
import { MonthlyRepeatMode } from ".";
import { NumberOptionsSelect } from "../../numberOptionsSelect";
import { TypographyBody } from "../../typographyBody";

export interface IFrequencyMonthlyOnDayProps {
  mode: MonthlyRepeatMode;
  value: number;
  onChange: (repeatOn: number) => void;
}

export const FrequencyMonthlyOnDay = (
  props: IFrequencyMonthlyOnDayProps
): JSX.Element => {
  if (props.mode !== MonthlyRepeatMode.OnDay) {
    return <></>;
  }
  return (
    <TypographyBody prefix="On day" sufix="of each month">
      <NumberOptionsSelect
        optionsCount={31}
        value={props.value.toString()}
        onChange={(value: string) => props.onChange(parseInt(value))}
      />
    </TypographyBody>
  );
};
