import * as React from "react";
import { IRRuleGeneratorStartProps } from ".";

import "./rRuleGeneratorStart.module.scss";
import { RRuleGeneratorDatePicker } from "../rRuleGeneratorDatePicker";

export const RRuleGeneratorStart = (
  props: IRRuleGeneratorStartProps
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
