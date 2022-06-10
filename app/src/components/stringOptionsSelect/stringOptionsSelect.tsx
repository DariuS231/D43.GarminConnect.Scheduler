import * as React from "react";
import { IStringOptionsSelectProps } from ".";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import * as classes from "./stringOptionsSelect.module.scss";

export const StringOptionsSelect = (
  props: IStringOptionsSelectProps
): JSX.Element => {
  const { options, value, onChange } = props;

  const optionElements = options.map((i) => {
    let key;
    let value;
    if (typeof i === "string") {
      key = i;
      value = i;
    } else {
      key = i.key;
      value = i.value;
    }
    return (
      <MenuItem value={value} key={key}>
        {key}
      </MenuItem>
    );
  });

  const selectValue = typeof value === "string" ? value : value.value;

  return (
    <div className={classes.stringOptionsSelect}>
      <FormControl variant="standard" sx={{ m: 1 }}>
        <Select
          value={selectValue}
          onChange={(event: SelectChangeEvent) => {
            onChange(event.target.value);
          }}
        >
          {optionElements}
        </Select>
      </FormControl>
    </div>
  );
};
