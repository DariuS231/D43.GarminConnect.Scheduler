import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import * as React from "react";
import { RRuleFrequency } from ".";

export interface IFrequencyMonthlyProps {
  frequency: RRuleFrequency;
}

export const FrequencyMonthly = (
  props: IFrequencyMonthlyProps
): JSX.Element => {
  if (props.frequency !== RRuleFrequency.Monthly) {
    return <></>;
  }
  return (
    <div>
      Repeat every
      <Select>
        <MenuItem value={1}>1</MenuItem>
        <MenuItem value={2}>2</MenuItem>
        <MenuItem value={3}>3</MenuItem>
        <MenuItem value={4}>4</MenuItem>
        <MenuItem value={5}>5</MenuItem>
        <MenuItem value={6}>6</MenuItem>
        <MenuItem value={7}>7</MenuItem>
        <MenuItem value={8}>8</MenuItem>
        <MenuItem value={9}>9</MenuItem>
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={11}>11</MenuItem>
        <MenuItem value={12}>12</MenuItem>
      </Select>
      Month(s)
      <ToggleButtonGroup color="primary" exclusive>
        <ToggleButton value="On Day">On Day</ToggleButton>
        <ToggleButton value="On The">On The</ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};
