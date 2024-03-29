import * as React from "react";
import { IRRuleGeneratorDatePickerProps } from ".";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import TextField from "@mui/material/TextField";

import * as classes from "./rRuleGeneratorDatePicker.module.scss";

export const RRuleGeneratorDatePicker = (
  props: IRRuleGeneratorDatePickerProps
): JSX.Element => {
  const todaysDate = new Date();
  const maxDt = new Date();
  maxDt.setFullYear(todaysDate.getFullYear() + 1);

  const minDate = props.minDate || todaysDate;
  return (
    <div className={classes.rRuleGeneratorDatePicker}>
      <DesktopDatePicker
        openTo="day"
        views={["year", "month", "day"]}
        minDate={minDate}
        maxDate={maxDt}
        disablePast={true}
        label={props.label}
        value={props.value}
        onChange={(newValue) => {
          props.onChange(newValue && new Date(Date.UTC(newValue.getFullYear(),newValue.getMonth(),newValue.getDate(),0,0,0)));
        }}
        renderInput={(params) => {
          params["aria-readonly"] = true;
          return <TextField {...params} />;
        }}
      />
    </div>
  );
};
