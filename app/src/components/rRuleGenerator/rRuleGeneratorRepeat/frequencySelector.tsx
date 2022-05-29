import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { RRuleFrequency } from ".";

export interface IFrequencySelectorProps {
  frequency: RRuleFrequency;
  onChange: (event: SelectChangeEvent<RRuleFrequency>) => void;
}

export const FrequencySelector = (
  props: IFrequencySelectorProps
): JSX.Element => {
  return (
    <div>
      <RadioGroup
        row
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
        value={props.frequency}
        onChange={props.onChange}
      >
        <FormControlLabel
          value={RRuleFrequency.Daily}
          control={<Radio />}
          label={RRuleFrequency.Daily}
          labelPlacement="top"
        />
        <FormControlLabel
          value={RRuleFrequency.Weekly}
          control={<Radio />}
          label={RRuleFrequency.Weekly}
          labelPlacement="top"
        />
        <FormControlLabel
          value={RRuleFrequency.Monthly}
          control={<Radio />}
          label={RRuleFrequency.Monthly}
          labelPlacement="top"
        />
      </RadioGroup>
    </div>
  );
};
