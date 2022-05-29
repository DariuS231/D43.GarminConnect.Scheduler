import * as React from "react";
import { IRRuleGeneratorDatePickerProps } from ".";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import TextField from "@mui/material/TextField";

import "./rRuleGeneratorDatePicker.module.scss";

export const RRuleGeneratorDatePicker = (
  props: IRRuleGeneratorDatePickerProps
): JSX.Element => {
  const minDt = new Date();
  let maxDt = new Date();
  maxDt.setFullYear(minDt.getFullYear() + 1);

  return (
    <DesktopDatePicker
      openTo="day"
      views={["year", "month", "day"]}
      minDate={minDt}
      maxDate={maxDt}
      disablePast={true}
      label={props.label}
      value={props.value}
      onChange={props.onChange}
      renderInput={(params) => <TextField {...params} />}
    />
  );
};
