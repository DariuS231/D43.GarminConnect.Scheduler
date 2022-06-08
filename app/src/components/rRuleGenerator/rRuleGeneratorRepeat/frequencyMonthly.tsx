import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import * as React from "react";
import { RRule, Frequency, Options } from "rrule";
import { FrequencyMonthlyOnDay } from "./frequencyMonthlyOnDay";
import { FrequencyMonthlyOnThe } from "./frequencyMonthlyOnThe";
import { IRepeatOnThe, MonthlyRepeatMode } from "./rRuleGeneratorRepeat.types";
import { NumberOptionsSelect } from "../../numberOptionsSelect";
import { TypographyBody } from "../../typographyBody";
import { ToggleOptionButtons } from "../../toggleOptionButtons";
import { buildBaseOptions } from "../rRuleGenerator.utils";

export interface IFrequencyMonthlyProps {
  rrule: RRule;
  onChange: (newOptions: Partial<Options>) => void;
}

export const FrequencyMonthly = (
  props: IFrequencyMonthlyProps
): JSX.Element => {
  const { rrule, onChange } = props;
  const { freq, dtstart, until, interval, bysetpos, byweekday, bymonthday } =
  rrule.options;

  if (freq !== Frequency.MONTHLY) {
    return <></>;
  }
  const mode = bysetpos ? MonthlyRepeatMode.OnThe : MonthlyRepeatMode.OnDay;

  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Box>
          <Grid container alignItems="center">
            <Grid item xs>
              <TypographyBody
                prefix="Repeat every"
                sufix={interval > 1 ? "Months" : "Month"}
              >
                <NumberOptionsSelect
                  optionsCount={12}
                  value={interval.toString()}
                  onChange={(value: string) => {
                    const newInterval = parseInt(value); 
                    onChange({ ...rrule.options, interval: newInterval });
                  }}
                />
              </TypographyBody>
            </Grid>
          </Grid>
        </Box>

        <Box>
          <Grid container alignItems="center">
            <Grid item xs>
              <ToggleOptionButtons
                exclusive
                value={mode.toString()}
                onChange={(newMode) => {
                  let newOptions = buildBaseOptions(
                    freq,
                    dtstart,
                    until as Date
                  );

                  onChange(
                    newMode === MonthlyRepeatMode.OnDay
                      ? { ...newOptions, bymonthday: 1, interval }
                      : { ...newOptions, bysetpos: 1, byweekday: [0], interval }
                  );
                }}
                options={[
                  { key: "OnDay", displayName: "On Day" },
                  { key: "OnThe", displayName: "On The" },
                ]}
              />
            </Grid>
          </Grid>
        </Box>

        <Box>
          <Grid container alignItems="center">
            <Grid item xs>
              <FrequencyMonthlyOnThe
                value={{bysetpos: bysetpos as unknown as number, byweekday}}
                onChange={(newValue) => {
                  let newOptions = buildBaseOptions(
                    freq,
                    dtstart,
                    until as Date
                  );
                  debugger;
                  onChange({ ...newOptions, bysetpos: newValue.bysetpos, byweekday: newValue.byweekday, interval });
                }}
                mode={mode}
              />
              <FrequencyMonthlyOnDay
                value={bymonthday as unknown as number}
                onChange={(newByMonthDay: number) => {
                  let newOptions = buildBaseOptions(
                    freq,
                    dtstart,
                    until as Date
                  );

                  onChange({ ...newOptions, bymonthday: newByMonthDay, interval });
                }}
                mode={mode}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
};
