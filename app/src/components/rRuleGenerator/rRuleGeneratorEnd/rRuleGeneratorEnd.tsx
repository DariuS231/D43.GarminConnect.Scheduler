import * as React from "react";
import { IRRuleGeneratorEndProps } from ".";
import { RRuleGeneratorDatePicker } from "../rRuleGeneratorDatePicker";

import "./rRuleGeneratorEnd.module.scss";

export const RRuleGeneratorEnd = (
  props: IRRuleGeneratorEndProps
): JSX.Element => {
  const [value, setValue] = React.useState<Date>(new Date());
  return (
    <div>
      <RRuleGeneratorDatePicker
        value={value}
        onChange={(newValue) => {
          if (newValue) {
            setValue(newValue);
          }
        }}
      />
    </div>
  );
};
